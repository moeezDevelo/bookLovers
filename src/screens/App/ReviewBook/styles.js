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
    fontSize: width(5.5),
    color: Colors.appColor1,
  },
  mainViewContainer: {
    flex: 1,
  },
  bookInfoContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2)
  },
  bookTitleText: {
    fontSize: width(4.5),
    fontWeight: "bold",
    color: Colors.appTextColor3
  },
  authorNameText: {
    fontSize: width(4),
    color: Colors.appTextColor3,
    marginTop: height(1)
  },
  ratingContainer: {
    marginTop: height(2),
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    fontSize: width(4),
    color: Colors.appTextColor3,
    marginRight:width(2)
  },
  textFieldContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2)
  },
  textInputHeading: {
    marginTop: height(2),
    fontSize: width(4),
    color: Colors.appColor7
  },
  textInputContainer: {
    width: width(90),
    height: height(6),
    backgroundColor: Colors.white,
    marginTop: height(1),
    borderRadius: width(1),
    borderWidth: 1,
    borderColor: Colors.appColor7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: width(80),
    height: height(5.5),
    paddingVertical: 0,
    fontSize: totalSize(1.75),
    color: Colors.black,
    textAlignVertical: 'top'
  },
  submitButton: {
    marginTop: height(4)
  }
});
export default styles;
