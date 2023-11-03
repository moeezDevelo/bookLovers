import TrackPlayer from 'react-native-track-player';
import { refreshToken, getAudionBook } from './utills/ApiFunctions';
import { getTracks, getUser } from './utills/config';
import { ISLOADER, AUDIOTRACK, LOGIN, ISPLAY } from './Redux/Types';
import { store } from './Redux/index'
module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => {
    await TrackPlayer.play()
    changeStatus(true)
  });
  TrackPlayer.addEventListener('remote-pause', async () => {
    await TrackPlayer.pause()
    changeStatus(false)
  });
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
  TrackPlayer.addEventListener('remote-next', async () => {
    const indx = await getTracks().trackIndex
    const chapLength = await getTracks().chaptersData.length
    if (indx <= chapLength) {
      await TrackPlayer.stop()
      await TrackPlayer.reset();
      await getData()
      await TrackPlayer.add([...getTracks().audioTracks]);
      await TrackPlayer.play();
    }
  });
  TrackPlayer.addEventListener('remote-previous', async () => {
    if (await getTracks().trackIndex != 2) {
      await TrackPlayer.stop()
      await TrackPlayer.reset();
      await getData(-1)
      await TrackPlayer.add([...getTracks().audioTracks]);
      await TrackPlayer.play();
    }
  });
  TrackPlayer.addEventListener('remote-seek', async (val) => {
    await TrackPlayer.play();
    await TrackPlayer.seekTo(val.position)
  });
};
const getData = async (count = 1) => {
  store.dispatch({
    type: ISLOADER,
    payload: true
  })
  let currentChapter = getTracks().chaptersData.find((item) => {
    return count == 1 ? Number(item.ChapterNumber) === getTracks().trackIndex : Number(item.ChapterNumber) === getTracks().trackIndex - 2
  })
  const response = await getAudionBook(getTracks().bookID, currentChapter.Id);
  if (response.success) {
    store.dispatch({
      type: AUDIOTRACK,
      payload: {
        track: {
          url: response.data,
          title: currentChapter.ChapterName,
          duration: currentChapter.Length
        },
        trackIndex: count == 1 ? getTracks().trackIndex + 1 : getTracks().trackIndex - 1
      }
    })
    store.dispatch({
      type: ISLOADER,
      payload: false
    })
  }
  else if (response?.unAuthrozied) {
    const res = await refreshToken({
      Username: getUser().idToken?.payload?.email.trim(),
      refreshToken: String(getUser().refreshToken),
    });
    if (res.success) {
      let newUser = { ...getUser() }
      newUser.idToken.jwtToken = res.data.id_token.jwtToken
      store.dispatch({
        type: LOGIN,
        payload: newUser
      })
      _getChapters(count)
    }
    else {
      store.dispatch({
        type: ISLOADER,
        payload: false
      })
      setTimeout(() => {
        alert("Alert", res.message)
      }, 600);
    }
  }
}
const changeStatus = (payload) => {
  store.dispatch({
    type: ISPLAY,
    payload: payload
  })
}