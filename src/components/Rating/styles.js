import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedDefaultComponent: {
    height: height(2),
    width: height(2),
    borderRadius: height(2),
    backgroundColor: 'yellow',
    marginRight: width(1)
  },
  unSelectedDefaultComponent: {
    height: height(2),
    width: height(2),
    borderRadius: height(2),
    backgroundColor: 'grey',
    marginRight: width(1)
  }
});
export default styles;
