import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Switch } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { editProfile } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function Notifications({ navigation }) {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const [isPushNotifactions, setIsPushNotifactions] = useState(user?.idToken?.userData?.PushNotifications ?? false);
    const [emialNotifactions, setEmialNotifactions] = useState(user?.idToken?.userData?.EmailNotifications ?? false);
    const _pushNotifications = () => {
        _updateNotifications(emialNotifactions, !isPushNotifactions)
        setIsPushNotifactions(previousState => !previousState)
    };
    const _emailNotifications = () => {
        _updateNotifications(!emialNotifactions, isPushNotifactions)
        setEmialNotifactions(previousState => !previousState)
    };
    const _updateNotifications = async (email, push) => {
        const response = await editProfile({
            EmailNotifications: email,
            PushNotifications: push
        })
        if (response?.success) {
            let newUser = { ...user }
            newUser.idToken.userData.EmailNotifications = email
            newUser.idToken.userData.PushNotifications = push
            dispatch(login(newUser))
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
            showMessage({
                message: 'Error',
                description: 'An error occurred while saving your preferences.  If the problem persists, please contact booklovershelp@gmail.com',
                type: 'danger',
                duration: 8000
            });
            handleEmailError({
                Subject: 'Book Lovers Error: Updating Notifications',
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
                <Header title='Notifications' isBack containerStyles={styles.containerStyles}
                    textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
                <View style={styles.mainViewContainer}>
                    <View style={styles.notificationsContainer}>
                        <Text style={styles.notifcationText}>Push notifications</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.appColor1 }}
                            thumbColor={isPushNotifactions ? Colors.white : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={_pushNotifications}
                            value={isPushNotifactions}
                        />
                    </View>
                    <View style={styles.line} />
                    <View style={styles.notificationsContainer}>
                        <Text style={styles.notifcationText}>Email notifications</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.appColor1 }}
                            thumbColor={emialNotifactions ? Colors.white : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={_emailNotifications}
                            value={emialNotifactions}
                        />
                    </View>
                    <View style={styles.line} />
                </View>

            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
