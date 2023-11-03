import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColor
    },
    headerContiner: {
        backgroundColor: Colors.white
    },
    textStyle: {
        width: width(63),
        fontWeight: 'bold',
        fontSize: width(5),
        color: Colors.appColor1,
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
    flatListViewContainer: {
        width: width(90),
        paddingBottom: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2),
    },
    image: {
        width: '100%',
        height: height(23),
        borderTopLeftRadius: width(2),
        borderTopRightRadius: width(2)
    },
    textContainer: {
        width: width(80),
        alignSelf: 'center',
        marginTop: height(2)
    },
    nameText: {
        fontSize: width(5),
        color: Colors.black
    },
    expertText: {
        fontSize: width(3.6),
        marginTop: height(0.7),
        color: Colors.appTextColor6
    },
    newContainer: {
        width: width(23),
        paddingVertical: height(0.8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: width(6),
        position: 'absolute',
        top: height(2),
        left: width(2)
    },
    newText: {
        color: Colors.appColor1,
        fontSize: totalSize(1.5)
    },
});
export default styles;
