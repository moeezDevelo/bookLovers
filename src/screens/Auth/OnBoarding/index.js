import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Button } from '../../../components/Button/index';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../../utills/Colors';
import appIntro1 from '../../../assets/Auth/appIntro1.jpg';
import appIntro2 from '../../../assets/Auth/appIntro2.jpg';
export default function OnBoarding({ navigation }) {

  const [index, setIndex] = useState(0)
  const slides = [
    {
      key: 1,
      title: 'Your Community',
      text: 'Join an online community with thousands of avid readers like you.',
      image: appIntro1
    },
    {
      key: 2,
      title: 'Grow your bookshelf!',
      text: 'Collect titles from favorite authors and explore new ones!',
      image: appIntro2
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <Image source={item.image} style={styles.image} />
    )
  }
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainViewContainer}>
          <View style={styles.sliderContainer}>
            <AppIntroSlider
              renderItem={_renderItem}
              data={slides}
              showNextButton={false}
              showDoneButton={false}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}
              onSlideChange={(index) => setIndex(index)}
              keyExtractor={item => item.key.toString()}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{slides[index].title}</Text>
          <Text style={styles.descriptionText}>{slides[index].text}</Text>
        </View>
        <Button title='CREATE ACCOUNT' onPress={() => navigation.navigate('SignUp')} />
        <TouchableOpacity style={styles.signInButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}
          onPress={() => navigation.navigate('VerifyEmail')}
        >
          <Text style={styles.signInButtonText}>Verify My Account</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
