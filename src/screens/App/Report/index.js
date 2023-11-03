import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { width } from 'react-native-dimension';
import { Button } from '../../../components/Button';
import RNSmtpMailer from "react-native-smtp-mailer";
import { useSelector, useDispatch } from 'react-redux';
import { setButtonLoader } from '../../../Redux/Actions/config';
import moment from 'moment';
export default function ReportLists({ navigation, route }) {
    const dispatch = useDispatch()
    const item = route?.params?.item
    const user = useSelector((state) => state.Auth.user);
    const [issue, setIssue] = useState('')
    const comment = route?.params?.comment;
    const body = `<div style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: flex;">
    <h3>Issue:</h3>
    <h3 skip="true" style="text-align: center;">&nbsp; &nbsp; &nbsp;${item?.title}</h3>
</div>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Discussion Message ID:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;"> ${comment?.Id}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Reporting Person ID:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;"> ${user?.idToken?.userData?.Id}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Reporting Person Email:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;"> ${user?.idToken?.payload?.email}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Comment UserId:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;"> ${comment?.UserId}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Message Posted Time:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;"> ${moment(comment.lastUpdatedTs).format('MMMM Do YYYY, h:mm a')}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Reported Time:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;"> ${moment().format('MMMM Do YYYY, h:mm a')}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Reported By:</span>&nbsp; &nbsp; &nbsp;<span style="font-size: 15px;">${user?.idToken?.payload?.given_name} ${user?.idToken?.payload?.family_name}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Problem: &nbsp; &nbsp; ${issue != '' ? issue : 'Not described'}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Comment:</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 12px;">${comment?.Comment}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Reported person: &nbsp; &nbsp; ${comment?.UserName}</span></h3>
<h3 style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-size: 15px;">Reported person email:&nbsp; &nbsp; &nbsp;${comment?.CreatedByEmail}</span></h3>`
    const _sentMail = () => {
        dispatch(setButtonLoader(true))
        RNSmtpMailer.sendMail({
            mailhost: 'smtp.gmail.com',
            port: '465',
            username: 'bookloversnotifications',
            password: 'ijzchiszqanaapex',
            from: 'bookloversnotifications@gmail.com',
            recipients: 'marko@agilecodelab.com',
            subject: 'Report Notification',
            htmlBody: body,
        })
            .then(() => {
                dispatch(setButtonLoader(false))
                navigation.navigate('DiscussionForumComment')
            })
            .catch(() => {
                dispatch(setButtonLoader(false))
                navigation.navigate('DiscussionForumComment')
            }
            );
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
                <Header title='Community Standards' containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <View style={styles.headingContainer}>
                        <MaterialIcons name='report' color={Colors.appTextColor12} size={width(10)} />
                        <Text style={styles.titleText}>{item?.title}</Text>
                    </View>
                    <Text style={styles.reportHeading}>Report a problem</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder={'Enter your problem'}
                            placeholderTextColor={Colors.appTextColor1}
                            autoCapitalize='none'
                            multiline={true}
                            onChangeText={setIssue}
                            style={styles.textInput}
                            returnKeyType='done'
                            blurOnSubmit
                        />
                    </View>
                </View>
                <Button title='Submit' containerStyles={styles.submitButton}
                    onPress={_sentMail}
                />
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
