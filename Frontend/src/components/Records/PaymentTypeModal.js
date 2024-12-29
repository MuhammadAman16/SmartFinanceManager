import { View, Text, Modal } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import styles from '../Styling/Stlyes';

const paymentTypeArray = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Debit Card', value: 'Debit Card' },
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Voucher', value: 'Voucher' },
    { label: 'Mobile Payment', value: 'Mobile Payment' },
    { label: 'Web Payment', value: 'Web Payment' }
]

const PaymentTypeModal = ({
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
                    <Text style={styles.textModal}>Select Payment Type</Text>
                    <RadioButton.Group
                        onValueChange={(text) => {
                            setFieldValue(text);
                            setModalVisible(false);
                        }}
                        value={value}
                    >
                        {paymentTypeArray.map((status, index) => <RadioButton.Item key={index} label={status.label} value={status.value} />)}
                    </RadioButton.Group>
                </View>
            </View>
        </Modal>
    )
}

export default PaymentTypeModal