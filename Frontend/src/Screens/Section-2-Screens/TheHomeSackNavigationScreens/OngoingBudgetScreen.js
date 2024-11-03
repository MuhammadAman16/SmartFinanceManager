import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ProgressBar,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon component

// Basic transactions data
const transactions = [
  {
    type: 'expense',
    amount: 200,
    date: new Date('2023-09-02T14:00:00'),
    category: 'food',
  },
  {
    type: 'expense',
    amount: 100,
    date: new Date('2023-09-03T14:00:00'),
    category: 'entertainment',
  },
  {
    type: 'expense',
    amount: 4500,
    date: new Date('2024-09-05T14:00:00'),
    category: 'groceries',
  },
  {
    type: 'income',
    amount: 200,
    date: new Date('2023-09-06T14:00:00'),
    category: 'salary',
  },
  {
    type: 'income',
    amount: 500,
    date: new Date('2023-09-04T14:00:00'),
    category: 'freelance',
  },
];

// Basic budget data with initial remainingAmount
const initialBudgets = [
  {
    id: '1',
    category: 'Home Budget',
    totalAmount: 5000,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-30'),
    remainingAmount: 5000, // Initialize with totalAmount
  },
  {
    id: '2',
    category: 'Car Maintenance',
    totalAmount: 1000,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2023-09-20'),
    remainingAmount: 1000, // Initialize with totalAmount
  },
  {
    id: '3',
    category: 'September Budget',
    totalAmount: 2000,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2023-09-10'),
    remainingAmount: 2000, // Initialize with totalAmount
  },
];

const OngoingBudget = () => {
  const [budgets, setBudgets] = useState(initialBudgets); // Check initialBudgets
  const [modalVisible, setModalVisible] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    totalAmount: '',
    startDate: '',
    endDate: '',
  });
  const [budgetCategories, setBudgetCategories] = useState({
    ongoingBudgets: [],
    successfulBudgets: [],
    unsuccessfulBudgets: [],
  });

  const prevBudgetsRef = useRef(budgets);

  // Calculate the amount spent
  const calculateAmountSpent = (budget) => {
    // Filter transactions based on the budget's date range
    const relevantTransactions = transactions.filter(
      (transaction) =>
        new Date(transaction.date) >= new Date(budget.startDate) &&
        new Date(transaction.date) <= new Date(budget.endDate)
    );

    // Calculate total expenses and income
    const { totalExpenses, totalIncome } = relevantTransactions.reduce(
      (totals, transaction) => {
        if (transaction.type === 'expense') {
          totals.totalExpenses += transaction.amount;
        } else if (transaction.type === 'income') {
          totals.totalIncome += transaction.amount;
        }
        return totals;
      },
      { totalExpenses: 0, totalIncome: 0 }
    );

    // Calculate net spent: expenses minus income
    const netSpent = totalExpenses - totalIncome;
    return netSpent;
  };

 const updateBudgetStatuses = () => {
  const now = new Date();
  const ongoingBudgets = [];
  const successfulBudgets = [];
  const unsuccessfulBudgets = [];

  const updatedBudgets = budgets.map((budget) => {
    const amountSpent = calculateAmountSpent(budget);
    const remainingAmount = budget.totalAmount - amountSpent;

    // Calculate the percentage spent
    const percentageSpent = (amountSpent / budget.totalAmount) * 100;

    // Check if it's an ongoing budget
    if (now <= new Date(budget.endDate)) {
      // If percentage spent exceeds 80%, show a warning notification
      if (percentageSpent > 80 && percentageSpent < 100) {
        Alert.alert(
          "Budget Warning",
          `You have spent over 80% of your ${budget.category} budget!`,
          [{ text: "OK" }]
        );
      }

      // If percentage spent is 100%, send a notification
      if (percentageSpent >= 100) {
        Alert.alert(
          "Budget Reached",
          `You have reached your ${budget.category} budget limit!`,
          [{ text: "OK" }]
        );
      }

      ongoingBudgets.push({ ...budget, remainingAmount });
    } else {
      if (remainingAmount >= 0) {
        successfulBudgets.push({ ...budget, remainingAmount });
      } else {
        unsuccessfulBudgets.push({ ...budget, remainingAmount });
      }
    }

    return { ...budget, remainingAmount };
  });

  setBudgetCategories((prevCategories) => {
    const newCategories = {
      ongoingBudgets,
      successfulBudgets,
      unsuccessfulBudgets,
    };

    if (JSON.stringify(prevCategories) !== JSON.stringify(newCategories)) {
      return newCategories;
    }
    return prevCategories;
  });
};

  // Use effect to trigger the budget status update when budgets change
  useEffect(() => {
    updateBudgetStatuses();
  }, [budgets]); // Only re-run when `budgets` changes

  const handleAddBudget = () => {
    const newBudgetEntry = {
      id: (budgets.length + 1).toString(),
      category: newBudget.category,
      totalAmount: parseFloat(newBudget.totalAmount),
      startDate: new Date(newBudget.startDate),
      endDate: new Date(newBudget.endDate),
      remainingAmount: parseFloat(newBudget.totalAmount),
    };

    // Log the new budget entry before updating
    console.log('Adding new budget:', newBudgetEntry);

    setBudgets((prevBudgets) => [...prevBudgets, newBudgetEntry]);

    setNewBudget({
      category: '',
      totalAmount: '',
      startDate: '',
      endDate: '',
    });
    setModalVisible(false);
  };

  // Render budget items
  const renderBudgetItem = ({ item }) => {
    const amountSpent = calculateAmountSpent(item);
    const remainingAmount = item.remainingAmount; // Use updated remainingAmount
    const percentageSpent = (amountSpent / item.totalAmount) * 100;

    const { width: screenWidth } = Dimensions.get('window');

    return (
     <View
  style={[
    styles.card,
    item.remainingAmount >= 0
      ? styles.successfulCard
      : styles.unsuccessfulCard,
  ]}
>
  <View style={styles.budgetHeader}>
    <Text
      style={[
        styles.category,
        item.remainingAmount >= 0
          ? styles.successfulCategory
          : styles.unsuccessfulCategory,
      ]}
    >
      {item.category}
    </Text>
    <TouchableOpacity onPress={() => Alert.alert('View More')}>
      <Text
        style={[
          styles.viewMore,
          item.remainingAmount >= 0
            ? styles.successfulViewMore
            : styles.unsuccessfulViewMore,
        ]}
      >
        View More
      </Text>
    </TouchableOpacity>
  </View>
  <Text style={styles.amount}>Total: {item.totalAmount}</Text>
  <Text style={styles.amountSpent}>Spent: {amountSpent}</Text>
  {amountSpent < 0 && (
    <Text style={styles.positiveIncomeMessage}>
      Your income is greater than your expenses!
    </Text>
  )}
  <View style={styles.progressBarContainer}>
    <Progress.Bar
      style={styles.progressBar}
      color={
        item.remainingAmount >= 0
          ? '#4CAF50' // Green for successful budgets
          : '#F44336' // Red for unsuccessful budgets
      }
      width={screenWidth * 0.78}
      height={8}
      progress={percentageSpent / 100}
    />
  </View>
  <Text style={styles.remainingAmount}>
    {item.remainingAmount >= 0
      ? `Remaining: ${remainingAmount} (${(100 - percentageSpent).toFixed(1)}%)`
      : ''}
  </Text>
  <View style={styles.separator} />
</View>

    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Budget</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Display Ongoing Budgets */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Ongoing Budgets</Text>
        <FlatList
          data={budgetCategories.ongoingBudgets}
          keyExtractor={(item) => item.id}
          renderItem={renderBudgetItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Display Successful Budgets */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Successful Budgets</Text>
        <FlatList
          data={budgetCategories.successfulBudgets}
          keyExtractor={(item) => item.id}
          renderItem={renderBudgetItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Display Unsuccessful Budgets */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Unsuccessful Budgets</Text>
        <FlatList
          data={budgetCategories.unsuccessfulBudgets}
          keyExtractor={(item) => item.id}
          renderItem={renderBudgetItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Modal for adding new budget */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Budget</Text>
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newBudget.category}
              onChangeText={(text) =>
                setNewBudget({ ...newBudget, category: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Total Amount"
              keyboardType="numeric"
              value={newBudget.totalAmount}
              onChangeText={(text) =>
                setNewBudget({ ...newBudget, totalAmount: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              value={newBudget.startDate}
              onChangeText={(text) =>
                setNewBudget({ ...newBudget, startDate: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="End Date (YYYY-MM-DD)"
              value={newBudget.endDate}
              onChangeText={(text) =>
                setNewBudget({ ...newBudget, endDate: text })
              }
            />
            <Button title="Add Budget" onPress={handleAddBudget} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#e8f5e9',
    borderRadius: 50,
    padding: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 3,
  },
  ongoingCard: {
    backgroundColor: '#e0f7fa', // Light cyan for ongoing budgets
  },
  successfulCard: {
    backgroundColor: '#dcedc8', // Light green for successful budgets
  },
  unsuccessfulCard: {
    backgroundColor: '#ffebee', // Light red for unsuccessful budgets
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  positiveIncomeMessage: {
    fontSize: 14,
    color: '#2e7d32', // Dark green for positive message
    fontWeight: 'bold',
    marginTop: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ongoingCategory: {
    color: '#2196F3', // Blue for ongoing budgets
  },
  successfulCategory: {
    color: '#4CAF50', // Green for successful budgets
  },
  unsuccessfulCategory: {
    color: '#F44336', // Red for unsuccessful budgets
  },
  viewMore: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ongoingViewMore: {
    color: '#2196F3', // Blue for ongoing budgets
  },
  successfulViewMore: {
    color: '#4CAF50', // Green for successful budgets
  },
  unsuccessfulViewMore: {
    color: '#F44336', // Red for unsuccessful budgets
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  amountSpent: {
    fontSize: 14,
    color: '#666',
  },
  
  progressBarContainer:{
    marginVertical:5
  },
  
  progressBar: {
    borderRadius: 6,
    overflow: 'hidden',
   
  },
  remainingAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  
});

export default OngoingBudget;
