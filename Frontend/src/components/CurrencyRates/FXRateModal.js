import { View, Text, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const FXRateModal = ({
    showModal,
    keys,
    setToCurrency,
    setShowModal
}) => {

    const handleOnPressFunction = (value) => {
        setToCurrency(value);
        setShowModal(false);
    }

    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="slide"
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginHorizontal: 15,
                }}
            >
                <View
                    style={{
                        height: '60%',
                        backgroundColor: 'white',
                        padding: 40,
                        borderRadius: 10,
                        boxShadow: 'black',
                        elevation: 15
                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 5
                        }}
                    >
                        Select TO Currency
                    </Text>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
                    >
                        {
                            keys.map((keyValue, index) => (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => handleOnPressFunction(keyValue)}
                                >
                                    <Text
                                        style={{
                                            alignSelf: 'center',
                                            fontSize: 16,
                                            marginVertical: 5,
                                        }}
                                    >
                                        {keyValue}
                                    </Text>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default FXRateModal