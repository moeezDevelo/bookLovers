import { NOTIFICATIONTYPE } from '../Types';
export const setNotificationType = payload => {
    return {
        type: NOTIFICATIONTYPE,
        payload: payload
    }
};