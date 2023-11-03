import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './styles';
import { CartHeader } from '../../../components/Headers/index';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../utills/Colors';
import { StoreBooksList } from '../../../components/FlatList/index';
import { getPublicBooks } from '../../../utills/ApiFunctions';
import { setIsLoader } from '../../../Redux/Actions/config';
import { Button } from '../../../components/Button/index';
import { height } from 'react-native-dimension';
import { showMessage } from 'react-native-flash-message';
export default function ExploreStore({ navigation }) {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0)
  const [showExclusivePdf, setShowExclusivePdf] = useState([])
  const [showFeaturedPdf, setShowFeaturedPdf] = useState([]);
  const [showExclusiveMp3, setShowExclusiveMp3] = useState([]);
  const [showFeaturedMP3, setShowFeaturedMp3] = useState([]);
  const _showFeatured = ({ item }) => {
    return (
      <StoreBooksList item={item}
        onPress={() => navigation.navigate('BooksDetails', { item: item })}
      />
    )
  }
  const _showExclusive = ({ item }) => {
    return (
      <StoreBooksList item={item} onPress={() => navigation.navigate('BooksDetails', { item: item, isExclusive: true })} />
    )
  }
  const _getPublicBooks = async () => {
    dispatch(setIsLoader(true))
    const response = await getPublicBooks()
    if (response?.success) {
      setShowFeaturedPdf(response.data.filter(item => item?.IsExclusive != true && item?.BookType == 'pdf'))
      setShowExclusivePdf(response.data.filter(item => item?.IsExclusive == true && item?.BookType == 'pdf'))
      setShowFeaturedMp3(response.data.filter(item => item?.IsExclusive != true && item?.BookType == 'm4a'))
      setShowExclusiveMp3(response.data.filter(item => item?.IsExclusive == true && item?.BookType == 'm4a'))
      dispatch(setIsLoader(false))
    }
    else {
      dispatch(setIsLoader(false))
      showMessage({
        message: 'Error',
        description: `An error occurred while retrieving books. If the problem persists, please contact booklovershelp@gmail.com`,
        type: 'danger',
        duration: 8000
      });
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      _getPublicBooks()
    }
    return () => mounted = false
  }, [])
  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={(styles.container, { backgroundColor: Colors.white })} />
      <SafeAreaView style={styles.container}>
        <CartHeader isLeftICon />
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton}
            onPress={() => setTabIndex(0)}
          >
            <Text style={tabIndex == 0 ? styles.selectedTabText : styles.unSelectedTabText}>E-Books</Text>
            <View style={tabIndex == 0 ? styles.selectedTabLine : styles.unSelectedTabLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}
            onPress={() => setTabIndex(1)}
          >
            <Text style={tabIndex == 1 ? styles.selectedTabText : styles.unSelectedTabText}>Audio Books</Text>
            <View style={tabIndex == 1 ? styles.selectedTabLine : styles.unSelectedTabLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}
            onPress={() => setTabIndex(2)}
          >
            <Text style={tabIndex == 2 ? styles.selectedTabText : styles.unSelectedTabText}>Merchandise</Text>
            <View style={tabIndex == 2 ? styles.selectedTabLine : styles.unSelectedTabLine} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainViewContainer}>
          {
            tabIndex == 0 ?
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
              >
                {(tabIndex == 0 && showFeaturedPdf.length > 0) &&
                  <FlatList
                    data={showFeaturedPdf}
                    refreshing={true}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                    renderItem={_showFeatured}
                    contentContainerStyle={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => (index + 1).toString()}
                    ListHeaderComponent={() => <Text style={styles.headingText}>Featured Books</Text>}
                  />
                }
                {showExclusivePdf.length > 0 &&
                  <FlatList
                    data={showExclusivePdf}
                    refreshing={isFocused}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                    renderItem={_showExclusive}
                    contentContainerStyle={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => (index + 1).toString()}
                    ListHeaderComponent={() => <Text style={styles.headingText}>Exclusives</Text>}
                    ListEmptyComponent={() => <Text style={styles.emptyText}>Exclusives List is Empty</Text>}
                  />
                }
              </ScrollView> :
              tabIndex == 1 ?
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollView}
                >
                  <Text style={styles.audioBookType}>* Audio-books require an active internet connection to listen</Text>
                  {
                    showFeaturedMP3.length > 0 &&
                    <FlatList
                      data={showFeaturedMP3}
                      refreshing={true}
                      ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                      renderItem={_showFeatured}
                      contentContainerStyle={[styles.flatListContainer, { paddingVertical: height(1) }]}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => (index + 1).toString()}
                      ListHeaderComponent={() => <Text style={styles.headingText}>Featured Books</Text>}
                    />
                  }
                  {showExclusiveMp3.length > 0 &&
                    <FlatList
                      data={showExclusiveMp3}
                      refreshing={true}
                      ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                      renderItem={_showExclusive}
                      contentContainerStyle={styles.flatListContainer}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => (index + 1).toString()}
                      ListHeaderComponent={() => <Text style={styles.headingText}>Exclusives</Text>}
                      ListEmptyComponent={() => <Text style={styles.emptyText}>Exclusives List is Empty</Text>}
                    />
                  }
                </ScrollView> :
                <View style={styles.merchandiseContainer}>
                  <Text style={styles.mechandiseHeading}>Visit the Book Lovers online store to purchase merchandise and other exclusive items!</Text>
                  <Button
                    title={'Visit the Store'}
                    onPress={() => { Linking.openURL('https://www.thebooklovers.co/') }}
                  />
                </View>
          }
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
    </Fragment>
  );
}
