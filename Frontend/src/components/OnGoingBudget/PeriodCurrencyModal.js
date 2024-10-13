import { View, Text, Modal } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import styles from '../Styling/Stlyes';
import { PeriodDropDownValues, CurrencyDropDownValues } from '@/src/components/Data/Period_Currency/PeriodCurrencyArray';

const PeriodCurrencyModal = ({
    isModalVisible,
    modalName,
    setInputField,
    setModalVisible,
    value
}) => {
    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textModal}>Select {modalName === 'Period' ? 'Period' : 'Currency'}</Text>
                    <RadioButton.Group
                        onValueChange={(selectedValue) => {
                            setInputField(selectedValue); // Update the Formik field directly
                            setModalVisible({ value: false, modalName: '' });
                        }}
                        value={value}
                    >
                        {modalName === 'Period' ?
                            (PeriodDropDownValues.map((item, index) =>
                                <RadioButton.Item key={index} label={item.label} value={item.value} />)
                            ) : 
                            (CurrencyDropDownValues.map((item, index) =>
                                <RadioButton.Item key={index} label={item.label} value={item.value} />
                            ))
                        }
                    </RadioButton.Group>
                </View>
            </View>
        </Modal>
    )
}

export default PeriodCurrencyModal