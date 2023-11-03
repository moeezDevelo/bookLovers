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
    coverImage: {
        height: height(17),
        width: width(80),
        alignSelf: 'center',
        marginTop: height(3),
        borderRadius: width(1)
    },
    headingContainer: {
        marginTop: height(3),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    premiumContentText: {
        marginHorizontal: width(3),
        fontSize: width(3.8),
        color: Colors.black,
        fontWeight: 'bold'
    },
    descriptionTextContainer: {
        width: width(85),
        alignSelf: 'center',
        marginTop: height(2)
    },
    descriptionText: {
        fontSize: width(3.8),
        color: Colors.black,
        textAlign: 'center',
        lineHeight: height(2.8),
        fontFamily: 'AvenirLTStd-Roman'
    },
    priceText: {
        fontSize: width(3.8),
        color: Colors.black,
        textAlign: 'center',
        lineHeight: height(2.8),
        fontFamily: 'AvenirLTStd-Black'
    },
    updateButton: {
        marginTop: height(8)
    }
});
export default styles;
