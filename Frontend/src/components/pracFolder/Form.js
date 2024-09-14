import React, { useState } from "react";
import { View, SafeAreaView, Text, StatusBar, TextInput, StyleSheet, TouchableOpacity, Dimensions, Keyboard, Modal, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const categoryList = [
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

const accountList = [
    {
        id: 1,
        name: 'Cash'
    },
    {
        id: 2,
        name: 'Account'
    },
    {
        id: 3,
        name: 'Card'
    }
]

const App = () => {

    const getDay = (dayNumber) => {
        if (dayNumber === 1) { return "Mon" }
        else if (dayNumber === 2) { return "Tue" }
        else if (dayNumber === 3) { return "Wed" }
        else if (dayNumber === 4) { return "Thu" }
        else if (dayNumber === 5) { return "Fri" }
        else if (dayNumber === 6) { return "Sat" }
        else { return "Sun" }
    }

    const formatDate = (rawDate) => {
        let dateToBeFormat = new Date(rawDate);
        let day = dateToBeFormat.getDay();

        return `${dateToBeFormat.getMonth() + 1}/${dateToBeFormat.getDate()}/${dateToBeFormat.getFullYear()} (${getDay(day)}) ${dateToBeFormat.getHours()}:${dateToBeFormat.getMinutes()}`
    };

    let todaysDate = new Date()
    let io = formatDate(todaysDate)
    const [date, setDate] = useState(io);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [account, setAccount] = useState("");
    const [note, setNote] = useState("");
    const [description, setDescription] = useState("");
    const [select, setSelect] = useState("");
    const { height } = Dimensions.get('window'); // Get screen height
    const [datePickerVisibe, setDatePickerVisibe] = useState(false);
    const [showModal, setShowModal] = useState("");

    const showDatePicker = () => {
        setDatePickerVisibe(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibe(false);
    };

    const handleConfirm = (date) => {
        setDate(formatDate(date));
        hideDatePicker();
    };

    const validationForm = () => {
        !category || !account || !amount ? console.warn("Some Field are Empty") : console.warn("Added Successfully")
    }

    return (
        <ScrollView>
        <SafeAreaView style={styles.safeWrapper}>
            <StatusBar />
            <Text style={{ fontSize: 25, alignSelf: 'center', fontWeight: 'bold' }}>Form</Text>
            <View style={[styles.viewInput, { height: height * 0.5 }]}>
                <View style={styles.labelsContainer}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.label}>Amount</Text>
                    <Text style={styles.label}>Category</Text>
                    <Text style={styles.label}>Account</Text>
                    <Text style={styles.label}>Note</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={[styles.textinput, { borderBottomColor: select === "date" ? "skyblue" : "#e3e3e3" }]}
                        onChangeText={(text) => setDate(text)}
                        value={date}
                        onFocus={() => {
                            setSelect("date");
                            Keyboard.dismiss();
                            showDatePicker();
                        }}
                        onBlur={() => setSelect("")}
                    />
                    <TextInput
                        style={[styles.textinput, { borderBottomColor: select === "amount" ? "skyblue" : "#e3e3e3" }]}
                        onChangeText={(text) => setAmount(text)}
                        value={amount}
                        keyboardType="numeric"
                        onFocus={() => setSelect("amount")}
                        onBlur={() => setSelect("")}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSelect("category");
                            setShowModal("categoryList");
                        }}
                    >
                        <TextInput
                            style={[styles.textinput, { borderBottomColor: select === "category" ? "skyblue" : "#e3e3e3" }]}
                            onChangeText={(text) => setCategory(text)}
                            value={category}
                            onBlur={() => setSelect("")}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setSelect("account");
                            setShowModal("accountList");
                        }}
                    >
                        <TextInput
                            style={[styles.textinput, { borderBottomColor: select === "account" ? "skyblue" : "#e3e3e3" }]}
                            onChangeText={(text) => setAccount(text)}
                            value={account}
                            onBlur={() => setSelect("")}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <TextInput
                        style={[styles.textinput, { borderBottomColor: select === "note" ? "skyblue" : "#e3e3e3" }]}
                        onChangeText={(text) => setNote(text)}
                        value={note}
                        onFocus={() => setSelect("note")}
                        onBlur={() => setSelect("")}
                    />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.descView}>
                <TextInput
                    style={[styles.textinput, styles.desc, { borderBottomColor: select === "description" ? "skyblue" : "#e3e3e3" }]}
                    placeholder="Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    onFocus={() => setSelect("description")}
                    onBlur={() => setDescription("")}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.save}
                        onPress={validationForm}
                    >
                        <Text style={[styles.touchtext, { color: 'white' }]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel}>
                        <Text style={styles.touchtext}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={datePickerVisibe}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Modal
                transparent={true}
                visible={(showModal === 'categoryList' || showModal === 'accountList') ? true : false}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.textView}>
                            <Text style={{ color: 'white', fontSize: 15 }}>{showModal}</Text>
                            <View style={styles.buttons}>
                                <Entypo name="edit" size={20} color={'white'} style={{ marginHorizontal: 15 }} />
                                <Entypo name="cross" size={20} color={'white'} onPress={() => setShowModal("")} />
                            </View>
                        </View>
                        <View style={styles.buttonView}>
                            {
                                showModal === 'categoryList' ?
                                    categoryList.map((item, index) => <TouchableOpacity
                                        key={index}
                                        style={styles.maptouch}
                                        onPress={() => {
                                            setCategory(item.name);
                                            setShowModal("");
                                        }}
                                    >
                                        <Text style={styles.mapText}>{item.name}</Text>
                                    </TouchableOpacity>
                                    ) :
                                    accountList.map((item, index) => <TouchableOpacity
                                        key={index}
                                        style={styles.maptouch}
                                        onPress={() => {
                                            setAccount(item.name);
                                            setShowModal("");
                                        }}
                                    >
                                        <Text style={styles.mapText}>{item.name}</Text>
                                    </TouchableOpacity>)
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    safeWrapper: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eeeeee'
    },
    viewInput: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    labelsContainer: {
        justifyContent: 'space-around',
        marginHorizontal: 5
    },
    label: {
        color: 'grey',
    },
    inputsContainer: {
        justifyContent: 'space-around',
        flex: 1, // Make the input fields take more space than the labels
        marginHorizontal: 5,
    },
    textinput: {
        borderBottomWidth: 2,
        fontSize: 15,
        color: 'black'
    },
    descView: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 10,
        paddingHorizontal: 25
    },
    desc: {
        marginVertical: 10,
    },
    save: {
        backgroundColor: '#4890db',
        flex: 3,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 2
    },
    cancel: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 5
    },
    touchtext: {
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 10
    },
    maptouch: {
        backgroundColor: 'white',
        borderColor: '#d5d5d5',
        borderWidth: 1,
        padding: 20,
        width: '45%',
        alignItems: 'center'
    },
    mapText: {
        fontSize: 15
    },
    buttonView: {
        flexDirection: 'row',
        paddingVertical: 30,
        paddingHorizontal: 5,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    textView: {
        backgroundColor: 'black',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        flexDirection: 'row'
    }
});

export default App;
