import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor
  },
  mainViewContainer: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: height(2)
  },
  itemImage:{
      width:width(50),
      height:width(50),
      alignSelf:'center',
      marginTop:height(2),
      borderRadius:width(1)
  },
  textContainer:{
      width:width(90),
      alignSelf:'center',
      marginTop:height(2),
  },
  itemNameText:{
      fontSize:width(5.5),
      color:Colors.appColor1,
  },
  authorNameText:{
    fontSize:width(5),
    marginTop:height(1),
    color:Colors.appTextColor3,
    fontWeight:'bold'
  },
  congratulationsText:{
    fontSize:width(3.5),
      color:Colors.appTextColor3,
      lineHeight:height(3),
      marginTop:height(1)
  },
  voucherTextInputContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  textInputContainer:{
    width:width(60),
    height:height(5),
    backgroundColor:Colors.white,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width(5)
  },
  textInput: {
    width: width(50),
    height: height(4.5),
    paddingVertical: 0,
    fontSize:totalSize(1.5),
    color:Colors.black
},
redeemButton:{
  width:width(25),
  marginTop:height(0),
  height:height(5)
},
redeemText:{
  fontSize:width(3.5)
}
});
export default styles;
