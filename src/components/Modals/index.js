import React, { } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Colors from '../../utills/Colors';
import styles from './styles';
import Modal from 'react-native-modal';
import { width, height } from 'react-native-dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { setExplore } from '../../Redux/Actions/config';
import { exploreLandingData } from '../../Redux/Actions/Explore';
export const ImagePickerModal = ({ isVisible, onClose, imageFromCamera, imageFromGallery }) => {
    return (
        <Modal isVisible={isVisible} >
            <View style={styles.imageModalContainer}>
                <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
                    <AntDesign name="closecircle" size={height(3.5)} color={Colors.black} />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.picOption} onPress={imageFromCamera}>
                        <MaterialIcons name="photo-camera" size={height(3.7)} color={Colors.black} />
                        <Text style={styles.picOptionText}>Take Photo</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity style={styles.picOption} onPress={imageFromGallery}>
                        <MaterialIcons name="insert-photo" size={height(3.7)} color="black" />
                        <Text style={styles.picOptionText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
// ReaderOptions Modal
export const ReaderOptionsModal = ({ isVisible, onClose, onBookDetail, onLeaveReview,
    onRemoveDevice, bookType
}) => {
    return (
        <Modal isVisible={isVisible}
            style={{ margin: 0, padding: 0, justifyContent: 'flex-end' }}
        >
            <View style={styles.readerModalContainer}>
                <TouchableOpacity activeOpacity={0.7} style={styles.readerModalOptionButton}
                    onPress={() => {
                        onClose()
                        onBookDetail()
                    }}
                >
                    <Entypo name='book' size={width(8)} color={Colors.black} />
                    <Text style={styles.buttonText}>Book Details</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.readerModalOptionButton}
                    onPress={() => {
                        onClose()
                        onLeaveReview()
                    }}
                >
                    <AntDesign name='star' size={width(8)} color={Colors.black} />
                    <Text style={styles.buttonText}>Leave a review</Text>
                </TouchableOpacity>
                {bookType === 'E-Book' &&
                    <TouchableOpacity activeOpacity={0.7} style={styles.readerModalOptionButton}
                        onPress={() => {
                            onClose()
                            onRemoveDevice()
                        }}
                    >
                        <MaterialCommunityIcons name='trash-can' size={width(8)} color={Colors.black} />
                        <Text style={styles.buttonText}>Remove from device</Text>
                    </TouchableOpacity>
                }
                <View style={styles.lineSeparator} />
                <TouchableOpacity activeOpacity={0.7} style={styles.cancelButton}
                    onPress={() => {
                        onClose()
                    }}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export const LoaderModal = ({ }) => {
    const isLoader = useSelector((state) => state.config.isLoader);
    const isLoaderText = useSelector((state) => state.config.isLoaderText);
    return (
        <Modal
            isVisible={isLoader}
            style={styles.lodaerModal}>
            <ActivityIndicator size={'large'} color={Colors.appColor1} />
            {isLoaderText != '' && <Text style={styles.loaderText}>{isLoaderText}</Text>}
        </Modal>
    )
}
export const ReviewModal = ({ isVisible, onClose, review }) => {
    return (
        <Modal isVisible={isVisible}
            style={styles.reviewModal}
        >
            <View style={styles.reviewModalContainer}>
                <View style={styles.headingContainerReview}>
                    <Text style={styles.editiorReviewHeadingText}>Editior Review</Text>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="closecircle" size={width(5)} color={Colors.appColor1} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.editiorReviewContainer}>
                        <Text style={styles.editiorReviewText}>{review}</Text>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}
export const LogInModal = ({ isVisible, onClose }) => {
    const dispatch = useDispatch()
    return (
        <Modal isVisible={isVisible}
            style={styles.logInModal}
        >
            <View style={styles.logInModalContainer}>
                <TouchableOpacity style={styles.logInModalHeaderContainer} onPress={onClose}>
                    <AntDesign name="closecircle" size={height(2.75)} color={Colors.appColor1} />
                </TouchableOpacity>
                <Text style={styles.accessText}>Sign in to access this feature</Text>
                <TouchableOpacity style={styles.continueButton} onPress={() => {
                    onClose()
                    dispatch(setExplore(false))
                    dispatch(exploreLandingData(null))
                }}>
                    <Text style={styles.continueText}>continue</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}