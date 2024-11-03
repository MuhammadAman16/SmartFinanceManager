import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import styles from "../Styling/Stlyes";
import * as Progress from 'react-native-progress';
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const Renderitem = ({ item, type }) => {
    const { width: screenWidth } = Dimensions.get('window');

    const amountspent = item.amount - item.remainingAmount;
    const percentage = ((amountspent / item.amount) * 100).toFixed(2);
    // console.log(type);


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
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => Alert.alert('View More')} style={{marginHorizontal: 10}}>
                        <Entypo name="edit" size={24} color={'rgba(56,142,60,255)'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('View More')}>
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