import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Record = () => {
  const [startDate, setStartDate] = useState(new Date('1970-01-01')); // Initially set to a far past date
  const [endDate, setEndDate] = useState(new Date()); // Initially set to today
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [transactions, setTransactions] = useState([
  {
    type: 'income',
    amount: 5000,
    date: new Date('2023-09-01T10:30:00'),
    category: 'salary',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 1200,
    date: new Date('2024-09-02T14:00:00'),
    category: 'food',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 8000,
    date: new Date('2024-09-05T09:00:00'),
    category: 'freelance',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 2000,
    date: new Date('2024-09-06T17:45:00'),
    category: 'shopping',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 1500,
    date: new Date('2024-09-08T11:15:00'),
    category: 'gift',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 3000,
    date: new Date('2024-09-09T19:30:00'),
    category: 'entertainment',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 7000,
    date: new Date('2024-09-10T08:45:00'),
    category: 'bonus',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 500,
    date: new Date('2024-09-11T13:00:00'),
    category: 'transportation',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 6000,
    date: new Date('2023-09-12T10:20:00'),
    category: 'investment',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 2500,
    date: new Date('2024-09-13T18:30:00'),
    category: 'utilities',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 4000,
    date: new Date('2024-09-14T15:45:00'),
    category: 'side job',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 1800,
    date: new Date('2024-09-15T12:15:00'),
    category: 'healthcare',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 1500,
    date: new Date('2024-09-16T17:00:00'),
    category: 'education',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 12000,
    date: new Date('2024-09-17T11:00:00'),
    category: 'business income',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 2200,
    date: new Date('2024-09-18T13:45:00'),
    category: 'charity',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 4500,
    date: new Date('2024-09-19T10:00:00'),
    category: 'rent income',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 900,
    date: new Date('2024-09-20T09:15:00'),
    category: 'mobile bill',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 3000,
    date: new Date('2024-09-21T08:30:00'),
    category: 'investment return',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 6000,
    date: new Date('2024-09-22T19:30:00'),
    category: 'home repairs',
    accountNumber: '1234567890',
    paymentType: 'account',
  },
  {
    type: 'income',
    amount: 5500,
    date: new Date('2024-09-23T14:30:00'),
    category: 'freelance',
    accountNumber: '0987654321',
    paymentType: 'account',
  },
  {
    type: 'expense',
    amount: 2000,
    date: new Date('2024-09-24T16:00:00'),
    category: 'dining out',
    accountNumber: '0987654321',
    paymentType: 'account',
  },

  // New transactions with paymentType as "cash"
  {
    type: 'income',
    amount: 1000,
    date: new Date('2024-09-25T10:00:00'),
    category: 'gift',
    paymentType: 'cash',
  },
  {
    type: 'expense',
    amount: 300,
    date: new Date('2024-09-25T13:00:00'),
    category: 'snacks',
    paymentType: 'cash',
  },
  {
    type: 'income',
    amount: 400,
    date: new Date('2024-09-26T09:30:00'),
    category: 'garage sale',
    paymentType: 'cash',
  },
  {
    type: 'expense',
    amount: 250,
    date: new Date('2024-09-26T15:00:00'),
    category: 'coffee',
    paymentType: 'cash',
  },
  {
    type: 'income',
    amount: 200,
    date: new Date('2024-09-27T11:15:00'),
    category: 'lottery win',
    paymentType: 'cash',
  },
  {
    type: 'expense',
    amount: 500,
    date: new Date('2024-09-28T18:45:00'),
    category: 'grocery',
    paymentType: 'cash',
  },
]);


  const filterTransactions = (transactions) => {
    return transactions.filter((transaction) => {
      const isWithinDateRange =
        (startDate <= transaction.date && endDate >= transaction.date) || 
        (startDate > transaction.date && endDate === new Date()) || 
        (endDate < transaction.date && startDate === new Date('1970-01-01'));

      const isAccountMatch =
        selectedAccount === 'cash'
          ? transaction.paymentType === 'cash'
          : selectedAccount === ''
          ? true
          : transaction.accountNumber === selectedAccount;

      return isWithinDateRange && isAccountMatch;
    });
  };

  const filteredTransactions = filterTransactions(transactions);

  // Combine income and expense transactions, sorted by date
  const combinedTransactions = [...filteredTransactions].sort((a, b) => b.date - a.date);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Date Pickers */}
        <View style={styles.datePickerContainer}>
          <Button title="Select Start Date" onPress={() => setShowStartPicker(true)} />
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}
          <Button title="Select End Date" onPress={() => setShowEndPicker(true)} />
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}
        </View>

        {/* Account Picker */}
        <View style={styles.pickerContainer}>
          <Text>Select Account:</Text>
          <Picker
            selectedValue={selectedAccount}
            onValueChange={(itemValue) => setSelectedAccount(itemValue)}
          >
            <Picker.Item label="All Accounts" value="" />
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Account 1234567890" value="1234567890" />
            <Picker.Item label="Account 0987654321" value="0987654321" />
          </Picker>
        </View>

        {/* Combined Transactions List */}
        <View style={styles.listContainer}>
          <Text style={styles.listHeading}>Transactions</Text>
          <FlatList
            data={combinedTransactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.listItem, item.type === 'income' ? styles.incomeItem : styles.expenseItem]}>
                <View style={styles.verticalLine}></View>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemText}>
                    {item.category} - {item.date.toLocaleDateString()}
                  </Text>
                  <Text style={[styles.listItemAmount, item.type === 'income' ? styles.incomeAmount : styles.expenseAmount]}>
                    ${item.amount}
                  </Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = {
  container: { flex: 1, backgroundColor: '#fff' },
  safeArea: { flex: 1, paddingHorizontal: 20, paddingVertical: 10 },
  datePickerContainer: { marginVertical: 10 },
  pickerContainer: { marginVertical: 10 },
  listContainer: { marginVertical: 10 },
  listHeading: { fontSize: 18, fontWeight: 'bold' },
  listItem: { flexDirection: 'row', padding: 10, backgroundColor: '#f0f0f0' },
  listItemContent: { flex: 1 },
  listItemText: { fontSize: 16 },
  listItemAmount: { fontSize: 16, fontWeight: 'bold' },
  incomeAmount: { color: 'green' },
  expenseAmount: { color: 'red' },
  separator: { height: 1, backgroundColor: '#ccc' },
};

export default Record;
