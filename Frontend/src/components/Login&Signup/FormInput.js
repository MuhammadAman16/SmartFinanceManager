import { Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import styles from '../Styling/Stlyes'

const FormInput = (props) => {
    const { label, placeHolder, secureTextEntry, autoCapitalize, value, onChangeFunction, error } = props;
    return <>
        <View style={styles.errorTextView}>
            <Text style={styles.viewInputText}>{label}</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null }
        </View>
        <TextInput
            {...props}
            placeholder={placeHolder}
            style={styles.inputField}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            value={value}
            onChangeText={onChangeFunction}
        />
    </>
}

export default FormInput