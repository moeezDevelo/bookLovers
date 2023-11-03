import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor
  },
  containerStyles:{
    backgroundColor:Colors.white
  },
  textStyle:{
    width:width(63),
    fontWeight:'bold',
    fontSize:width(5),
    color:Colors.appColor1,
  },
  mainViewContainer: {
    flex: 1,
  },
  addBookImageContainer:{
    height:height(17),
    width:width(35),
    borderRadius:width(1),
    borderWidth:2,
    borderColor:Colors.borderLine1,
    borderStyle:'dashed',
    alignSelf:'center',
    marginTop:height(3),
    alignItems:'center',
    justifyContent:'center'
  },
  bookImageText:{
  color:Colors.appTextColor10,
  fontSize:width(4),
  marginTop:height(0.5)
  },
  bookImage:{
    height:totalSize(12),
    width:totalSize(12),
    marginTop:height(3),
    alignSelf:'center'
  },
  textInputHeading:{
    fontSize:totalSize(1.85),
    color:Colors.appTextColor5,
    marginTop:height(2),
    marginHorizontal:width(5)
 },
 saveButton:{
   marginTop:height(5)
 }
});
export default styles;
