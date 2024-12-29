// {
//   type: 'expense',
//   amount: 500,
//   date: new Date('2024-09-28T18:45:00'),
//   category: 'grocery',
//   paymentType: 'cash',
// }

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import user_api from '@/app/api/user_api';
import { Feather } from '@expo/vector-icons';

const Record_H = (props) => {
  const [startDate, setStartDate] = useState(new Date('1970-01-01')); // Initially set to a far past date
  const [endDate, setEndDate] = useState(new Date()); // Initially set to today
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [transactions, setTransactions] = useState(null);

  const fetchAllRecords = async () => {
    try {
      const result = await user_api.get('record');
      // console.log("The records are : ", result.data);
      setTransactions(result.data);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`)
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllRecords();
  }, [])


  // const filterTransactions = (transactions) => {
  //   return transactions.filter((transaction) => {
  //     const isWithinDateRange =
  //       (startDate <= transaction.date && endDate >= transaction.date) ||
  //       (startDate > transaction.date && endDate === new Date()) ||
  //       (endDate < transaction.date && startDate === new Date('1970-01-01'));

  //     const isAccountMatch =
  //       selectedAccount === 'cash'
  //         ? transaction.paymentType === 'cash'
  //         : selectedAccount === ''
  //           ? true
  //           : transaction.accountNumber === selectedAccount;

  //     return isWithinDateRange && isAccountMatch;
  //   });
  // };

  // const filteredTransactions = filterTransactions(transactions);

  // Combine income and expense transactions, sorted by date
  // const combinedTransactions = [...filteredTransactions].sort((a, b) => b.date - a.date);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    );
  }

  return (
    // <ScrollView style={styles.container}>
    <SafeAreaView style={styles.safeArea}>

      <View style={{ display: 'flex', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RecordCreationScreen')}
          style={{
            flexDirection: 'row',
            width: '30%',
            backgroundColor: 'rgba(56,142,60,255)',
            padding: 8,
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'space-around'
        }}>
          <Feather name="plus" size={24} color={'white'} />
          <Text style={{ color: 'white', fontSize: 20 }}>New</Text>
        </TouchableOpacity>
      </View>

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
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.listItem, item.type === 'income' ? styles.incomeItem : styles.expenseItem]}>
              <View style={styles.verticalLine}></View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemText}>
                  {item.category} - {item.category}
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
    // </ScrollView>
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

export default Record_H;
