import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    //ImagePickerModal
    imageModalContainer: {
        backgroundColor: Colors.white,
        width: width(70),
        borderRadius: 20,
        alignSelf: 'center',
        paddingBottom: height(3)
    },
    closeContainer: {
        width: width(70),
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginTop: width(4),
        justifyContent: 'space-between',
        paddingHorizontal: width(4)
    },
    buttonContainer: {
        width: width(70),
        height: height(15),
        justifyContent: 'space-evenly',
    },
    picOption: {
        paddingLeft: width(12),
        alignItems: 'center',
        flexDirection: 'row'
    },
    picOptionText: {
        marginLeft: width(2),
        fontSize: totalSize(2)
    },
    line: {
        width: '70%',
        alignSelf: 'center',
        backgroundColor: 'gray',
        height: 0.5
    },
    // reader Modals styles
    readerModalContainer: {
        width: width(100),
        paddingBottom: height(3),
        backgroundColor: Colors.white
    },
    readerModalOptionButton: {
        width: width(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height(2),
        alignSelf: 'center'
    },
    buttonText: {
        width: width(75),
        color: Colors.black,
        fontSize: width(5)
    },
    lineSeparator: {
        width: width(100),
        marginTop: height(2),
        borderBottomWidth: 1,
        borderBottomColor: Colors.appIconColor1
    },
    cancelButton: {
        marginTop: height(2),
        alignSelf: 'center'
    },
    cancelText: {
        color: Colors.appIconColor1,
        fontSize: width(5)
    },
    //Loader Modal 
    lodaerModal: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderText: {
        marginTop: height(2),
        fontSize: width(4),
        color: Colors.appColor1
    },
    // review modal styles
    reviewModal: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reviewModalContainer: {
        width: width(90),
        paddingTop: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2),
        maxHeight: height(60)
    },
    headingContainerReview: {
        width: width(80),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editiorReviewHeadingText: {
        color: Colors.appColor1,
        fontSize: totalSize(1.75),
        fontWeight: 'bold',
        fontFamily: "AvenirLTStd-Black"
    },
    scrollView: {
        paddingBottom: height(2)
    },
    editiorReviewContainer: {
        width: width(80),
        alignSelf: 'center',
        marginTop: height(0.5)
    },
    editiorReviewText: {
        color: Colors.appTextColor7,
        fontSize: width(3.8),
        lineHeight: height(2.75),
        fontFamily: 'AvenirLTStd-Book'
    },
    // Login Modal
    logInModal: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logInModalContainer: {
        width: width(80),
        paddingVertical: height(2),
        borderRadius: width(2),
        backgroundColor: Colors.white
    },
    logInModalHeaderContainer: {
        alignSelf: 'flex-end',
        marginHorizontal: width(5)
    },
    accessText: {
        textAlign: 'center',
        marginVertical: height(2.5),
        fontSize: width(4),
        color: Colors.appTextColor1,
        fontFamily: 'AvenirLTStd-Book'
    },
    continueButton: {
        alignSelf: 'center',
        height: height(3.85),
        width: width(30),
        borderRadius: width(4),
        backgroundColor: Colors.appColor1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height(1)
    },
    continueText: {
        fontSize: width(3.75),
        color: Colors.white,
        fontFamily: 'AvenirLTStd-Black'
    },
});
export default styles;
