import React, { Fragment, createRef, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image } from 'react-native';
import styles from './styles';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import logoImage from '../../../assets/Auth/logoImage.png';
import { height } from 'react-native-dimension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import TextInputField from '../../../components/TextInput/index';
import { setNewPassword } from '../../../utills/ApiFunctions';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
export default function ResetConfirmPassword({ navigation, route }) {
    const passwordRef = createRef(null)
    const dispatch = useDispatch();
    const codeRef = createRef(null)
    const Username = route?.params?.Username;
    const [ConfirmationCode, setConfirmationCode] = useState('')
    const [Password, setPassword] = useState('')
    const _resetPassword = async () => {
        dispatch(setButtonLoader(true))
        const response = await setNewPassword({
            Username: Username.trim(),
            newPassword: Password.trim(),
            verificationCode: ConfirmationCode.trim()
        });
        if (response?.success) {
            dispatch(setButtonLoader(false))
            navigation.navigate('Login')
        } else {
            dispatch(setButtonLoader(false))
            showMessage({
                message: 'Error',
                description: response?.message ?? 'Enter Valid email',
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
                            <Text style={styles.headingText}>We just sent you a verification code</Text>
                            <Text style={styles.infoText}>We've sent a verification code to your email. If you don't see our email in your inbox, don't forget to check your spam folder.</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputHeading}>Your Email</Text>
                            <TextInputField placeHolder='Enter email' value={Username} onSubmit={() => codeRef.current.focus()}
                                keytype='next'
                            />
                            <Text style={styles.textInputHeading}>Verification Code</Text>
                            <TextInputField placeHolder='Enter Code' onSubmit={() => passwordRef.current.focus()}
                                ref={codeRef} keytype='next' onChangeText={(val) => setConfirmationCode(val)}
                            />
                            <Text style={styles.textInputHeading}>Password</Text>
                            <TextInputField placeHolder='Password' ref={passwordRef} keytype='done' hidden={true}
                                onChangeText={(val) => setPassword(val)}
                            />
                        </View>
                        <Button title='RESET PASSWORD' containerStyles={styles.confirmButton}
                            onPress={_resetPassword}
                        />
                    </KeyboardAwareScrollView>
                </View>

            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}
