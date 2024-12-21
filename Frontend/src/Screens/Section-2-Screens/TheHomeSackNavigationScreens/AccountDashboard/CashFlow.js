import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import {
  Chart,
  Line,
  Area,
  Tooltip,
  VerticalAxis,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
import Feather from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;

function CashFlowChart() {
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
const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
   const [accounts, setAccounts] = useState([
  {
    id: 1,
    accountName: "Personal Savings",
    accountNumber: "1234567890",
    currentBalance: "5000",
    currency: "USD",
    accountType: "Savings Account"
  },
  {
    id: 2,
    accountName: "Business Current",
    accountNumber: "0987654321",
    currentBalance: "25000",
    currency: "USD",
    accountType: "Current Account"
  }
]
)

  const today = new Date();
  const past30Days = new Date(today.setDate(today.getDate() - 30));

  // Filter transactions from the last 30 days
  const filterLast30Days = (transactions) => {
    return transactions.filter((transaction) => transaction.date >= past30Days);
  };

  const last30DaysTransactions = filterLast30Days(transactions);

  // Separate income and expenses
  const incomeTransactions = last30DaysTransactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const expenseTransactions = last30DaysTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  // Calculate total income and expenses
  const calculateTotal = (transactions) => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  const totalIncome = calculateTotal(incomeTransactions);
  const totalExpenses = calculateTotal(expenseTransactions);

  // Function to calculate cumulative cash flow
  const calculateCashFlow = (transactions) => {
    let cashFlow = 0;
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.date - b.date
    );

    return sortedTransactions.map((transaction) => {
      if (transaction.type === 'income') {
        cashFlow += transaction.amount;
      } else if (transaction.type === 'expense') {
        cashFlow -= transaction.amount;
      }
      const formattedDate = `${String(transaction.date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(transaction.date.getDate()).padStart(2, '0')}`;

      return { date: formattedDate, cashFlow };
    });
  };

  const cashFlowData = calculateCashFlow(last30DaysTransactions);

  // Function to calculate total amount per category
  const calculateCategoryData = (transactions, type) => {
    const categoryMap = {};

    transactions
      .filter((transaction) => transaction.type === type)
      .forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

    return Object.keys(categoryMap).map((category) => ({
      category,
      amount: categoryMap[category],
    }));
  };

  // Function to sort and return top 5 categories
  const getTop3Categories = (data) => {
    return [...data].sort((a, b) => b.amount - a.amount).slice(0, 3);
  };

  const incomeCategoryData = getTop3Categories(
    calculateCategoryData(last30DaysTransactions, 'income')
  );
  const expenseCategoryData = getTop3Categories(
    calculateCategoryData(last30DaysTransactions, 'expense')
  );

  // Convert the cashFlowData into a format usable for the chart
  const chartData = cashFlowData.map((item, index) => ({
    x: index,
    y: item.cashFlow,
    date: item.date, // Include date in the chart data
    amount: item.cashFlow, // Include amount in the chart data
  }));

  // Get the list of dates for the X-axis labels
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

  const renderAccount = ({ item }) => (
    <View style={styles.accountCard}>
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item.accountName}</Text>
        <Text style={styles.accountBalance}>
          {item.currency} {item.currentBalance}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
       onPress={() => {
        setSelectedAccountNumber(item.accountNumber);
      }}
      >
        <Feather name="eye" size={24} color="#007bff" />
      </TouchableOpacity>
    </View>
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Summary Boxes */}
      <View style={styles.summaryContainer}>
       <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Cash</Text>
          <Text style={styles.summaryAmount}>
            $
            {cashFlowData.length
              ? cashFlowData[cashFlowData.length - 1].cashFlow.toFixed(2)
              : '0.00'}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Incomes</Text>
          <Text style={styles.summaryAmount}>${totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Expenses</Text>
          <Text style={styles.summaryAmount}>${totalExpenses.toFixed(2)}</Text>
        </View>
       
      </View>
{accounts.length > 0 && (
  <View style={styles.sectionContainer}>
    <View style={styles.header}>
      <Text style={styles.sectionHeading}>Accounts</Text>
    </View>
    <View style={styles.chartContainer}>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.accountList}
      />
    </View>
  </View>
)}



      {/* Cash Flow Overview */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Cash Flow Overview</Text>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
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
      {/* Income and Expense by Category */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Top 3 incomes</Text>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: incomeCategoryData.map((item) => item.category),
              datasets: [
                {
                  data: incomeCategoryData.map((item) => item.amount),
                },
              ],
            }}
            width={screenWidth - 70} // Subtracting padding
            height={300}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f5f5f5',
              backgroundGradientTo: '#f5f5f5',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(7, 125, 36, ${opacity})`, // Green for income
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            showValuesOnTopOfBars={true}
          />
        </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.header}>
            <Text style={styles.sectionHeading}>Top 3 expenses</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <BarChart
              data={{
                labels: expenseCategoryData.map((item) => item.category),
                datasets: [
                  {
                    data: expenseCategoryData.map((item) => item.amount),
                  },
                ],
              }}
              width={screenWidth - 70} // Subtracting padding
              height={300}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#f5f5f5',
                backgroundGradientTo: '#f5f5f5',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for expenses
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              showValuesOnTopOfBars={true}
            />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    margin: 4,
    alignItems: 'center',
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 16,
    color: '#333',
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
  viewMoreButton: {
    backgroundColor: '#4a90e2',
    padding: 8,
    borderRadius: 4,
  },
  viewMoreText: {
    color: '#fff',
  },
   accountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  accountInfo: {
    flexDirection: 'column',
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  accountBalance: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
   accountList: {
    paddingBottom: 20,
  },
  
  chartContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  legend: {
    fontSize: 12,
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
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
});

export default CashFlowChart;
