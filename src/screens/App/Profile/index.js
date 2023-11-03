import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utills/Colors';
import { TitleHeader } from '../../../components/Headers/index';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { totalSize, width } from 'react-native-dimension';
import { ImagePickerModal } from '../../../components/Modals/index';
import ImagePicker from 'react-native-image-crop-picker';
import { s3Upload, editProfile } from '../../../utills/ApiFunctions';
import { setIsLoader } from '../../../Redux/Actions/config';
import { login } from '../../../Redux/Actions/Auth';
import { GetProfilePath } from '../../../utills/Methods';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function Profile({ navigation }) {
  const user = useSelector((state) => state.Auth.user);
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch();
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
  const _updateProfileImage = async (imageUrl) => {
    dispatch(setIsLoader(true))
    const response = await editProfile({
      ProfileImage: imageUrl
    })
    if (response?.success) {
      let newUser = { ...user }
      if (typeof newUser.idToken.userData === 'undefined') {
        const userObj = {
          ...newUser,
          idToken: {
            ...newUser.idToken,
            userData: {
              ProfileImage: imageUrl
            }
          }
        }
        dispatch(login(userObj))
      }
      else {
        newUser.idToken.userData.ProfileImage = imageUrl
        dispatch(login(newUser))
      }
      dispatch(setIsLoader(false))
    }
    else if (response?.status === 401) {
      _showMessage('Your session has expired, please log back in.');
      dispatch(logout());
    }
    else {
      dispatch(setIsLoader(false));
      _showMessage('An error has occurred.  Please try logging out and log back in. If the problem persists, please contact booklovershelp@gmail.com');
      _handleEmailError('Book Lovers Error Updating Profile Image', JSON.stringify(response));
    }
  }
  const _uploadS3 = async (image) => {
    dispatch(setIsLoader(true))
    const response = await s3Upload({
      key: "Profile.jpg",
      imageType: "Profile",
      base64String: image
    });
    if (response.success) {
      _updateProfileImage(response.data)
    }
    else if (response?.status === 401) {
      _showMessage('Your session has expired, please log back in.');
      dispatch(logout());
    }
    else {
      dispatch(setIsLoader(false))
      _showMessage('An error has occurred while retrieving your session.  Please log out and log back in.')
      _handleEmailError('Book Lovers Error: Uploading S3 profile Image', JSON.stringify(response))
    }
  }
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setIsVisible(!isVisible)
      setTimeout(() => {
        _uploadS3('data:image/jpeg;base64,' + image.data)
      }, 600);

    });
  }
  const imageFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(image => {
      setIsVisible(!isVisible)
      setTimeout(() => {
        dispatch(setIsLoader(true))
      }, 600);
      _uploadS3('data:image/jpeg;base64,' + image.data)
    });
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
        <TitleHeader title='Profile' isPrfileIcon onPress={() => navigation.navigate('Settings')} />
        <View style={styles.mainViewContainer}>
          <View style={styles.profileInfoContainer}>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              {user?.idToken?.userData?.ProfileImage ?
                <Image key={(new Date()).getTime()}
                  source={{ uri: GetProfilePath(user?.idToken?.userData?.ProfileImage) + '?time' + (new Date()).getTime(), headers: { Pragma: 'no-cache' } }}
                  resizeMode='cover' style={styles.profileImage} /> :
                <View style={styles.cameraButton}>
                  <AntDesign name='camera' size={width(10)} color={Colors.white} />
                </View>
              }
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{`${user?.idToken.payload?.given_name} ${user?.idToken.payload?.family_name}`}</Text>
              <View style={styles.commentsInfoContainer}>
                <View style={styles.commentsContainer}>
                  <Text style={styles.quantityText}>{user?.idToken?.userData?.CommentCount ? user?.idToken?.userData?.CommentCount : 0}</Text>
                  <Text style={styles.commentText}>Comments</Text>
                </View>
                <View style={styles.bookedOwns}>
                  <Text style={styles.quantityBookedText}>{user?.idToken?.userData?.BooksPurchasedCount ? user?.idToken?.userData?.BooksPurchasedCount : '0'}</Text>
                  <Text style={styles.commentText}>Books Owned</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lineView} />
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1}
            onPress={() => navigation.navigate('MyLibrary')}
          >
            <View style={styles.iconContainer}>
              <Feather name='download' size={totalSize(2.25)} color={Colors.white} />
            </View>
            <Text style={styles.buttonText}>My Library</Text>
            <Feather name='chevron-right' size={width(7)} color={Colors.appIconColor2} />
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1}
            onPress={() => navigation.navigate('ProfileUpdate')}
          >
            <View style={styles.iconContainer}>
              <Entypo name='user' size={totalSize(2.25)} color={Colors.white} />
            </View>
            <Text style={styles.buttonText}>Profile Details</Text>
            <Feather name='chevron-right' size={width(7)} color={Colors.appIconColor2} />
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => navigation.navigate('MyBookShelf')}
          >
            <View style={styles.iconContainer}>
              <AntDesign name='copy1' size={totalSize(2.25)} color={Colors.white} />
            </View>
            <Text style={styles.buttonText}>My Bookshelf</Text>
            <Feather name='chevron-right' size={width(7)} color={Colors.appIconColor2} />
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
      </SafeAreaView>
      <ImagePickerModal isVisible={isVisible}
        onClose={() => setIsVisible(!isVisible)}
        imageFromGallery={uploadImage}
        imageFromCamera={imageFromCamera}
      />
      <SafeAreaView style={{ backgroundColor: Colors.green }} />
    </Fragment>
  );
}
