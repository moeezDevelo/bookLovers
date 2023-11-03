import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerStyles: {
    backgroundColor: Colors.white
  },
  mainViewContainer: {
    flex: 1,
  },
  image:{
    width:width(100),
    height:height(60)
  },
  settingButton:{
    alignSelf:'flex-end',
    marginHorizontal:width(5),
    marginTop:height(2)
  },
  playerContainer:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(1),
  },
  controllersContainer:{
    width:width(70),
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center'
  },
  playPasueContainer:{
    width:width(20),
    height:width(20),
    borderRadius:width(10),
    backgroundColor:Colors.appColor,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  seekControllersContainer:{
    width:width(29),
    alignItems:'center',
    flexDirection:'row',
    marginTop:height(0.8),
    justifyContent:'space-between'
  },
  progressContainer:{
    width:width(90)
  },
  chapterText:{
    marginBottom:height(0.8),
    color:Colors.black,
    fontSize:width(4),
    fontWeight:'bold'
  },
  timersContainer:{
    marginTop:height(0.8),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
});
export default styles;
