import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Image, Linking, Platform } from 'react-native';
import styles from './styles';
import { CartHeader } from '../../../components/Headers/index';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import ReadMore from 'react-native-read-more-text';
import { GetImagePath } from '../../../utills/Methods';
import { getReviews } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setBookDetail } from '../../../Redux/Actions/config'
import { setButtonLoader } from '../../../Redux/Actions/config';
import * as RNIap from 'react-native-iap';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import { width } from 'react-native-dimension';
import { purchasedBook } from '../../../utills/ApiFunctions';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function BookDetails({ navigation, route }) {
  window.purchaseUpdateSubscription = null;
  window.purchaseErrorSubscription = null;
  const size = `300x450`;
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const user = useSelector(state => state.Auth.user)
  const isExclusive = route?.params?.isExclusive;
  const [bookReviews, setBookReviews] = useState([]);
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
  const productIds = Platform.select({
    ios: [
      user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? item?.NonSubscriberAppStoreId?.toString() : item?.SubscriberAppStoreId?.toString()
    ],
    android: [
      user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? item?.NonSubscriberAppStoreId.toString() : item?.SubscriberAppStoreId?.toString()
    ]
  });
  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.seeText} onPress={handlePress}>Read more ...</Text>
    );
  };
  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.seeText} onPress={handlePress}>Read less ...</Text>
    );
  };
  const _getReviews = async () => {
    const response = await getReviews(item.Id);
    if (response?.success) {
      setBookReviews(response.data);
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
      _showMessage('An error occurred while retrieving reviews.  If the problem persists, please contact booklovershelp@gmail.com.')
      _handleEmailError('Reviews', JSON.stringify(response))
    }
  };
  const _purchaseBook = async () => {
    dispatch(setButtonLoader(true))
    const response = await purchasedBook({
      productId: item.Id,
      Platform: Platform.OS == 'android' ? 'AndroidPremiumUser' : 'IOSPremiumUser'
    },
      Platform.OS.toUpperCase()
    );
    if (response.success) {
      dispatch(setButtonLoader(false))
      _showMessage('This book has been added to your library.', 'Success', 'success')
      navigation.goBack()
    }
    else {
      _showMessage((typeof response == 'string' && response.includes('Book Already Purchased')) ? response : 'An error occurred while purchasing book.  If the problem persists, please contact booklovershelp@gmail.com.')
      dispatch(setButtonLoader(false));
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      dispatch(setBookDetail({
        BookType: item?.BookType,
        Id: item.Id
      }))
    }
    return () => mounted = false
  }, [])
  useEffect(() => {
    navigation.addListener('blur', () => {
      dispatch(setButtonLoader(false))
    })
    return () => {
      navigation.removeListener('blur')
    }

  }, [navigation])
  const requestPurchase = async () => {
    dispatch(setButtonLoader(true))
    RNIap.initConnection()
    try {
      const products = await RNIap.getProducts(productIds)
      await RNIap.requestPurchase(productIds[0], false);
      dispatch(setButtonLoader(false))
      navigation.goBack()
    } catch (err) {
      dispatch(setButtonLoader(false))
      if (err.code != 'E_USER_CANCELLED') {
        console.warn(err.code);
        _handleEmailError('Request Purchase', JSON.stringify(err))
      } // standardized err.code and err.message available
    }
    RNIap.endConnection();
  };
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getReviews();
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
        <CartHeader onPress={() => {
          navigation.goBack()
        }} />
        <View style={styles.mainViewContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <Image
              source={{ uri: GetImagePath(item?.BookCover, size) }}
              resizeMode='contain'
              style={styles.itemImage}
            />
            <View style={styles.namePriceContainer}>
              <Text style={styles.itemNameText}>{item?.BookTitle}</Text>
              <View style={styles.priceContainer}>
                {isExclusive ? (
                  <Text style={styles.exclusiveText}>Exclusive</Text>
                ) : (
                  <Text
                    style={
                      styles.priceText
                    }>{`$${user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? item?.nonSubscriberPrice : item?.subscriberPrice}`}</Text>
                )}
              </View>
            </View>
            <View style={styles.authorNameContainer}>
              <Text
                style={styles.authorNameText}>{`By: ${item?.BookAuthor}`}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.totalReviewsContainer}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://www.thebooklovers.co/') }} >
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={width(4)}
                    fullStarColor={Colors.appColor1}
                    emptyStarColor={Colors.appColor1}
                    containerStyle={{ justifyContent: 'flex-start' }}
                    rating={item?.TotalRatings ? (item?.TotalRatings / item?.TotalRatingUsers) : 0}
                    starStyle={{ marginRight: width(1) }}
                  />
                </TouchableOpacity>
                <Text style={styles.totalReviewsText}>
                  {item?.totalReviews}
                </Text>
              </View>
              {item?.aduioTime && (
                <Text style={styles.audioTime}>{item?.aduioTime}</Text>
              )}
            </View>
            {isExclusive ? <Button
              title={'REDEEM VOUCHER'}
              containerStyles={styles.addToCartButton}
              onPress={() => { navigation.navigate('RedeemVoucher', { item: item }) }}
            /> :
              <Button
                title={item?.UserHasPurchasedBook ? 'Purchased' : 'Purchase Book'}
                disabled={item?.UserHasPurchasedBook}
                containerStyles={styles.addToCartButton}
                onPress={() => (item?.IsAuthorSpotlightBook || (Number(item?.subscriberPrice) == 0 && user?.idToken?.payload['custom:MembershipType'] === 'Premium')) ? _purchaseBook() : requestPurchase()}
              />
            }
            <View style={styles.summaryContainer}>
              <Text style={styles.headingText}>Summary</Text>
              <Text style={styles.summaryText}>{item?.BookDescription}</Text>
            </View>
            <View style={styles.reviewsContainer}>
              <Text style={styles.headingText}>Reviews</Text>
              {bookReviews.length > 0 ? (
                bookReviews.map((reviews, index) => (
                  <View key={index.toString()}>
                    <View style={styles.reviewerNameContainer}>
                      <Text style={styles.reviwerNameText}>
                        {reviews?.commentarName
                          ? reviews?.commentarName
                          : 'Anonymous'}
                      </Text>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        starSize={width(4)}
                        fullStarColor={Colors.appColor1}
                        emptyStarColor={Colors.appColor1}
                        containerStyle={{ justifyContent: 'flex-start' }}
                        rating={reviews.Rating ?? 0}
                        starStyle={{ marginRight: width(1) }}
                      />
                    </View>
                    <ReadMore
                      numberOfLines={2}
                      renderTruncatedFooter={_renderTruncatedFooter}
                      renderRevealedFooter={_renderRevealedFooter}>
                      <Text style={styles.commentText}>
                        {reviews?.Comments}
                      </Text>
                    </ReadMore>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No Reviews</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}
