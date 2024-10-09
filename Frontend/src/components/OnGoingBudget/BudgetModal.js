import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text } from 'react-native';
import styles from '@/src/components/Styling/Stlyes';

const BudgetModal = ({ visible, onClose, onAddBudget }) => {
  const [newBudget, setNewBudget] = useState({
    category: '',
    name: '',
    period: 'None',
    totalAmount: '0',
    currency: 'PKR',
    account: '',
    startDate: '',
    endDate: '',
  });

  const handleAddBudget = () => {
    const budgetEntry = {
      id: Date.now().toString(), // Generate a unique ID
      category: newBudget.category,
      totalAmount: parseFloat(newBudget.totalAmount),
      startDate: newBudget.startDate,
      endDate: newBudget.endDate,
      remainingAmount: parseFloat(newBudget.totalAmount),
    };

    onAddBudget(budgetEntry);
    setNewBudget({ category: '', totalAmount: '', startDate: '', endDate: '' });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Budget</Text>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Budget Name"
            value={newBudget.name}
            onChangeText={(text) => setNewBudget({ ...newBudget, name: text })}
          />
          <Text>Period</Text>
          <TextInput
            style={styles.input}
            placeholder="Period"
            value={newBudget.period}
            onChangeText={(text) => setNewBudget({ ...newBudget, period: text })}
          />
          <Text>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={newBudget.totalAmount}
            onChangeText={(text) => setNewBudget({ ...newBudget, totalAmount: text })}
          />
          <Text>Currency</Text>
          <TextInput
            style={styles.input}
            placeholder="Currency"
            value={newBudget.currency}
            onChangeText={(text) => setNewBudget({ ...newBudget, currency: text })}
          />
          <Text>Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Account"
            value={newBudget.account}
            onChangeText={(text) => setNewBudget({ ...newBudget, account: text })}
          />
          <Text>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={newBudget.startDate}
            onChangeText={(text) => setNewBudget({ ...newBudget, startDate: text })}
          />
          <Text>End Date</Text>
          <TextInput
            style={styles.input}
            placeholder="End Date (YYYY-MM-DD)"
            value={newBudget.endDate}
            onChangeText={(text) => setNewBudget({ ...newBudget, endDate: text })}
          />
          <Button title="Add Budget" onPress={handleAddBudget} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default BudgetModal;
