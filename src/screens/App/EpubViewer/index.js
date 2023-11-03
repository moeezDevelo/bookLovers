import React, { Fragment, useEffect, useState, useRef } from 'react';
import { SafeAreaView, StatusBar, Platform, PermissionsAndroid, View, Text, Animated, TouchableOpacity, BackHandler } from 'react-native';
import { Header } from '../../../components/Headers/index';
import Colors from '../../../utills/Colors';
import styles from './styles';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { height, width } from 'react-native-dimension';
import { useFileSystem } from '@epubjs-react-native/file-system';
import RNFetchBlob from 'rn-fetch-blob';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { setIsLoader, setIsLoaderText } from '../../../Redux/Actions/config';
import { handleEmailError } from '../../../utills/GlobalFunction';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {Slider} from '@miblanchard/react-native-slider';
import { getBookDetail, getPdfBook, pdfPositionUpdate } from '../../../utills/ApiFunctions';
import crypto from 'crypto-js';
import { API_TOKEN } from '@env';
import moment from 'moment';

export default function EpubViewer({ navigation, route }) {
  const item = route?.params?.item;
  const [epubFile, setEpubFile] = useState(null);
  const dispatch = useDispatch();
  const isLoader = useSelector((state) => state.config.isLoader);
  const [currentPage, setCurrentPage] = useState('');
  const epubRef = useRef(null);
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
       setEpubFile(decryptedData);
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
      })
      .catch((err) => {
        dispatch(setIsLoader(false));
        _showMessage(err ?? 'File not Found')
        dispatch(setIsLoaderText(''))
        _handleEmailError('Book Lovers Error Reading EPUB File', JSON.stringify(err))
      });
  };
  const _readExistingFile = (res) => {
    dispatch(setIsLoaderText('Loading ...'))
    RNFetchBlob.fs
      .readFile(Platform.OS === 'android' ? `file://${res}` : res, 'base64')
      .then((data) => {
        var bytes = crypto.AES.decrypt(data, API_TOKEN);
        var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
       setEpubFile(decryptedData);
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
      })
      .catch((err) => {
        dispatch(setIsLoader(false));
        dispatch(setIsLoaderText(''))
        _showMessage('File not found.  Please contact booklovershelp@gmail.com if the problem persists.')
        _handleEmailError('Book Lovers Error Reading existing EPUB File', JSON.stringify(err))
      });
  };
  const _downloadFile = (path, link) => {
    dispatch(setIsLoaderText('Downloading ...'))
    RNFetchBlob.config({
      fileCache: true,
      path: `${path}/${item.BookId}.epub`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${item?.BookDetails.BookTitle}`,
        path: `${path}/${item.BookId}.epub`,
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
        _handleEmailError('Book Lovers Error Downloading EPUB file ', JSON.stringify(err))
      });
  };
  const _getEpubFile = async (path) => {
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
    RNFetchBlob.fs.exists(`${path}/${item.BookId}.epub`).then((exist) => {
      if (exist) {
        _readExistingFile(`${path}/${item.BookId}.epub`);
      } else {
        _getEpubFile(path);
      }
    }).catch(err => {
      dispatch(setIsLoader(false));
      _handleEmailError('Book Lovers Error Checking epub file existence', JSON.stringify(err))
    })
  };
  const _requestPermissions = async (dirs) => {
    await _getBookDetails();
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
          
          let path = dirs.DownloadDir + '/BookLovers/EpubFiles';
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
      _handleEmailError('Epub request permission', JSON.stringify(err))
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
 
  const _getBookDetails = async () => {
    const response = await getBookDetail(item?.Id);
    if (response?.success) {
      setCurrentPage(response?.data[0]?.CurrentChapter);
    } else {
      _showMessage('something went wrong')
      _handleEmailError('Getting book details', JSON.stringify(response))
    }
  };

  const RenderReader = ({pageNum}) => {
    const [baseScale, setBaseScale] = useState(0);
    const {changeFontSize, goPrevious, goNext} = useReader();   

    const onLocationChange = async (loc, curr, page) => {
    const hours = new Date().getHours(); 
    const min = new Date().getMinutes(); 
    const sec = new Date().getSeconds(); 
    const currentTime = hours+':'+min+':'+sec;
      await pdfPositionUpdate(item.BookId, { CurrentChapter: curr?.end?.cfi, CurrentTime: currentTime });
    };
  
    return (
      <PinchGestureHandler 
      onGestureEvent = { async ({nativeEvent}) => {
        const scale = nativeEvent.velocity > 0 ? (baseScale + (nativeEvent.scale - 0.5)) : 
        baseScale > 16 ? (baseScale - (nativeEvent.scale)) : null; 
        setBaseScale(scale);
        changeFontSize(`${16 + baseScale}px`)
      }}
      >
        <Animated.View>
      <Reader
      src={epubFile}
      width={width(100)}
      height={height(80)}
      fileSystem={useFileSystem}
      onLocationChange={onLocationChange}
      initialLocation={pageNum}
    />
    <View style={styles.bottomContainer}> 
    <View style={styles.sliderContainer}>
      <Text style={[styles.textStyle, {fontSize: width(4)}]}>
        A
      </Text>
    <Slider
    renderTrackMarkComponent={() => (
        <View style={styles.trackMarks} />
    )}
      containerStyle={styles.slider}
      step={32/16}
      minimumValue={0}
      trackMarks={[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32]}
      maximumValue={32}
      value={baseScale}
      onValueChange={(value) => {
        let val = parseFloat(value);
        setBaseScale(val);
        changeFontSize(`${16 + val}px`);
      }}
      />
      <Text style={[styles.textStyle, {fontSize: width(6)}]}>
        A
      </Text>
    </View>

    <View style={styles.footerControl}>
            <TouchableOpacity
              onPress={() => goPrevious()}
              >
              <Entypo
                name="arrow-bold-left"
                size={width(6)}
                color={Colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => goNext()}
              >
              <Entypo
                name="arrow-bold-right"
                size={width(6)}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
          </View>
    </Animated.View>
      </PinchGestureHandler>
    )
  };
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
      <Header
          title={`${item?.BookDetails.BookTitle}`}
          textStyle={styles.textStyle}
          isBack
          onPress={() => {
            navigation.goBack()
          }
          }
          containerStyles={styles.containerStyles}
        />
        {
          !isLoader && (
      <ReaderProvider>
       <RenderReader pageNum={currentPage}/>
      </ReaderProvider>
          )
        }
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
