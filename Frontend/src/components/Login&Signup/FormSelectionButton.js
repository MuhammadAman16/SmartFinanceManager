import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import React from 'react'
import styles from '../Styling/Stlyes'

const FormSelectionButton = ({title, otherStyleObject, bakgroundColor, onPressFunction}) => {
    return <>
        <TouchableWithoutFeedback
            onPress={onPressFunction}
        >
            <Animated.View style={[styles.viewTouchableText, otherStyleObject, {backgroundColor: bakgroundColor}]}>
                <Text style={styles.touchableText}>{title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    </>
}

export default FormSelectionButton