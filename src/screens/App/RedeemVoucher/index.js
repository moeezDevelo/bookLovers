import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, TextInput, Image, Alert } from 'react-native';
import styles from './styles';
import { CartHeader } from '../../../components/Headers/index';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { height } from 'react-native-dimension';
import { GetImagePath } from '../../../utills/Methods';
import { useVoucher } from '../../../utills/ApiFunctions';
import { useDispatch } from 'react-redux';
import { setButtonLoader } from '../../../Redux/Actions/config';
import * as RNIap from 'react-native-iap';
const productIds = Platform.select({
    ios: [
        'com.example.coins100'
    ],
    android: [
        'com.example.coins100'
    ]
});
export default function RedeemVoucher({ navigation, route }) {
    const item = route?.params?.item;
    const dispatch = useDispatch();
    const size = `500x500`;
    const [voucher, setVoucher] = useState('')
    const _useVoucher = async () => {
        if (voucher != '') {
            dispatch(setButtonLoader(true))
            const response = await useVoucher(voucher)
            if (response?.success) {
                dispatch(setButtonLoader(false))
                navigation.goBack()
            }
            else {
                dispatch(setButtonLoader(false))
                setTimeout(() => {
                    Alert.alert("Alert", response)
                }, 600);
            }
        }
        else {
            Alert.alert("Alert", `Voucher can't be Null`)
        }
    }
    const _inAppPPurchases = async () => {
        const products = await RNIap.getProducts(productIds);
        // await RNIap.requestPurchase(itemSkus[0], false);
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
                <CartHeader onPress={() => navigation.goBack()} />
                <View style={styles.mainViewContainer}>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        extraScrollHeight={height(8)}
                        keyboardShouldPersistTaps='handled'
                    >
                        <Image source={{ uri: GetImagePath(item?.BookCover, size) }} resizeMode='cover' style={styles.itemImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemNameText}>{item.bookTitle}</Text>
                            <Text style={styles.authorNameText}>{`By: ${item.BookAuthor}`}</Text>
                            <Text style={styles.congratulationsText}>Congratulations on purchasing the exclusive pack for this book! Enter your voucher code below to access the book.</Text>
                        </View>
                        <View style={styles.voucherTextInputContainer}>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder={'Voucher code'}
                                    placeholderTextColor={Colors.appTextColor11}
                                    autoCapitalize='none'
                                    returnKeyType={'done'}
                                    value={voucher}
                                    onChangeText={(val) => setVoucher(val)}
                                    style={styles.textInput}
                                />
                            </View>
                            <Button title='REDEEM' containerStyles={styles.redeemButton}
                                textStyle={styles.redeemText} onPress={_inAppPPurchases}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
