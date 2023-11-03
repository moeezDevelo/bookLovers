import {
  AUTHENTICATION_URL, LANDINGPAGE_URL, USERPROFILE_URL, DISCUSSIONCOMMENT_URL,
  EDITORNOTES_URL, UPLOADS3_URL, AUTHORSPOTLIGHT_URL, STORYTIME_URL, REVIEW_URL, DISCUSSIONTOPIC_URL,
  GETSTORE_BOOK, PURCASED_BOOK_Detail, COGNITO_PROFILE, GET_MERCHANDISE, PREMIUM_CONTENT, USE_VOUCHER, GETBOOK, GETALLCHAPTERS,
  PUBLICBOOK, RESTORE_PURCHASES, SYNC_PURCHASED, PURCASED_BOOK_ANDROID, PURCASED_BOOK_IOS, FCM_TOKEN,
  DISCUSSIONCOMMENTBYID_URL, SEND_EMAIL
} from './Constants';
export default {
  SIGN_UP: {
    url: `${AUTHENTICATION_URL}/SignUp`,
  },
  SIGN_IN: {
    url: `${AUTHENTICATION_URL}/SignIn`,
  },
  FORGOT_PASSWORD: {
    url: `${AUTHENTICATION_URL}/ForgotPassword`,
  },
  LANDINGPAGEDATA: {
    url: `${LANDINGPAGE_URL}/LandingPageData`,
  },
  EDIT_PROFILE: {
    url: `${USERPROFILE_URL}`,
  },
  COGNITO_PROFILE: {
    url: `${COGNITO_PROFILE}`
  },
  EDITOR_NOTES: {
    url: `${EDITORNOTES_URL}`
  },
  AUTHORSPOTLIGHT_URL: {
    url: `${AUTHORSPOTLIGHT_URL}`
  },
  STORY_TIME: {
    url: `${STORYTIME_URL}`
  },
  UPLOADS3: {
    url: `${UPLOADS3_URL}`
  },
  REVIEWBOOKS: {
    url: `${REVIEW_URL}`
  },
  DISCUSSIONTOPIC: {
    url: `${DISCUSSIONTOPIC_URL}`
  },
  DISCUSSIONCOMMENT: {
    url: `${DISCUSSIONCOMMENT_URL}`
  },
  GETSTOREBOOK: {
    url: `${GETSTORE_BOOK}`
  },
  GETMERCHANDISE: {
    url: `${GET_MERCHANDISE}`
  },
  GETPURCHASEDBOOK: {
    url: `${PURCASED_BOOK_Detail}`
  },
  PURCHASEDBOOKANDROID: {
    url: `${PURCASED_BOOK_ANDROID}`
  },
  PURCHASEDBOOKIOS: {
    url: `${PURCASED_BOOK_IOS}`
  },
  PREMIUMCONTENT: {
    url: `${PREMIUM_CONTENT}`
  },
  USEVOUCHER: {
    url: `${USE_VOUCHER}`
  },
  GETBOOK: {
    url: `${GETBOOK}`
  },
  GETALLCHAPTERS: {
    url: `${GETALLCHAPTERS}`
  },
  PUBLICBOOKS: {
    url: `${PUBLICBOOK}`
  },
  RESTOREPURCHASES: {
    url: `${RESTORE_PURCHASES}`
  },
  SYNCPURCHASES: {
    url: `${SYNC_PURCHASED}`
  },
  FCM_TOKEN: {
    url: `${FCM_TOKEN}`
  },
  DISCUSSIONCOMMENTBYID: {
    url: `${DISCUSSIONCOMMENTBYID_URL}`
  },
  SENDEMAIL: {
    url: `${SEND_EMAIL}`
  }
};
