import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerStyles:{
      backgroundColor:Colors.white
  },
  mainViewContainer: {
    flex: 1,
  },
  scrollView:{
      paddingBottom:height(2)
  },
  spotLightBanner:{
      width:width(100),
      height:height(40)
  },
  authorNameContainer:{
      width:width(90),
      alignSelf:'center',
      marginTop:height(2)
  },
  authorNameHeading:{
    fontWeight:'bold',
    fontSize:width(6),
    color:Colors.appColor1
  },
  booksDetilsContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  booksDetilsInnerContainer:{
    width:width(45),
    flexDirection:'row',
    alignItems:'center',
  },
  iconContainer:{
    height:height(4.5),
    width:width(9),
    backgroundColor:Colors.appColor2,
    borderRadius:width(2),
    alignItems:'center',
    justifyContent:'center'
  },
  detailBookTextContainer:{
    marginLeft:width(2)
  },
  bookIconImage:{
    height:totalSize(2),
    width:totalSize(2),
    tintColor:Colors.white
  },
  detailTitleText:{
    color:Colors.appTextColor6,
    fontSize:width(2.8),
    fontFamily:'AvenirLTStd-Book'
  },
  editorReviews:{
    marginTop:height(0.5),
    color:Colors.appTextColor6,
    fontSize:width(2.8),
    fontFamily:'AvenirLTStd-Book',
    textDecorationLine:'underline'
  },
  line:{
    width:width(100),
    alignSelf:'center',
    marginTop:height(2),
    borderBottomWidth:1.5,
    borderColor:Colors.borderLine,
  },
  aboutContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2)
  },
  bioText:{
    color:Colors.appTextColor7,
    fontSize:width(3.8),
    lineHeight:height(2.75),
    fontFamily:'AvenirLTStd-Book'
  },
  headerTextContainer:{
    width:width(90),
    alignSelf:'center'
  },
  headingText: {
    fontSize: width(6),
    color: Colors.appColor1,
    fontWeight: 'bold',
    marginBottom: height(2),
    marginTop:height(2),
    textDecorationLine:'underline',
  },
  itemSeparatorComponent: {
    margin: totalSize(1)
  },
  flatListContainer: {
    paddingVertical: height(3),
  },
  flatListViewContainer: {
    width: width(90),
    paddingVertical: 0,
    backgroundColor: Colors.white,
    borderRadius: width(2),
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth:1,
    borderColor:Colors.border
    
  },
  image: {
    width: width(22),
    height: height(14),
    borderTopLeftRadius: width(2),
    borderBottomLeftRadius: width(2)
  },
  textContainer:{
    width:width(65)
  },
  titleText:{
    fontSize:width(5),
    fontWeight:'bold',
    color:Colors.appColor1
  },
  headingTitleText:{
    fontSize:width(4.5),
    fontWeight:'bold',
    color:Colors.black,
    marginTop:height(0.5)
  },
  timeText:{
    fontSize:width(3.65),
    color:Colors.appIconColor1,
    marginTop:height(0.5)
  }
});
export default styles;
