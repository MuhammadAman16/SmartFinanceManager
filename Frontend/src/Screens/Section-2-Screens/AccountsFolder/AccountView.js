import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  Chart,
  Line,
  Area,
  Tooltip,
  VerticalAxis,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
const AccountView = () => {
  const accountNumber  = "1234567890"; // Get the account number from the route parameters

  // Assuming transactions are available in this screen, you can define them here or pass them from the previous screen
  const [transactions, setTransactions] = useState([
    {
      type: 'income',
      amount: 5000,
      date: new Date('2023-09-01T10:30:00'),
      category: 'salary',
      accountNumber: '1234567890',
    },
    {
      type: 'expense',
      amount: 1200,
      date: new Date('2024-09-02T14:00:00'),
      category: 'food',
      accountNumber: "0987654321",
    },
    {
      type: 'income',
      amount: 8000,
      date: new Date('2024-09-05T09:00:00'),
      category: 'freelance',
       accountNumber: '1234567890',
    },
    {
      type: 'expense',
      amount: 2000,
      date: new Date('2024-09-06T17:45:00'),
      category: 'shopping',
       accountNumber: '1234567890',
    },
    {
      type: 'income',
      amount: 1500,
      date: new Date('2024-09-08T11:15:00'),
      category: 'gift',
       accountNumber: '1234567890',
    },
    {
      type: 'expense',
      amount: 3000,
      date: new Date('2024-09-09T19:30:00'),
      category: 'entertainment',
       accountNumber: '1234567890',
    },
    {
      type: 'income',
      amount: 7000,
      date: new Date('2024-09-10T08:45:00'),
      category: 'bonus',
      accountNumber: "0987654321",
    },
    {
      type: 'expense',
      amount: 500,
      date: new Date('2024-09-11T13:00:00'),
      category: 'transportation',
      accountNumber: "0987654321",
    },
    {
      type: 'income',
      amount: 6000,
      date: new Date('2023-09-12T10:20:00'),
      category: 'investment',
      accountNumber: "0987654321",
    },
    {
      type: 'expense',
      amount: 2500,
      date: new Date('2024-09-13T18:30:00'),
      category: 'utilities',
       accountNumber: '1234567890',
    },
    {
      type: 'income',
      amount: 4000,
      date: new Date('2024-09-14T15:45:00'),
      category: 'side job',
      accountNumber: "0987654321",
    },
    {
      type: 'expense',
      amount: 1800,
      date: new Date('2024-09-15T12:15:00'),
      category: 'healthcare',
       accountNumber: "1234567890",
    },
    {
      type: 'expense',
      amount: 1500,
      date: new Date('2024-09-16T17:00:00'),
      category: 'education',
      accountNumber: "0987654321",
    },
    {
      type: 'income',
      amount: 12000,
      date: new Date('2024-09-17T11:00:00'),
      category: 'business income',
      accountNumber: "0987654321",
    },
    {
      type: 'expense',
      amount: 2200,
      date: new Date('2024-09-18T13:45:00'),
      category: 'charity',
      accountNumber: "0987654321",
    },
    {
      type: 'income',
      amount: 4500,
      date: new Date('2024-09-19T10:00:00'),
      category: 'rent income',
       accountNumber: "1234567890",
    },
    {
      type: 'expense',
      amount: 900,
      date: new Date('2024-09-20T09:15:00'),
      category: 'mobile bill',
       accountNumber: "1234567890",
    },
    {
      type: 'income',
      amount: 3000,
      date: new Date('2024-09-21T08:30:00'),
      category: 'investment return',
       accountNumber: "1234567890",
    },
    {
      type: 'expense',
      amount: 6000,
      date: new Date('2024-09-22T19:30:00'),
      category: 'home repairs',
       accountNumber: "1234567890",
    },
    {
      type: 'income',
      amount: 5500,
      date: new Date('2024-09-23T14:30:00'),
      category: 'freelance',
       accountNumber: "0987654321",
    },
    {
      type: 'expense',
      amount: 2000,
      date: new Date('2024-09-24T16:00:00'),
      category: 'dining out',
       accountNumber: "0987654321",
    },
  ]);

  // Filter transactions for the selected account
  const filteredAccountTransactions = transactions.filter(
    transaction => transaction.accountNumber === accountNumber
  );

  const today = new Date();
  const past30Days = new Date(today.setDate(today.getDate() - 30));

  // Filter transactions from the last 30 days
  const filterLast30Days = (filteredAccountTransactions) => {
    return transactions.filter((filteredAccountTransactions) => filteredAccountTransactions.date >= past30Days);
  };

  const last30DaysTransactions = filterLast30Days(filteredAccountTransactions);

  const calculateCashFlow = (filteredAccountTransactions) => {
    let cashFlow = 0;
    const sortedTransactions = [...filteredAccountTransactions].sort(
      (a, b) => a.date - b.date
    );

    return sortedTransactions.map((filteredAccountTransactions) => {
      if (filteredAccountTransactions.type === 'income') {
        cashFlow += filteredAccountTransactions.amount;
      } else if (filteredAccountTransactions.type === 'expense') {
        cashFlow -= filteredAccountTransactions.amount;
      }
      const formattedDate = `${String(filteredAccountTransactions.date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(filteredAccountTransactions.date.getDate()).padStart(2, '0')}`;

      return { date: formattedDate, cashFlow };
    });
  };

  const cashFlowData = calculateCashFlow(last30DaysTransactions);

  const chartData = cashFlowData.map((item, index) => ({
    x: index,
    y: item.cashFlow,
    date: item.date, // Include date in the chart data
    amount: item.cashFlow, // Include amount in the chart data
  }));
  const xAxisLabels = cashFlowData.map((item) => item.date);
   const CustomTooltip = ({ value, position }) => {
    return (
      <View
        style={[
          styles.tooltipContainer,
          { left: position.x, top: position.y },
        ]}>
        <Text style={styles.tooltipText}>Date: {value.date}</Text>
        <Text style={styles.tooltipText}>
          Amount: ${value.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  const incomeTransactions = last30DaysTransactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const expenseTransactions = last30DaysTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  return (
     <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <View style={styles.mainHeadingContainer}>
    <Text style={styles.mainHeading}>Account Number: 123-456-78</Text>
    
  </View>
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Cash Flow Overview</Text>
          
        </View>
        <View style={styles.chartContainer}>
          <Chart
            style={{ height: 200, width: '100%' }}
            data={chartData}
            padding={{ left: 40, bottom: 40, right: 20, top: 20 }}
            xDomain={{ min: 0, max: chartData.length - 1 }}
            yDomain={{
              min: Math.min(...chartData.map((d) => d.y)),
              max: Math.max(...chartData.map((d) => d.y)),
            }}>
            <VerticalAxis
              tickCount={5}
              theme={{ labels: { formatter: (v) => `$${v.toFixed(2)}` } }}
            />
            <HorizontalAxis
              tickCount={4}
              theme={{
                labels: {
                  formatter: (v) => xAxisLabels[Math.round(v)] || '',
                  labelRotation: 45,
                },
              }}
            />
            <Line
              tooltipComponent={<CustomTooltip />}
              theme={{
                stroke: { color: '#4caf50', width: 2 },
              }}
            />
            <Area
              theme={{
                gradient: {
                  from: { color: '#4caf50', opacity: 0.4 },
                  to: { color: '#4caf50', opacity: 0.0 },
                },
              }}
            />
            <Line
              theme={{
                stroke: { color: '#44bd32', width: 5 },
                scatter: {
                  default: { width: 8, height: 8, rx: 4, color: '#44ad32' },
                  selected: { color: 'red' },
                },
              }}
            />
          </Chart>
        </View>
      </View>

      {/* Income List */}
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Income</Text>
        <FlatList
          data={incomeTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.listItem, styles.incomeItem]}>
              <View style={styles.verticalLine}></View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemText}>
                  {item.category} - {item.date.toLocaleDateString()}
                </Text>
                <Text style={[styles.listItemAmount, styles.incomeAmount]}>
                  ${item.amount}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Expenses</Text>
        <FlatList
          data={expenseTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.listItem, styles.expenseItem]}>
              <View style={styles.verticalLine}></View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemText}>
                  {item.category} - {item.date.toLocaleDateString()}
                </Text>
                <Text style={[styles.listItemAmount, styles.expenseAmount]}>
                  ${item.amount}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
   container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
   chartContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
   sectionContainer: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
   tooltipText: {
    color: 'white',
    fontSize: 12,
  },
  mainHeadingContainer: {
    alignItems: 'center', // Center the text
    marginBottom: 20, // Space below the main heading
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  accountNumber: {
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  listHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  verticalLine: {
    width: 5,
    height: '100%',
  },
  listItemContent: {
    flex: 1,
    paddingLeft: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  listItemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incomeItem: {
    backgroundColor: '#e6ffed', // Light green background for income
  },
  incomeAmount: {
    color: '#4caf50', // Green color for income amount
  },
  expenseItem: {
    backgroundColor: '#ffe6e6', // Light red background for expenses
  },
  expenseAmount: {
    color: '#f44336', // Red color for expense amount
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
 
});

export default AccountView;
