import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../Styling/Stlyes";

const AccountTypeComponent = (props) => {
    const {head, subhead, IconComponent, iconName, onPress} = props;
    return (
        <TouchableOpacity
            style={styles.AccTypeCompBtn}
            onPress={onPress}
        >
            <View
                style={styles.AccountTypeTextView}
            >
                <Text
                    style={styles.AccountTypeTitle}
                >{head}</Text>
                <Text
                    numberOfLines={6}
                    style={styles.AccountTypeSubTitle}
                >
                    {subhead}
                </Text>
            </View>
            <View>
                <IconComponent
                    name={iconName}
                    size={70}
                    color={'rgba(56,142,60,255)'}
                />
            </View>
        </TouchableOpacity>
    );
}

export default AccountTypeComponent