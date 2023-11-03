import React, { Fragment } from 'react';
import { View, TouchableOpacity, Text, StatusBar, SafeAreaView, FlatList } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { Header } from '../../../components/Headers/index';
import { reports } from '../../../DummyData/Report';
import Entypo from 'react-native-vector-icons/Entypo'
import { width } from 'react-native-dimension';
export default function Report({ navigation, route }) {
    const comment = route?.params?.comment
    const showReporsts = ({ item }) => {
        return (
            <TouchableOpacity style={styles.reportContainer}
                onPress={() => navigation.navigate('Report', { comment: comment, item: item })}
            >
                <Text style={styles.titleText}>{item?.title}</Text>
                <Entypo name='chevron-small-right' color={Colors.appIconColor1} size={width(7)} />
            </TouchableOpacity>
        )
    }
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
                <Header title='Report' containerStyles={styles.containerStyles} isBack
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.mainViewContainer}>
                    <FlatList
                        data={reports}
                        keyExtractor={(item) => String(item.id)}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={showReporsts}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}