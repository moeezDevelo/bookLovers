import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { width } from 'react-native-dimension';
import bookLoverImage from '../../assets/App/bookLoverImage.png'
import Colors from '../../utills/Colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export const Header = ({ title, onPress, containerStyles, isBack, textStyle, isMenu, onPressMenu }) => {
    return (
        <View style={[styles.container, containerStyles ? containerStyles : {}]}>
            <TouchableOpacity style={styles.leftIconContainer} onPress={onPress}>
                {isBack ?
                    <AntDesign name='arrowleft' size={width(6)} color={Colors.black} /> :
                    <Ionicons name='md-close-sharp' size={width(6)} color={Colors.black} />
                }
            </TouchableOpacity>
            {title && (<Text numberOfLines={2} style={[styles.text, textStyle ?? {}]}>{title}</Text>)}
            {isMenu ?
                <TouchableOpacity style={styles.rightIconContainer} onPress={onPressMenu}>
                    <Entypo name='dots-three-horizontal' size={width(6)} color={Colors.black} />
                </TouchableOpacity>
                : <View style={styles.emptyHeaderView} />
            }

        </View>
    )
};
export const TitleHeader = ({ title, onPress, containerStyles, isSetting, isPrfileIcon, isCross }) => {
    return (
        <View style={[styles.titleHeaderContainer, containerStyles ?? {}]}>
            <Text style={styles.titleText}>{title}</Text>
            {isSetting && <Entypo name='dots-three-horizontal' size={width(7)} color={Colors.black}
                onPress={onPress}
            />}
            {isPrfileIcon && <MaterialIcons name='settings' size={width(7)} color={Colors.appColor1}
                onPress={onPress}
            />}
            {isCross && <Ionicons name='md-close-sharp' size={width(6)} color={Colors.black}
                onPress={onPress}
            />}
        </View>
    )
};
export const CartHeader = ({ onPress, isLeftICon, title }) => {
    const cart = useSelector(state => state.Cart.cart);
    const navigation = useNavigation();
    return (
        <View style={styles.cartHeaderContainer}>
            <TouchableOpacity style={styles.cartleftIconContainer} onPress={onPress}>
                {!isLeftICon && <AntDesign name='arrowleft' size={width(7)} color={Colors.black} />}
            </TouchableOpacity>
            {title ?
                <Text style={styles.cartTitle}>{title}</Text> :
                <Image source={bookLoverImage} resizeMode='contain' style={styles.bookLoverImage} />
            }

            {/* <TouchableOpacity activeOpacity={0.7} style={styles.cartIconContainer}
                onPress={() => navigation.navigate('Cart')} disabled={title ? true : false}
                disabled={cart < 1 ? true : false}
            >
                <Feather name='shopping-cart' size={width(10)} color={Colors.appIconColor4} />
                <View style={styles.cartQuantiyContainer} >
                    <Text style={styles.cartText}>{cart}</Text>
                </View>
            </TouchableOpacity> */}
            <View style={styles.cartleftIconContainer} />
        </View>
    )
}