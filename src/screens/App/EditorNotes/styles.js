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
    width: width(90),
    alignSelf: 'center'
  },
  itemSeparatorComponent: {
    margin: totalSize(1)
  },
  flatListContainer: {
    paddingVertical: height(3),
    justifyContent: 'space-between'
  },
  flatListViewContainer: {
    width: width(43),
    paddingBottom: height(2),
    backgroundColor: Colors.white,
    borderRadius: width(2),
    marginRight: width(2)
  },
  image: {
    width: '100%',
    height: height(20),
    borderTopLeftRadius: width(2),
    borderTopRightRadius: width(2)
  },
  textContainer: {
    width: width(40),
    alignSelf: 'center',
    marginTop: height(2)
  },
  titleText: {
    fontSize:width(4.2),
    textAlign:'center',
    color:Colors.black,
    lineHeight:height(3)
  }
});
export default styles;
