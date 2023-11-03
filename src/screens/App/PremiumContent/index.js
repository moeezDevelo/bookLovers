import React, { Fragment, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { totalSize } from 'react-native-dimension';
import { Button } from '../../../components/Button/index';
import { setButtonLoader } from '../../../Redux/Actions/config';
import * as RNIap from 'react-native-iap';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
const productIds = Platform.select({
  ios: ['booklovers_monthly_membership'],
  android: ['booklovers_monthly_membership'],
});
export default function EditorNote({ navigation }) {
  const dispatch = useDispatch();
  const _requestSubscription = async () => {
    dispatch(setButtonLoader(true));
    await RNIap.initConnection()
    try {
      const products = await RNIap.getSubscriptions(productIds)
      await RNIap.requestPurchase(productIds[0]);
      dispatch(setButtonLoader(false));
      navigation.navigate('Home');
    }
    catch (err) {
      dispatch(setButtonLoader(false));
      if (err.code != 'E_USER_CANCELLED')
      {
        showMessage({
          message: 'Error',
          description: 'Your session has expired.  Please log back in.',
          type: 'danger',
          duration: 8000
        }); // standardized err.code and err.message available

        dispatch(logout());
      }
      handleEmailError({
        Subject: 'Book Lovers Error: Requesting Subscription',
        Message: JSON.stringify(err)
      })
    }
    RNIap.endConnection();
  };
  useEffect(() => {
    navigation.addListener('blur', () => {
      dispatch(setButtonLoader(false))
    })
    return () => {
      navigation.removeListener('blur')
    }
  }, [navigation])
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <Header
          title="Premium Content"
          containerStyles={styles.containerStyles}
          isBack
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainViewContainer}>
          <Image
            source={{
              uri:
                'https://d1ycdk7bmtnujf.cloudfront.net/400x400/BookLovers/AppContent/650770cf-76db-4edd-a8ae-0505f35871e1/1126fee0-7dab-11eb-bd21-27901f7ee95c.jpg',
            }}
            resizeMode="cover"
            style={styles.coverImage}
          />
          <View style={styles.headingContainer}>
            <MaterialCommunityIcons name="diamond" size={totalSize(3)} color={Colors.appColor9} />
            <Text style={styles.premiumContentText}>Premium Content</Text>
          </View>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>In order to view this content you must be a premium subscriber.  For only <Text style={styles.priceText}>$9.99/month,</Text> you will instantly receive huge discounts on all books, and access to Discussion Topics with Ashley Antoinette, Story Time, and much more!</Text>
          </View>
          <Button
            title="UPGRADE MEMBERSHIP"
            containerStyles={styles.updateButton}
            onPress={_requestSubscription}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.green }} />
    </Fragment>
  );
}
