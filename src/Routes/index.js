import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//-----------------------------------Auth Screens-----------------------------------
import Welcome from '../screens/Auth/Welcome';
import OnBoarding from '../screens/Auth/OnBoarding';
import SignUp from '../screens/Auth/SignUp';
import SignUpConfirm from '../screens/Auth/SignUpConfirm';
import Login from '../screens/Auth/Login';
import ResetPassword from '../screens/Auth/ResetPassword';
import VerifyEmail from '../screens/Auth/VerifyEmail';
import ResetConfirmPassword from '../screens/Auth/ResetConfirmPassword';
//-----------------------------------Explore Screens-----------------------------------
import ExploreTab from './ExploreTab/ExploreTab';

//-----------------------------------App Screens--------------------------------
import Menu from '../screens/App/Menu';
import DiscussionForumComment from '../screens/App/DiscussionForumComment';
import Settings from '../screens/App/Settings';
import Notifications from '../screens/App/Notifications';
import MyLibrary from '../screens/App/MyLibrary';
import ReviewBook from '../screens/App/ReviewBook';
import AudioBookPlayer from '../screens/App/AudioBookPlayer';
import PdfViewer from '../screens/App/PdfViewer';
import ProfileUpdate from '../screens/App/ProfileUpdate';
import MyBookShelf from '../screens/App/MyBookShelf';
import AddBookToBookShelf from '../screens/App/AddBookToBookShelf';
import Replies from '../screens/App/Replies';
import About from '../screens/App/About';
import Privacy from '../screens/App/Privacy';
import TermsConditions from '../screens/App/TermsConditions';
import ReportLists from '../screens/App/ReportLists';
import Report from '../screens/App/Report';
import MemberShip from '../screens/App/MemberShip';
import HomeTab from './HomeTab/HomeTab';
import {useSelector, useDispatch} from 'react-redux';
import {LoaderModal} from '../components/Modals/index';
import {setButtonLoader} from '../Redux/Actions/config';
import {login, logout} from '../Redux/Actions/Auth';
import {
  purchasedBook,
  premiumContent,
  syncPurchasedBooks,
  refreshToken,
} from '../utills/ApiFunctions';
import * as RNIap from 'react-native-iap';
import RNBootSplash from 'react-native-bootsplash';
import {purchaseErrorListener, purchaseUpdatedListener} from 'react-native-iap';
import {Platform, AppState} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {handleNotificationToken} from '../utills/GlobalFunction';
import messaging from '@react-native-firebase/messaging';
import {notificationTypes} from '../utills/Enums';
import {setNotificationType} from '../Redux/Actions/Notification';
import EpubViewer from '../screens/App/EpubViewer';
const Stack = createStackNavigator();
export default function Routes() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const isExplore = useSelector((state) => state.config.isExplore);
  const user = useSelector((state) => state.Auth.user);
  const appState = useRef(AppState.currentState);
  const isLoginRef = useRef(isLogin);
  const bookDetails = useSelector((state) => state.config.bookDetails);
  const [refreshLoginToken, setRefresLoginToken] = useState(false);
  const _showMessage = (description, message = 'Error', type = 'danger') => {
    showMessage({
      message: message,
      description: description,
      type: type,
      duration: 8000,
    });
  };
  const _syncPurchases = async (bookIds) => {
    const response = await syncPurchasedBooks(
      bookIds,
      Platform.OS === 'android' ? 'Android' : 'IOS',
    );
    if (response?.success) {
    } else {
      console.log(
        'error:',
        response?.message ??
          'Communication error.  Please log out and log back in.',
      );
    }
  };
  const _syncMemberShip = async (memberShipType) => {
    const response = await premiumContent({
      MembershipType: memberShipType,
    });
    if (response?.success) {
      let newUser = {...user};
      newUser.idToken.payload['custom:MembershipType'] = memberShipType;
      dispatch(login(newUser));
    } else {
      console.log('something went wrong');
    }
  };
  const _purchaseHistory = async () => {
    try {
      await RNIap.initConnection();
      const books = await RNIap.getAvailablePurchases();
      if (books.length > 0) {
        let bookIds = [];
        let memberShip = '';
        books.map((item) => {
          if (item?.productId != 'booklovers_monthly_membership') {
            productID = item?.productId.replace('_n', '');
            productID = productID.split('_').join('-');
            bookIds.push(productID);
          } else if (
            memberShip == '' &&
            item?.productId.includes('membership')
          ) {
            memberShip = item?.productId;
          }
        });
        if (Platform.OS == 'ios') {
          if (
            memberShip != '' &&
            user?.idToken?.payload['custom:MembershipType'] === 'Standard'
          ) {
            _syncMemberShip('Premium');
          } else if (
            memberShip == '' &&
            user?.idToken?.payload['custom:MembershipType'] === 'Premium'
          ) {
            _syncMemberShip('Standard');
          }
        }
        await _syncPurchases(bookIds);
      }
      RNIap.endConnection();
    } catch (error) {}
  };
  const _refreshToken = async () => {
    const response = await refreshToken();
    setRefresLoginToken(true);
    RNBootSplash.hide();
    if (!response?.success) {
      dispatch(logout());
      _showMessage('Your session has expired, please log back in');
    }
  };
  useEffect(() => {
    isLoginRef.current = isLogin;
    let mounted = true;
    if (mounted && isLogin) {
      _purchaseHistory();
      handleNotificationToken();
      _refreshToken();
    } else RNBootSplash.hide();
    return () => (mounted = false);
  }, [isLogin]);
  useEffect(() => {
    const appListner = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (isLoginRef.current) _refreshToken();
      }
      appState.current = nextAppState;
    });
    return appListner?.remove;
  }, []);
  useEffect(() => {
    if (isLogin) {
      RNIap.initConnection().then(() => {
        RNIap.flushFailedPurchasesCachedAsPendingAndroid()
          .catch((error) => {
            console.log(error);
          })
          .then((ress) => {
            window.purchaseUpdateSubscription = purchaseUpdatedListener(
              async (purchase) => {
                let productId = '';
                let receipt =
                  Platform.OS === 'ios'
                    ? purchase
                    : purchase.transactionReceipt;
                if (typeof receipt === 'string') {
                  productId = JSON.parse(receipt).productId;
                } else {
                  productId = receipt.productId;
                }
                if (receipt) {
                  if (productId == 'booklovers_monthly_membership') {
                    const response = await premiumContent({
                      MembershipType: 'Premium',
                    });
                    if (response?.success) {
                      await refreshToken();
                      setTimeout(() => {
                        let newUser = {...user};
                        newUser.idToken.payload['custom:MembershipType'] =
                          'Premium';
                        dispatch(login(newUser));
                      }, 5000);
                      await RNIap.finishTransaction(purchase, false)
                        .then(() =>
                          _showMessage(
                            'Success! Thank you for becoming a premium member',
                            'Success',
                            'success',
                          ),
                        )
                        .catch((err) => console.log(err?.message));
                    } else {
                      _showMessage(
                        'An error occurred while updating your membership. If you encounter issues accessing content, please email booklovershelp@gmail.com',
                      );
                    }
                  } else {
                    let data;
                    data = {
                      productId: productId,
                    };
                    const response = await purchasedBook(
                      data,
                      Platform.OS.toUpperCase(),
                    );
                    if (response?.success) {
                      let newUser = {...user};
                      if (typeof newUser.idToken.userData === 'undefined') {
                        const userObj = {
                          ...newUser,
                          idToken: {
                            ...newUser.idToken,
                            userData: {
                              BooksPurchasedCount: 1,
                            },
                          },
                        };
                        dispatch(login(userObj));
                      } else {
                        newUser.idToken.userData.BooksPurchasedCount =
                          newUser.idToken.userData.BooksPurchasedCount + 1;
                        dispatch(login(newUser));
                      }
                      _showMessage(
                        'Success!  Please note that you will not see the book in your library until the Play Store fully approves your purchase',
                        'Success',
                        'success',
                      );
                      await RNIap.finishTransaction(purchase, false);
                    } else if (typeof response == 'string') {
                      await RNIap.finishTransaction(purchase, false);
                    } else {
                      console.log(response, 'error');
                    }
                  }
                  dispatch(setButtonLoader(false));
                }
              },
            );
            window.purchaseErrorSubscription = purchaseErrorListener(
              (error) => {
                console.warn('purchaseErrorListener', error);
                dispatch(setButtonLoader(false));
              },
            );
          });
      });
    } else {
      if (window.purchaseUpdateSubscription) {
        window.purchaseUpdateSubscription.remove();
        window.purchaseUpdateSubscription = null;
      }
      if (window.purchaseErrorSubscription) {
        window.purchaseErrorSubscription.remove();
        window.purchaseErrorSubscription = null;
      }
    }
    return () => {
      if (window.purchaseUpdateSubscription) {
        window.purchaseUpdateSubscription.remove();
        window.purchaseUpdateSubscription = null;
      }
      if (window.purchaseErrorSubscription) {
        window.purchaseErrorSubscription.remove();
        window.purchaseErrorSubscription = null;
      }
      RNIap.endConnection();
    };
  }, [isLogin, bookDetails]);
  const _notificationHandler = (Event) => {
    if (Event?.event == notificationTypes.EDITORNOTES) {
      dispatch(setNotificationType({notification: 'EditorNotesTab'}));
    } else if (Event?.event == notificationTypes.NEWBOOK) {
      dispatch(setNotificationType({notification: 'StoreTab'}));
    } else if (Event?.event == notificationTypes.DISCUSSIONTOPIC) {
      dispatch(setNotificationType({notification: 'DiscussionForum'}));
    } else if (Event?.event == notificationTypes.STORYTIME) {
      dispatch(setNotificationType({notification: 'StoryTimeTab'}));
    } else if (Event?.event == notificationTypes.COMMENTREPLY) {
      dispatch(
        setNotificationType({
          notification: 'Replies',
          commentDetails: {Id: Event?.commentId, topicId: Event?.topicId},
        }),
      );
    }
  };
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        _notificationHandler(remoteMessage?.data);
      },
    );
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          _notificationHandler(remoteMessage?.data);
          dispatch(setNotificationType({notification: ''}));
        }
      });
    return () => {
      unsubscribe;
      dispatch(setNotificationType({notification: ''}));
    };
  }, []);
  return (
    <NavigationContainer>
      <LoaderModal />
      {isExplore ? (
        <Stack.Navigator initialRouteName="" headerMode="none">
          <Stack.Screen name="Home" component={ExploreTab} />
          <Stack.Screen name="Store" component={ExploreTab} />
        </Stack.Navigator>
      ) : !isLogin ? (
        <Stack.Navigator initialRouteName="Welcome" headerMode="none">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpConfirm" component={SignUpConfirm} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen
            name="ResetConfirmPassword"
            component={ResetConfirmPassword}
          />
          <Stack.Screen name="TermsConditions" component={TermsConditions} />
        </Stack.Navigator>
      ) : (
        isLogin &&
        user != {} &&
        refreshLoginToken && (
          <Stack.Navigator initialRouteName="" headerMode="none">
            <Stack.Screen name="Home" component={HomeTab} />
            <Stack.Screen name="Store" component={HomeTab} />
            <Stack.Screen name="StoryTime" component={HomeTab} />
            <Stack.Screen name="EditorNotes" component={HomeTab} />
            <Stack.Screen name="Profile" component={HomeTab} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen
              name="DiscussionForumComment"
              component={DiscussionForumComment}
            />
            <Stack.Screen name="Replies" component={Replies} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="MyLibrary" component={MyLibrary} />
            <Stack.Screen name="ReviewBook" component={ReviewBook} />
            <Stack.Screen name="AudioBookPlayer" component={AudioBookPlayer} />
            <Stack.Screen name="PdfViewer" component={PdfViewer} />
            <Stack.Screen name="EpubViewer" component={EpubViewer} />
            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Stack.Screen name="MyBookShelf" component={MyBookShelf} />
            <Stack.Screen
              name="AddBookToBookShelf"
              component={AddBookToBookShelf}
            />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="ReportLists" component={ReportLists} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="MemberShip" component={MemberShip} />
          </Stack.Navigator>
        )
      )}
    </NavigationContainer>
  );
}
