import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Area,
} from 'react-native-responsive-linechart';

const screenWidth = Dimensions.get('window').width;
// Sample Budget Data
const budget = {
  id: '3',
  category: 'September Budget',
  totalAmount: 2000,
  startDate: new Date('2024-09-01'),
  endDate: new Date('2024-09-30'),
  remainingAmount: 50,
};

const transactions = [
  {
    type: 'expense',
    amount: 300,
    date: new Date('2024-09-02T14:00:00'),
    category: 'Food',
  },
  {
    type: 'expense',
    amount: 300,
    date: new Date('2024-09-02T14:00:00'),
    category: 'Foods',
  },
  {
    type: 'expense',
    amount: 300,
    date: new Date('2024-09-02T14:00:00'),
    category: 'Foodss',
  },
  {
    type: 'expense',
    amount: 300,
    date: new Date('2024-09-02T14:00:00'),
    category: 'Fsss',
  },

  {
    type: 'expense',
    amount: 1100,
    date: new Date('2024-09-03T14:00:00'),
    category: 'Entertainment',
  },
  {
    type: 'expense',
    amount: 450,
    date: new Date('2024-09-05T14:00:00'),
    category: 'Groceries',
  },
  {
    type: 'income',
    amount: 200,
    date: new Date('2024-09-06T14:00:00'),
    category: 'Salary',
  },
  {
    type: 'income',
    amount: 500,
    date: new Date('2024-09-04T14:00:00'),
    category: 'Freelance',
  },
];

// Helper function to filter transactions within the date range
const filterDateRange = (transactions, startDate, endDate) => {
  return transactions.filter(
    (transaction) =>
      transaction.date >= startDate && transaction.date <= endDate
  );
};
const calculateAmountSpent = () => {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  });

  return { totalIncome, totalExpenses };
};

// Helper function to get expense breakdown by category for the PieChart
const getExpenseByCategory = () => {
  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

  // Convert expenses object to array and sort by amount
  const sortedExpenses = Object.keys(expenses)
    .map((category) => ({
      category: category,
      amount: expenses[category],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 9,
    }))
    .sort((a, b) => b.amount - a.amount); // Sort by amount in descending order

  return sortedExpenses;
};

const filteredTransactions = filterDateRange(
  transactions,
  budget.startDate,
  budget.endDate
);

// Helper function to calculate cash flow
const calculateCashFlow = (transactions) => {
  let cashFlow = 0;
  const cashFlowData = [];
  const sortedTransactions = [...transactions].sort((a, b) => a.date - b.date);

  for (
    let date = new Date(budget.startDate);
    date <= budget.endDate;
    date.setDate(date.getDate() + 1)
  ) {
    // Format the date as MM-DD
    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;

    sortedTransactions.forEach((transaction) => {
      // Format transaction date as MM-DD
      const transactionDate = `${String(
        transaction.date.getMonth() + 1
      ).padStart(2, '0')}-${String(transaction.date.getDate()).padStart(
        2,
        '0'
      )}`;

      if (transactionDate === formattedDate) {
        if (transaction.type === 'income') {
          cashFlow -= transaction.amount;
        } else if (transaction.type === 'expense') {
          cashFlow += transaction.amount;
        }
      }
    });

    cashFlowData.push({ date: formattedDate, cashFlow });
  }

  return cashFlowData;
};

const cashFlowData = calculateCashFlow(filteredTransactions);

// Get the first and last dates
const startDate = cashFlowData[0].date;
const endDate = cashFlowData[cashFlowData.length - 1].date;

// Select three middle dates
const middleIndexes = [
  Math.floor(cashFlowData.length / 4),
  Math.floor(cashFlowData.length / 2),
  Math.ceil((3 * cashFlowData.length) / 4),
];

// Create selectedLabels array
const selectedLabels = [
  startDate,
  ...middleIndexes.map((index) => cashFlowData[index].date),
  endDate,
];

// Transform cash flow data into chart data format
const chartData = cashFlowData.map((item, index) => ({
  x: index,
  y: item.cashFlow,
}));
const referenceValue = budget.totalAmount;

const xAxisLabels = cashFlowData.map((item) => item.date); // Use the dates as x-axis labels;

const CustomTooltip = ({ value, position }) => {
  return (
    <View
      style={[styles.tooltipContainer, { left: position.x, top: position.y }]}>
      <Text style={styles.tooltipText}>Date: {xAxisLabels[value.x]}</Text>
      <Text style={styles.tooltipText}>Amount: ${value.y.toFixed(2)}</Text>
    </View>
  );
};

// Budget Page Component
const BudgetDetail = () => {
  const { totalIncome, totalExpenses } = calculateAmountSpent();
  const [tooltip, setTooltip] = useState({
    visible: false,
    value: {},
    position: { x: 0, y: 0 },
  });
  const handleTooltip = (event) => {
    const { nativeEvent } = event;
    const closestPoint = chartData.reduce((prev, curr) =>
      Math.abs(curr.x - nativeEvent.x) < Math.abs(prev.x - nativeEvent.x)
        ? curr
        : prev
    );

    setTooltip({
      visible: true,
      value: closestPoint,
      position: { x: nativeEvent.x, y: nativeEvent.y },
    });
  };
  const incomeexpenseData = [
    {
      name: 'Incomes',
      amount: totalIncome,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Expenses',
      amount: totalExpenses,
      color: '#FF4C4C',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];
  const progress = totalExpenses / budget.totalAmount;
  const progressPercent = Math.round(progress * 100);

  const spendingData = getExpenseByCategory();

  let progressBarColor, remainingAmountColor;
  if (progressPercent < 0) {
    progressBarColor = '#e0e0e0'; // Light gray color for negative percentage
    remainingAmountColor = '#4CAF50'; // Light gray color for negative percentage
  } else if (progressPercent >= 100) {
    progressBarColor = '#FF4C4C'; // Red color for over budget
    remainingAmountColor = '#FF4C4C'; // Red color for over budget
  } else if (progressPercent > 80) {
    progressBarColor = '#FFB300'; // Dark yellow color for approaching budget limit
    remainingAmountColor = '#FFB300'; // Dark yellow color for approaching budget limit
  } else {
    progressBarColor = '#4CAF50'; // Green color for within budget
    remainingAmountColor = '#4CAF50'; // Green color for within budget
  }

  console.log(cashFlowData);
  return (
    // <View>
    //   <Text>Budget Hammad Screen</Text>
    // </View>
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.header}>Budget Details: {budget.category}</Text>
      <Text style={styles.subheader}>
        Period: {budget.startDate.toDateString()} -{' '}
        {budget.endDate.toDateString()}
      </Text>

      {/* Amount Section */}
      <View style={styles.amountContainer}>
        <View style={styles.amountItem}>
          <Text style={styles.text}>Total Amount:</Text>
          <Text style={styles.amount}>${budget.totalAmount}</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.text}>Total Income:</Text>
          <Text style={styles.amount}>${totalIncome}</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.text}>Total Expenses:</Text>
          <Text style={styles.amount}>${totalExpenses}</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.text}>Remaining Amount:</Text>
          <Text style={[styles.amount, { color: remainingAmountColor }]}>
            ${budget.remainingAmount}
          </Text>
        </View>
      </View>

      {/* Custom Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.text}>Progress</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: progressBarColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressPercent}>{progressPercent}%</Text>
      </View>

      {/* income vs expense (Pie Chart) */}
      <View style={styles.chartContainer}>
        <Text style={styles.header}>Income vs Expense</Text>
        <PieChart
          data={incomeexpenseData}
          width={Dimensions.get('window').width - 90} // Adjust the width as per your layout
          height={130}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#f5f5f5',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 8,
            },
          }}
          accessor={'amount'}
          backgroundColor={'transparent'}
          paddingLeft={'1'}
          absolute
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.header}>Top Spendings</Text>
        <HorizontalBarGraph
          data={spendingData.map((item) => item.amount)}
          labels={spendingData.map((item) => item.category)}
          width={screenWidth - 90}
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
              decimals: 2,
              yOffset: -14,
              height: 100,
            },
          }}
          // onPressBar={(data, index, event) => handleBarPress(data[index].amount, expenseCategoryData[index].category, event)}
        />
      </View>

      {/* Cash Flow Line Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.header}>Cash Flow Over Time</Text>
        <View style={{ flex: 1, padding: 20 }}>
          <Chart
            style={{ height: 200, width: '100%' }}
            data={chartData}
            padding={{ left: 40, bottom: 40, right: 20, top: 20 }}
            xDomain={{ min: 0, max: chartData.length - 1 }}
            yDomain={{
              min: Math.min(...chartData.map((d) => d.y)),
              max: Math.max(...chartData.map((d) => d.y)),
            }}
            onPress={handleTooltip}>
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
              data={chartData}
              tooltipComponent={<CustomTooltip />}
              theme={{
                stroke: { color: '#4caf50', width: 2 },
              }}
            />
            <Area
              data={chartData}
              theme={{
                gradient: {
                  from: { color: '#4caf50', opacity: 0.4 },
                  to: { color: '#4caf50', opacity: 0.0 },
                },
              }}
            />
            {/* Horizontal line at reference value */}
            <Line
              data={[
                { x: 0, y: referenceValue },
                { x: chartData.length - 1, y: referenceValue },
              ]}
              theme={{
                stroke: { color: 'red', width: 4, dash: [4, 4] }, // Dashed line style
              }}
            />
          </Chart>
          {tooltip.visible && (
            <CustomTooltip value={tooltip.value} position={tooltip.position} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  amountContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  amountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 20,

    backgroundColor: '#ffffff', // White background for the chart container
    borderRadius: 10,
    padding: 10,
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginTop: 5,
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff', // White background for the chart container
    borderRadius: 10,
    padding: 20,
  },
  lineChart: {
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 12,
    color: '#333',
  },
});

export default BudgetDetail;
