import React, { Fragment, createRef, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import TextInputField from '../../../components/TextInput/index';
import PhoneInputField from '../../../components/PhoneInput/index';
import { Button } from '../../../components/Button/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { height } from 'react-native-dimension';
import { cognitoProfile } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setButtonLoader } from '../../../Redux/Actions/config';
import { login } from '../../../Redux/Actions/Auth';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { StripMaskedPhoneNumber } from '../../../utills/Methods';
import { logout } from '../../../Redux/Actions/Auth';
export default function ProfileUpdate({ navigation }) {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const lastNameRef = createRef(null)
    const phoneRef = createRef(null)
    const bioRef = createRef(null)
    const [firstName, setFirstName] = useState(user?.idToken?.payload?.given_name)
    const [lastName, setLastName] = useState(user?.idToken?.payload?.family_name)
    const [phoneNumber, setPhoneNumber] = useState(user?.idToken?.payload?.phone_number);//ConvertPhoneNumberToMasked(useState(user?.idToken?.payload?.phone_number))
    const [bio, setBio] = useState(user?.idToken?.payload?.Bio)
    const _editProfile = async () => {
        const pNumber = StripMaskedPhoneNumber(phoneNumber);
        console.log(pNumber);
        if (pNumber.length != 12) {
            showMessage({
                message: 'Error',
                description: 'Please enter your phone number in this format: +1(123)456-7890',
                type: 'danger',
                duration: 8000
              });
        }
        else {
            dispatch(setButtonLoader(true))
            const response = await cognitoProfile({
                UserAttributes: [
                    {
                        Name: "given_name",
                        Value: firstName
                    },
                    {
                        Name: "family_name",
                        Value: lastName
                    },
                    {
                        Name: "phone_number",
                        Value: pNumber
                    }
                ]
            });
            console.log(response);
            if (response.success) {
                let newUser = { ...user }
                newUser.idToken.payload.given_name = firstName
                newUser.idToken.payload.family_name = lastName
                newUser.idToken.payload.phone_number = pNumber
                dispatch(setButtonLoader(false))
                dispatch(login(newUser))
                navigation.goBack()
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
                dispatch(setButtonLoader(false))
                showMessage({
                    message: 'Error',
                    description: 'An error occurred while saving your profile.',
                    type: 'danger',
                    duration: 8000
                });
                handleEmailError({
                    Subject: 'Profile update',
                    Message: JSON.stringify(response)
                })
            }
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
                <Header title='Edit Name' isBack containerStyles={styles.containerStyles}
                    textStyle={styles.textStyle} onPress={() => navigation.goBack()} />
                <View style={styles.mainViewContainer}>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        extraScrollHeight={height(8)}
                        keyboardShouldPersistTaps='handled'
                    >
                        <Text style={styles.textInputHeading}>First Name</Text>
                        <TextInputField value={firstName} onSubmit={() => lastNameRef.current.focus()} keytype='next'
                            onChangeText={(val) => setFirstName(val)}
                        />

                        <Text style={styles.textInputHeading}>Last Name</Text>
                        <TextInputField value={lastName} ref={lastNameRef} onSubmit={() => phoneRef.current.focus()}
                            onChangeText={(val) => setLastName(val)} keytype='next' />

                        <Text style={styles.textInputHeading}>Phone Number</Text>
                        <TextInputField value={phoneNumber} ref={phoneRef} masked={true}
                            onChangeText={(val) => {setPhoneNumber(val)}} keytype='next' />

                        <Button title='SAVE' containerStyles={styles.saveButton} onPress={_editProfile}
                            disabled={firstName == '' || lastName == '' || phoneNumber.length == ''}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
