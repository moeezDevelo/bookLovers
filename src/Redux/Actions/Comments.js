import { SETCOMMENTS,UPADTECOMMENTS,ADDNEWCOMMENTS } from '../Types';
export const setComments = payload => {
    return {
        type: SETCOMMENTS,
        payload: payload
    }
}
export const addNewComments = payload => {
    return {
        type: ADDNEWCOMMENTS,
        payload: payload
    }
}
export const updateComments = payload => {
    return {
        type: UPADTECOMMENTS,
        payload: payload
    }
}

