import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import user_api from '@/app/api/user_api'

const DeleteRecordModal = ({
    showModal,
    setShowModal
}) => {

    const handleDelete = async () => {
        try {
            await user_api.delete(`record/${showModal.itemId}`);
            console.log("Success");
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`)
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error.error);
            }
        } finally {
            setShowModal({ visible: false, itemId: 0, isDeleted: true });
        }
    }

    return (
        <Modal
            transparent={true}
            visible={showModal.visible}
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
                        height: '25%',
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
                        Are you Sure. You want to delete this record?
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            marginTop: 15
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setShowModal({ visible: false, itemId: showModal.itemId, isDeleted: showModal.isDeleted })}
                            style={{
                                borderWidth: 1.5,
                                paddingHorizontal: 20,
                                paddingVertical: 8,
                                borderRadius: 5
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDelete()}
                            style={{
                                backgroundColor: 'red',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 5
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white'
                                }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DeleteRecordModal