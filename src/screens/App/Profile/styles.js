import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appColor
  },
  mainViewContainer: {
    flex: 1,
  },
  profileInfoContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileImage: {
    height: width(30),
    width: width(30),
    borderRadius: width(15),
  },
  cameraButton: {
    height: width(25),
    width: width(25),
    borderRadius: width(15),
    backgroundColor: Colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameContainer: {
    width: width(55)
  },
  nameText: {
    fontSize: width(5),
    fontFamily: 'AvenirLTStd-Black',
    color: Colors.black
  },
  commentsInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(1)
  },
  commentsContainer: {
    width: width(27.5),
  },
  quantityText: {
    fontSize: width(4),
    color: Colors.black,
    fontFamily: 'AvenirLTStd-Roman'
  },
  commentText: {
    fontSize: width(3.5),
    color: Colors.appTextColor6,
    marginTop: height(0.5),
    fontFamily: 'AvenirLTStd-Roman'
  },
  bookedOwns: {
    width: width(27.5),
    alignItems: 'center'
  },
  quantityBookedText: {
    fontSize: width(4),
    fontWeight: 'bold',
    color: Colors.black,
  },
  lineView: {
    width: width(100),
    height: height(1.5),
    backgroundColor: Colors.appColor4,
    marginTop: height(2),
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
  }

});
export default styles;
