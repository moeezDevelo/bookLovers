import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, BackHandler } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { width, height } from 'react-native-dimension';
import TrackPlayer, { useTrackPlayerProgress, usePlaybackState, TrackPlayerEvents, useTrackPlayerEvents, } from 'react-native-track-player';
import moment from 'moment';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { GetProfilePath } from '../../../utills/Methods';
import { getAudionBook, getAudioBookAllChapters, audioPositionUpdate, getBookDetail, } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setAudioTrack, setChapters, removeAudioTrack, setBookID, setIsPlay, updateTrak } from '../../../Redux/Actions/trackPlayer';
import { setIsLoader } from '../../../Redux/Actions/config';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction'
import { logout } from '../../../Redux/Actions/Auth';;
const events = [TrackPlayerEvents.PLAYBACK_STATE, TrackPlayerEvents.PLAYBACK_ERROR,];
export default function AudioBookPlayer({ navigation, route }) {
  const item = route?.params?.item;
  const audioTracks = useSelector((state) => state.trackPlayer.audioTracks);
  const trackIndex = useSelector((state) => state.trackPlayer.trackIndex);
  const chaptersData = useSelector((state) => state.trackPlayer.chaptersData);
  const playbackState = usePlaybackState();
  const isPlay = useSelector((state) => state.trackPlayer.isPlay);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [currentChapterNumber, setCurrentChapterNumber] = useState('');
  const { position, duration } = useTrackPlayerProgress();
  const [isGetChapter, setIsGetChapter] = useState(false);
  const dispatch = useDispatch();
  const size = `500x500`;
  var [updatedTime, setUpdatedTime] = useState(0);
  const _showMessage = (description) => {
    showMessage({
      message: 'Error',
      description: description,
      type: 'danger',
      duration: 8000
    });
  }
  const _handleEmailError = (subject = '', message = '') => {
    handleEmailError({
      Subject: subject,
      Message: message
    })
  }
  useTrackPlayerEvents(events, (event) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      _showMessage('An error occured while playing the current track.');
    }
  });
  useEffect(() => {
    if (audioTracks.length > 0 && isAutoPlay) {
      _playAudio();
    }
  }, [audioTracks]);
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
    }).then(async () => {
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
        ],
        notificationCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
        ],
      });
    });
  };
  async function skipToPrevious() {
    setUpdatedTime(0)
    dispatch(setIsPlay(false));
    setIsAutoPlay(true);
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    await _getChapter(-1);
  }
  async function skipToNext() {
    setUpdatedTime(0)
    setIsAutoPlay(true);
    dispatch(setIsPlay(false));
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    await _getChapter();
  }
  const _playAudio = async () => {
    getStateName(playbackState);
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      dispatch(setIsPlay(true));
      await TrackPlayer.reset();
      await TrackPlayer.add([...audioTracks]);
      if (currentChapterNumber != '') {
        await TrackPlayer.seekTo(updatedTime);
      }
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        dispatch(setIsPlay(true));
        await TrackPlayer.play();
      } else {
        dispatch(setIsPlay(false));
        await TrackPlayer.pause();
      }
    }
  };
  function getStateName(state) {
    switch (state) {
      case TrackPlayer.STATE_NONE:
        return 'None';
      case TrackPlayer.STATE_PLAYING:
        return setIsPlay(true);
      case TrackPlayer.STATE_PAUSED:
        return setIsPlay(false);
      case TrackPlayer.STATE_STOPPED:
        return setIsPlay(false);
      case TrackPlayer.STATE_BUFFERING:
        return 'Buffering';
    }
  }
  const _getChapter = async (count = 1) => {
    dispatch(setIsLoader(true));
    let currentChapter = chaptersData.find((item) => {
      return count == 1
        ? Number(item.ChapterNumber) === trackIndex
        : Number(item.ChapterNumber) === trackIndex - 2;
    });
    const response = await getAudionBook(item.BookId, currentChapter?.Id);
    if (response?.success) {
      dispatch(
        setAudioTrack({
          track: {
            url: response.data,
            // url:'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.m4a',
            // url:'http://www.mediafire.com/file/clcf947zz6nazg1/Expert+Insights-+Using+TMS+and+Ketamine+to+Treat+Depression.mp3',
            title: currentChapter.ChapterName,
            duration: moment.duration(`00:${currentChapter.Length}`).asSeconds(),
            id: currentChapter.ChapterNumber,
            artist: 'Phish',
            key: 0,
          },
          trackIndex: count == 1 ? trackIndex + 1 : trackIndex - 1,
        }),
      );
      dispatch(setIsLoader(false));
    } else {
      dispatch(setIsLoader(false));
      _showMessage(response?.message ?? 'An error has occurred while retrieving the book chapter. If the problem persists, please contact booklovershelp@gmail.com')
      _handleEmailError('Getting book chapter', JSON.stringify(response))
    }
  };
  const _getAllChapters = async () => {
    dispatch(setBookID(item.BookId));
    dispatch(setIsLoader(true));
    const response = await getAudioBookAllChapters(item.BookId);
    if (response?.success) {
      dispatch(setChapters(response.data));
      dispatch(setIsLoader(false));
    }
    else if (response?.status === 401) {
      showMessage({
    	message: 'Error',
    	description: 'Your session has expired, please log back in.',
    	type: 'danger',
    	duration: 8000
      });

      dispatch(logout());
    }
    else {
      dispatch(setIsLoader(false));
      _showMessage(response?.message ?? 'An error occurred while retrieving book chapters. If the problem persists, please contact booklovershelp@gmail.com')
      _handleEmailError('Getting all chapters', JSON.stringify(response))
    }
  };
  useEffect(() => {
    if (isGetChapter) {
      _getChapter();
    }
  }, [isGetChapter]);
  useEffect(() => {
    setupPlayer();
  }, []);
  useEffect(() => {
    _getAllChapters();
  }, []);
  useEffect(() => {
    if (chaptersData.length > 0) {
      _getBookDetails();
    }
  }, [chaptersData]);
  const _getBookDetails = async () => {
    dispatch(setIsLoader(true));
    const response = await getBookDetail(item?.Id);
    if (response?.success) {
      if (response.data[0].CurrentChapter != '') {
        dispatch(updateTrak(Number(response.data[0].CurrentChapter)));
        setCurrentChapterNumber(Number(response.data[0].CurrentChapter));
      }
      let currentTime = response.data[0].CurrentTime.split(':');
      if (currentTime.length == 3) {
        setUpdatedTime(Number(currentTime[1] * 60) + Number(currentTime[2]));
      } else {
        setUpdatedTime(Number(currentTime[0] * 60) + Number(currentTime[1]));
      }
    } else {
      _showMessage('An error has occurred while retrieving book details. If the problem persists, please contact booklovershelp@gmail.com')
      _handleEmailError('Getting book details', JSON.stringify(response))
    }
    setIsGetChapter(true);
    dispatch(setIsLoader(false));
  };
  const _updatePosition = async () => {
    let arr = moment
      .utc(position * 1000)
      .format('mm:ss')
      .split(':'); //['1','20']
    let mins = Number(arr[0]);
    let secs = Number(arr[1]);
    let totalSeconds = mins * 60 + secs;
    if (totalSeconds >= updatedTime + 10) {
      setUpdatedTime(totalSeconds);
      await audioPositionUpdate(item.BookId, {
        CurrentTime: moment.utc(position * 1000).format('mm:ss'),
        CurrentChapter: trackIndex - 1,
      });
    }
  };
  const _goBack = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    dispatch(setIsPlay(false));
    dispatch(removeAudioTrack());
  }
  useEffect(() => {
    if (isPlay) {
      _updatePosition();
    }
  }, [position]);
  useEffect(() => {
    const backAction = () => {
      _goBack()
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    navigation.addListener('blur', () => {
      _goBack()
    })
    return () => {
      navigation.removeListener('blur')
    }
  }, [navigation])
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <Header
          isBack
          onPress={() => {
            _goBack()
            navigation.goBack();
          }}
          containerStyles={styles.containerStyles}
        />
        <View style={styles.mainViewContainer}>
          <Image
            source={{ uri: GetProfilePath(item?.BookDetails?.BookCover, size) }}
            resizeMode='stretch'
            style={styles.image}
          />
          <View style={styles.playerContainer}>
            <Text numberOfLines={1} style={styles.chapterText}>{audioTracks[0]?.title}</Text>
            <View style={styles.progressContainer}>
              <ProgressBarAnimated
                width={width(90)}
                useNativeDriver={false}
                height={height(1.5)}
                value={Math.floor((position / duration) * 100)}
                backgroundColor={Colors.appColor2}
                underlyingColor={Colors.appColor1}
              />
              <View style={styles.timersContainer}>
                <Text>{moment.utc(position * 1000).format('mm:ss')}</Text>
                <Text>{moment.utc(duration * 1000).format('mm:ss')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.controllersContainer}>
            <TouchableOpacity
              onPress={skipToPrevious}
              activeOpacity={0.7}
              disabled={trackIndex === 2}>
              <AntDesign name="stepbackward" size={width(6)} color={Colors.appIconColor1} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.seekTo(Math.floor(position) - 10 >= 10 ? Math.floor(position) - 10 : 0)
              }}
              activeOpacity={0.7}>
              <AntDesign name="fastbackward" size={width(6)} color={Colors.appIconColor1} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPasueContainer}
              activeOpacity={0.7}
              onPress={_playAudio}>
              <AntDesign name={!isPlay ? 'caretright' : 'pause'} size={width(8)} color={Colors.appColor2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.seekTo(Math.floor(position) + 10)
              }}
              activeOpacity={0.8}
            >
              <AntDesign name="fastforward" size={width(6)} color={Colors.appIconColor1} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={skipToNext}
              activeOpacity={0.8}
              disabled={trackIndex > chaptersData.length}>
              <AntDesign name="stepforward" size={width(6)} color={Colors.appIconColor1} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
