import { updateComments } from '../Actions/Comments';
import { SETCOMMENTS, ADDNEWCOMMENTS, UPADTECOMMENTS } from '../Types';
const intialState = {
    commentData: []
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case SETCOMMENTS: {
            return {
                ...state,
                commentData: action.payload
            }
        }
        case ADDNEWCOMMENTS: {
            var newCommentData = [...state.commentData, action.payload];
            return {
                ...state,
                commentData: newCommentData
            }
        }
        case UPADTECOMMENTS:{
            var updateCommentData = [...state.commentData];
            const index = updateCommentData.findIndex(item => item.Id == action.payload.Id)
            updateCommentData[index] = action.payload
            return {
                ...state, 
                commentData:updateCommentData
            }
        }
        default:
            return state
    }
}
export default reducer;