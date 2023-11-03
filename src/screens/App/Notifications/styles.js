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
  textStyle: {
    width: width(63)
  },
  mainViewContainer: {
    flex: 1,
    paddingTop: height(3)
  },
  notificationsContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  notifcationText: {
    fontSize: width(4),
    color: Colors.black,
    fontFamily: 'AvenirLTStd-Roman'
  },
  line: {
    width: width(90),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: height(2),
    borderColor: Colors.appColor6
  },
});
export default styles;
