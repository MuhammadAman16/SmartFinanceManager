import { View, Text, TextInput } from 'react-native';
import React from 'react';
import styles from '../Styling/Stlyes';
import { AntDesign } from '@expo/vector-icons';

const BudgetInputFields = ({ label, placeHolder, secureTextEntry, autoCapitalize, value, onChangeText, onBlur, error, keyboardype, editable, iconName, color }) => {
    return (
        <>
            <View style={styles.errorTextView}>
                <Text style={styles.viewInputText}>{label}</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            <View style={styles.BudgetInputFieldView}>
                <TextInput
                    placeholder={placeHolder}
                    style={styles.BudgetInputFieldStyling}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    keyboardType={keyboardype}
                    editable={editable}
                    color={color}
                />
                {iconName && (
                    <View style={styles.iconContainer}>
                        <AntDesign name={iconName} size={20} color={'black'} />
                    </View>
                )}
            </View>
        </>
    );
};

export default BudgetInputFields;
