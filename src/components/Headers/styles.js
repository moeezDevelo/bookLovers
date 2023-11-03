import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import {width, height, totalSize} from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    width:width(100),
    alignSelf:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    height:height(9),
    paddingHorizontal:width(5)
  },
  leftIconContainer:{
      width:width(10),
  },
  text: {
    color: Colors.black,
    fontSize: totalSize(1.75),
    fontWeight:'bold',
    width:width(70),
    textAlign:'center',
    fontFamily:"AvenirLTStd-Black"
  },
  rightIconContainer:{
    width:width(10),
    alignItems:"flex-end"
  },
  emptyHeaderView:{
    width:width(10)
  },
  //title Header
  titleHeaderContainer: {
    width:width(100),
    alignSelf:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    height:height(9),
    backgroundColor:Colors.white,
    paddingHorizontal:width(5)
  },
  titleText:{
    fontWeight:'bold',
    fontSize:width(7),
    color:Colors.appColor1,
  },
  //cart Header styling
  cartHeaderContainer:{
    width:width(100),
    alignSelf:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    height:height(9),
    backgroundColor:Colors.white,
    paddingHorizontal:width(5)
  },
  cartleftIconContainer:{
    width:width(15)
  },
  cartTitle:{
    fontSize:width(5.5),
    fontWeight:'bold',
    color:Colors.appColor1,
  },
  bookLoverImage:{
    height:totalSize(6.5),
    width:totalSize(6.5),
  },
  cartIconContainer:{
    width:width(15),
    alignItems:'flex-end',
  },
  cartQuantiyContainer:{
    position:'absolute',
    height:totalSize(2),
    width:totalSize(2),
    borderRadius:totalSize(1),
    backgroundColor:Colors.appColor8,
    alignItems:'center',
    justifyContent:'center',
    top:-height(0.5),
    right:-width(1)
  },
  cartText:{
    fontSize:width(2.5),
    color:Colors.white
  }
});
export default styles;
