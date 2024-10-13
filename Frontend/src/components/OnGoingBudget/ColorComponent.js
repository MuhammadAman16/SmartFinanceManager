import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "../Styling/Stlyes";

const ColorComnponent = (props) => {
    const { backgroundColor, setModalVisible, onColorSelect } = props

    const handleColorSelect = (color) => {
        onColorSelect(color);
        setModalVisible(false);
    };

    return (
        <View style={styles.ColorView}>
            <TouchableOpacity
                onPress={() => handleColorSelect(backgroundColor)}
            >
                <View style={[styles.ColorComponentView, { backgroundColor: backgroundColor }]}></View>
            </TouchableOpacity>
        </View>
    );
}

export default ColorComnponent;