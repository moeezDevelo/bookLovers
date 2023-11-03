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
  sliderContainer: {
    height: '100%',
  },
  dotStyle: {
    backgroundColor: Colors.appColor3
  },
  activeDotStyle: {
    backgroundColor: Colors.appColor2
  },
  image: {
    height: height(60),
    width: width(100)
  },
  textContainer: {
    width: width(80),
    alignSelf: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: width(7),
    fontWeight: 'bold',
    color: Colors.appTextColor2
  },
  descriptionText: {
    textAlign: 'center',
    marginTop: height(1),
    fontSize: totalSize(1.5),
    color: Colors.appTextColor3,
    lineHeight: height(2.5)
  },
  signInButton: {
    marginTop: height(2),
    alignSelf: 'center',
    marginBottom: height(1)
  },
  signInButtonText: {
    fontSize: totalSize(1.85),
    color: Colors.appColor1,
    fontWeight: "bold"
  }
});
export default styles;
