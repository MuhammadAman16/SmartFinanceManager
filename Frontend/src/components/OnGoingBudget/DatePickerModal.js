import { View, Text } from 'react-native'
import React from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DatePickerModal = ({datePickerVisible, handleConfirm, hideDatePicker}) => {
    return (
        <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    )
}

export default DatePickerModal