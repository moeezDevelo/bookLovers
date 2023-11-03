import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColor
    },
    tabContainer: {
        width: width(100),
        paddingTop: height(2),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    tabButton: {
        width: width(33),
        alignItems: 'center'
    },
    selectedTabText: {
        fontSize: width(4),
        color: Colors.black,
        fontWeight: 'bold'
    },
    unSelectedTabText: {
        fontSize: width(4),
        color: Colors.appIconColor1,
        fontWeight: 'bold'
    },
    selectedTabLine: {
        width: width(33),
        borderBottomWidth: 2,
        borderBottomColor: Colors.appTextColor3,
        marginTop: height(2)
    },
    unSelectedTabLine: {
        width: width(33),
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        marginTop: height(2)
    },
    mainViewContainer: {
        flex: 1,
    },
    scrollView: {
        paddingBottom: height(2)
    },
    itemSeparatorComponent: {
        margin: totalSize(1)
    },
    flatListContainer: {
        paddingVertical: height(2),
        justifyContent: 'space-between'
    },
    headingText: {
        fontSize: width(6),
        color: Colors.black,
        fontWeight: 'bold',
        marginBottom: height(2),
        marginHorizontal: width(5)
    },
    emptyText: {
        fontSize: width(4.5),
        color: Colors.black,
        marginTop: height(1),
        textAlign: 'center'
    },
    merchandiseContainer: {
        width: width(90),
        alignSelf: 'center',
    },
    mechandiseHeading: {
        fontSize: width(3.5),
        marginTop: height(2),
        color: Colors.appTextColor1,
        textAlign: 'center'
    },
    flatListViewContainer: {
        width: width(43),
        paddingBottom: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2),
        marginRight: width(2)
    },
    image: {
        width: width(43),
        height: height(18),
        borderTopLeftRadius: width(2),
        borderTopRightRadius: width(2)
    },
    textContainer: {
        width: width(40),
        alignSelf: 'center',
        marginTop: height(2)
    },
    itemNameText: {
        fontSize: width(3.8),
        color: Colors.appColor1
    },
    priceText: {
        fontSize: width(3.8),
        color: Colors.appTextColor3,
        fontWeight: 'bold',
        marginTop: height(0.5)
    },
    audioBookType: {
        fontSize: width(3),
        color: Colors.appTextColor1,
        marginHorizontal: width(5),
        marginTop: height(2)
    },
});
export default styles;
