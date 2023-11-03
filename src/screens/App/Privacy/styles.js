import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor
  },
  containerStyles: {
    backgroundColor: Colors.white
  },
  mainViewContainer: {
    flex: 1,
  },
  contentContainer:{
    paddingBottom:height(3)
  },
  headingText: {
    fontSize: width(5),
    color: Colors.appColor1,
    fontFamily: 'AvenirLTStd-Black',
    marginVertical: height(2),
    textDecorationLine:'underline',
    marginHorizontal:width(5),
    lineHeight:height(3)
  },
  text:{
      marginHorizontal:width(5),
      lineHeight:height(3),
      fontSize:width(3.5),
      fontFamily: 'AvenirLTStd-Roman',
      color:Colors.appTextColor1
  }
});
export default styles;
