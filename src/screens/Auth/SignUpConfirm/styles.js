import {StyleSheet} from 'react-native';
import Colors from '../../../utills/Colors';
import {width, height, totalSize} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
  mainViewContainer: {
    flex: 1,
  },
  logoImage:{
      alignSelf:'center',
      height:totalSize(17),
      width:totalSize(17),
  },
  headingContainer:{
      width:width(90),
      alignSelf:'center'  
  },
  headingText:{
      fontSize:totalSize(2),
      color:Colors.appColor1,
      fontWeight:'bold'
  },
  infoText:{
    fontSize:totalSize(1.65),
    color:Colors.appTextColor4,
    lineHeight:height(2.75),
    marginTop:height(3)
  },
  textInputContainer:{
      width:width(100),
      alignSelf:'center',
      marginTop:height(2),
  },
  textInputHeading:{
     fontSize:totalSize(1.85),
     color:Colors.appTextColor5,
     marginTop:height(2),
     marginHorizontal:width(5)
  },
  confirmButton:{
      marginTop:height(3)
  }
});
export default styles;
