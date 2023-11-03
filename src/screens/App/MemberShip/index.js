import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, Platform, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import * as RNIap from 'react-native-iap';
import { setIsLoader, setButtonLoader } from '../../../Redux/Actions/config'
import { Button } from '../../../components/Button';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
const productIds = Platform.select({
    ios: ['booklovers_monthly_membership'],
    android: ['booklovers_monthly_membership'],
});
export default function Membership({ navigation }) {
    const dispatch = useDispatch()
    const benefits = [
        'Discounted book prices',
        'Access to community discussions',
        'Short stories written by Ashley Antoinette',
        'Author spotlights & free books',
        'Exclusive alternate book endings to your favorite books.'
    ]
    const user = useSelector((state) => state.Auth.user);
    const isLoader = useSelector((state) => state.config.isLoader);
    const [memberShip, setMemberShip] = useState(null)
    const _restorePurchases = async () => {
        dispatch(setIsLoader(true))
        try {
            await RNIap.initConnection();
            const books = await RNIap.getAvailablePurchases();
            const obj = books.find((item) => item?.productId == 'booklovers_monthly_membership')
            if (obj != 'undefined') {
                setMemberShip(obj)
                dispatch(setIsLoader(false))
            }
            else {
                setMemberShip(null)
                dispatch(setIsLoader(false))
            }
        } catch (err) {
            dispatch(setIsLoader(false))
            handleEmailError({
                Subject: 'MemberShip Restore purchases',
                Message: JSON.stringify(err)
            })
        }
    }
    const requestSubscription = async () => {
        try {
            dispatch(setButtonLoader(true));
            try {
                const products = await RNIap.getSubscriptions(productIds)
                await RNIap.requestSubscription(productIds[0], false);
            } catch (err) {
                dispatch(setButtonLoader(false));
                if (err.code != 'E_USER_CANCELLED') { console.warn(err.code) }; // standardized err.code and err.message available
            }
            dispatch(setButtonLoader(false));
        } catch (err) {
            dispatch(setButtonLoader(false));
            showMessage({
                message: 'Error',
                description: 'An error occurred while retrieving subscription information. If the error persists, please contact booklovershelp@gmail.com',
                type: 'danger',
                duration: 8000
            })
            handleEmailError({
                Subject: 'Book Lovers Error Retrieving Subscription Info',
                Message: JSON.stringify(err)
            })
        }
    };
    useEffect(() => {
        let mounted = true
        if (mounted && user?.idToken?.payload['custom:MembershipType'] === 'Premium') {
            _restorePurchases()
        }
        return () => mounted = false
    }, [])
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
                <Header title='Membership' isBack containerStyles={styles.containerStyles}
                    textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
                {!isLoader && <View style={styles.mainViewContainer}>
                    {user?.idToken?.payload['custom:MembershipType'] == 'Standard' ?
                        <View style={styles.textContainer}>
                            <Text style={styles.headingText}>YOUR MEMBERSHIP</Text>
                            <Text style={styles.freeStandardHeading}>Free Standard Membership</Text>
                            <Text style={styles.infoText}>Become a Premium Member and enjoy the following benefits:</Text>
                            {benefits.map((item, index) => {
                                return (
                                    <View key={index} style={styles.benefitsContainer}>
                                        <Text style={styles.staricText}>*</Text>
                                        <Text style={styles.benefitsText}>{item}</Text>
                                    </View>
                                )
                            })}
                            <Button title='Subscribe for $9.99 / month'
                                containerStyles={styles.updateButton}
                                onPress={requestSubscription}
                            />
                            <View style={styles.termsConditionContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('TermsConditions')} style={styles.button}>
                                    <Text style={styles.buttonText}>Terms of Service</Text>
                                </TouchableOpacity>
                                <Text style={styles.andText}>and</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Privacy')} style={styles.button}>
                                    <Text style={styles.buttonText}>Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={styles.textContainer}>
                            <Text style={styles.headingText}>YOUR MEMBERSHIP</Text>
                            <Text style={styles.freeStandardHeading}>{`Premium member since ${moment(memberShip?.transactionDate).format('MMMM')}`}</Text>
                            <Text style={styles.infoText}>If you’d like to cancel your monthly subscription, please access your subscriptions from the App Store and cancel your subscription from there.</Text>
                            <Button
                                onPress={() => {
                                    Platform.OS === 'ios' ?
                                        Linking.openURL('https://apps.apple.com/account/subscriptions') :
                                        Linking.openURL(`https://play.google.com/store/account/subscriptions?package=com.booklovers&sku=booklovers_monthly_membership`)
                                }}
                                title='CANCEL MEMBERSHIP'
                            />
                        </View>
                    }
                </View>
                }
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}