import { LANDINGPAGEDATA, BUTTONLOADER, ISLOADER, ISLOADERTEXT, BOOKDETAIL, SETEXPLORE } from '../Types';
export const landingPageData = payload => {
    return {
        type: LANDINGPAGEDATA,
        payload: payload
    }
};
export const setButtonLoader = payload => {
    return {
        type: BUTTONLOADER,
        payload: payload
    }
};
export const setIsLoader = payload => {
    return {
        type: ISLOADER,
        payload: payload
    }
};
export const setIsLoaderText = payload => {
    return {
        type: ISLOADERTEXT,
        payload: payload
    }
};
export const setBookDetail = payload => {
    return {
        type: BOOKDETAIL,
        payload: payload
    }
}
export const setExplore = payload => {
    return {
        type: SETEXPLORE,
        payload: payload
    }
};
