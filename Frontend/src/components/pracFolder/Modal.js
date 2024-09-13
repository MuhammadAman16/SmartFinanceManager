import React, { useState } from "react";
import { View, StyleSheet, Button, Modal, Text } from "react-native";

const categ = [
    {
        id: 1,
        name: 'Alowance'
    },
    {
        id: 2,
        name: 'Salary'
    },
    {
        id: 3,
        name: 'Pretty cash'
    },
    {
        id: 4,
        name: 'Bonus'
    },
    {
        id: 5,
        name: 'Other'
    }
]

const App = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <View style={styles.wrapper}>
            <Modal
                transparent={true}
                visible={showModal}
                animationType="fade"
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textModal}>Hello Code Step by Step</Text>
                        <Button title="Close Modal" onPress={() => setShowModal(false)}/>
                    </View>
                </View>
            </Modal>
            <View style={styles.btnView}>
                <Button title="Open Modal" 
                    onPress={() => setShowModal(true)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    btnView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        shadowColor: 'black',
        elevation: 5
    },
    textModal: {
        fontSize: 25,
        marginBottom: 10
    }
})

export default App;