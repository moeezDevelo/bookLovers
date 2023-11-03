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
    headingContainer: {
        width: width(90),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: height(2)
    },
    titleText: {
        color: Colors.appColor1,
        fontSize: width(4),
        marginLeft: width(3),
        fontFamily: 'AvenirLTStd-Black'
    },
    reportHeading: {
        marginHorizontal: width(5),
        marginTop: height(2),
        color: Colors.appColor7,
        fontSize: width(4),
        fontFamily: 'AvenirLTStd-Book'
    },
    textInputContainer: {
        width: width(90),
        height: height(12),
        backgroundColor: Colors.white,
        marginTop: height(1),
        borderRadius: width(1),
        borderWidth: 1,
        borderColor: Colors.appColor7,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: height(2)
    },
    textInput: {
        width: width(85),
        height: height(10),
        paddingVertical: 0,
        fontSize: totalSize(1.75),
        color: Colors.black,
        textAlignVertical: 'top'
    },
    submitButton: {
        marginBottom: height(3)
    }
});
export default styles;
