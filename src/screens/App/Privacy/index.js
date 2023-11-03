import React, { Fragment } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { privacy } from '../../../DummyData/Privacy'
export default function PrivacyPolicy({ navigation }) {
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
                <Header title='Privacy' containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}
                    >
                        {privacy.map((item, index) => {
                            return (
                                <View key={String(item?._id + index)}>
                                    <Text style={styles.headingText}>{`${item?.heading}`}</Text>
                                    <Text style={styles.text}>{item?.text.trim()}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
