import React, { Fragment, useState, useEffect, createRef, useCallback } from 'react';
import {
    View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, TextInput, ImageBackground, Platform, BackHandler, ActivityIndicator
} from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { width, height, totalSize } from 'react-native-dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReadMore from 'react-native-read-more-text';
import ImagePicker from 'react-native-image-crop-picker';
import { FlatList } from 'react-native-gesture-handler';
import { discussionTopicComment, AddCommentTopic, s3Upload, discussionTopicCommentNext } from '../../../utills/ApiFunctions';
import { login } from '../../../Redux/Actions/Auth';
import { setIsLoader } from '../../../Redux/Actions/config';
import { setComments, addNewComments } from '../../../Redux/Actions/Comments'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { debounce } from "lodash";
import { GetImagePath } from '../../../utills/Methods';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function DiscussionForumComment({ navigation, route }) {
    const size = `500x500`
    const profileImageSize = `50x50`
    const topicDetail = route?.params?.topicDetail;
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('')
    const [LastEvaluatedKey, setLastEvaluatedKey] = useState(null)
    const [newCommentImage, setNewCommentImage] = useState('')
    const [buttonDisable, setButtonDisable] = useState(false)
    const commentData = useSelector(state => state.Comments.commentData)
    const inputRef = createRef(null)
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
    const _getCommnet = async () => {
        dispatch(setIsLoader(true))
        const response = await discussionTopicComment({
            TopicId: topicDetail.Id
        });
        if (response?.success) {
            setLastEvaluatedKey(response.data?.LastEvaluatedKey ?? null)
            dispatch(setComments(response.data.Items))
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
            _showMessage(response?.message ?? 'An error occurred while retrieving the discussion comments.  If the problem persists, please contact booklovershelp@gmail.com.')
            _handleEmailError('get Comments', JSON.stringify(response))
        }
    }
    const getNext = async () => {
        const response = await discussionTopicCommentNext(topicDetail.Id, LastEvaluatedKey?.Id, LastEvaluatedKey?.lastUpdatedTs);
        if (response?.success) {
            setLastEvaluatedKey(response.data?.LastEvaluatedKey ?? null)
            dispatch(setComments([...commentData, ...response.data.Items]))
        }
        else {
            dispatch(setIsLoader(false))
            _showMessage(response?.message ?? 'An error occurred while retrieving the discussion comments.  If the problem persists, please contact booklovershelp@gmail.com.')
            _handleEmailError('Next Comments', JSON.stringify(response))
        }
    }
    const AddComment = async (commentImage = '', newCommentTemp = newComment) => {
        dispatch(setIsLoader(true))
        let obj = {
            TopicId: topicDetail.Id,
            UserName: `${user?.idToken.payload?.given_name} ${user?.idToken.payload?.family_name}`,
            UserImageUrl: user?.idToken?.userData?.ProfileImage,
            snsARN: user?.idToken?.userData?.snsARN
        };
        if (newCommentImage != '' && newCommentTemp != '')
            obj = {
                ...obj,
                CommentImages: commentImage,
                Comment: newCommentTemp
            }
        if (newCommentTemp == '' && newCommentImage != '')
            obj = {
                ...obj,
                CommentImages: commentImage
            }
        if (newCommentImage == '' && newCommentTemp != '') {
            obj = {
                ...obj,
                Comment: newCommentTemp
            }
        }
        const response = await AddCommentTopic({
            data: obj
        })
        if (response?.success) {
            let newUser = { ...user }
            dispatch(addNewComments(response.data))
            setNewComment('')
            setNewCommentImage('')
            dispatch(setIsLoader(false))
            setButtonDisable(false)
            if (typeof newUser.idToken.userData === 'undefined') {
                const userObj = {
                    ...newUser,
                    idToken: {
                        ...newUser.idToken,
                        userData: {
                            CommentCount: 1
                        }
                    }
                }
                dispatch(login(userObj))
            }
            else {
                newUser.idToken.userData.CommentCount = newUser?.idToken?.userData?.CommentCount + 1
                dispatch(login(newUser))
            }
        }
        else {
            _showMessage(response?.message ?? 'An error occurred while adding the comment.  If the problem persists, please contact booklovershelp@gmail.com.')
            _handleEmailError('add Comments', JSON.stringify(response))
        }
    }
    const _uploadS3 = async (image) => {
        const response = await s3Upload({
            key: "CommentImage.jpg",
            imageType: "Comments",
            base64String: image
        });
        if (response.success) {
            AddComment(response.data)
        }
        else {
            dispatch(setIsLoader(false))
            _showMessage('An error occurred while uploading the image for this comment.  If the problem persists, please contact booklovershelp@gmail.com.')
            _handleEmailError('Upload S3 comment Image', JSON.stringify(response))
        }
    }
    const uploadImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            setNewCommentImage('data:image/jpeg;base64,' + image.data)
        });
    }
    const searchDebounceHandler = useCallback(debounce(newCommentImage == '' ? (val) => AddComment(undefined, val) : () => _uploadS3(newCommentImage), 1000), []);
    const _postComment = () => {
        setButtonDisable(true)
        searchDebounceHandler(newComment)
    }
    const _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={styles.seeText} onPress={handlePress}>Read more</Text>
        )
    }
    const _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={styles.seeText} onPress={handlePress}>Read less</Text>
        )
    }
    const _showComments = ({ item }) => {
        return (
            <View style={styles.flatListViewContainer}>
                {user?.idToken?.userData?.Id != item?.UserId && <TouchableOpacity style={styles.reportButton}
                    onPress={() => navigation.navigate('ReportLists', { comment: item })}
                >
                    <Text style={styles.reportText}>Report</Text>
                </TouchableOpacity>
                }
                <View style={styles.personInfoContainer}>
                    <Image source={{ uri: item?.UserImageUrl ? GetImagePath(item.UserImageUrl, profileImageSize) : 'data:image/png;base64,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' }}
                        resizeMode='cover' style={styles.personImage} />
                    <View style={styles.nameContainer}>
                        <Text numberOfLines={1} style={styles.personNameText}>{item?.UserName ?? 'Anonymous'}</Text>
                        <Text style={styles.timeText}>{moment(item.lastUpdatedTs).fromNow()}</Text>
                    </View>
                </View>
                <View style={styles.commentContainer}>
                    {item.Comment &&
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={_renderTruncatedFooter}
                            renderRevealedFooter={_renderRevealedFooter}
                        >
                            <Text style={styles.commemtText}>{item.Comment}</Text>
                        </ReadMore>
                    }
                    {item?.CommentImages && (
                        <Image source={{ uri: GetImagePath(item?.CommentImages, size) }} resizeMode='cover' style={styles.commentImage} />
                    )}
                </View>
                <View style={styles.line} />
                <View style={styles.repliesContainer}>
                    {item?.Replies ? <TouchableOpacity style={styles.replyButton}
                        onPress={() => navigation.navigate('Replies', { commentData: item, topicId: topicDetail.Id })}
                    >
                        <Text style={styles.replyText}>{`See Replies ${item?.Replies?.length}`}</Text>
                    </TouchableOpacity> :
                        <View />
                    }
                    <TouchableOpacity style={styles.replyButton}
                        onPress={() => navigation.navigate('Replies', { commentData: item, topicId: topicDetail.Id })}
                    >
                        <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    useEffect(() => {
        let mounted = true
        if (mounted) {
            _getCommnet()
        }
        return () => mounted = false
    }, [])
    useEffect(() => {
        const backAction = () => {
            dispatch(setComments([]))
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);
    return (
        <Fragment>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={(styles.container, { backgroundColor: Colors.white })} />
            <Header title={topicDetail?.Topic} containerStyles={styles.containerStyles} isBack
                onPress={() => {
                    dispatch(setComments([]))
                    navigation.goBack()
                }}
            />
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    nestedScrollEnabled={true}
                    automaticallyAdjustContentInsets={false}
                    containerStyles={styles.scrollView}
                >
                    <View style={[styles.commentsFlatListContainer, newCommentImage != '' ? { height: Platform.OS === 'ios' ? height(65) : height(72) } : {}]}>
                        <FlatList
                            data={commentData}
                            style={{ flex: 1 }}
                            nestedScrollEnabled={true}
                            ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                            renderItem={_showComments}
                            contentContainerStyle={styles.flatListContainer}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.Id.toString()}
                            onEndReached={LastEvaluatedKey ? getNext : null}
                            onEndReachedThreshold={1}
                            ListHeaderComponent={() => {
                                return (
                                    <>
                                        <Image source={{ uri: GetImagePath(topicDetail.ImageUrl, size) }} resizeMode='stretch' style={styles.bannerImage} />
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.aboutText}>{topicDetail.TopicDescription}</Text>
                                            <View style={styles.likesCommentContainer}>
                                                <Ionicons name='chatbox-ellipses-sharp' size={width(5)} color={Colors.appTextColor6} />
                                                <Text style={styles.likesCommentText}>{commentData?.length}</Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            }}
                            ListFooterComponent={() => LastEvaluatedKey ? <ActivityIndicator style={{ marginTop: height(2) }} color={Colors.appColor1} size="large" /> : null}
                        />
                    </View>
                    <View style={[styles.bottomContainer, newCommentImage != '' ? { height: height(19) } : {}]}>
                        {newCommentImage != '' &&
                            <ImageBackground source={{ uri: newCommentImage }} resizeMode='cover' style={styles.newCommentImage} >
                                <View style={styles.crossImageContainer}>
                                    <AntDesign name='closecircle' size={totalSize(2.5)} color={Colors.white}
                                        onPress={() => setNewCommentImage('')}
                                    />
                                </View>
                            </ImageBackground>
                        }
                        <View style={styles.inputTextContainer}>
                            <FontAwesome name='camera' size={width(7)} color={Colors.appColor1} solid
                                onPress={uploadImage}
                            />
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder={'Add a comment...'}
                                    placeholderTextColor={Colors.appTextColor6}
                                    autoCapitalize='none'
                                    style={styles.textInput}
                                    ref={inputRef}
                                    returnKeyType={'done'}
                                    value={newComment}
                                    onChangeText={(val) => setNewComment(val)}
                                />
                            </View>
                            <TouchableOpacity style={styles.sentButton}
                                onPress={_postComment}
                                disabled={((newComment != '' || newCommentImage != '') && !buttonDisable) ? false : true}
                            >
                                <Ionicons name='send' size={width(3)} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}