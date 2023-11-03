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
  yourCartCotainer:{
      paddingVertical:height(1),
      width:width(90),
      alignSelf:'center',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginVertical:height(2),
      borderBottomWidth:1.5,
      borderTopWidth:1.5,
      borderColor:Colors.borderLine2
  },
  cartItemsText:{
      fontSize:width(4),
      fontWeight:'bold',
      color:Colors.black
  },
  flatListContainer:{
      height:height(40)
  },
  itemSeparatorComponent:{
      margin:totalSize(0.8)
  },
  itemsContainer:{
      width:width(90),
      alignSelf:'center',
      backgroundColor:Colors.white,
      borderRadius:width(1),
      paddingBottom:height(1)
  },
  itemInfoContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
  },
  itemImage:{
      width:width(25),
      height:width(25),
      borderRadius:width(1),
  },
  infoTextContainer:{
    width:width(62),
    paddingRight:width(2)
  },
  itemNameText:{
      fontSize:width(4),
      fontWeight:'bold',
      color:Colors.appColor1
  },
  authorText:{
    fontSize:width(3.5),
    color:Colors.black,
    marginTop:height(0.5)
  },
  quantityContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:height(0.5)
  },
  qtyText:{
    fontSize:width(3.5),
    color:Colors.black,  
  },
  itemQuantityContainer:{
      paddingHorizontal:width(2.5),
      height:height(3),
      borderRadius:width(1),
      borderWidth:1,
      borderColor:Colors.appColor7,
      marginHorizontal:width(2),
      alignItems:'center',
      justifyContent:'center'
  },
  quantityText:{
    fontSize:width(2.8),
    color:Colors.black, 
  },
  updateQuantityText:{
    fontSize:width(3),
    color:Colors.appTextColor12, 
  },
  itemPriceContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:height(1),
    paddingHorizontal:width(2.5)
  },
  itemPriceText:{
    fontSize:width(3.25),
    color:Colors.appTextColor12, 
    fontWeight:'bold'
  },
  removeText:{
    fontSize:width(3.7),
    color:Colors.appColor7,
    textDecorationLine:'underline',
    textDecorationStyle:'solid'
  },
  pricesTextContainer:{
      width:width(90),
      alignSelf:'center',
  },
  subTotalContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
  },
  priceHeading:{
      color:Colors.appTextColor1,
      fontSize:width(3.75)
  },
  priceText:{
    color:Colors.appTextColor1,
    fontSize:width(3.75),
    fontWeight:'bold'
  },
  estimatedContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:height(1)
  },
  line:{
      width:width(90),
      alignSelf:'center',
      marginTop:height(1),
      borderBottomColor:Colors.black,
      borderBottomWidth:1
  },
  subTotalPriceContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:height(1)
  },
  subTotalHeading:{
    color:Colors.appTextColor1,
    fontSize:width(3.75),
    fontWeight:'bold'
  },
  totalPriceText:{
    color:Colors.appTextColor12,
    fontSize:width(3.75),
    fontWeight:'bold'
  },
  checkOutButton:{
      marginTop:height(4)
  }
});
export default styles;