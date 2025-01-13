import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import styles from "../Styling/Stlyes";
import * as Progress from 'react-native-progress';
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import user_api from "@/app/api/user_api";
import { AuthContext } from "@/app/context/AuthContext";

const RenderBudget = ({ item, setIsDeleted }) => {
    const { user } = useContext(AuthContext);
    const [incomes, setIncomes] = useState();
    const [expense, setExpense] = useState();
    const [categoriesName, setCategoriesName] = useState();
    const { width: screenWidth } = Dimensions.get('window');
    const [totalSpent, setTotalSpent] = useState(0);
    const navigation = useNavigation();

    const fetchIncomeByCategory = async () => {
        try {
            let total = totalSpent;  // Initialize a variable to store the total before updating state
            if (categoriesName) {
                // Iterate over each category
                for (let index = 0; index < categoriesName.length; index++) {
                    let result = await user_api.get(`record?userId=${user.id}&category=${categoriesName[index]}`);

                    if (result?.data?.length) {
                        // Iterate over records in the response
                        for (let j = 0; j < result.data.length; j++) {
                            const record = result.data[j];

                            // Add or subtract based on record type
                            if (record.type === "INCOME") {
                                total += record.amount;  // Add to total if it's an income
                            } else if (record.type === "EXPENSE") {
                                total -= record.amount;  // Subtract from total if it's an expense
                            }
                        }
                    }
                }
                // After processing all categories, update the state
                setTotalSpent(total);
            }
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error.error);
            }
        }
    };


    // const amountspent = item ? item?.amount - item?.remainingAmount : 0;
    // const percentage = ((amountspent / (item?.amount || 1)) * 100).toFixed(2);

    const deleteBudget = async (itemId) => {
        try {
            await user_api.delete(`budget/${itemId}`);
            Alert.alert("Operation Successfull");
            setIsDeleted(true);
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

    useEffect(() => {
        setCategoriesName(item.Categories.map(cat => cat.name.split(" ")[0]));
    }, [item])

    useEffect(() => {
        fetchIncomeByCategory();
    }, [user])

    return (
        <View
            style={[
                styles.RenderBudgetCard,
                styles.successfulCard
                // type === "ongoing"
                //     ? styles.successfulCard
                //     : styles.unsuccessfulCard
            ]}
        >
            <View style={styles.itemHeader}>
                <Text
                    style={[
                        styles.RenderBudgetCategory,
                        styles.successfulCategory
                        // item?.remainingAmount >= 0
                        //     ? styles.successfulCategory
                        //     : styles.unsuccessfulCategory,
                    ]}
                >
                    {item?.name || 'Test'}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() => navigation.navigate('Edit Budget', { itemId: item?.id })}
                    >
                        <Entypo name="edit" size={24} color={'rgba(56,142,60,255)'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteBudget(item.id)}
                    >
                        <MaterialIcons name="delete" size={24} color={'rgba(56,142,60,255)'} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.RenderBudgetAmount}>Total: {item?.amount || 0}</Text>
            {/* <Text style={styles.amountSpent}>Spent: {totalSpent}</Text> */}
            {/* {amountspent < 0 && (
                <Text style={styles.positiveIncomeMessage}>
                    Your income is greater than your expenses!
                </Text>
            )} */}
            <View style={{ marginVertical: 5 }}>
                <Progress.Bar
                    style={{ borderRadius: 6, overflow: 'hidden', }}
                    color={
                        item?.remainingAmount >= 0
                            ? '#4CAF50' // Green for successful items
                            : '#F44336' // Red for unsuccessful items
                    }
                    width={screenWidth * 0.78}
                    height={8}
                    progress={80 / 100}
                // progress={percentage / 100}
                />
            </View>
            <Text style={styles.remainingAmount}>
                {item.name}
                {/* {item?.remainingAmount >= 0
                    ? `Remaining: ${item.remainingAmount} (${(100 - percentage)}%)`
                    : ''} */}
            </Text>
            <View style={styles.separator} />
        </View>
    );
}

export default RenderBudget;