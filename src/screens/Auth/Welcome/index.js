import React, { Fragment } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import welcomeImage from '../../../assets/Auth/welcome.png';
import { useDispatch } from 'react-redux';
import { setExplore } from '../../../Redux/Actions/config'
export default function Welcome({ navigation }) {
  const dispatch = useDispatch()
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.appColor} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.appColor })}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainViewContainer}>
          <Image source={welcomeImage} style={styles.welcomeImage} />
        </View>
        <Text style={styles.welcomeText}>The ultimate book club experience that{'\n'}connects thousands of readers at the{'\n'}click of a button.</Text>
        <Button title='GET STARTED' onPress={() => navigation.navigate('OnBoarding')} />
        <TouchableOpacity style={styles.signInButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exploreButton}
          onPress={() => {
            dispatch(setExplore(true))
          }}
        >
          <Text style={styles.guestText}>Continue without login</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}