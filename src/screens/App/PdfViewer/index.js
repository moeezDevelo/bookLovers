import React, { Fragment, useState, useRef, useEffect } from 'react';
import { View, StatusBar, SafeAreaView, Text, Platform, PermissionsAndroid, TouchableOpacity, BackHandler } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import Pdf from 'react-native-pdf';
import Entypo from 'react-native-vector-icons/Entypo';
import { width } from 'react-native-dimension';
import crypto from 'crypto-js';
import RNFetchBlob from 'rn-fetch-blob';
import { getPdfBook, pdfPositionUpdate, getBookDetail, } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoader, setIsLoaderText } from '../../../Redux/Actions/config';
import { API_TOKEN } from '@env';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
export default function AudioBookPlayer({ navigation, route }) {
  const item = route?.params?.item;
  const dispatch = useDispatch();
  const isLoader = useSelector((state) => state.config.isLoader);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  var [currentIndex, setCurretIndex] = useState(0)
  const pdfRef = useRef(null);
  const _showMessage = (description) => {
    showMessage({
      message: 'Error',
      description: description,
      type: 'danger',
      duration: 8000
    });
  }
  const _handleEmailError = (subject = '', message = '') => {
    handleEmailError({
      Subject: subject,
      Message: message
    })
  }
  const _readFile = (res) => {
    dispatch(setIsLoaderText('Loading ...'))
    RNFetchBlob.fs
      .readFile(
        Platform.OS === 'android' ? `file://${res.path()}` : res.path(),
        'base64',
      )
      .then((data) => {
        var bytes = crypto.AES.decrypt(data, API_TOKEN);
        var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
        setPdfFile(`data:application/pdf;base64,${decryptedData}`);
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
      })
      .catch((err) => {
        dispatch(setIsLoader(false));
        _showMessage(err ?? 'File not Found')
        dispatch(setIsLoaderText(''))
        _handleEmailError('Book Lovers Error Reading PDF File', JSON.stringify(err))
      });
  };
  const _readExistingFile = (res) => {
    dispatch(setIsLoaderText('Loading ...'))
    RNFetchBlob.fs
      .readFile(Platform.OS === 'android' ? `file://${res}` : res, 'base64')
      .then((data) => {
        var bytes = crypto.AES.decrypt(data, API_TOKEN);
        var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
        setPdfFile(`data:application/pdf;base64,${decryptedData}`);
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
      })
      .catch((err) => {
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
        _showMessage('File not found.  Please contact booklovershelp@gmail.com if the problem persists.')
        _handleEmailError('Book Lovers Error Reading existing PDF File', JSON.stringify(err))
      });
  };
  const _downloadFile = (path, link) => {
    dispatch(setIsLoaderText('Downloading ...'))
    RNFetchBlob.config({
      fileCache: true,
      path: `${path}/${item.BookId}.pdf`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${item?.BookDetails?.BookTitle}`,
        path: `${path}/${item.BookId}.pdf`,
      },
    }).fetch('GET', link, {})
      .then((res) => {
        RNFetchBlob.fs.exists(res.path()).then((exist) => {
          if (exist) {
            _readFile(res);
          } else {
            dispatch(setIsLoader(false));
            dispatch(setIsLoaderText(''))
            _showMessage('An error occurred while retrieving the file.  If the problem persists, please contact booklovershelp@gmail.com')
          }
        });
      })
      .catch((err) => {
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
        _showMessage('An error occurred while downloading the file.  If the problem persists, please contact booklovershelp@gmail.com')
        _handleEmailError('Book Lovers Error Downloading PDF file ', JSON.stringify(err))
      });
  };
  const _getPdfFile = async (path) => {
    const response = await getPdfBook(item.BookId);
    if (response.success) {
      _downloadFile(path, response.data);
    }
    else if (response?.status === 401) {
      _showMessage('Your session has expired, please log back in.');
      dispatch(logout());
    }
    else {
      dispatch(setIsLoader(false));
      _showMessage('An error has occurred. If the problem persists, please contact booklovershelp@gmail.com')
      _handleEmailError('Book Lovers Error Getting book details', JSON.stringify(response))
    }
  };
  const _checkFile = (path) => {
    RNFetchBlob.fs.exists(`${path}/${item.BookId}.pdf`).then((exist) => {
      if (exist) {
        _readExistingFile(`${path}/${item.BookId}.pdf`);
      } else {
        _getPdfFile(path);
      }
    }).catch(err => {
      dispatch(setIsLoader(false));
      _handleEmailError('Book Lovers Error Checking pdf file existence', JSON.stringify(err))
    })
  };
  const _requestPermissions = async (dirs) => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]).then((results) => {
        if (
          results[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] == 'granted' ||
          results[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] == 'granted'
        ) {
          dispatch(setIsLoader(true));
          let path = dirs.DownloadDir + '/BookLovers/PdfFiles';
          RNFetchBlob.fs
            .mkdir(`${path}`)
            .then(() => {
              _checkFile(path);
            })
            .catch((err) => {
              if (err.code === 'EEXIST') {
                _checkFile(path);
              }

              _handleEmailError('Book Lovers Error Requesting File Permissions', JSON.stringify(err))
            });
        }
      });
    } catch (err) {
      dispatch(setIsLoader(false));
      _showMessage('An error has occurred. If the problem persists, please contact booklovershelp@gmail.com')
      _handleEmailError('Pdf request permission', JSON.stringify(err))
    }
  };
  const _CheckDir = () => {
    const dirs = RNFetchBlob.fs.dirs;
    if (Platform.OS === 'android') {
      _requestPermissions(dirs);
    } else {
      dispatch(setIsLoader(true));
      _checkFile(dirs.DocumentDir);
    }
  };
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _CheckDir();
    }
    return () => mounted = false
  }, []);
  const _updatePosition = async (page) => {
    await pdfPositionUpdate(item.BookId, { CurrentPage: page });
  };
  const _getBookDetails = async () => {
    const response = await getBookDetail(item?.Id);
    if (response?.success) {
      setCurrentPage(response.data[0].CurrentPage);
    } else {
      _showMessage('something went wrong')
      _handleEmailError('Getting book details', JSON.stringify(response))
    }
  };
  const _goBack = (cPage) => {
    _updatePosition(cPage)
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => _goBack(currentIndex));
    return () => backHandler.remove();
  }, [currentIndex]);
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getBookDetails();
    }
    return () => mounted = false
  }, []);
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <Header
          title={`${item?.BookDetails?.BookTitle}`}
          textStyle={styles.textStyle}
          isBack
          onPress={() => {
            _goBack(currentIndex)
            navigation.goBack()
          }
          }
          containerStyles={styles.containerStyles}
        />
        <View style={styles.mainViewContainer}>
          {pdfFile && (
            <Pdf
              source={{ uri: pdfFile }}
              minScale={1}
              maxScale={7}
              spacing={0}
              enablePaging={false}
              horizontal
              ref={pdfRef}
              page={currentPage}
              onPageChanged={(page) => {
                setCurretIndex(page)
              }}
              onLoadComplete={(page) => {
                setTotalPages(page);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link presse: ${uri}`);
              }}
              style={styles.pdf}
            />
          )}
        </View>
        {!isLoader && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              disabled={currentPage == 1}
              onPress={() => {
                pdfRef.current.setPage(currentIndex - 1);
                setCurrentPage(currentIndex - 1);
                _updatePosition(currentPage - 1);
              }}>
              <Entypo
                name="arrow-bold-left"
                size={width(6)}
                color={Colors.black}
              />
            </TouchableOpacity>
            <Text>{currentIndex}</Text>
            <TouchableOpacity
              onPress={() => {
                setCurrentPage(currentIndex + 1);
                pdfRef.current.setPage(currentIndex + 1);
                _updatePosition(currentPage + 1);
              }}>
              <Entypo
                name="arrow-bold-right"
                size={width(6)}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
