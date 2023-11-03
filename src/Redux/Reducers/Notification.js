import { NOTIFICATIONTYPE, LOGOUT } from '../Types';
const intialState = {
    notificationType: '',
    commentDetails: null
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case NOTIFICATIONTYPE: {
            return {
                ...state,
                notificationType: action.payload?.notification,
                commentDetails: action.payload?.commentDetails ?? null
            }
        }
        case LOGOUT: {
            return {
                ...state,
                notificationType: '',
            }
        }
        default:
            return state

    }
}
export default reducer;