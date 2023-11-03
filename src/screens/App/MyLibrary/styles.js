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
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(2)
  },
  tabButtons: {
    alignItems: 'center',
    marginHorizontal: width(3)
  },
  selectedTabText: {
    fontSize: width(4),
    color: Colors.appTextColor3,
    fontWeight: 'bold'
  },
  unSelectedTabText: {
    fontSize: width(4),
    color: Colors.appIconColor1,
    fontWeight: 'bold'
  },
  selectedTabLine: {
    width: width(27),
    borderBottomWidth: 2,
    borderBottomColor: Colors.appTextColor3,
    marginTop: height(2)
  },
  unSelectedTabLine: {
    width: width(30),
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    marginTop: height(2)
  },
  mainViewContainer: {
    flex: 1,
  },
  itemSeparatorComponent: {
    margin: totalSize(1)
  },
  flatListContainer: {
    paddingVertical: height(2),
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height(20)
  },
  audioBookType: {
    marginBottom: height(1),
    fontSize: width(3),
    color: Colors.appIconColor1,
    marginHorizontal:width(5)
  },
  emptyText: {
    fontSize: width(4),
    color: Colors.black,
  }
});
export default styles;
