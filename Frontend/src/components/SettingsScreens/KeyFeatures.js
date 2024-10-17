import React from "react";
import { View, Text } from "react-native";
import styles from "../Styling/Stlyes";

const KeyFeature = (props) => {
    const {icon, text} = props;
    return (
        <View style={styles.AboutScreenFeatureItem}>
            <Text style={styles.AboutScreenFeatureIcon}>{icon}</Text>
            <Text style={styles.AboutScreenFeatureText}>{text}</Text>
        </View>
    );
}

export default KeyFeature;