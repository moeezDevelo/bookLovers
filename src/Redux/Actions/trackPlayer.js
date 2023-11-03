import { AUDIOTRACK, CHAPTERS, REMOVETRACKS, BOOKID, ISPLAY,TRACKNUMBER } from '../Types';
export const setAudioTrack = payload => {
    return {
        type: AUDIOTRACK,
        payload: payload
    }
};
export const removeAudioTrack = () => {
    return {
        type: REMOVETRACKS,
    }
};
export const setChapters = payload => {
    return {
        type: CHAPTERS,
        payload: payload
    }
};
export const setBookID = payload => {
    return {
        type: BOOKID,
        payload: payload
    }
};
export const setIsPlay = payload => {
    return {
        type: ISPLAY,
        payload: payload
    }
};
export const updateTrak = payload => {
    return {
        type: TRACKNUMBER,
        payload: payload
    }
};