import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { height, width } from 'react-native-dimension';
import { ReviewModal } from '../../../components/Modals';
import { GetImagePath } from '../../../utills/Methods';
import StarRating from 'react-native-star-rating';
import bookIcon from '../../../assets/App/bookIcon.png';
import halfBookIcon from '../../../assets/App/halfBookIcon.png';
export default function StoryTimeDetails({ navigation, route }) {
    const size = `300x450`;
    const authorDetails = route?.params?.item;
    const [isVisible, setIsVisible] = useState(false);
    const _showFeaturedBooks = ({ item }) => {
        return (
            <TouchableOpacity style={styles.flatListViewContainer} activeOpacity={1}
                onPress={() => {
                    navigation.navigate('BooksDetails', { item: { ...item, IsAuthorSpotlightBook: true } })
                    navigation.popToTop()
                }}
            >
                <Image source={{ uri: GetImagePath(item?.BookCover, size) }} resizeMode='stretch' style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{authorDetails?.AuthorName}</Text>
                    <Text numberOfLines={1} style={styles.headingTitleText}>{item?.BookTitle}</Text>
                    <Text style={styles.timeText}>{item?.Length}</Text>
                </View>
            </TouchableOpacity>
        )
    }
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
                <Header title={`Author's Spotlight`} containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.navigate('AuthorSpotlightList')}
                />
                <View style={styles.mainViewContainer}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
                        <Image source={{ uri: GetImagePath(authorDetails?.ImageUrl, size) }} resizeMode='stretch' style={styles.spotLightBanner} />
                        <View style={styles.authorNameContainer}>
                            <Text style={styles.authorNameHeading}>{authorDetails?.AuthorName}</Text>
                        </View>
                        <View style={styles.booksDetilsContainer}>
                            <View style={styles.booksDetilsInnerContainer}>
                                <View style={styles.iconContainer}>
                                    <Entypo name='book' size={height(2.5)} color={Colors.white} />
                                </View>
                                <View style={styles.detailBookTextContainer}>
                                    <Text style={styles.detailTitleText}>{`Book Lover's Rating`}</Text>
                                    <StarRating
                                        disabled={true}
                                        maxStars={authorDetails?.BookLoversReview}
                                        starSize={width(4)}
                                        containerStyle={{ justifyContent: 'flex-start' }}
                                        rating={authorDetails?.BookLoversReview}
                                        iconSet={'Entypo'}
                                        fullStar={bookIcon}
                                        halfStar={halfBookIcon}
                                        fullStarColor={Colors.appColor1}
                                        starStyle={{ marginRight: width(1) }}
                                    />
                                    <TouchableOpacity onPress={() => { setIsVisible(true) }}>
                                        <Text style={styles.editorReviews}>View editors Review</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.booksDetilsInnerContainer}
                                activeOpacity={0.7}
                                onPress={() => { Linking.openURL(authorDetails?.WebsiteUrl) }}
                            >
                                <View style={styles.iconContainer}>
                                    <AntDesign name='link' size={height(2)} color={Colors.white} />
                                </View>
                                {authorDetails?.WebsiteUrl && <View style={styles.detailBookTextContainer}>
                                    <Text style={styles.detailTitleText}>{authorDetails?.WebsiteUrl}</Text>
                                </View>}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.aboutContainer}>
                            <Text style={styles.bioText}>{authorDetails?.Bio}</Text>
                        </View>
                        {authorDetails?.FeaturedTitles &&
                            <FlatList
                                data={authorDetails.FeaturedTitles}
                                ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                                renderItem={_showFeaturedBooks}
                                contentContainerStyle={styles.flatListContainer}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.Id.toString()}
                                ListHeaderComponent={() =>
                                    <View style={styles.headerTextContainer}>
                                        <Text style={styles.headingText}>Featured Title</Text>
                                    </View>
                                }
                            />}
                    </ScrollView>
                </View>
            </SafeAreaView>
            <ReviewModal isVisible={isVisible} onClose={() => setIsVisible(false)}
                review={authorDetails?.BookLoversReviewText}
            />
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment >
    );
}
