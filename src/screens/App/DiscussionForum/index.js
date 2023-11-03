import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useDispatch } from 'react-redux';
import Colors from '../../../utills/Colors';
import { TitleHeader } from '../../../components/Headers/index';
import { discussionTopicData } from '../../../utills/ApiFunctions';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function DiscussionForum({ navigation }) {
    const size = `500x500`;
    const dispatch = useDispatch();
    const [discussionTopic, setDiscussionData] = useState([])
    const _showDiscussion = ({ item }) => {
        return (
            <TouchableOpacity style={styles.flatListViewContainer} activeOpacity={1}
                onPress={() => navigation.navigate('DiscussionForumComment', { topicDetail: item })}
            >
                <Image source={{ uri: GetImagePath(item.ImageUrl, size) }} resizeMode='stretch' style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.Topic}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const _getDiscussionTopic = async () => {
        dispatch(setIsLoader(true))
        const response = await discussionTopicData();
        if (response.success) {
            setDiscussionData(response.data)
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
            dispatch(setIsLoader(false))
            showMessage({
                message: 'Error',
                description: 'An error occurred while retrieving discussions.  If the problem persists, please contact booklovershelp@gmail.com.',
                type: 'danger',
                duration: 8000
            });
            handleEmailError({
                Subject: 'DiscussionTopic',
                Message: JSON.stringify(response)
            })
        }
    }
    useEffect(() => {
        let mounted = true
        if (mounted) {
            _getDiscussionTopic()
        }
        return () => mounted = false
    }, [])
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
                <TitleHeader title='Discussion Forum' isCross
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <FlatList
                        data={discussionTopic}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                        renderItem={_showDiscussion}
                        contentContainerStyle={styles.flatListContainer}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.Id.toString()}
                        ListHeaderComponent={() => <Text style={styles.headingText}>Recent Discussions</Text>}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}
