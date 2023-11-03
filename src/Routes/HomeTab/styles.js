import { StyleSheet, Platform } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height } from 'react-native-dimension';

const styles = StyleSheet.create({
  activeLabel:{
    fontSize:width(2.2),
    color:Colors.appColor1,
    marginTop:height(1)
  },
  inActiveLabel:{
    fontSize:width(2.2),
    color:Colors.appIconColor1,
    marginTop:height(1)
  }
  
});
export default styles;