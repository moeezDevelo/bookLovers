import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { useDispatch } from 'react-redux';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { totalSize } from 'react-native-dimension';
import { getFavouritesBooks, editProfile } from '../../../utills/ApiFunctions';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function MyBookShelf({ navigation, route }) {
  const item = route?.params?.item;
  const size = `500x500`
  const dispatch = useDispatch();
  const [myShelf, setMyShelf] = useState([])
  const _deleteBook = (index) => {
    let myNewShelf = myShelf;
    myNewShelf = myShelf.filter((item, i) => i != index)
    setMyShelf(myNewShelf)
    _AddNewBook(myNewShelf)
  }
  const _showMessage = (description, message = 'Error', type = 'danger') => {
    showMessage({
      message: message,
      description: description,
      type: type,
      duration: 8000
    });
  }
  const _handleEmailError = (subject = '', message = '') => {
    handleEmailError({
      Subject: subject,
      Message: message
    })
  }
  const _AddNewBook = async (favBooks) => {
    const response = await editProfile({
      FavBooks: favBooks
    })
    if (response?.success) {
      _showMessage('Book successfully deleted', 'Success', 'success')
    }
    else if (response?.status === 401) {
      _showMessage('Your session has expired, please log back in.');
      dispatch(logout());
    }
    else {
      _showMessage('An error has occurred while adding a new book.  If the problem persists, please log out and log back in.')
      _handleEmailError('Book Lovers Error in My bookshelf Deleted Book', JSON.stringify(response))
    }
  }
  useEffect(() => {
    if (route?.params?.item) {
      setMyShelf(item)
    }
  }, [route?.params?.item])
  const _getFavouritesBooks = async () => {
    dispatch(setIsLoader(true))
    const response = await getFavouritesBooks();
    if (response?.success) {
      setMyShelf(response?.data?.FavBooks ?? [])
      dispatch(setIsLoader(false))
    }
    else {
      dispatch(setIsLoader(false))
      _showMessage('An error occurred while retrieving the books.  If the problem persists, please contact booklovershelp@gmail.com.')
      _handleEmailError('Book Lovers Error in My bookshelf (Get Fav Books)', JSON.stringify(response))
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getFavouritesBooks()
    }
    return () => mounted = false
  }, [])
  const _showMyBookShelf = ({ item, index }) => {
    return (
      <View style={styles.viewContainer}>
        <Image source={{ uri: GetImagePath(item?.bookImageUrl, size) }} resizeMode='cover' style={styles.bookImage} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.authorNameText}>{item?.bookAuthor}</Text>
          <Text numberOfLines={1} style={styles.bookTitleText}>{item?.bookTitle}</Text>
          <Text style={styles.createdAtText}>{moment(item.createdAt).fromNow()}</Text>
        </View>
        <AntDesign name='close' size={totalSize(2.5)} color={Colors.black}
          style={styles.iconButton} onPress={() => _deleteBook(index)} />
      </View>
    )
  }
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.white}
      />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <Header title='My Bookshelf' isBack containerStyles={styles.containerStyles}
          textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
        <View style={styles.mainViewContainer}>
          <FlatList
            data={myShelf}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
            renderItem={_showMyBookShelf}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => (index + 1).toString()}
            ListHeaderComponent={() =>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Share up to 5 of your favorite books.</Text>
              </View>
            }
            ListFooterComponent={() =>
              myShelf.length <= 5 &&
              <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => navigation.navigate('AddBookToBookShelf', { item: myShelf })}>
                <AntDesign name='plus' size={totalSize(3)} color={Colors.white} />
                <Text style={styles.addText}>ADD BOOK</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}
