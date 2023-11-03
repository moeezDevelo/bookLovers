import {StyleSheet} from 'react-native';
import Colors from '../../../utills/Colors';
import {width, height, totalSize} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
  mainViewContainer: {
    flex: 1,
    paddingTop:height(2)
  },
  contentContainerStyle:{
    paddingBottom:height(2)
  },
  line:{
    height:height(1),
    width:width(100),
    backgroundColor:Colors.appColor4
  }

});
export default styles;
