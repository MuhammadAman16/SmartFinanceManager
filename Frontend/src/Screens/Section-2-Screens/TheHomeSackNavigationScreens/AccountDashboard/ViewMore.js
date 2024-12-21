// screens/ViewMoreScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart, BarChart } from 'react-native-chart-kit';
import {
  Chart,
  Line,
  Area,
  Tooltip,
  VerticalAxis,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';


const screenWidth = Dimensions.get('window').width;

export default function ViewMoreScreen() {
  //  const [tooltipVisible, setTooltipVisible] = useState(false);
  // const [tooltipData, setTooltipData] = useState({ amount: 0, category: '', position: { x: 0, y: 0 } });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'income',
      amount: 5000,
      date: new Date('2024-09-01T10:30:00'),
      category: 'salary',
    },
    {
      id: 2,
      type: 'expense',
      amount: 1200,
      date: new Date('2024-09-02T14:00:00'),
      category: 'food',
    },
    {
      id: 3,
      type: 'income',
      amount: 8000,
      date: new Date('2024-09-05T09:00:00'),
      category: 'freelance',
    },
    {
      id: 4,
      type: 'expense',
      amount: 2000,
      date: new Date('2024-09-06T17:45:00'),
      category: 'shopping',
    },
    {
      id: 5,
      type: 'income',
      amount: 1500,
      date: new Date('2024-09-08T11:15:00'),
      category: 'gift',
    },
    {
      id: 6,
      type: 'expense',
      amount: 3000,
      date: new Date('2024-09-09T19:30:00'),
      category: 'entertainment',
    },
    {
      id: 7,
      type: 'income',
      amount: 7000,
      date: new Date('2024-09-10T08:45:00'),
      category: 'bonus',
    },
    {
      id: 8,
      type: 'expense',
      amount: 500,
      date: new Date('2024-09-11T13:00:00'),
      category: 'transportation',
    },
    {
      id: 9,
      type: 'income',
      amount: 6000,
      date: new Date('2024-09-12T10:20:00'),
      category: 'investment',
    },
    {
      id: 10,
      type: 'expense',
      amount: 2500,
      date: new Date('2024-09-13T18:30:00'),
      category: 'utilities',
    },
    {
      id: 11,
      type: 'income',
      amount: 4000,
      date: new Date('2024-09-14T15:45:00'),
      category: 'side job',
    },
    {
      id: 12,
      type: 'expense',
      amount: 1800,
      date: new Date('2024-09-15T12:15:00'),
      category: 'healthcare',
    },
    {
      id: 13,
      type: 'expense',
      amount: 1500,
      date: new Date('2024-09-16T17:00:00'),
      category: 'education',
    },
    {
      id: 14,
      type: 'income',
      amount: 12000,
      date: new Date('2024-09-17T11:00:00'),
      category: 'business income',
    },
    {
      id: 15,
      type: 'expense',
      amount: 2200,
      date: new Date('2024-09-18T13:45:00'),
      category: 'charity',
    },
    {
      id: 16,
      type: 'income',
      amount: 4500,
      date: new Date('2024-09-19T10:00:00'),
      category: 'rent income',
    },
    {
      id: 17,
      type: 'expense',
      amount: 900,
      date: new Date('2024-09-20T09:15:00'),
      category: 'mobile bill',
    },
    {
      id: 18,
      type: 'income',
      amount: 3000,
      date: new Date('2024-09-21T08:30:00'),
      category: 'investment return',
    },
    {
      id: 19,
      type: 'expense',
      amount: 6000,
      date: new Date('2024-09-02T19:30:00'),
      category: 'home repairs',
    },
    {
      id: 20,
      type: 'income',
      amount: 5500,
      date: new Date('2024-09-23T14:30:00'),
      category: 'freelance',
    },
    {
      id: 21,
      type: 'expense',
      amount: 2000,
      date: new Date('202-09-24T16:00:00'),
      category: 'dining out',
    },
  ]);

  const [duration, setDuration] = useState(0);
  const [unit, setUnit] = useState('days');

  const getFilteredTransactions = () => {
    const today = new Date();
    let pastDate;

    try {
      switch (unit) {
        case 'days':
          pastDate = new Date(
            today.setDate(today.getDate() - parseInt(duration))
          );
          break;
        case 'weeks':
          pastDate = new Date(
            today.setDate(today.getDate() - parseInt(duration) * 7)
          );
          break;
        case 'months':
          pastDate = new Date(
            today.setMonth(today.getMonth() - parseInt(duration))
          );
          break;
        case 'years':
          pastDate = new Date(
            today.setFullYear(today.getFullYear() - parseInt(duration))
          );
          break;
        default:
          pastDate = today;
      }
    } catch (error) {
      console.error('Error calculating past date:', error);
      pastDate = today;
    }

    return transactions.filter((transaction) => transaction.date >= pastDate);
  };

  const filteredTransactions = getFilteredTransactions();

  // Function to calculate cash flow for filtered transactions
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

  const cashFlowData = calculateCashFlow(filteredTransactions);
  const incomeTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const expenseTransactions = filteredTransactions.filter(
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

  // Instead of getting the top 5 categories, return all categories
  const incomeCategoryData = calculateCategoryData(
    filteredTransactions,
    'income'
  );
  const expenseCategoryData = calculateCategoryData(
    filteredTransactions,
    'expense'
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
console.log(expenseCategoryData)


// const handleBarPress = (amount, category, event) => {
//     const { pageX, pageY } = event.nativeEvent;
//     setTooltipData({ amount, category, position: { x: pageX, y: pageY } });
//     setTooltipVisible(true);
//   };

//   const renderTooltip = () => {
//     if (!tooltipVisible) return null;
//     return (
//       <View style={[styles.tooltip, { left: tooltipData.position.x, top: tooltipData.position.y }]}>
//         <Text>{tooltipData.category}: ${tooltipData.amount}</Text>
//       </View>
//     );
//   };



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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
      <View style={styles.header}>
          <Text style={styles.sectionHeading}>Select the duration</Text>
        </View>
         <View style={styles.chartContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter number"
            onBlur={() => {
              if (isNaN(parseInt(duration)) || parseInt(duration) <= 0) {
                setDuration('30');
              }
            }}
          />
          <Picker
            selectedValue={unit}
            style={styles.picker}
            onValueChange={(itemValue) => setUnit(itemValue)}>
            <Picker.Item label="Days" value="days" />
            <Picker.Item label="Weeks" value="weeks" />
            <Picker.Item label="Months" value="months" />
            <Picker.Item label="Years" value="years" />
          </Picker>
        </View>
        </View>
         </View>
 

       {/* Summary Boxes */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Income</Text>
          <Text style={styles.summaryAmount}>
            {totalIncome > 0 ? `$${totalIncome.toFixed(2)}` : '0.00'}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Expenses</Text>
          <Text style={styles.summaryAmount}>
            {totalExpenses > 0 ? `$${totalExpenses.toFixed(2)}` : '0.00'}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Cash Flow</Text>
          <Text style={styles.summaryAmount}>
            {cashFlowData.length
              ? `$${cashFlowData[cashFlowData.length - 1].cashFlow.toFixed(2)}`
              : '0.00'}
          </Text>
        </View>
      </View>

      {/* Cash Flow Overview */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Cash Flow Overview</Text>
        </View>
        <View style={styles.chartContainer}>
          {chartData.length > 0 ? (
            <Chart
              style={{ height: 200, width: '100%' }}
              data={chartData}
              padding={{ left: 40, bottom: 40, right: 20, top: 20 }}
              xDomain={{ min: 0, max: chartData.length - 1 }}
              yDomain={{
                min: Math.min(...chartData.map((d) => d.y)),
                max: Math.max(...chartData.map((d) => d.y)),
              }}
            >
              <VerticalAxis
                tickCount={3}
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
            </Chart>
          ) : (
            <Text style={styles.noDataText}>No Data</Text>
          )}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Top Incomes</Text>
        </View>

        <View style={styles.chartContainer}>
          {incomeCategoryData.length > 0 ? (
            <HorizontalBarGraph
              data={incomeCategoryData.map(item => item.amount)}
              labels={incomeCategoryData.map(item => item.category)}
              width={screenWidth - 70}
              height={300}
              barRadius={0}
              baseConfig={{
                hasYAxisBackgroundLines: false,
                xAxisLabelStyle: {
                  rotation: 0,
                  fontSize: 9,
                  width: 70,
                  yOffset: 4,
                  xOffset: -25,
                },
                yAxisLabelStyle: {
                  rotation: 15,
                  fontSize: 10,
                  prefix: '$',
                  position: 'bottom',
                  xOffset: 15,
                  yOffset: -14,
                  decimals: 2,
                  height: 100,
                },
              }}
              // onPressBar={(data, index, event) => handleBarPress(data[index].amount, incomeCategoryData[index].category, event)}
            />
          ) : (
            <Text style={styles.noDataText}>No Data</Text>
          )}
        </View>
      </View>



      {/* Expenses by Category */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Top Expenses</Text>
        </View>

        <View style={styles.chartContainer}>
          {expenseCategoryData.length > 0 ? (
            <HorizontalBarGraph
              data={expenseCategoryData.map(item => item.amount)}
              labels={expenseCategoryData.map(item => item.category)}
              width={screenWidth - 70}
              height={300}
              barRadius={0}
              baseConfig={{
                hasYAxisBackgroundLines: false,
                xAxisLabelStyle: {
                  rotation: 0,
                  fontSize: 9,
                  width: 70,
                  yOffset: 4,
                  xOffset: -30,
                },
                yAxisLabelStyle: {
                  rotation: 10,
                  fontSize: 10,
                  prefix: '$',
                  position: 'bottom',
                  xOffset: 15,
                  yOffset: -14,
                  decimals: 2,
                  height: 100,
                },
              }}
              // onPressBar={(data, index, event) => handleBarPress(data[index].amount, expenseCategoryData[index].category, event)}
            />
          ) : (
            <Text style={styles.noDataText}>No Data</Text>
          )}
        </View>
      </View>

      {/* Income List */}
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Income</Text>
        {incomeTransactions.length > 0 ? (
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
        ) : (
          <Text style={styles.noDataText}>No Data</Text>
        )}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Expenses</Text>
        {expenseTransactions.length > 0 ? (
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
                    -${item.amount}
                  </Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <Text style={styles.noDataText}>No Data</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
  picker: {
    flex: 1,
  },


  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
   noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  summaryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryAmount: {
    fontSize: 24,
    color: '#333',
  },
  chartSectionContainer: {
    marginVertical: 16,
  },
  chartHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chartContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  chart: {
    borderRadius: 16,
  },
  transactionContainer: {
    marginVertical: 16,
  },
  transactionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionText: {
    fontSize: 16,
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

   tooltip: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },container: {
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
///