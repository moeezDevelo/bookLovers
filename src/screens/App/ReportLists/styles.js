import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColor
    },
    containerStyles: {
        backgroundColor: Colors.white
    },
    mainViewContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: height(3)
    },
    itemSeparator: {
        margin: totalSize(1)
    },
    reportContainer: {
        width: width(90),
        alignSelf: 'center',
        backgroundColor: Colors.white,
        paddingVertical: height(1.3),
        paddingHorizontal: width(5),
        borderRadius: width(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: width(3.85),
        color: Colors.appColor1,
        fontFamily: 'AvenirLTStd-Black'
    }
});
export default styles;
