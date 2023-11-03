import React, { Fragment, createRef, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import logoImage from '../../../assets/Auth/logoImage.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import TextInputField from '../../../components/TextInput/index';
import { signUp } from '../../../utills/ApiFunctions';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { width } from 'react-native-dimension';
import { showMessage } from 'react-native-flash-message';
export default function SignUp({ navigation }) {
    const dispatch = useDispatch();
    const firstNameRef = createRef(null)
    const lastNameRef = createRef(null)
    const phoneRef = createRef(null)
    const passwordRef = createRef(null)
    const [Username, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isTermsCondition, setIsTermCondition] = useState(false)
    const [Password, setPassword] = useState('')
    const _showMessage = (errMessage) => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 8000
        });
    }
    const _signUp = async () => {
        if (Username != '' && Password != '' && firstName != '' && lastName != '' && isTermsCondition) {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            let isEmail = expression.test(String(Username.trim()).toLowerCase())
            let isPassword = Password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
            if (isEmail && !!isPassword) {
                dispatch(setButtonLoader(true))
                const response = await signUp({
                    Password: Password.trim(),
                    type: "SignUp",
                    Username: Username.trim().toLowerCase(),
                    UserAttributes: [
                        {
                            Name: "given_name",
                            Value: firstName.trim()
                        },
                        {
                            Name: "family_name",
                            Value: lastName.trim()
                        }
                    ]
                });
                if (response?.success) {
                    dispatch(setButtonLoader(false))
                    navigation.navigate('SignUpConfirm', { Username: Username.trim().toLowerCase() })
                } else {
                    dispatch(setButtonLoader(false))

                    if (response.status == 400) {
                        _showMessage('The email specified is already registered.')
                    }
                    else {
                        _showMessage(response.message);
                    }

                    _showMessage('An error occurred while registering your account. If the problem persists, please contact booklovershelp@gmail.com')
                }
            }
            else if (!isEmail || !!isPassword) {
                _showMessage('Enter a valid Email')
            }
            else if (!!isEmail || !isPassword) {
                _showMessage('Password must contain at least 8 letters including an uppercase letter, a lowercase letter, a number, and a special character.')
            }
        }
        else if (Username == '' || Password == '' || firstName == '' || lastName == '') {
            _showMessage(`Please fill out all fields.`)
        }
        else if (!isTermsCondition) {
            _showMessage('Please accept the terms & conditions')
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
                        keyboardShouldPersistTaps='handled'
                    >
                        <Image source={logoImage} resizeMode='contain' style={styles.logoImage} />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Sign Up With Email</Text>
                            <Text style={styles.infoText}>Stay connected for early releases, give aways and much more! </Text>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.textInputHeading}>Your Email</Text>
                            <TextInputField placeHolder='Enter email' onSubmit={() => firstNameRef.current.focus()} keytype='next'
                                onChangeText={setUserName}
                            />
                            <View style={styles.nameContainer}>
                                <View>
                                    <Text style={styles.nameTextInputHeading}>First Name</Text>
                                    <TextInputField placeHolder='First Name' onSubmit={() => lastNameRef.current.focus()} keytype='next'
                                        onChangeText={setFirstName} textFieldContainerStyle={styles.nameTextFieldContainer}
                                        textInputStyle={styles.nameTextField} ref={firstNameRef}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.nameTextInputHeading}>Last Name</Text>
                                    <TextInputField placeHolder='last Name' onSubmit={() => phoneRef.current.focus()} keytype='next'
                                        onChangeText={setLastName} textFieldContainerStyle={styles.nameTextFieldContainer}
                                        textInputStyle={styles.nameTextField} ref={lastNameRef}
                                    />
                                </View>
                            </View>
                            <Text style={styles.textInputHeading}>Password</Text>
                            <TextInputField placeHolder='Password' ref={passwordRef} keytype='done' hidden={true}
                                onChangeText={setPassword}
                            />
                        </View>
                        <View style={styles.termsConditionContainer}>
                            <TouchableOpacity onPress={() => setIsTermCondition(!isTermsCondition)}>
                                <Ionicons name={isTermsCondition ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'}
                                    size={width(6)} color={Colors.appColor1}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptTextContainer}
                                onPress={() => navigation.navigate('TermsConditions')}
                            >
                                <Text style={styles.acceptText}>Accept terms and conditions</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title='CONFIRM' containerStyles={styles.confirmButton}
                            onPress={_signUp}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}
