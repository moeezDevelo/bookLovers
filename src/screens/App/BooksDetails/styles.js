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
      width:width(70),
      height:width(60),
      alignSelf:'center',
      marginTop:height(2),
      borderRadius:width(1),
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
      width:width(60)
  },
  priceContainer:{
      width:width(25),
      height:height(4),
      alignItems:'center',
      justifyContent:'center',
      borderRadius:width(3),
      backgroundColor:Colors.appColor9
  },
  exclusiveText:{
    fontSize:width(3.25),
    color:Colors.white,
    fontWeight:'bold'
  },
  priceText:{
    fontSize:width(3.5),
    color:Colors.white,
    fontWeight:'bold'
  },
  authorNameContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
  },
  authorNameText:{
    fontSize:width(5),
    color:Colors.appTextColor3,
    fontWeight:'bold'
  },
  ratingContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  totalReviewsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  totalReviewsText:{
    fontSize:width(3.85),
    color:Colors.appTextColor3,
    fontWeight:'bold',
    marginLeft:width(2)
  },
  audioTime:{
    fontSize:width(3.85),
    color:Colors.appTextColor3,
    fontWeight:'bold',
  },
  addToCartButton:{
      marginTop:height(3)
  },
  summaryContainer:{
    width:width(90),
      alignSelf:'center',
      marginTop:height(2),
  },
  headingText:{
    fontSize:width(5),
    color:Colors.appTextColor3,
    fontWeight:'bold',
  },
  summaryText:{
    fontSize:width(3.5),
    color:Colors.appTextColor3,
    lineHeight:height(3.25),
    marginTop:height(1)
  },
  reviewsContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
  },
  reviewerNameContainer:{
    width:width(90),
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:height(3)
  },
  reviwerNameText:{
    fontSize:width(3.6),
    color:Colors.appColor1,
  },
  commentText:{
    fontSize:width(3.25),
    color:Colors.appTextColor3,
    lineHeight:height(3.25),
    marginTop:height(1)
  },
  emptyText:{
    fontSize: width(4.5),
    color: Colors.black,
    marginTop: height(1),
    textAlign:'center'
  },
  seeText:{
    fontSize:width(4),
    color:Colors.appTextColor3,
    marginTop:height(1),
  }
});
export default styles;
