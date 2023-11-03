import React, { Fragment, useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { height } from 'react-native-dimension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import logoImage from '../../../assets/Auth/logoImage.png';
import { Button } from '../../../components/Button/index';
import { Header } from '../../../components/Headers/index';
import TextInputField from '../../../components/TextInput/index';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { verifyAccount } from '../../../utills/ApiFunctions';
import Colors from '../../../utills/Colors';
import styles from './styles';
import { showMessage } from 'react-native-flash-message';
export default function ResetPassword({ navigation }) {
    const [Username, setUserName] = useState('')
    const dispatch = useDispatch();
    const _showMessage = (description, type = 'warning') => {
        showMessage({
            message: 'Error',
            description: description,
            type: type,
            duration: 8000
        });
    }
    const _forgotPassword = async () => {
        dispatch(setButtonLoader(true))
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        let isEmail = expression.test(String(Username.trim()).toLowerCase())
        if (isEmail) {
            const response = await verifyAccount(Username.trim().toLowerCase());
            dispatch(setButtonLoader(false))
            if (response?.success) {
                navigation.navigate('SignUpConfirm', { Username: Username.trim().toLowerCase() });
            }
            else if (response.includes('User not found')) {
                _showMessage(response ?? 'The email you entered was not found, please enter a valid email.', 'danger')
            }
            else if (response.includes('already confirmed') || response.includes('registered')) {
                _showMessage(response ?? 'This user has already been confirmed, please go to login screen.')
            }
        }
        else {
            dispatch(setButtonLoader(false))
            _showMessage('Please enter a valid email address.', 'danger')
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
                            <Text style={styles.headingText}>Let's verify your account</Text>
                            <Text style={styles.infoText}>Please enter your email address, we will email you verification code to verify your account.</Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputHeading}>Your Email</Text>
                            <TextInputField placeHolder='Enter email' keytype='done'
                                onChangeText={(val) => setUserName(val)}
                            />
                        </View>
                        <Button title='VERIFY ACCOUNT' containerStyles={styles.confirmButton}
                            onPress={_forgotPassword} disabled={Username == ''}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}