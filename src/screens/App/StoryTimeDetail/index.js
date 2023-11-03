import React, { Fragment } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { GetImagePath } from '../../../utills/Methods';
export default function StoryTimeDetails({ navigation, route }) {
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
                <Header title='Story Time' containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
                        <Image source={{ uri: GetImagePath(item?.ImageUrl, size) }} resizeMode='stretch' style={styles.bannerImage} />
                        <Text style={styles.noteTitle}>{item?.Title}</Text>
                        <Text style={styles.titleText}>{item?.Author}</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>{item?.Text}</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.green }} />
        </Fragment>
    );
}
