import React, { Fragment } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { termsConditions } from '../../../DummyData/TermsCondition'
export default function TermsConditions({ navigation }) {
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
                <Header title={`Terms & conditions`} containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}
                    >
                        {termsConditions.map((item, index) => {
                            return (
                                <View key={String(item?._id + index)}>
                                    <Text style={styles.headingText}>{`${item?.heading}`}</Text>
                                    <Text style={styles.text}>{item?.text.trim()}</Text>
                                </View>
                            )
                        })}
                        <Text style={styles.headingText}>{`Contact Us :`}</Text>
                        <Text style={styles.text}>{`You can reach us at: https://thebooklovers.co or email us at bookloversllc@gmail.com. `}</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
