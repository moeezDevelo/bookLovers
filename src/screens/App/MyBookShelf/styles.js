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
    fontSize:width(7),
    color:Colors.appColor1,
  },
  mainViewContainer: {
    flex: 1,
  },
  itemSeparatorComponent: {
    margin: totalSize(1)
  },
  flatListContainer: {
    paddingVertical: height(3),
  },
  headerTextContainer:{
    width:width(90),
    alignSelf:'center'
  },
  headerText:{
    fontSize:width(3.6),
    color:Colors.appTextColor9,
    marginBottom:height(2)
  },
  viewContainer:{
    width:width(90),
    alignSelf:'center',
    backgroundColor:Colors.white,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    borderRadius:width(2)
  },
  bookImage:{
    width:width(25),
    height:height(12),
    borderTopLeftRadius:width(2),
    borderBottomLeftRadius:width(2)
  },
  textContainer:{
    width:width(60),
    paddingRight:width(2)
  },
  authorNameText:{
    fontSize:width(3.6),
    color:Colors.appColor1,
    fontWeight:'bold'
  },
  bookTitleText:{
    fontSize:width(4),
    color:Colors.black,
    marginTop:height(0.5),
    fontWeight:'bold'
  },
  createdAtText:{
    fontSize:width(3),
    color:Colors.appIconColor1,
    marginTop:height(0.5),
  },
  iconButton:{
    position:'absolute',
    right:width(2),
    top:height(1)
  },
  addButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(10),
    backgroundColor: Colors.appColor1,
    width: width(80),
    alignSelf: 'center',
    height: height(6),
    marginTop:height(4),
    flexDirection:'row'
  },
  addText:{
    color: Colors.white,
    fontSize: totalSize(1.75),
    fontWeight:'bold',
    marginHorizontal:width(2)
  }
});
export default styles;
