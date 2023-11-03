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
  namePriceContainer:{
      width:width(90),
      alignSelf:'center',
      marginTop:height(2),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
  },
  itemNameText:{
      fontSize:width(5.5),
      color:Colors.appColor1,
      fontWeight:'bold'
  },
  priceContainer:{
      width:width(25),
      height:height(4),
      alignItems:'center',
      justifyContent:'center',
      borderRadius:width(3),
      backgroundColor:Colors.appColor9
  },
  priceText:{
    fontSize:width(3.5),
    color:Colors.white,
    fontWeight:'bold'
  },
  descriptionContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
  },
  descriptionText:{
    fontSize:width(3.85),
    color:Colors.appTextColor3,
    lineHeight:height(3.25)
  },
  addToCartButton:{
      marginBottom:height(3)
  }
});
export default styles;
