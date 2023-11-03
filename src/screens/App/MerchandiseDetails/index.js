import React, { Fragment, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './styles';
import { CartHeader } from '../../../components/Headers/index';
import {Button} from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { useDispatch } from 'react-redux';
import {setCartItem,cartCount} from '../../../Redux/Actions/Cart';
import { GetImagePath } from '../../../utills/Methods';
export default function MerchandiseDetails({ navigation, route }) {
    const item = route?.params?.item;
    const size=`500x500`;
    const dispatch = useDispatch();
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
                <CartHeader onPress={() => navigation.goBack()} />
                <View style={styles.mainViewContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollView}
                    >
                        <Image source={{ uri: GetImagePath(item?.ImageUrl,size) }} resizeMode='cover' style={styles.itemImage} />
                        <View style={styles.namePriceContainer}>
                                <Text style={styles.itemNameText}>{item?.Title}</Text>
                                <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>{`$${item?.Price}`}</Text>
                                </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>{item?.Description}</Text>
                        </View>
                    </ScrollView>
                    <Button title='ADD TO CART' containerStyles={styles.addToCartButton}
                    onPress={()=>{
                        dispatch(setCartItem(item))
                        dispatch(cartCount())
                    }}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
