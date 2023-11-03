import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { TitleHeader } from '../../../components/Headers/index';
import { getStoryTime } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import storyTimeHeaderPhoto from '../../../assets/App/storyTimeHeaderPhoto.jpg';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';

export default function StoryTimes({ navigation }) {
  const size = `100x100`;
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [storyTime, setStoryTime] = useState([])
  const _showStoryTime = ({ item }) => {
    return (
      <TouchableOpacity style={styles.flatListViewContainer} activeOpacity={1}
        onPress={() => navigation.navigate('StoryTimeDetail', { item: item })}
      >
        <Image source={{ uri: GetImagePath(item.ImageUrl, size) }} resizeMode='cover' style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item?.Title}</Text>
          <Text style={styles.headingTitleText}>{item?.Author}</Text>
          <Text style={styles.timeText}>{item.StoryLength}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const _getStoryTime = async () => {
    dispatch(setIsLoader(true))
    const response = await getStoryTime();
    if (response.success) {
      setStoryTime(response.data)
      dispatch(setIsLoader(false))
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
      showMessage({
        message: 'Error',
        description: 'An error occurred while retrieving stories.  If the problem persists, please contact booklovershelp@gmail.com.',
        type: 'danger',
        duration: 8000
      });
      dispatch(setIsLoader(false))
      handleEmailError({
        Subject: 'Story time',
        Message: JSON.stringify(response)
      })
    }
  }
  useEffect(() => {
    _getStoryTime()
  }, [user?.idToken?.payload['custom:MembershipType']])
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.white}
      />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <TitleHeader title='Story Time' />
        <View style={styles.mainViewContainer}>
          <FlatList
            data={storyTime}
            ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
            renderItem={_showStoryTime}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.Id.toString()}
            ListHeaderComponent={() =>
              <View style={styles.headerTextContainer}>
                <Image source={storyTimeHeaderPhoto} resizeMode='stretch' style={styles.bannerImage} />
                <Text style={styles.headingInfoText}>Enjoy Story Time from your favorite author Ashley Antoinette</Text>
                <Text style={styles.headingText}>Recent Stories</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
