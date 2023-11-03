import { AUDIOTRACK, CHAPTERS, REMOVETRACKS, BOOKID, ISPLAY, TRACKNUMBER} from '../Types';
const intialState = {
    trackIndex: 1,
    audioTracks: [],
    chaptersData: [],
    bookID: '',
    isPlay:false
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case AUDIOTRACK: {
            return {
                ...state,
                audioTracks: [action.payload.track],
                trackIndex: action.payload.trackIndex,
            }
        }
        case CHAPTERS: {
            return {
                ...state,
                chaptersData: action.payload
            }
        }
        case REMOVETRACKS: {
            return {
                ...state,
                chaptersData: [],
                audioTracks: [],
                trackIndex: 1,
                bookID: ''
            }
        }
        case BOOKID: {
            return {
                ...state,
                bookID: action.payload
            }
        }
        case TRACKNUMBER: {
            return {
                ...state,
                trackIndex: action.payload
            }
        }
        case ISPLAY: {
            return {
                ...state,
                isPlay: action.payload
            }
        }
        default:
            return state
    }
}
export default reducer;