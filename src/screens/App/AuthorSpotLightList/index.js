import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useDispatch } from 'react-redux';
import Colors from '../../../utills/Colors';
import { getAuthorSpotLight } from '../../../utills/ApiFunctions';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import { Header } from '../../../components/Headers/index';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function AuthorSpotlightList({ navigation }) {
    const size = `500x500`;
    const dispatch = useDispatch();
    const [authoreSpotLight, setAuthorSpotLight] = useState([]);
    const _showAuthorSpotLight = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.flatListViewContainer} activeOpacity={1}
                onPress={() => navigation.navigate('AutherSpotLightDetails', { item: item })}
            >
                {item?.ImageUrl && <Image source={{ uri: GetImagePath(item?.ImageUrl, size) }} resizeMode='stretch' style={styles.image} />}
                <View style={styles.textContainer}>
                    <Text style={styles.nameText} >{item.AuthorName}</Text>
                    <Text style={styles.expertText}>{item.BioSummary}</Text>
                </View>
                {(index == 0 && item?.ImageUrl) && (<View style={styles.newContainer}>
                    <Text style={styles.newText}>NEW!</Text>
                </View>)}

            </TouchableOpacity>
        )
    }
    const _getAuthorSpotLightList = async () => {
        dispatch(setIsLoader(true))
        const response = await getAuthorSpotLight();
        if (response?.success) {
            setAuthorSpotLight(response.data)
            dispatch(setIsLoader(false))
        }
        else if (response?.status === 401) {
          showMessage({
        	message: 'Error',
        	description: 'Your session has expired, please log back in.',
        	type: 'danger',
        	duration: 8000
          });

          dispatch(logout());
        }
        else {
            dispatch(setIsLoader(false))
            showMessage({
                message: 'Error',
                description: 'An error occurred while retrieving author spotlights.  If the problem persists, please contact booklovershelp@gmail.com.',
                type: 'danger',
                duration: 8000
            });
            handleEmailError({
                Subject: 'Author Spotlight',
                Message: JSON.stringify(response)
            })
        }
    }
    useEffect(() => {
        let mounted = true
        if (mounted) {
            _getAuthorSpotLightList()
        }
        return () => mounted = false
    }, [])
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
                <Header title={`Author's Spotlight`} isBack containerStyles={styles.headerContiner}
                    textStyle={styles.textStyle} onPress={() => navigation.navigate('Home')} />
                <View style={styles.mainViewContainer}>
                    <FlatList
                        data={authoreSpotLight}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                        renderItem={_showAuthorSpotLight}
                        contentContainerStyle={styles.flatListContainer}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.Id.toString()}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
        </Fragment>
    );
}
