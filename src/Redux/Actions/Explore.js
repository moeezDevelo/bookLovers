import { EXPLORELANIDINGDATA } from '../Types';
export const exploreLandingData = payload => {
    return {
        type: EXPLORELANIDINGDATA,
        payload: payload
    }
};