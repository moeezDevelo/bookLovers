import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { width } from 'react-native-dimension';
import Colors from '../../utills/Colors';
import { useSelector } from 'react-redux';
export const Button = ({ title, onPress, containerStyles, textStyle, disabled, buttonLoader }) => {
  const isButtonLoader = useSelector(state => state.config.isButtonLoader)
  return (
    <TouchableOpacity disabled={buttonLoader ?? isButtonLoader} onPress={onPress} disabled={disabled}
      activeOpacity={0.7} style={[styles.container, containerStyles ? containerStyles : {}]}>
      {isButtonLoader || buttonLoader ?
        <ActivityIndicator size="small" color={Colors.white} /> :
        <Text style={[styles.text, textStyle ? textStyle : {}]}>{title}</Text>
      }

    </TouchableOpacity>);
};
export const MenuComponent = ({ title, onPress, containerStyles }) => {
  return (
    <View style={styles.menuComponentContainer}>
      <TouchableOpacity onPress={onPress} style={styles.menuComponentButton} activeOpacity={1}>
        <Text style={styles.menuTitleText}>{title}</Text>
        <AntDesign name='right' size={width(5)} color={Colors.appIconColor2} />
      </TouchableOpacity>
      <View style={styles.menuUnderLine} />
    </View>
  );
};
export const SettingComponent = ({ title, onPress, Icon }) => {
  return (
    <View style={styles.settingComponentContainer}>
      <TouchableOpacity onPress={onPress} style={styles.settingComponentButton} activeOpacity={1}>
        <View style={styles.settingComponentIconContainer}>
          {Icon}
        </View>
        <Text style={styles.settingComponentText}>{title}</Text>
        <Feather name='chevron-right' size={width(7)} color={Colors.appIconColor2} />
      </TouchableOpacity>
      <View style={styles.settingLine} />
    </View>
  );
};


