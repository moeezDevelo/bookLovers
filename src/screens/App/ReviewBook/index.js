import React, { Fragment, useState, createRef } from 'react';
import { View, Text, StatusBar, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { height } from 'react-native-dimension';
import { Button } from '../../../components/Button/index';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { useDispatch } from 'react-redux';
import { reviewBook } from '../../../utills/ApiFunctions';
import Rating from '../../../components/Rating';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function ReviewBook({ navigation, route }) {
  const item = route?.params?.item;
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch();
  const reviewRef = createRef(null)
  const [review, setReview] = useState('');
  const [headLine, setHeadLine] = useState('')
  const _showMessage = (description) => {
    showMessage({
      message: 'Error',
      description: description,
      type: 'danger',
      duration: 8000
    });
  }
  const _addReview = async () => {
    if (review != '' && rating > 0) {
      dispatch(setButtonLoader(true))
      const response = await reviewBook({
        BookId: item.BookId,
        Comments: review,
        Rating: rating
      });
      if (response?.success) {
        dispatch(setButtonLoader(false))
        navigation.goBack()
      }
      else if (response?.status === 401) {
        _showMessage('Your session has expired, please log back in.');
        dispatch(logout());
        }
      else {
        dispatch(setButtonLoader(false))
        _showMessage(response?.message ?? 'Review and a rating are required.',)
        handleEmailError({
          Subject: 'Book Lovers Error: Add Review',
          Message: JSON.stringify(response)
        })
      }
    }
    else {
      dispatch(setButtonLoader(false))
      _showMessage(response?.message ?? 'Review and a rating are required.')
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
        <Header title='Review Book Title' isBack containerStyles={styles.containerStyles}
          textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
        <View style={styles.mainViewContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraScrollHeight={height(8)}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.bookInfoContainer}>
              <Text style={styles.bookTitleText}>{item?.BookDetails?.BookTitle}</Text>
              <Text style={styles.authorNameText}>{`By ${item?.BookDetails?.BookAuthor}`}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Rating</Text>
                <Rating
                  ratingCount={5}
                  rating={rating}
                  onChangeRating={rating => setRating(rating)}
                  RenderSelectedRatingComponent={() => <Entypo name="star" size={18} color={Colors.appColor1} />}
                  RenderUnselectedRatingComponent={() => <EvilIcons name="star" size={18} color={Colors.appIconColor1} />}
                />
              </View>
              <View style={styles.textFieldContainer}>
                <Text style={styles.textInputHeading}>Enter a headline for your review</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder={'Enter title'}
                    placeholderTextColor={Colors.appTextColor1}
                    autoCapitalize='none'
                    onSubmitEditing={() => reviewRef.current.focus()}
                    style={styles.textInput}
                    onChangeText={setHeadLine}
                    returnKeyType='next'
                  />
                </View>
                <Text style={styles.textInputHeading}>Review</Text>
                <View style={[styles.textInputContainer, { height: height(12) }]}>
                  <TextInput
                    placeholder={'Enter review'}
                    placeholderTextColor={Colors.appTextColor1}
                    autoCapitalize='none'
                    multiline={true}
                    onChangeText={setReview}
                    ref={reviewRef}
                    style={[styles.textInput, { height: height(10) }]}
                    returnKeyType='done'
                    blurOnSubmit
                  />
                </View>
              </View>
              <Button title='SUBMIT' containerStyles={styles.submitButton} onPress={_addReview} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>

      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}
