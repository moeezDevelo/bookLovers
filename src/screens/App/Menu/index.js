import React, { Fragment } from 'react';
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { MenuComponent } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { TitleHeader } from '../../../components/Headers/index';
import { useSelector } from 'react-redux';
export default function Menu({ navigation }) {
  const user = useSelector((state) => state.Auth.user);
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
        <TitleHeader title='Menu' onPress={() => navigation.goBack()} isCross />
        <View style={styles.line} />
        <View style={styles.mainViewContainer}>
          <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <MenuComponent title='Home' onPress={() => navigation.goBack()} />
            <MenuComponent title='Book Lovers Store' onPress={() => navigation.navigate('StoreTab')} />
            <MenuComponent title='My Library' onPress={() => navigation.navigate('MyLibrary')} />
            <MenuComponent title='Story Time' onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('StoryTimeTab')} />
            <MenuComponent title='Alternate Endings' onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('EditorNotesTab')} />
            <MenuComponent title={`Author's Spotlight`} onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('AuthorSpotlightList')} />
            <MenuComponent title='Discussion Forums' onPress={() => user?.idToken?.payload['custom:MembershipType'] == 'Standard' ? navigation.navigate('PremiumContent') : navigation.navigate('DiscussionForum')} />
            <MenuComponent title='Profile' onPress={() => navigation.navigate('ProfileTab')} />
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
    </Fragment>
  );
}
