import { StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(10),
    backgroundColor: Colors.appColor1,
    width: width(80),
    alignSelf: 'center',
    height: height(6),
    marginTop: height(2)
  },
  text: {
    color: Colors.white,
    fontSize: totalSize(1.75),
    fontWeight: 'bold'
  },
  // Menu Button
  menuComponentContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2.5)
  },
  menuComponentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuTitleText: {
    fontSize: width(5.5),
    color: Colors.black,
  },
  menuUnderLine: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2),
    borderBottomWidth: 1.5,
    borderColor: Colors.borderLine,
  },
  //setting component
  settingComponentContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(1)
  },
  settingComponentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingComponentIconContainer: {
    width: width(10),
    height: height(5),
    backgroundColor: Colors.appColor2,
    borderRadius: width(2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingComponentText: {
    width: width(65),
    fontSize: width(4),
    color: Colors.black,
    fontFamily: 'AvenirLTStd-Roman'
  },
  settingLine: {
    width: width(90),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: height(2),
    borderColor: Colors.appColor6
  },
});
export default styles;
