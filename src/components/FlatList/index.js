import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import Colors from '../../utills/Colors';
import { width } from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import { GetImagePath } from '../../utills/Methods';
import StarRating from 'react-native-star-rating';
const size = `300x450`
export const StoreBooksList = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.viewContainer}>
      <Image source={{ uri: GetImagePath(item?.BookCover, size) }} resizeMode='stretch' style={styles.bookImage} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.bookTitleText}>{item.BookTitle}</Text>
        <Text numberOfLines={1} style={styles.authorNameText}>{`By: ${item.BookAuthor}`}</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          starSize={width(4)}
          fullStarColor={Colors.appColor1}
          emptyStarColor={Colors.appColor1}
          containerStyle={{ justifyContent: 'flex-start' }}
          rating={item?.TotalRatings ? (item?.TotalRatings / item?.TotalRatingUsers) : 0}
          starStyle={{ marginRight: width(1) }}
        />
      </View>
    </TouchableOpacity>
  );
};
export const MyLibraryList = ({ item, onPress, bookType, onDotPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.myViewContainer}>
      <Image source={{ uri: GetImagePath(item.BookDetails?.BookCover, size) }} resizeMode='stretch' style={styles.myLibraryBookImage} />
      <View style={styles.myLibraryTextContainer}>
        <View style={styles.bookInfoContainer}>
          <Text numberOfLines={1} style={styles.myLibraryAuthorNameText}>{item?.BookDetails?.BookAuthor}</Text>
          <Text numberOfLines={1} style={styles.myLibraryBookTitleText}>{item?.BookDetails?.BookTitle}</Text>
          <Text numberOfLines={1} style={styles.myLibraryBookType}>{bookType}</Text>
        </View>
        <TouchableOpacity onPress={onDotPress} activeOpacity={0.7} >
          <Entypo name='dots-three-vertical' size={width(5)} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
