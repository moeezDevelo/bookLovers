import React, { Fragment, useEffect } from 'react';
import {
  View, Text, StatusBar, SafeAreaView, Image, ScrollView, ImageBackground, TouchableOpacity, FlatList
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utills/Colors';
import homeHeader from '../../../assets/App/homeHeader.png';
import Entypo from 'react-native-vector-icons/Entypo';
import { width, height } from 'react-native-dimension';
import { SliderBox } from "react-native-image-slider-box";
import { ladingPage, discussionTopicCommentBYID } from '../../../utills/ApiFunctions';
import { landingPageData } from '../../../Redux/Actions/config';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import { showMessage } from 'react-native-flash-message';
import { setNotificationType } from '../../../Redux/Actions/Notification';
import { handleEmailError } from '../../../utills/GlobalFunction';
export default function Home({ navigation }) {
  const user = useSelector((state) => state.Auth.user);
  const notificationType = useSelector((state) => state.Notification.notificationType);
  const commentDetails = useSelector((state) => state.Notification.commentDetails);
  const size = `500x500`;
  const bookImageSize = '300x450';
  const data = useSelector((state) => state.config.landingPage)
  const dispatch = useDispatch();
  const images = data ? data?.Advertisements?.map(item => item.Url) : []
  const _showDiscussion = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}
        onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('DiscussionForumComment', { topicDetail: item })}
        style={styles.disscussionViewContainer}>
        <Image source={{ uri: GetImagePath(item.ImageUrl, size) }} resizeMode='stretch' style={styles.discussionImage} />
        <View style={styles.discussionTextContainer}>
          <Text numberOfLines={2} style={styles.discussionMessageText} >{item.Topic}</Text>
          <Text style={styles.discussionNameText} >{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const _showEditorNotes = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}
        onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('EditorNotesTab', { screen: 'EditorNotesDetail', initial: false, params: { item: item } })}
        style={styles.editorNotesViewContainer}>
        <Image source={{ uri: GetImagePath(item.Image, size) }} resizeMode='stretch' style={styles.editorTopicImage} />
        <View style={styles.editorTopicTextContainer}>
          <Text style={styles.editorTopicTitleText}>{item.Title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const _showStories = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}
        onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('StoryTimeTab', { screen: 'StoryTimeDetail', initial: false, params: { item: item } })}
        style={styles.storyTimeViewContainer}>
        <Image source={{ uri: GetImagePath(item.ImageUrl, size) }} resizeMode='stretch' style={styles.storyTimeImage} />
        <View style={styles.storyTimeTextContainer}>
          <Text style={styles.storyTimeHeading}>{item.Title}</Text>
          <Text style={styles.storyTimeTitleText}>{item.Author}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const _showMessage = (description = '') => {
    showMessage({
      message: 'Error',
      description: description,
      type: 'danger',
      duration: 8000
    });
  }
  const _getLandingData = async () => {
    const response = await ladingPage();
    if (response?.success) {
      dispatch(landingPageData(response.data))
      dispatch(setIsLoader(false))
    }
    else if (response?.status === 401) {
      _showMessage('Your session has expired, please log back in.');
      dispatch(logout());
    }
    else {
      dispatch(setIsLoader(false))
      _showMessage('An error occurred while loading home screen data.  If the problem persists, please contact booklovershelp@gmail.com.')
      handleEmailError({
        Subject: 'Landing Page Data',
        Message: JSON.stringify(response)
      })
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getLandingData()
    }
    return () => mounted = false
  }, [])
  const _getCommentById = async () => {
    const response = await discussionTopicCommentBYID(commentDetails?.Id)
    if (response?.success) {
      navigation.navigate(notificationType, { commentData: response?.data, topicId: commentDetails?.topicId, isHome: true })
    }
    else {
      _showMessage('An error occurred while loading the discussion topic. If the problem persists, please contact booklovershelp@gmail.com')
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted && notificationType != '') {
      if (notificationType == 'Replies') {
        _getCommentById()
      }
      else {
        navigation.navigate(notificationType)
      }
      dispatch(setNotificationType({ notification: '' }))
    }
    return () => mounted = false
  }, [notificationType])
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.appColor2}
      />
      <View style={styles.mainViewContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <ImageBackground source={homeHeader} resizeMode='cover' style={styles.homeHeader} >
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <Entypo name='dots-three-horizontal' size={width(6)} color={Colors.white}
                onPress={() => navigation.navigate('Menu')} />
            </View>
          </ImageBackground>
          <View style={styles.imageSliderContainer}>
            <SliderBox
              images={images}
              sliderBoxHeight={height(30)}
              resizeMode={'cover'}
              ImageComponentStyle={styles.imageComponentStyle}
              dotColor={Colors.appColor1}
              inactiveDotColor={Colors.white}
              disableOnPress={true}
              paginationBoxStyle={styles.paginationBoxStyle}
              dotStyle={styles.dotStyle}
              imageLoadingColor={Colors.appColor1}
            />
          </View>
          <View style={styles.disscussionContainer}>
            <Text style={styles.disscussionHeading}>New Discussion Topics</Text>
            <TouchableOpacity onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('DiscussionForum')}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.disscussionFlatlistContainer}>
            <FlatList
              data={data?.DiscussionTopics}
              ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
              renderItem={_showDiscussion}
              horizontal={true}
              contentContainerStyle={styles.discussionTopicFlatList}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.Id.toString()}
            />
          </View>
          <TouchableOpacity style={styles.authorSpotLightContainer} activeOpacity={1}
            onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('AutherSpotLightDetails', { item: data?.Spotlights[0] })}
          >
            <View style={styles.authorSpotTextContainer}>
              <View style={styles.authorSpotNewContainer}>
                <Text style={styles.authorSpotNewText}>NEW!</Text>
              </View>
              <Text style={styles.authorSpotText}>AUTHOR SPOTLIGHT</Text>
              <Text style={styles.authorNameText}>{data?.Spotlights[0]?.AuthorName}</Text>
            </View>
            <Image source={{ uri: GetImagePath(data?.Spotlights[0]?.FeaturedTitles[0]?.BookCover, bookImageSize) }} resizeMode='contain' style={styles.authorImage} />
          </TouchableOpacity>
          <View style={styles.editorNotesContainer}>
            <Text style={styles.editorNotesText}>Alternate Endings</Text>
            <TouchableOpacity onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('EditorNotesTab')}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.editorNotesFlatlistContainer}>
            <FlatList
              data={data?.EditorNotes}
              ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
              renderItem={_showEditorNotes}
              horizontal={true}
              contentContainerStyle={styles.editorNotesFlatList}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.Id.toString()}
            />
          </View>
          <View style={styles.storyTimeContainer}>
            <Text style={styles.storyTimeText}>Story Time</Text>
            <TouchableOpacity onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('StoryTimeTab')}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.storyTimeFlatlistContainer}>
            <FlatList
              data={data?.StoryTime}
              ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
              renderItem={_showStories}
              horizontal={true}
              contentContainerStyle={styles.storyTimeFlatList}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.Id.toString()}
            />
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
