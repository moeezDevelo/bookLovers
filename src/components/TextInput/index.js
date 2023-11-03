import React, { forwardRef, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import MaskInput from 'react-native-mask-input';
import styles from './styles';
import Colors from '../../utills/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { totalSize } from 'react-native-dimension';
const Component = ({ placeHolder, hidden, masked, keytype, value, editable ,onSubmit, textInputStyle,
    keyboardType ,textFieldContainerStyle,onChangeText}, ref) => {
    const [hiddenType, setHidden] = useState(hidden)
    return (
        <View style={[styles.textFieldContainer,textFieldContainerStyle?textFieldContainerStyle:{}]}>
                {!masked && <TextInput
                    placeholder={placeHolder}
                    placeholderTextColor={Colors.appTextColor1}
                    autoCapitalize='none'
                    ref={ref}
                    editable={editable?false:true}
                    value={value}
                    keyboardType={keyboardType}
                    onSubmitEditing={onSubmit}
                    style={!hidden ? [styles.textInput,textInputStyle?textInputStyle:{}] : styles.textPasswordInput}
                    secureTextEntry={hiddenType ? true : false}
                    returnKeyType={keytype}
                    onChangeText={onChangeText? (val)=>onChangeText(val):null}
                    // keyboardType='phone-pad'
                />}
                {masked && <MaskInput
                   placeHolder={placeHolder}
                   ref={ref}
                   value={value}
                   onSubmitEditing={onSubmit}
                   mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                   onChangeText={(masked, unmasked) => onChangeText(masked)}
               />}
                {hidden ?
                    <TouchableOpacity style={styles.hiddenButton}
                        onPress={() => setHidden(!hiddenType)}
                    >
                        <Ionicons name={!hiddenType ? 'eye-sharp' : 'ios-eye-off'}
                            size={totalSize(2)} color={Colors.appIconColor1}
                        />
                    </TouchableOpacity> :
                    null
                }
        </View>
    );
};
export default forwardRef(Component);