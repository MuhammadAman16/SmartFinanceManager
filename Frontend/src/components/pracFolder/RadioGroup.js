import React, {useState} from "react";
import { View, SafeAreaView, Text, StatusBar, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const Radio = () => {
    const [radioValue, setRadioValue] = useState(1);
    return(
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touch} onPress={() => setRadioValue(1)}>
                <View style={styles.radio}>
                    {
                        radioValue === 1 ? <View style={styles.rad}></View> : null
                    }
                </View>
                <Text>Radio 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={() => setRadioValue(2)}>
                <View style={styles.radio}>
                    {
                        radioValue === 2 ? <View style={styles.rad}></View> : null
                    }
                </View>
                <Text>Radio 2</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    radio: {
        borderWidth: 2,
        borderColor: 'skyblue',
        height: 30,
        width: 30,
        borderRadius: 20,
        marginHorizontal: 5
    },
    touch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    rad: {
        height: 20,
        width: 20,
        backgroundColor: 'skyblue',
        borderRadius: 20,
        margin: 3
    }
});

export default Radio;
