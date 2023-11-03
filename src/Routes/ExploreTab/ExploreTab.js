import * as React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../utills/Colors';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../../screens/Explore/ExploreHome';
import Store from '../../screens/Explore/ExploreStore';
import BooksDetails from '../../screens/Explore/BooksDetails';
import { height, totalSize } from 'react-native-dimension';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function ExploreTabBar({ }) {
    return (
        <Tab.Navigator
            lazy={false}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
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
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="StoreTab">
                {() => (
                    <Stack.Navigator initialRouteName="Store" headerMode="none">
                        <Stack.Screen name="Store" component={Store} />
                        <Stack.Screen name="BooksDetails" component={BooksDetails} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
