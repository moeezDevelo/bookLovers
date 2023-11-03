import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    containerStyles: {
        backgroundColor: Colors.white,
        height: height(8),
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 0.3
    },
    scrollView: {
        justifyContent: 'space-between',
        marginBottom: Platform.OS === 'ios' ? height(1) : 0
    },
    commentsFlatListContainer: {
        height: Platform.OS === 'ios' ? height(75) : height(82),
        backgroundColor: Colors.appColor
    },
    flatListContainer: {
        paddingVertical: height(3),
    },
    itemSeparatorComponent: {
        margin: totalSize(0.8)
    },
    flatListHeaderContainer: {
        width: width(100),
        alignSelf: 'center',
        marginBottom: height(1),
    },
    commentInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:width(90),
        alignSelf:'center'
    },
    personImage: {
        height: width(9),
        width: width(9),
        borderRadius: width(5)
    },
    nameContainer: {
        width: width(79),
        marginTop: height(0.5)
    },
    commemtText: {
        fontSize: width(3.5),
        color: Colors.black,
        lineHeight: height(2.5),
        fontFamily: 'AvenirLTStd-Book'
    },
    commentImage: {
        width: totalSize(10),
        height: totalSize(10),
        borderRadius:width(2),
        marginTop: height(0.5)
    },
    personNameText: {
        fontSize: width(3.5),
        color: Colors.black,
        fontFamily: 'AvenirLTStd-Black'
    },
    line:{
        width:width(100),
        marginTop:height(1),
        height:height(0.5),
        backgroundColor:Colors.borderLine,
    },
    repliesContainer:{
        width:width(80),
        alignSelf:'flex-end',
        backgroundColor:Colors.white,
        paddingVertical:height(1.5),
        paddingHorizontal:width(2.5),
        marginRight:width(5),
        borderRadius:width(2)
    },
    repliesInfoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderTopLeftRadius:width(2),
        // borderBottomLeftRadius:width(2),
    },
    replierImage:{
        height: width(8),
        width: width(8),
        borderRadius: width(4)
    },
    replierNameContainer:{
        width: width(65),
        marginTop: height(0.5)
    },
    replierNameText:{
        fontSize: width(3.5),
        color: Colors.black,
        fontFamily: 'AvenirLTStd-Black'
    },
    repliesTextContainer:{
        flexDirection:"row",
        width: width(65),
        alignSelf:'flex-end',
        justifyContent:'space-between'
    },
    repliesText:{
        fontSize: width(3.5),
        color: Colors.black,
        lineHeight: height(2),
        fontFamily: 'AvenirLTStd-Book',
        width:width(50)
    },
    repliesImage:{
        width: width(13),
        height: width(13),
        borderRadius:width(1),
        alignSelf:'flex-end'
    },
    bottomContainer: {
        width: width(100),
        paddingVertical: height(1),
        backgroundColor: Colors.white,
        borderTopWidth: width(2),
        borderTopColor: Colors.appColor,
        borderBottomColor: Colors.white,
        borderBottomWidth: width(2),
    },
    newRepliesImage: {
        height: height(10),
        width: height(10),
        marginHorizontal: width(5),
        marginBottom: height(1),
        paddingVertical: height(0.5),
    },
    crossImageContainer: {
        width: height(10),
        alignSelf: 'center',
        backgroundColor: Colors.black,
        opacity: 0.4,
        alignItems: 'flex-end',
        paddingHorizontal: width(0.5)
    },
    inputTextContainer: {
        width: width(90),
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textInputContainer: {
        width: width(68),
        height: height(5.25),
        backgroundColor: Colors.appColor5,
        borderRadius: width(6),
        alignItems: 'center',
        justifyContent: 'center',

    },
    textInput: {
        width: width(60),
        height: height(4.75),
        paddingVertical: 0,
        fontSize: totalSize(1.5),
        color: Colors.black
    },
    sentButton: {
        height: width(8),
        width: width(8),
        borderRadius: width(4),
        backgroundColor: Colors.appColor1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default styles;
