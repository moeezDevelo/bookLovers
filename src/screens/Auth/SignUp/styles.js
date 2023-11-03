import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  mainViewContainer: {
    flex: 1,
  },
  logoImage: {
    alignSelf: 'center',
    height: totalSize(15),
    width: totalSize(15),
  },
  headingContainer: {
    width: width(90),
    alignSelf: 'center'
  },
  headingText: {
    fontSize: totalSize(2),
    color: Colors.appColor1,
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: totalSize(1.5),
    color: Colors.appTextColor4,
    lineHeight: height(2.25),
    marginTop: height(1)
  },
  textInputContainer: {
    width: width(100),
    alignSelf: 'center',
    marginTop: height(1),
  },
  textInputHeading: {
    fontSize: totalSize(1.85),
    color: Colors.appTextColor5,
    marginTop: height(1.5),
    marginHorizontal: width(5)
  },
  nameContainer: {
    width: width(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameTextInputHeading: {
    fontSize: totalSize(1.85),
    color: Colors.appTextColor5,
    marginTop: height(2),
  },
  nameTextFieldContainer: {
    width: width(40),
  },
  nameTextField: {
    width: width(36)
  },
  termsConditionContainer: {
    marginTop: height(2),
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center'
  },
  acceptTextContainer: {
    marginHorizontal: width(3)
  },
  acceptText: {
    fontSize: totalSize(1.5),
    color: Colors.appColor1,
  },
  confirmButton: {
    marginTop: height(3)
  }
});
export default styles;
