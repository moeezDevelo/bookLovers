import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColor
    },
    mainViewContainer: {
        flex: 1,
        width: width(90),
        alignSelf: 'center'
    },
    itemSeparatorComponent: {
        margin: totalSize(1)
    },
    flatListContainer: {
        paddingVertical: height(3)
    },
    headingText: {
        fontSize: width(6),
        color: Colors.black,
        fontWeight: 'bold',
        marginBottom: height(2)
    },
    flatListViewContainer: {
        width: width(90),
        paddingBottom: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2),
    },
    image: {
        width: '100%',
        height: height(22),
        borderTopLeftRadius: width(2),
        borderTopRightRadius: width(2)
    },
    textContainer: {
        width: width(80),
        alignSelf: 'center',
        marginTop: height(2)
    },
    titleText: {
        fontSize: width(4.5),
        color: Colors.black
    },
    expertText: {
        fontSize: width(3.6),
        marginTop: height(0.7),
        color: Colors.appTextColor6
    },
});
export default styles;
