import React, { forwardRef, useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { MaskedTextInput } from "react-native-mask-text";

const Component = ({ value, onSubmit, keytype, keyboardType, onChangeText, textFieldContainerStyle}, ref) => {
    return (
        <View style={[styles.textFieldContainer,textFieldContainerStyle?textFieldContainerStyle:{}]}>
            <Text>val: {value}</Text>
            <MaskedTextInput
                mask="+1(999)999-9999"
                onChangeText={onChangeText? (val)=>onChangeText(val):null}
                value={value}
                keyboardType={keyboardType}
                onSubmitEditing={onSubmit}
                returnKeyType={keytype}
                onChangeText={onChangeText? (val)=>onChangeText(val):null}
            />
        </View>
    );
};
export default forwardRef(Component);