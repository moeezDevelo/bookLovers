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
    height: height(5),
    backgroundColor: Colors.white,
    paddingHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
export default styles;
