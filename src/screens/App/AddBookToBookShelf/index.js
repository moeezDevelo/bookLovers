import React, { Fragment, useState, createRef } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { height, totalSize } from 'react-native-dimension';
import TextInputField from '../../../components/TextInput/index';
import { Button } from '../../../components/Button/index';
import ImagePicker from 'react-native-image-crop-picker';
import { ImagePickerModal } from '../../../components/Modals/index';
import { s3Upload, editProfile } from '../../../utills/ApiFunctions';
import { setIsLoader, setButtonLoader } from '../../../Redux/Actions/config';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function AddBookToBookShelf({ navigation, route }) {
  const item = route?.params?.item;
  const [bookImage, setBookImage] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [authorName, setAuthorName,] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const authorNameRef = createRef(null)
  const dispatch = useDispatch();
  const uploadImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true
    }).then(image => {
      setIsVisible(!isVisible)
      setTimeout(() => {
        setBookImage('data:image/jpeg;base64,' + image.data)
      }, 600);
    });
  }
  const _showMessage = (description) => {
    showMessage({
      message: 'Error',
      description: description,
      type: 'danger',
      duration: 8000
    });
  }
  const imageFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(image => {
      setIsVisible(!isVisible)
      setTimeout(() => {
        setBookImage('data:image/jpeg;base64,' + image.data)
      }, 600);
    });
  }
  const _uploadS3 = async () => {
    if (bookImage != '' && authorName != '' && bookTitle != '') {
      dispatch(setButtonLoader(true))
      const response = await s3Upload({
        key: "MyBookShelf.jpg",
        imageType: "MyBookShelf",
        base64String: bookImage
      });
      if (response?.success) {
        _AddNewBook(response.data)
      }
      else if (response?.status === 401) {
        showMessage({
      	message: 'Error',
      	description: 'Your session has expired, please log back in.',
      	type: 'danger',
      	duration: 8000
        });

        dispatch(logout());
      }
      else {
        dispatch(setButtonLoader(true))
        _showMessage('An error occurred while retrieving your bookshelf.  If the problem persists, please email booklovershelp@gmail.com')
        handleEmailError({
          Subject: 'Upload S3 Image',
          Message: JSON.stringify(response)
        })
      }
    }
    else {
      _showMessage('All fields are required.')
    }
  }
  const _AddNewBook = async (image) => {
    dispatch(setButtonLoader(true))
    const response = await editProfile({
      FavBooks: [...item,
      {
        bookImageUrl: image,
        bookTitle: bookTitle,
        bookAuthor: authorName,
        createdAt: moment()
      }]
    })
    if (response.success) {
      let arr = [...item, {
        bookAuthor: authorName,
        bookTitle: bookTitle,
        bookImageUrl: image,
        createdAt: moment()
      }]
      navigation.navigate('MyBookShelf', { item: arr })
      dispatch(setButtonLoader(false))
    }
    else {
      dispatch(setIsLoader(false))
      _showMessage('An error occurred while saving your book.  If the problem persists, please contact booklovershelp@gmail.com.')
      handleEmailError({
        Subject: 'Add Book To bookShelf',
        Message: JSON.stringify(response)
      })
    }
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
        <Header title='Add book to bookshelf' isBack containerStyles={styles.containerStyles}
          textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
        <View style={styles.mainViewContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraScrollHeight={height(8)}
            keyboardShouldPersistTaps='handled'
          >
            {
              bookImage != '' ?
                <TouchableOpacity activeOpacity={0.7}
                  onPress={() => setIsVisible(!isVisible)}
                >
                  <Image source={{ uri: bookImage }} resizeMode='contain' style={styles.bookImage} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.addBookImageContainer} activeOpacity={0.7}
                  onPress={() => setIsVisible(!isVisible)}
                >
                  <AntDesign name='plus' size={totalSize(3)} color={Colors.appColor1} />
                  <Text style={styles.bookImageText}>Book image</Text>
                </TouchableOpacity>
            }
            <Text style={styles.textInputHeading}>Book Title</Text>
            <TextInputField onSubmit={() => authorNameRef.current.focus()} keytype='next' value={bookTitle}
              onChangeText={(val) => setBookTitle(val)} placeHolder='Book Title'
            />
            <Text style={styles.textInputHeading}>Author</Text>
            <TextInputField value={authorName} ref={authorNameRef} placeHolder='Author Name'
              onChangeText={(val) => setAuthorName(val)} keytype='done' />
            <Button title='SAVE' containerStyles={styles.saveButton}
              onPress={_uploadS3}
            />
          </KeyboardAwareScrollView>
        </View>
        <ImagePickerModal isVisible={isVisible}
          onClose={() => setIsVisible(!isVisible)}
          imageFromGallery={uploadImage}
          imageFromCamera={imageFromCamera}
        />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}
