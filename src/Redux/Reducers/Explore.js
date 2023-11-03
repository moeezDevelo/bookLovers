import { EXPLORELANIDINGDATA } from '../Types';
const intialState = {
    landingPage: null
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case EXPLORELANIDINGDATA: {
            return {
                ...state,
                landingPage: action.payload,
            }
        }
        default:
            return state
    }
}
export default reducer;