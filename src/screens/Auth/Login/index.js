import React, { Fragment, createRef, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Button } from '../../../components/Button/index';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/Actions/Auth';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import logoImage from '../../../assets/Auth/logoImage.png';
import { height } from 'react-native-dimension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import TextInputField from '../../../components/TextInput/index';
import { signIn } from '../../../utills/ApiFunctions';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { showMessage } from 'react-native-flash-message';
export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const password = createRef(null)
    const [Username, setUserName] = useState('')
    const [Password, setPassword] = useState('')
    const _showMessage = (description) => {
        showMessage({
            message: 'Error',
            description: description,
            type: 'danger',
            duration: 8000
        });
    }
    const _signIn = async () => {
        dispatch(setButtonLoader(true))
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        let isEmail = expression.test(String(Username.trim()).toLowerCase())
        if (isEmail) {
            const response = await signIn({
                Password: Password.trim(),
                Username: Username.trim(),
            });
            if (response?.success) {
                dispatch(setButtonLoader(false))
                dispatch(login(response.data))
            } else {
                dispatch(setButtonLoader(false))
                _showMessage('The credentials entered are not valid. Please note that emails are case sensitive.')
            }
        }
        else {
            dispatch(setButtonLoader(false))
            _showMessage('Please enter valid email')
        }
    }
    return (
        <Fragment>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={(styles.container, { backgroundColor: Colors.white })} />
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
                            <Text style={styles.headingText}>Login</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputHeading}>Your Email</Text>
                            <TextInputField placeHolder='Enter email' onSubmit={() => password.current.focus()} keytype='next'
                                onChangeText={(val) => setUserName(val)} value={Username}
                            />
                            <Text style={styles.textInputHeading}>Password</Text>
                            <TextInputField placeHolder='Password' ref={password} keytype='done' hidden={true}
                                value={Password}
                                onChangeText={(val) => setPassword(val)}
                            />
                            <View style={styles.forgotPasswordContainer}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                <TouchableOpacity style={styles.resetButton}
                                    onPress={() => navigation.navigate('ResetPassword')}>
                                    <Text style={styles.resetText}>Reset here.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button title='CONFIRM' containerStyles={styles.confirmButton}
                            onPress={_signIn} disabled={Password == '' && Username == ''}
                        />
                    </KeyboardAwareScrollView>
                </View>

            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}
