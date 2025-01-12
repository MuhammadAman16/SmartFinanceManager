// {
//   type: 'expense',
//   amount: 500,
//   date: new Date('2024-09-28T18:45:00'),
//   category: 'grocery',
//   paymentType: 'cash',
// }

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Button, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import user_api from '@/app/api/user_api';
import { Feather } from '@expo/vector-icons';
import SelectTimePeriod from '@/src/components/Records/SelectTimePeriod';
import { AuthContext } from '@/app/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const Record_H = (props) => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date('1970-01-01')); // Initially set to a far past date
  const [endDate, setEndDate] = useState(new Date()); // Initially set to today
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState("7D");

  const formatDate = (timePeriod) => {
    const today = new Date();
    const unit = timePeriod.slice(-1); // Last character: D/W/M/Y
    const value = parseInt(timePeriod.slice(0, -1), 10);

    switch (unit) {
      case 'D':
        today.setDate(today.getDate() - value);
        break;
      case 'W':
        today.setDate(today.getDate() - value * 7);
        break;
      case 'M':
        today.setMonth(today.getMonth() - value);
        break;
      case 'Y':
        today.setFullYear(today.getFullYear() - value);
        break;
      default:
        break;
    }

    return today.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  };

  const fetchAllRecords = async () => {
    setIsLoading(true);
    try {
      const startDate = formatDate(timePeriod);
      // console.log("The Date is : ", startDate);
      const result = await user_api.get(`record?userId=${user.id}&startDate=${startDate}`);
      // console.log("The records are : ", result.data);
      setTransactions(result.data);
      // console.log(result.data.Category);
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

  useFocusEffect(
    useCallback(() => {
      fetchAllRecords();
    }, [timePeriod])
  );

  // useEffect(() => {
  //   formatDate(timePeriod);
  // }, [])
  // useEffect(() => {
  //   formatDate(timePeriod);
  //   fetchAllRecords();
  //   // console.log(transactions[0]["Category"])
  // }, [timePeriod])

  const renderItem = ({ item }) => {
    // console.log(`The item Category ${item.Category?.name}`);
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: 'rgb(226, 226, 226)'
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 35,
            height: 35,
            backgroundColor: '#8fbc8f',
            borderRadius: 50
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 50
            }}
            source={{ uri: item.Category.icon }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '88%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontStyle: 'italic',
                fontWeight: '500'
              }}
            >
              { item?.Category ? item?.Category?.name : null}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'rgb(128, 128, 128)'
              }}
            >
              {item?.Account ? item?.Account?.name : null}
            </Text>
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5
              }}
            >
              {item?.type === "EXPENSE" && (
                <Text
                  style={{
                    fontSize: 16,
                    color: 'red',
                    fontWeight: '600'
                  }}
                >-</Text>
              )}
              <Text
                style={{
                  fontSize: 16,
                  color: item.type === "EXPENSE" ? 'red' : 'green',
                  fontWeight: '600'
                }}
              >
                {item?.currency}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: item.type === "EXPENSE" ? 'red' : 'green',
                  fontWeight: '600'
                }}
              >
                {item?.amount}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: 'rgb(128, 128, 128)'
              }}
            >
              {item?.datetime ? item?.datetime?.split("T")[0] : null}
            </Text>
          </View>
        </View>
        {/* <Text>{item.type}</Text> */}
      </View>
    );
  }


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
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'italic'
          }}
        >
          Record
        </Text>
      </View>

      <View>
        <Text>Select Time Period</Text>
      </View>

      <SelectTimePeriod
        setTimePeriod={setTimePeriod}
        timePeriod={timePeriod}
      />

      <View
        style={{
          paddingBottom: 10
        }}
      >
        <Text>
          Last {timePeriod.slice(0, -1)} {timePeriod.slice(-1) === 'D' ? 'Days'
              : timePeriod.slice(-1) === 'W' ? 'Weeks'
              : timePeriod.slice(-1) === 'M' ? 'Months' : 'Year'}
          </Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No records found</Text>}
      />

      {/* Date Pickers */}
      {/* <View style={styles.datePickerContainer}>
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
      </View> */}

      {/* Account Picker */}
      {/* <View style={styles.pickerContainer}>
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
      </View> */}

      {/* Combined Transactions List */}
      {/* <View style={styles.listContainer}>
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
      </View> */}

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
