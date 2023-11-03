import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor
  },
  containerStyles: {
    backgroundColor: Colors.white,
  },
  textStyle: {
    width: width(67),
    fontWeight: 'bold',
    fontSize: width(5.5),
    color: Colors.appColor1,
    textAlign: 'left'
  },
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pdf: {
    flex: 1,
    width: width(100),
    height: height(100),
    backgroundColor: Colors.white,
  },
  bottomContainer: {
    width: width(100),
    paddingVertical: height(2),
    backgroundColor: Colors.white,
    paddingHorizontal: width(5),
  },
  footerControl:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    width: width(70), 
    alignSelf:'center'
  },
  sliderContainer:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-between',
    width: width(88)    
  },
  textStyle: {
    color: Colors.appTextColor3,
  },
  trackMarks :{
    width: width(1), 
    height: height(1.5), 
    backgroundColor:Colors.borderLine2
  }
});
export default styles;
