import { StyleSheet } from 'react-native';
import Colors from '../../../utills/Colors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appColor4
    },
    mainViewContainer: {
        flex: 1,
    },
    scrollView: {
        paddingBottom: height(2)
    },
    homeHeader: {
        height: height(30),
        width: width(100)
    },
    headerContainer: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    welcomeText: {
        color: Colors.white,
        fontSize: width(7),
        fontWeight: 'bold'
    },
    imageSliderContainer: {
        width: width(90),
        alignSelf: 'center',
        height: height(30),
        borderRadius: width(3),
        marginTop: -height(15),
        overflow: 'hidden'
    },
    imageComponentStyle: {
        borderRadius: width(3),
        width: '100%',
        marginRight: width(10)
    },
    paginationBoxStyle: {
        marginBottom: height(2),
        alignSelf: 'flex-start',
        paddingHorizontal: 0
    },
    dotStyle: {
        height: totalSize(1.5),
        width: totalSize(1.5),
        borderRadius: totalSize(0.75)
    },
    disscussionContainer: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    disscussionHeading: {
        fontSize: width(6),
        color: Colors.black,
        fontWeight: 'bold'
    },
    moreText: {
        fontSize: width(3.7),
        color: Colors.appTextColor6,
    },
    disscussionFlatlistContainer: {
        width: width(100),
        marginTop: height(2),
    },
    itemSeparatorComponent: {
        margin: totalSize(0.8)
    },
    discussionTopicFlatList: {
        paddingHorizontal: width(5),
        paddingVertical: height(2)
    },
    disscussionViewContainer: {
        width: width(70),
        paddingBottom: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2),
    },
    discussionImage: {
        width: '100%',
        borderTopRightRadius: width(2),
        borderTopLeftRadius: width(2),
        height: height(20)
    },
    discussionTextContainer: {
        width: width(60),
        alignSelf: 'center',
        marginTop: height(2)
    },
    discussionMessageText: {
        fontSize: width(4.5),
        color: Colors.black
    },
    discussionNameText: {
        marginTop: height(0.5),
        color: Colors.appTextColor6,
    },
    authorSpotLightContainer: {
        marginTop: height(2),
        width: width(90),
        alignSelf: 'center',
        // paddingVertical: height(2),
        borderRadius: width(1),
        paddingLeft: width(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.appColor,
    },
    authorSpotTextContainer: {
        width: width(55),
        marginVertical: height(2)
    },
    authorSpotNewContainer: {
        width: width(20),
        paddingVertical: height(1),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.appColor1,
        borderRadius: width(6),
    },
    authorSpotNewText: {
        color: Colors.white,
        fontSize: totalSize(1.5)
    },
    authorSpotText: {
        color: Colors.appTextColor8,
        fontSize: totalSize(1.85),
        marginTop: height(2),
        fontWeight: 'bold'
    },
    authorNameText: {
        color: Colors.appTextColor7,
        fontSize: totalSize(1.85),
        marginTop: height(1),
    },
    authorImage: {
        height: '100%',
        width: width(25),
    },
    editorNotesContainer: {
        marginTop: height(3),
        alignSelf: 'center',
        width: width(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editorNotesText: {
        fontSize: width(6),
        color: Colors.black,
        fontWeight: 'bold'
    },
    editorNotesFlatlistContainer: {
        width: width(100),
        marginTop: height(2),
    },
    editorNotesFlatList: {
        paddingHorizontal: width(5),
        paddingVertical: height(2)
    },
    editorNotesViewContainer: {
        width: width(60),
        paddingBottom: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2),
    },
    editorTopicImage: {
        width: '100%',
        borderTopRightRadius: width(2),
        borderTopLeftRadius: width(2),
        height: height(20)
    },
    editorTopicTextContainer: {
        width: width(60),
        marginTop: height(2),
        paddingHorizontal: width(2)
    },
    editorTopicTitleText: {
        textAlign: 'center',
        fontSize: totalSize(1.85),
        color: Colors.black
    },
    storyTimeContainer: {
        marginTop: height(3),
        alignSelf: 'center',
        width: width(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    storyTimeText: {
        fontSize: width(6),
        color: Colors.black,
        fontWeight: 'bold'
    },
    editorNotesFlatlistContainer: {
        width: width(100),
        marginTop: height(2),
    },
    storyTimeFlatList: {
        paddingHorizontal: width(5),
        paddingVertical: height(2)
    },
    storyTimeViewContainer: {
        width: width(50),
        paddingVertical: height(2),
        backgroundColor: Colors.white,
        borderRadius: width(2.5),
        paddingHorizontal: width(2)
    },
    storyTimeImage: {
        width: '100%',
        height: height(20)
    },
    storyTimeTextContainer: {
        width: width(45),
        marginTop: height(1)
    },
    storyTimeHeading: {
        fontSize: width(3.8),
        color: Colors.appColor1,
    },
    storyTimeTitleText: {
        fontSize: width(3.8),
        color: Colors.black,
        fontWeight: 'bold',
        marginTop: height(0.5)
    }
});
export default styles;
