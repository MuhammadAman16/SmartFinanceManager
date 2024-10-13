import React from "react";
import { TouchableOpacity, Text, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styling/Stlyes";

const SocialMedaiHandle = (props) => {
    const { backgroundColor, link, iconName, handleName } = props;

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <TouchableOpacity
            style={[styles.FollowScreenLink, { backgroundColor: backgroundColor }]}
            onPress={() => openLink(link)}
        >
            <Ionicons name={iconName} size={36} color="#fff" />
            <Text style={styles.FollowScreenLinkText}>{handleName}</Text>
        </TouchableOpacity>
    );
}

export default SocialMedaiHandle;