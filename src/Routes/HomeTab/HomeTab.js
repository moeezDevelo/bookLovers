import * as React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../utills/Colors';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { totalSize, height } from 'react-native-dimension';
import Home from '../../screens/App/Home';
import DiscussionForum from '../../screens/App/DiscussionForum';
import AutherSpotLightDetails from '../../screens/App/AutherSpotLightDetails';
import Store from '../../screens/App/Store';
import BooksDetails from '../../screens/App/BooksDetails';
import RedeemVoucher from '../../screens/App/RedeemVoucher';
import MerchandiseDetails from '../../screens/App/MerchandiseDetails';
import Cart from '../../screens/App/Cart';
import StoryTime from '../../screens/App/StoryTime';
import StoryTimeDetail from '../../screens/App/StoryTimeDetail';
import EditorNotes from '../../screens/App/EditorNotes';
import EditorNotesDetail from '../../screens/App/EditorNotesDetail';
import Profile from '../../screens/App/Profile';
import AuthorSpotlightList from '../../screens/App/AuthorSpotLightList';
import PremiumContent from '../../screens/App/PremiumContent/index';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function MyTabBar({ }) {
  const user = useSelector((state) => state.Auth.user);
  return (
    <Tab.Navigator
      lazy={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == 'Home') {
            return (
              <>
                <Entypo
                  name="home"
                  size={totalSize(2.5)}
                  color={
                    (iconName = focused
                      ? Colors.appColor1
                      : Colors.appIconColor1)
                  }
                />
                <Text
                  style={
                    (iconName = focused
                      ? styles.activeLabel
                      : styles.inActiveLabel)
                  }>
                  Home
                </Text>
              </>
            );
          }
          if (route.name == 'StoreTab') {
            return (
              <>
                <Feather
                  name="shopping-cart"
                  size={totalSize(2.5)}
                  color={
                    (iconName = focused
                      ? Colors.appColor1
                      : Colors.appIconColor1)
                  }
                />
                <Text
                  style={
                    (iconName = focused
                      ? styles.activeLabel
                      : styles.inActiveLabel)
                  }>
                  Store
                </Text>
              </>
            );
          }
          if (route.name == 'StoryTimeTab') {
            return (
              <>
                <SimpleLineIcons
                  name="notebook"
                  size={totalSize(2.5)}
                  color={
                    (iconName = focused
                      ? Colors.appColor1
                      : Colors.appIconColor1)
                  }
                />
                <Text
                  style={
                    (iconName = focused
                      ? styles.activeLabel
                      : styles.inActiveLabel)
                  }>
                  Story Time
                </Text>
              </>
            );
          }
          if (route.name == 'EditorNotesTab') {
            return (
              <>
                <FontAwesome
                  name="file"
                  size={totalSize(2.5)}
                  solid
                  color={
                    (iconName = focused
                      ? Colors.appColor1
                      : Colors.appIconColor1)
                  }
                />
                <Text
                  style={
                    (iconName = focused
                      ? styles.activeLabel
                      : styles.inActiveLabel)
                  }>
                  Alternate Endings
                </Text>
              </>
            );
          }
          if (route.name == 'ProfileTab') {
            return (
              <>
                <AntDesign
                  name="user"
                  size={totalSize(2.5)}
                  color={
                    (iconName = focused
                      ? Colors.appColor1
                      : Colors.appIconColor1)
                  }
                />
                <Text
                  style={
                    (iconName = focused
                      ? styles.activeLabel
                      : styles.inActiveLabel)
                  }>
                  Profile
                </Text>
              </>
            );
          }
        },
      })}
      tabBarOptions={{
        // keyboardHidesTabBar:true,
        showLabel: false,
        activeTintColor: Colors.appColor1,
        inactiveTintColor: Colors.appIconColor1,
        style: {
          backgroundColor: Colors.white,
          height: height(10),
          paddingVertical: height(1),
        },
      }}>
      <Tab.Screen name="Home">
        {() => (
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DiscussionForum" component={DiscussionForum} />
            <Stack.Screen name="AuthorSpotlightList" component={AuthorSpotlightList} />
            <Stack.Screen name="AutherSpotLightDetails" component={AutherSpotLightDetails} />
            <Stack.Screen name="EditorNotess" component={EditorNotes} />
            <Stack.Screen name="PremiumContent" component={PremiumContent} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="StoreTab">
        {() => (
          <Stack.Navigator initialRouteName="Store" headerMode="none">
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="BooksDetails" component={BooksDetails} />
            <Stack.Screen name="RedeemVoucher" component={RedeemVoucher} />
            <Stack.Screen name="MerchandiseDetails" component={MerchandiseDetails} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="StoryTimeTab">
        {() => (
          <Stack.Navigator
            headerMode="none">
            {user?.idToken?.payload['custom:MembershipType'] === 'Standard' && (
              <Stack.Screen name="PremiumContent" component={PremiumContent} />
            )}
            <Stack.Screen name="StoryTime" component={StoryTime} />
            <Stack.Screen name="StoryTimeDetail" component={StoryTimeDetail} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="EditorNotesTab">
        {() => (
          <Stack.Navigator headerMode="none">
            {user?.idToken?.payload['custom:MembershipType'] === 'Standard' && (
              <Stack.Screen name="PremiumContent" component={PremiumContent} />
            )}
            <Stack.Screen name="EditorNotes" component={EditorNotes} />
            <Stack.Screen name="EditorNotesDetail" component={EditorNotesDetail} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
}
