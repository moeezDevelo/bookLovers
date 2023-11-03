import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { height, width, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    textFieldContainer: {
        width: width(90),
        alignSelf: 'center',
        height: height(6),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderColor:Colors.black,
        marginTop:height(0.75)
    },
    textInput: {
        width: width(80),
        height: height(5.5),
        paddingVertical: 0,
        fontSize:totalSize(1.75),
        color:Colors.black
    },
    textPasswordInput:{
        width: width(70),
        height: height(7),
        paddingVertical: 0,
        fontSize:totalSize(1.75),
        color:Colors.black
    },
    hiddenButton:{
        width:width(5)
    },
});
export default styles;