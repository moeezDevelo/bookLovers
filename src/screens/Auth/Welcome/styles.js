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
  welcomeImage: {
    height: height(65),
    width: width(100),
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: totalSize(1.5),
    lineHeight: height(2.25),
    color: Colors.appTextColor1,
    marginTop: height(0.5)
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
  },
  exploreButton: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.appTextColor1,
    paddingBottom: height(0.4)
  },
  guestText: {
    fontSize: totalSize(1.5),
    color: Colors.appTextColor1,
  }
});
export default styles;
