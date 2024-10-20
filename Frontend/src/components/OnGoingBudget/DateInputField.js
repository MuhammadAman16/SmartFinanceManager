import React from "react";
import { View, Text, TextInput } from 'react-native';
import styles from "../Styling/Stlyes";

const DateInputField = ({
    lable,
    value,
    error
}) => {
    const textColor = error ? 'red' : 'rgb(169,169,169)'
    return (
        <>
            <View style={styles.DateInputFieldView}>
                <Text style={[styles.DateInputFieldText, {color: textColor }]}>{lable}</Text>
                <TextInput
                    style={styles.DateInputField}
                    editable={false}
                    value={value}
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null }
        </>
    );
}

export default DateInputField;