import {StyleSheet} from 'react-native';
import Colors from '../../../utills/Colors';
import {width, height, totalSize} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor
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
  headingInfoText:{
    fontSize:width(3.5),
    color:Colors.appTextColor1,
    lineHeight:height(2.25),
    textAlign:'center',
    marginTop: height(2)
  },
  headingText: {
    fontSize: width(6),
    color: Colors.appColor1,
    fontWeight: 'bold',
    marginBottom: height(2),
    marginTop:height(2),
    textDecorationLine:'underline',
  },
  flatListViewContainer: {
    width: width(90),
    paddingVertical: 0,
    backgroundColor: Colors.white,
    borderRadius: width(2),
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  image: {
    width: width(20),
    height: height(10),
    borderTopLeftRadius: width(2),
    borderBottomLeftRadius: width(2)
  },
  textContainer:{
    width:width(65)
  },
  titleText:{
    fontSize:width(4.25),
    fontFamily:'AvenirLTStd-Black',
    color:Colors.appColor1
  },
  headingTitleText:{
    fontSize:width(3.8),
    fontFamily:'AvenirLTStd-Black',
    color:Colors.black,
    marginTop:height(1)
  },
  timeText:{
    fontSize:width(3.65),
    color:Colors.appIconColor1,
    fontFamily:'AvenirLTStd-Book',
    marginTop:height(0.5)
  },
  bannerImage:{
    width: width(90),
    height: height(35),
    alignSelf: 'center',
  }
});
export default styles;
