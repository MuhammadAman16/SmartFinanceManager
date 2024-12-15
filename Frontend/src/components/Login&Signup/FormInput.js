import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../Styling/Stlyes'

const FormInput = (props) => {
    const { label, placeHolder, secureTextEntry, autoCapitalize, value, onChangeFunction, error, color } = props;
    const [showPassword, setShowPassword] = useState(secureTextEntry);
    return <>
        <View style={styles.errorTextView}>
            <Text style={styles.viewInputText}>{label}</Text>
            {secureTextEntry && <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}><Text>{ showPassword ? "Show" : "Hide"}</Text></TouchableOpacity>}
        </View>
        <TextInput
            {...props}
            placeholder={placeHolder}
            style={styles.inputField}
            secureTextEntry={showPassword}
            autoCapitalize={autoCapitalize}
            value={value}
            onChangeText={onChangeFunction}
            color={color}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
}

export default FormInput