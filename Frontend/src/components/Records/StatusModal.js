import { View, Text, Modal } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import styles from '../Styling/Stlyes';

const status = [
    {label: 'Reconciled', value: 'Reconciled'},
    {label: 'Cleared', value: 'Cleared'},
    {label: 'Uncleared', value: 'Uncleared'}
]

const StatusModal = ({
    isModalVisible,
    value,
    setModalVisible,
    setFieldValue
}) => {
    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textModal}>Select Status</Text>
                    <RadioButton.Group
                        onValueChange={(text) => {
                            setFieldValue(text);
                            setModalVisible(false);
                        }}
                        value={value}
                    >
                        {status.map((status, index) => <RadioButton.Item key={index} label={status.label} value={status.value}/>)}
                    </RadioButton.Group>
                </View>
            </View>
        </Modal>
    )
}

export default StatusModal