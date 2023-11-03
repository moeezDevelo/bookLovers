import React, { Fragment, createRef, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, Alert } from 'react-native';
import styles from './styles';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import logoImage from '../../../assets/Auth/logoImage.png';
import { height } from 'react-native-dimension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import TextInputField from '../../../components/TextInput/index';
import { signUp } from '../../../utills/ApiFunctions';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
export default function SignUpConfirm({ navigation, route }) {
    const codeRef = createRef(null)
    const dispatch = useDispatch();
    const Username = route?.params?.Username;
    const [ConfirmationCode, setConfirmationCode] = useState('')
    const _signUpConfirm = async () => {
        dispatch(setButtonLoader(true))
        const response = await signUp({
            ConfirmationCode: ConfirmationCode.trim(),
            type: "confirmSignUp",
            Username: Username.trim(),
        });
        if (response?.success) {
            dispatch(setButtonLoader(false))
            navigation.navigate('Login')
        } else {
            dispatch(setButtonLoader(false))
            showMessage({
                message: 'Error',
                description: 'Code is Wrong',
                type: 'danger',
                duration: 8000
            });
        }
    }
    return (
        <Fragment>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView
                style={(styles.container, { backgroundColor: Colors.white })}
            />
            <SafeAreaView style={styles.container}>
                <Header onPress={() => navigation.navigate('Welcome')} />
                <View style={styles.mainViewContainer}>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        extraScrollHeight={height(8)}
                        keyboardShouldPersistTaps='handled'
                    >
                        <Image source={logoImage} resizeMode='contain' style={styles.logoImage} />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>You got Mail!</Text>
                            <Text style={styles.infoText}>We've sent a verification code to verify your email. If you don't see our email in your inbox, please check your spam folder.</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputHeading}>Your Email</Text>
                            <TextInputField placeHolder='Enter email' onSubmit={() => codeRef.current.focus()} keytype='next'
                                editable={true} value={Username}
                            />
                            <Text style={styles.textInputHeading}>Verification Code</Text>
                            <TextInputField placeHolder='Enter code' ref={codeRef} keytype='done' keyboardType='numeric'
                                onChangeText={(val) => setConfirmationCode(val)}
                            />
                        </View>
                        <Button title='CONFIRM EMAIL' containerStyles={styles.confirmButton}
                            onPress={_signUpConfirm} disabled={ConfirmationCode == ''} />
                    </KeyboardAwareScrollView>
                </View>

            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}