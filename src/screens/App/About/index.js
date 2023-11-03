import React, { Fragment } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
export default function About({ navigation }) {
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
                <Header title='About' containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}
                    >
                        <Text style={styles.headingText}>Where Book Lovers Meet</Text>
                        <Text style={styles.text}>Book Lovers App is a place where book lovers meet. Through interactive discussions, exclusive story times, in-app book purchases, book reviews, and more. It is the ultimate book club experience that connects thousands of readers at the click of a button. You can set reading lists and goals, earn badges for books read, find a book bestie, chat with your favorite author, take writing seminars, and more.</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}