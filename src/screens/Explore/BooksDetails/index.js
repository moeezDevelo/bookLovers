import React, { Fragment, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import styles from './styles';
import { CartHeader } from '../../../components/Headers/index';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import ReadMore from 'react-native-read-more-text';
import { GetImagePath } from '../../../utills/Methods';
import { getReviews } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/Actions/Auth';
import { setBookDetail } from '../../../Redux/Actions/config'
import { setButtonLoader } from '../../../Redux/Actions/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import { width } from 'react-native-dimension';
import { purchasedBook } from '../../../utills/ApiFunctions';
import { LogInModal } from '../../../components/Modals'
export default function BookDetails({ navigation, route }) {
  window.purchaseUpdateSubscription = null;
  window.purchaseErrorSubscription = null;
  const size = `300x450`;
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const user = useSelector(state => state.Auth.user)
  const isExclusive = route?.params?.isExclusive;
  const [bookReviews, setBookReviews] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.seeText} onPress={handlePress}>
        Read more ...
      </Text>
    );
  };
  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.seeText} onPress={handlePress}>
        Read less ...
      </Text>
    );
  };
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <CartHeader onPress={() => {
          dispatch(setBookDetail({}))
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
              onPress={() => setIsVisible(true)}
            /> :
              <Button
                title={'Purchase Book'}
                containerStyles={styles.addToCartButton}
                onPress={() => setIsVisible(true)}
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
      <LogInModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </Fragment>
  );
}