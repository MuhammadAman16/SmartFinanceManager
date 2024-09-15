import { View, Text, Animated } from 'react-native'
import React from 'react'
import styles from '../Styling/Stlyes'

const FormHeader = ({leftHeading, rightHeading, subHeading, leftHeadingTransateX=0, rightHeadingTransllateY=0, rightHeadingOpacity=0}) => {
    return <>
    <View style={styles.textWrapper}>
        <Animated.Text style={[styles.text, {transform: [{translateX: leftHeadingTransateX}]}]}>{leftHeading}</Animated.Text>
        <Animated.Text style={[styles.text, {opacity: rightHeadingOpacity, transform: [{translateY: rightHeadingTransllateY}]}]}>{rightHeading}</Animated.Text>
    </View>
    <Text style={styles.subText}>{subHeading}</Text>
    </>
}

export default FormHeader;