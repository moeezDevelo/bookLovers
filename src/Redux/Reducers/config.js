import { LANDINGPAGEDATA, BUTTONLOADER, ISLOADER, ISLOADERTEXT, BOOKDETAIL, SETEXPLORE, LOGOUT } from '../Types';
const intialState = {
    landingPage: null,
    isButtonLoader: false,
    isLoader: false,
    isLoaderText: '',
    isPlay: false,
    bookDetails: {},
    isExplore: false
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case LANDINGPAGEDATA: {
            return {
                ...state,
                landingPage: action.payload
            }
        }
        case BUTTONLOADER: {
            return {
                ...state,
                isButtonLoader: action.payload,
            }
        }
        case ISLOADER: {
            return {
                ...state,
                isLoader: action.payload,
            }
        }
        case ISLOADERTEXT: {
            return {
                ...state,
                isLoaderText: action.payload,
            }
        }
        case BOOKDETAIL: {
            return {
                ...state,
                bookDetails: action.payload,
            }
        }
        case SETEXPLORE: {
            return {
                ...state,
                isExplore: action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state,
                landingPage: null,
                isButtonLoader: false,
                isLoader: false,
                isPlay: false,
                bookDetails: {},
                isExplore: false
            }
        }
        default:
            return state
    }
}
export default reducer;