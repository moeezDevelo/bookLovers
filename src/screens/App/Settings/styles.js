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
    width: width(63),
    fontWeight: 'bold',
    fontSize: width(7),
    color: Colors.appColor1,
  },
  mainViewContainer: {
    flex: 1,
    paddingTop: height(3)
  },
  buttonContainer: {
    width: width(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(2)
  },
  iconContainer: {
    width: width(10),
    height: height(5),
    backgroundColor: Colors.appColor2,
    borderRadius: width(2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    width: width(65),
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
  logoutButton: {
    marginBottom: height(1)
  }

});
export default styles;
