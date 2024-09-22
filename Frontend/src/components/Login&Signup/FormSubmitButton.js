import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../Styling/Stlyes'

const FormSubmitButton = ({title, onPressFunction, submitting}) => {
  const backgroundColor = submitting ? 'rgba(34,68,60,255)' : 'rgba(34,68,35,255)'
  return <>
    <TouchableOpacity onPress={ submitting ? null : onPressFunction} style={[styles.submitButton, {backgroundColor}]}>
        <Text style={styles.submitButtonText}>{title}</Text>
    </TouchableOpacity>
  </>
}

export default FormSubmitButton