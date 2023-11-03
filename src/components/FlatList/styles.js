import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    // StoreBooksFlatList styles
    viewContainer: {
        width: width(90),
        alignSelf: 'center',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: width(2)
    },
    bookImage: {
        width: width(22),
        height: height(14),
        borderRadius: width(2)
    },
    textContainer: {
        width: width(62),
        paddingRight: width(2)
    },
    bookTitleText: {
        fontSize: width(4),
        color: Colors.appColor1,
        fontWeight: 'bold'
    },
    authorNameText: {
        fontSize: width(3.6),
        color: Colors.appIconColor1,
        marginVertical: height(0.5),
        fontWeight: 'bold'
    },
    // myLibrary Flatlist styles
    myViewContainer: {
        width: width(90),
        alignSelf: 'center',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: width(2)
    },
    myLibraryBookImage: {
        width: width(22),
        height: height(12),
        borderTopLeftRadius: width(2),
        borderBottomLeftRadius: width(2)
    },
    myLibraryTextContainer: {
        width: width(64),
        paddingRight: width(2),
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    bookInfoContainer:{
        width: width(57),
    },
    myLibraryAuthorNameText: {
        fontSize: width(4),
        color: Colors.appColor1,
        fontWeight: 'bold'
    },
    myLibraryBookTitleText: {
        fontSize: width(3.6),
        color: Colors.black,
        marginVertical: height(0.5),
        fontWeight: 'bold'
    },
    myLibraryBookType: {
        fontSize: width(3.6),
        color: Colors.appIconColor1,
    },
});
export default styles;
