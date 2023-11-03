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
  mainViewContainer: {
    flex: 1,
  },
  scrollView:{
      paddingBottom:height(2)
  },
  bannerImage:{
      width:width(100),
      height:height(35)
  },
  noteTitle:{
      textAlign:'center',
      marginTop:height(2),
      fontSize:width(5),
      color:Colors.appColor1,
      fontFamily:'AvenirLTStd-Black'
  },
  titleText:{
    textAlign:'center',
    marginTop:height(1),
    fontSize:width(4.5),
      color:Colors.black,
      fontFamily:'AvenirLTStd-Roman'
  },
  descriptionContainer:{
      marginTop:height(2),
      width:width(90),
      alignSelf:'center'
  },
  descriptionText:{
    fontSize:width(4),
    lineHeight:height(3),
    fontFamily:'AvenirLTStd-Roman'
  }
});
export default styles;
