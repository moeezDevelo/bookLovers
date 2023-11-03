import React, { Fragment, useState, } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import styles from './styles';
import { useDispatch } from 'react-redux';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { totalSize } from 'react-native-dimension';
import { Button, SettingComponent } from '../../../components/Button';
import { logout } from '../../../Redux/Actions/Auth';
import * as RNIap from 'react-native-iap';
import { restorePurchasedBooks } from '../../../utills/ApiFunctions';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
export default function Settings({ navigation }) {
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();
  const _showMessage = (description, type = 'danger') => {
    showMessage({
      message: 'Error',
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
  const _restorePurchases = async () => {
    try {
      setLoader(true)
      await RNIap.initConnection();
      const books = await RNIap.getAvailablePurchases();
      if (books.length > 0) {
        const response = await restorePurchasedBooks(books)
        if (response?.success) {
          setLoader(false)
          showMessage({
            message: 'Restore Purchase',
            description: 'Your purchases have been restored.',
            type: 'success',
            duration: 8000
          });
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
          setLoader(false)
          _showMessage('An error has occurred while retrieving your session.  Please log out and log back in.')
          _handleEmailError('Book Lovers Error: Restore Purchases Books', JSON.stringify(response))
        }
      }
      else {
        setLoader(false)
        _showMessage('You currently do not have any purchases to restore.')
      }
      setLoader(false)
      RNIap.endConnection()
    } catch (error) {
      _showMessage('An error occurred while retrieving your purchases.  If the problem persists, please contact booklovershelp@gmail.com')
      _handleEmailError('Book Lover Error: Restore Purchases From store', JSON.stringify(error))
      setLoader(false)
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
        <Header title='Settings' isBack containerStyles={styles.containerStyles}
          textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
        <View style={styles.mainViewContainer}>
          <SettingComponent title='Notifications' onPress={() => navigation.navigate('Notifications')}
            Icon={<Fontisto name='bell-alt' size={totalSize(2)} color={Colors.white} />} />
          <SettingComponent title='Privacy' onPress={() => navigation.navigate('Privacy')}
            Icon={<Fontisto name='locked' size={totalSize(2)} color={Colors.white} />} />
          <SettingComponent title={`Terms & conditions`} onPress={() => navigation.navigate('TermsConditions')}
            Icon={<MaterialCommunityIcons name='clipboard-check-multiple' size={totalSize(2)} color={Colors.white} />} />
          <SettingComponent title={`About`} onPress={() => navigation.navigate('About')}
            Icon={<Fontisto name='info' size={totalSize(2)} color={Colors.white} />} />
          <SettingComponent title={`Membership`} onPress={() => navigation.navigate('MemberShip')}
            Icon={<Entypo name='users' size={totalSize(2)} color={Colors.white} />} />
        </View>
        <Button title='RESTORE PURCHASES' containerStyles={styles.logoutButton}
          buttonLoader={loader}
          onPress={_restorePurchases}
        />
        <Button title='LOG OUT' containerStyles={styles.logoutButton}
          onPress={() => dispatch(logout())}
        />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}