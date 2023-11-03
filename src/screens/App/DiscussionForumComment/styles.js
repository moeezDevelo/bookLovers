import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerStyles: {
    backgroundColor: Colors.white,
    height: height(8),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 0.3
  },
  scrollView: {
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios' ? height(1) : 0
  },
  bannerImage: {
    width: width(90),
    height: height(25),
    alignSelf: 'center',
  },
  infoContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(3),
  },
  aboutText: {
    color: Colors.black,
    fontSize: width(4),
    lineHeight: height(2.75),
    fontFamily: 'AvenirLTStd-Book'
  },
  likesCommentContainer: {
    marginVertical: height(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCommentText: {
    marginHorizontal: width(3),
    color: Colors.appTextColor6,
    fontSize: width(3)
  },
  itemSeparatorComponent: {
    margin: totalSize(1)
  },
  commentsFlatListContainer: {
    height: Platform.OS === 'ios' ? height(75) : height(82),
    backgroundColor: Colors.appColor
  },
  flatListContainer: {
    paddingVertical: height(3),
  },
  flatListViewContainer: {
    width: width(100),
    paddingVertical: height(2),
    backgroundColor: Colors.white
  },
  reportButton: {
    alignSelf: 'flex-end',
    marginHorizontal: width(5)
  },
  reportText: {
    fontSize: width(3.75),
    color: Colors.appTextColor12
  },
  personInfoContainer: {
    width: width(90),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  personImage: {
    height: width(12),
    width: width(12),
    borderRadius: width(6)
  },
  nameContainer: {
    width: width(75),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  personNameText: {
    fontSize: width(4),
    color: Colors.black,
    fontFamily: 'AvenirLTStd-Black'
  },
  timeText: {
    fontSize: width(3),
    color: Colors.appTextColor6,
  },
  commentContainer: {
    width: width(75),
    alignSelf: 'flex-end',
    marginHorizontal: width(5)
  },
  commemtText: {
    fontSize: width(4),
    color: Colors.black,
    lineHeight: height(2.5),
    fontFamily: 'AvenirLTStd-Book'
  },
  seeText: {
    fontSize: width(4),
    fontWeight: 'bold',
    color: Colors.appColor1
  },
  commentImage: {
    width: totalSize(12),
    height: totalSize(12),
    borderRadius: width(3),
    marginTop: height(1)
  },
  line: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2),
    borderBottomWidth: 1.5,
    borderColor: Colors.borderLine,
  },
  repliesContainer: {
    width: width(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(2),
  },
  // replyButton: {
  //   alignSelf: 'flex-end',
  //   marginHorizontal: width(5),

  // },
  replyText: {
    fontSize: width(3.6),
    fontFamily: 'AvenirLTStd-Book',
    color: Colors.appTextColor6
  },
  replyInputContainer: {
    width: width(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(2)
  },
  bottomContainer: {
    width: width(100),
    paddingVertical: height(1),
    backgroundColor: Colors.white,
    borderTopWidth: width(2),
    borderTopColor: Colors.appColor,
    borderBottomColor: Colors.white,
    borderBottomWidth: width(2),
  },
  newCommentImage: {
    height: height(10),
    width: height(10),
    marginHorizontal: width(5),
    marginBottom: height(1),
    paddingVertical: height(0.5),
  },
  crossImageContainer: {
    width: height(9),
    alignSelf: 'center',
    backgroundColor: Colors.black,
    opacity: 0.5,
    alignItems: 'flex-end',
  },
  inputTextContainer: {
    width: width(90),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  textInputContainer: {
    width: width(68),
    height: height(5.25),
    backgroundColor: Colors.appColor5,
    borderRadius: width(6),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: width(60),
    height: height(4.75),
    paddingVertical: 0,
    fontSize: totalSize(1.5),
    color: Colors.black
  },
  sentButton: {
    height: width(8),
    width: width(8),
    borderRadius: width(4),
    backgroundColor: Colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default styles;
