import React from 'react';
import { View, Pressable } from 'react-native';
import styles from './styles';
const SelectedComponent = () => {
  return <View style={styles.selectedDefaultComponent} />
}
const UnselectedComponent = () => {
  return <View style={styles.unSelectedDefaultComponent} />
}
export default Rating = ({ ratingCount = 5, rating = 1, onChangeRating, RenderSelectedRatingComponent, RenderUnselectedRatingComponent,
  containerStyle,isDisabled }) => {
  let ratings = [];
  for (var i = 0; i < ratingCount; i++) ratings.push(i)
  return <View style={[styles.container, containerStyle ?? {}]}>
    {ratings.map(i =>
      <Pressable key={i.toString()} onPress={() => onChangeRating(i + 1)}
      disabled={isDisabled}
      >
        {i < rating ?
          RenderSelectedRatingComponent ? <RenderSelectedRatingComponent /> :
            <SelectedComponent />
          : RenderUnselectedRatingComponent ? <RenderUnselectedRatingComponent />
            :
            <UnselectedComponent />
        }
      </Pressable>
    )}
  </View>
};


