import React, { Fragment } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { GetImagePath } from '../../../utills/Methods';
export default function EditorNoteDetails({ navigation, route }) {
    const size = `500x500`;
    const item = route?.params?.item;
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
                <Header title='Alternate Endings' containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
                        <Image source={{ uri: GetImagePath(item.Image, size) }} resizeMode='stretch' style={styles.bannerImage} />
                        <Text style={styles.noteTitle}>{item?.Title}</Text>
                        <Text style={styles.titleText}>{item?.AuthorName}</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>{item?.Notes}</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.green }} />
        </Fragment>
    );
}