import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { fcmTokens, sendEmail } from './ApiFunctions';
export const handleNotificationToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        let fcmToken = await messaging().getToken()
        await fcmTokens({ token: fcmToken },
            Platform.OS === 'ios' ? 'IOS' : 'Android'
        )
    }
}
export const handleEmailError = async (data) => {
    data = { ...data, Receiver: 'marko@agilecodelab.com' }
    await sendEmail(data)
}