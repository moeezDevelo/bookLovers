import routes from './routes';
import axios from 'axios';
import { getUser } from './config';
import { store } from '../Redux/index';
import { LOGIN } from '../Redux/Types';
////////////////////////////// Auth APIS //////////////////////////////////////////////////

export const signUp = async (data) => {
  let res
  try {
    res = await axios.post(routes.SIGN_UP.url, data)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    } else {
      return { success: false, data: [], status: res.status, message: 'An error occurred while processing your request. If the problem persists, please contact booklovershelp@gmail.com' }
    }
  } catch (error) {
    return { success: false, message: error?.message }
  }
};
export const signIn = async (data) => {
  let res
  try {
    res = await axios.post(routes.SIGN_IN.url, { ...data })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    } else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
};
export const refreshToken = async () => {
  let res
  let data = {
    Username: getUser().idToken?.payload?.email.trim(),
    refreshToken: String(getUser().refreshToken),
  }
  try {
    res = await axios.put(routes.SIGN_IN.url, data)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      store.dispatch({
        type: LOGIN,
        payload: res?.data
      })
      return { success: true, status: res.status, data: res.data }
    } else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
};
export const forgotPassword = async (data) => {
  let res
  try {
    res = await axios.post(routes.FORGOT_PASSWORD.url, data)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    } else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
};
export const verifyAccount = async (email) => {
  let res
  try {
    let data = {
      type: "resendConfirmationCode",
      Username: email
    }
    res = await axios.post(routes.SIGN_UP.url, data)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    } else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
};
export const setNewPassword = async (data) => {
  let res
  try {
    res = await axios.put(routes.FORGOT_PASSWORD.url, data)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    } else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
};

////////////////////////////// APP APIS //////////////////////////////////////////////////

export const editProfile = async (data) => {
  let res
  try {
    res = await axios.put(`${routes.EDIT_PROFILE.url}/UserProfile/${getUser().idToken.payload.email}`.trim(), data,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response
  }
}
export const getFavouritesBooks = async () => {
  let res
  try {
    res = await axios.get(`${routes.EDIT_PROFILE.url}/UserProfile/?includeFavBook=${true}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response
  }
}
export const cognitoProfile = async (data) => {
  let res
  try {
    res = await axios.post(`${routes.COGNITO_PROFILE.url}`, data,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response
  }
}
export const ladingPage = async () => {
  let res
  try {
    res = await axios.get(`${routes.LANDINGPAGEDATA.url}?size=${5}`, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error
  }
}
export const getEditorNotes = async () => {
  let res
  try {
    res = await axios.get(`${routes.EDITOR_NOTES.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getAuthorSpotLight = async () => {
  let res
  try {
    res = await axios.get(`${routes.AUTHORSPOTLIGHT_URL.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getStoryTime = async () => {
  let res
  try {
    res = await axios.get(`${routes.STORY_TIME.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const s3Upload = async (data) => {
  let res
  try {
    res = await axios.post(routes.UPLOADS3.url, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const discussionTopicData = async () => {
  let res
  try {
    res = await axios.get(`${routes.DISCUSSIONTOPIC.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const discussionTopicComment = async (data) => {
  let res
  try {
    const url = `${routes.DISCUSSIONCOMMENT.url}/${data.TopicId}?Limit=25`
    res = await axios.get(url,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.message
  }
}
export const discussionTopicCommentBYID = async (ID) => {
  let res
  try {
    const url = `${routes.DISCUSSIONCOMMENTBYID.url}?Id=${ID}`
    res = await axios.get(url,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.message
  }
}
export const discussionTopicCommentNext = async (topicId, LastId, LastUpdateTs,) => {
  let res;
  try {
    const url = `${routes.DISCUSSIONCOMMENT.url}/${topicId}?Limit=25&Id=${LastId}&lastUpdatedTs=${LastUpdateTs}&TopicId=${topicId}`
    res = await axios.get(url,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.message
  }
}
export const AddCommentTopic = async (data) => {
  let res
  try {
    res = await axios.post(routes.DISCUSSIONCOMMENT.url, data.data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const AddCommentTopicReplies = async (data) => {
  let res
  try {
    res = await axios.post(routes.DISCUSSIONCOMMENT.url, data.data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getStoreBook = async (data) => {
  let res
  try {
    res = await axios.get(`${routes.GETSTOREBOOK.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getMerchandise = async () => {
  let res
  try {
    res = await axios.get(`${routes.GETMERCHANDISE.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getPurchasedBook = async () => {
  let res
  try {
    res = await axios.get(`${routes.GETPURCHASEDBOOK.url}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getPdfBook = async (Id) => {
  let res
  try {
    res = await axios.get(`${routes.GETBOOK.url}/${Id}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getAudioBookAllChapters = async (Id) => {
  let res
  try {
    res = await axios.get(`${routes.GETALLCHAPTERS.url}/Chapters?BookId=${Id}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getAudionBook = async (bookId, chapterId) => {
  let res
  try {
    res = await axios.get(`${routes.GETBOOK.url}/${bookId}?ChapterId=${chapterId}`,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const purchasedBook = async (data, Platform) => {
  let res
  try {
    res = await axios.post(Platform === 'IOS' ? routes.PURCHASEDBOOKIOS.url : routes.PURCHASEDBOOKANDROID.url, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const reviewBook = async (data) => {
  let res
  try {
    res = await axios.post(routes.REVIEWBOOKS.url, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getReviews = async (id) => {
  let res
  try {
    res = await axios.get(`${routes.REVIEWBOOKS.url}/?BookId=${id}`, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const premiumContent = async (data) => {
  let res
  try {
    res = await axios.post(routes.PREMIUMCONTENT.url, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const useVoucher = async (voucher) => {
  let res
  try {
    res = await axios.put(`${routes.USEVOUCHER.url}${voucher}`, {},
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response.data
  }
}
export const pdfPositionUpdate = async (ID, data) => {
  let res
  try {
    res = await axios.put(`${routes.GETPURCHASEDBOOK.url}/${ID}`, data,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response.data
  }
}
export const audioPositionUpdate = async (ID, data) => {
  let res
  try {
    res = await axios.put(`${routes.GETPURCHASEDBOOK.url}/${ID}`, data,
      { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response.data
  }
}
export const getBookDetail = async (id) => {
  let res
  try {
    res = await axios.get(`${routes.GETPURCHASEDBOOK.url}/${id}`, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getPublicBooks = async () => {
  let res
  try {
    res = await axios.get(`${routes.PUBLICBOOKS.url}`)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const getPublicLandingData = async () => {
  let res
  try {
    res = await axios.get(`${routes.LANDINGPAGEDATA.url}`)
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const restorePurchasedBooks = async (data) => {
  let res
  try {
    res = await axios.post(routes.RESTOREPURCHASES.url, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const syncPurchasedBooks = async (data, platform) => {
  let res
  try {
    res = await axios.post(routes.SYNCPURCHASES.url, data, { headers: { Authorization: getUser().idToken.jwtToken }, params: { Platform: platform } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const fcmTokens = async (data, platform) => {
  let res
  try {
    res = await axios.put(`${routes.FCM_TOKEN.url}${platform}`, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}
export const sendEmail = async (data) => {
  let res
  try {
    res = await axios.post(`${routes.SENDEMAIL.url}`, data, { headers: { Authorization: getUser().idToken.jwtToken } })
    if (res.status === 200 || res.status === 201 || res.status === 304) {
      return { success: true, status: res.status, data: res.data }
    }
    else {
      return { success: false, status: res.status, data: [] }
    }
  } catch (error) {
    return error?.response?.data
  }
}