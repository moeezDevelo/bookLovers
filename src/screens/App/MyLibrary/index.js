import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, FlatList, Platform, } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { MyLibraryList } from '../../../components/FlatList/index';
import { ReaderOptionsModal } from '../../../components/Modals/index';
import { getPurchasedBook } from '../../../utills/ApiFunctions';
import { setIsLoader } from '../../../Redux/Actions/config';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function MyLibrary({ navigation }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [EBooks, setEbooks] = useState([])
  const [AudioBooks, setAudioBooks] = useState([])
  const isLoader = useSelector((state) => state.config.isLoader);
  const [index, setIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [bookType, setBookType] = useState('');
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  const _showMessage = (description = '', message = 'Error', type = 'danger') => {
    showMessage({
      message: message,
      description: description,
      type: type,
      duration: 8000
    });
  }
  const onPressEbook = (bookType, item) => {
    if(bookType === 'epub'){
      navigation.navigate('EpubViewer', { item: item })
    } else {
      navigation.navigate('PdfViewer', { item: item })
    }
  };
  const _removeItem = () => {
    const path = Platform.OS === 'android' ? `${RNFetchBlob.fs.dirs.DownloadDir}/BookLovers/PdfFiles/${item.BookId}.pdf` :
      `${RNFetchBlob.fs.dirs.DocumentDir}/BookLovers/PdfFiles/${item.BookId}.pdf`
    if (bookType == 'E-Book') {
      RNFetchBlob.fs.unlink(path)
        .then(() => {
          _showMessage('Successfully book deleted from your mobile', 'Success', 'success')
        })
        .catch((err) => console.log(err))
    }
    else {
      let arr = [...AudioBooks]
      arr = arr.filter((item, i) => i != index)
      setAudioBooks(arr)
    }
  }
  const _showEBooks = ({ item, index }) => {
    return (
      <MyLibraryList item={item} bookType='E-Book'
        onDotPress={() => {
          setBookType('E-Book')
          setIndex(index)
          setIsVisible(true)
          setItem(item)
        }}
        onPress={() => onPressEbook(item?.BookType, item)}
      />
    )
  }
  const _showAudioBooks = ({ item, index }) => {
    return (
      <MyLibraryList item={item} bookType='Audio Book'
        onDotPress={() => {
          setBookType('Audio Book')
          setIndex(index)
          setIsVisible(true)
          setItem(item)
        }}
        onPress={() => navigation.navigate('AudioBookPlayer', { item: item })}
      />
    )
  }
  const _getPurchasedBook = async () => {
    dispatch(setIsLoader(true))
    const response = await getPurchasedBook();
    if (response?.success) {
      let audioBooks = (response.data.filter(item => item.BookType == 'm4a'))
      let pdfBooks = (response.data.filter(item => item.BookType == 'pdf' || item.BookType == 'epub'))
      setAudioBooks(audioBooks)
      setEbooks(pdfBooks)
      dispatch(setIsLoader(false))
    }
    else if (response?.status === 401) {
      _showMessage('Your session has expired, please log back in.');
      dispatch(logout());
    }
    else {
      dispatch(setIsLoader(false))
      _showMessage(`'An error occurred while retrieving your library.  Please try logging out and back in. If the problem persists, please contact booklovershelp@gmail.com'`)
      handleEmailError({
        Subject: 'Book Lovers Error: Getting Books Purchased',
        Message: JSON.stringify(response)
      })
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getPurchasedBook()
    }
    return () => mounted = false
  }, [])
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.white}
      />
      <SafeAreaView style={(styles.container, { backgroundColor: Colors.white })} />
      <SafeAreaView style={styles.container}>
        <Header title='My Library' isBack containerStyles={styles.containerStyles}
          textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButtons} onPress={() => setTabIndex(0)}>
            <Text style={tabIndex == 0 ? styles.selectedTabText : styles.unSelectedTabText}>Audio Books</Text>
            <View style={tabIndex == 0 ? styles.selectedTabLine : styles.unSelectedTabLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButtons}
            onPress={() => setTabIndex(1)}
          >
            <Text style={tabIndex == 1 ? styles.selectedTabText : styles.unSelectedTabText}>E-Books</Text>
            <View style={tabIndex == 1 ? styles.selectedTabLine : styles.unSelectedTabLine} />
          </TouchableOpacity>
        </View >
        <View style={styles.mainViewContainer}>
          {
            tabIndex == 0 ?
              <FlatList
                data={AudioBooks}
                ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                renderItem={_showAudioBooks}
                contentContainerStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                  return (
                    <Text style={styles.audioBookType}>* Audio-books require an active internet connection to listen</Text>
                  )
                }}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.emptyContainer}>
                      {!isLoader && <Text style={styles.emptyText}>No audio books found in library</Text>}
                    </View>
                  )
                }}
              /> :
              <FlatList
                data={EBooks}
                ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                renderItem={_showEBooks}
                contentContainerStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() =>
                  <View style={styles.emptyContainer}>
                    {!isLoader && <Text style={styles.emptyText}>No E-book found in library</Text>}
                  </View>}
              />
          }
        </View>
      </SafeAreaView>
      <ReaderOptionsModal isVisible={isVisible}
        onClose={() => setIsVisible(!isVisible)}
        onBookDetail={() => {
          navigation.navigate('BooksDetails', { item: { ...item.BookDetails, UserHasPurchasedBook: true } })
        }}
        bookType={bookType}
        onLeaveReview={() => navigation.navigate('ReviewBook', { item })}
        onRemoveDevice={() => {
          _removeItem()
        }}
      />
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}
