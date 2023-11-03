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
    textStyle: {
        width: width(63),
        fontWeight: 'bold',
        fontSize: width(6),
        color: Colors.appColor1,
    },
    mainViewContainer: {
        flex: 1,
        paddingTop: height(3)
    },
    textContainer: {
        width: width(90),
        alignSelf: 'center'
    },
    headingText: {
        fontSize: width(4.5),
        color: Colors.appColor1,
        fontFamily: 'AvenirLTStd-Black'
    },
    freeStandardHeading: {
        fontSize: width(3.85),
        color: Colors.appTextColor1,
        fontFamily: 'AvenirLTStd-Book',
        marginTop: height(2)
    },
    infoText: {
        fontSize: width(3.5),
        color: Colors.appTextColor1,
        fontFamily: 'AvenirLTStd-Book',
        marginTop: height(2),
        lineHeight: height(2.5)
    },
    benefitsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: width(10),
        marginTop: height(1),
    },
    staricText: {
        fontSize: width(3.25),
        color: Colors.appTextColor1,
        fontFamily: 'AvenirLTStd-Book',
    },
    benefitsText: {
        fontSize: width(3.25),
        color: Colors.appTextColor1,
        fontFamily: 'AvenirLTStd-Book',
        marginLeft: width(2),
        lineHeight: height(2)
    },
    termsConditionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height(8)
    },
    button: {
        marginHorizontal: width(3)
    },
    andText: {
        fontSize: width(3.25),
        color: Colors.black,
        fontFamily: 'AvenirLTStd-Book',
    },
    buttonText: {
        fontSize: width(3.25),
        color: Colors.appTextColor1,
        fontFamily: 'AvenirLTStd-Book',
    }
});
export default styles;
