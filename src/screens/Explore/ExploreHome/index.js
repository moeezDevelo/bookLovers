import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, ScrollView, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utills/Colors';
import homeHeader from '../../../assets/App/homeHeader.png';
import { height } from 'react-native-dimension';
import { SliderBox } from "react-native-image-slider-box";
import { getPublicLandingData } from '../../../utills/ApiFunctions';
import { exploreLandingData } from '../../../Redux/Actions/Explore';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import { LogInModal } from '../../../components/Modals';
import { showMessage } from 'react-native-flash-message';
export default function ExploreHome({ }) {
  const [isVisible, setIsVisible] = useState(false)
  const size = `500x500`;
  const bookImageSize = '300x450';
  const data = useSelector((state) => state.Explore.landingPage)
  const dispatch = useDispatch();
  const images = data ? data?.Advertisements?.map(item => item.Url) : []
  const _showDiscussion = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}
        onPress={() => setIsVisible(true)}
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
        onPress={() => setIsVisible(true)}
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
        onPress={() => setIsVisible(true)}
        style={styles.storyTimeViewContainer}>
        <Image source={{ uri: GetImagePath(item.ImageUrl, size) }} resizeMode='stretch' style={styles.storyTimeImage} />
        <View style={styles.storyTimeTextContainer}>
          <Text style={styles.storyTimeHeading}>{item.Title}</Text>
          <Text style={styles.storyTimeTitleText}>{item.Author}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const _getLandingData = async () => {
    dispatch(setIsLoader(true))
    const response = await getPublicLandingData();
    if (response?.success) {
      dispatch(exploreLandingData(response.data))
      dispatch(setIsLoader(false))
    }
    else {
      dispatch(setIsLoader(false))
      showMessage({
        message: 'Error',
        description: 'An error occurred while loading data. If the problem persists please contact booklovershelp@gmail.com',
        type: 'danger',
        duration: 8000
      });
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getLandingData()
    }
    return () => mounted = false
  }, [])
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
            <TouchableOpacity onPress={() => setIsVisible(true)}>
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
            onPress={() => setIsVisible(true)}>
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
            <TouchableOpacity onPress={() => setIsVisible(true)}>
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
            <TouchableOpacity onPress={() => setIsVisible(true)}>
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
      <LogInModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </Fragment>
  );
}
