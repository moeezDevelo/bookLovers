import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, FlatList, Image, TouchableOpacity, } from 'react-native';
import styles from './styles';
import Colors from '../../../utills/Colors';
import { TitleHeader } from '../../../components/Headers/index';
import { getEditorNotes } from '../../../utills/ApiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoader } from '../../../Redux/Actions/config';
import { GetImagePath } from '../../../utills/Methods';
import { showMessage } from 'react-native-flash-message';
import { handleEmailError } from '../../../utills/GlobalFunction';
import { logout } from '../../../Redux/Actions/Auth';
export default function EditorNote({ navigation }) {
  const size = `500x500`;
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [EditorNotes, setEditorNotes] = useState([]);
  const _showEditiorsNote = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.flatListViewContainer}
        activeOpacity={1}
        onPress={() => navigation.navigate('EditorNotesDetail', { item: item })}>
        <Image
          source={{ uri: GetImagePath(item.Image, size) }}
          resizeMode='stretch'
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.Title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const _getEditorNotes = async () => {
    dispatch(setIsLoader(true));
    const response = await getEditorNotes()
    if (response.success) {
      setEditorNotes(response.data);
      dispatch(setIsLoader(false));
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
      dispatch(setIsLoader(false));
      showMessage({
        message: 'Error',
        description: 'An error occurred while retrieving alternate endings.  If the problem persists, please contact booklovershelp@gmail.com.',
        type: 'danger',
        duration: 8000
      });
      handleEmailError({
        Subject: 'Alternate Endings',
        Message: JSON.stringify(response)
      })
    }
  };
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getEditorNotes();
    }
    return () => mounted = false
  }, [user?.idToken?.payload['custom:MembershipType']]);
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView
        style={(styles.container, { backgroundColor: Colors.white })}
      />
      <SafeAreaView style={styles.container}>
        <TitleHeader title="Alternate Endings" />
        <View style={styles.mainViewContainer}>
          {
            <FlatList
              data={EditorNotes}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorComponent} />
              )}
              renderItem={_showEditiorsNote}
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.Id.toString()}
              numColumns={2}
            />
          }
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.green }} />
    </Fragment>
  );
}
