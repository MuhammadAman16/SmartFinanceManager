import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import styles from "../Styling/Stlyes";
import * as Progress from 'react-native-progress';
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import user_api from "@/app/api/user_api";
import { useNavigation } from "@react-navigation/native";

const Renderitem = ({ item, type }) => {
    const { width: screenWidth } = Dimensions.get('window');
    const navigation = useNavigation();

    const amountspent = item.amount - item.remainingAmount;
    const percentage = ((amountspent / item.amount) * 100).toFixed(2);

    const deleteBudget = async (itemId) => {
        try {
            await user_api.delete(`budget/${itemId}`);
            Alert.alert("Operation Successfull");
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error: ', error.error);
            }
        }
    }

    return (
        <View
            style={[
                styles.RenderBudgetCard,
                type === "ongoing"
                    ? styles.successfulCard
                    : styles.unsuccessfulCard
            ]}
        >
            <View style={styles.itemHeader}>
                <Text
                    style={[
                        styles.RenderBudgetCategory,
                        item.remainingAmount >= 0
                            ? styles.successfulCategory
                            : styles.unsuccessfulCategory,
                    ]}
                >
                    {item.name}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit Budget', {itemId : item.id})} style={{ marginHorizontal: 10 }}>
                        <Entypo name="edit" size={24} color={'rgba(56,142,60,255)'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteBudget(item.id)}>
                        <MaterialIcons name="delete" size={24} color={'rgba(56,142,60,255)'} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.RenderBudgetAmount}>Total: {item.amount}</Text>
            <Text style={styles.amountSpent}>Spent: {amountspent}</Text>
            {amountspent < 0 && (
                <Text style={styles.positiveIncomeMessage}>
                    Your income is greater than your expenses!
                </Text>
            )}
            <View style={{ marginVertical: 5 }}>
                <Progress.Bar
                    style={{ borderRadius: 6, overflow: 'hidden', }}
                    color={
                        item.remainingAmount >= 0
                            ? '#4CAF50' // Green for successful items
                            : '#F44336' // Red for unsuccessful items
                    }
                    width={screenWidth * 0.78}
                    height={8}
                    progress={percentage / 100}
                />
            </View>
            <Text style={styles.remainingAmount}>
                {item.remainingAmount >= 0
                    ? `Remaining: ${item.remainingAmount} (${(100 - percentage)}%)`
                    : ''}
            </Text>
            <View style={styles.separator} />
        </View>
    );
}

export default Renderitem;