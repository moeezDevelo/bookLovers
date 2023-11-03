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
    width:width(63)
  },
  mainViewContainer: {
    flex: 1,
    paddingTop:height(3)
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
