import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { useNavigation } from '@react-navigation/native';
import user_api from '@/app/api/user_api';
import { AccountContext } from '@/app/context/AccountContext';
import { AuthContext } from '@/app/context/AuthContext';

const screenWidth = Dimensions.get('window').width;

function CashFlowChart() {
  const { activeAccount } = useContext(AccountContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
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
  const [acc, setAcc] = useState();
  const [incomes, setIncome] = useState();
  const [expense, setExpense] = useState();
  const [allAccounts, setAllAccounts] = useState();
  const [IncomeCategoryData, setIncomeCategoryData] = useState();
  const [ExpenseCategoryData, setExpenseCategoryData] = useState();
  const [cashFlowChartData, setCashFlowChartData] = useState([
    // { x: 0, y: 30 },
    // { x: 1, y: 40 },
    { x: 2, y: 35 },
    { x: 3, y: 50 },
    { x: 4, y: 45 },
  ]);
  // const chartDataforStatic = [
  //   { x: 0, y: 30 },
  //   { x: 1, y: 40 },
  //   { x: 2, y: 35 },
  //   { x: 3, y: 50 },
  //   { x: 4, y: 45 },
  // ];

  const fetchActiveAccount = async () => {
    try {
      const result = await user_api.get(`accounts/${activeAccount.id}`);
      setAcc(result.data);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`)
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }

  const fetchIncome = async () => {
    try {
      const incomeResult = await user_api.get(`record?userId=${user.id}&type=INCOME`);
      setIncome(incomeResult.data.filter((income) => income?.Account?.name === activeAccount.name));
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`)
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }


  const fetchExpense = async () => {
    try {
      const expenseResult = await user_api.get(`record?userId=${user.id}&type=EXPENSE`);
      setExpense(expenseResult.data.filter((expense) => expense?.Account?.name === activeAccount.name));
      console.log("Good");
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }

  const fetchAllAccounts = async () => {
    try {
      const result = await user_api.get(`accounts?userId=${user.id}`);
      setAllAccounts(result.data);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }

  const fetchIncomeCategoryData = async () => {
    try {
      const result = await user_api.get(`record?userId=${user.id}&type=INCOME`);
      const sortedIncome = result.data.sort((a, b) => b.amount - a.amount);
      const top3Income = sortedIncome.slice(0, 3);
      const incomeCategory = top3Income?.map((income) => ({
        category: income.Category.name,
        amount: income.amount
      }))
      setIncomeCategoryData(incomeCategory);
      // console.log("Good ", incomeCategory);
      // console.log("Good ", incomeCategory);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }


  const fetchExpenseCategoryData = async () => {
    try {
      const result = await user_api.get(`record?userId=${user.id}&type=EXPENSE`);
      const sortedExpense = result.data.sort((a, b) => b.amount - a.amount);
      const top3Expense = sortedExpense.slice(0, 3);
      const expenseCategory = top3Expense.map((expense) => ({
        category: expense.Category.name,
        amount: expense.amount
      }))
      // console.log("Good ", incomeCategory);
      setExpenseCategoryData(expenseCategory);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }

  const fetchAllRecords1 = async () => {
    try {
      const result = await user_api.get(`record?userId=${user.id}&startFrom=2024-12-01&endDate=2024-12-31`);
      const AllRecordAccount = result.data;
      const record = parseInt(AllRecordAccount.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0, 10);
      // ${parseInt(expense?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0, 10)}
      setCashFlowChartData((prevData) => [
        { x: 0, y: record },
        ...prevData
      ]);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }

  const fetchAllRecords2 = async () => {
    try {
      const result = await user_api.get(`record?userId=${user.id}&startFrom=2025-01-01&endDate=2025-01-31`);
      const AllRecordAccount = result.data;
      const record = parseInt(AllRecordAccount.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0, 10);
      // ${parseInt(expense?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0, 10)}
      setCashFlowChartData((prevData) => [
        { x: 1, y: record },
        ...prevData,
      ]);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log(`No response from server`);
      } else {
        console.log("Error: ", error.error);
      }
    }
  }


  useEffect(() => {
    if (activeAccount) { fetchActiveAccount(); }
  }, [activeAccount])

  useEffect(() => {
    if (user) { fetchIncome(); fetchExpense(); fetchIncomeCategoryData(); fetchExpenseCategoryData(); }
  }, [user, activeAccount])

  useEffect(() => {
    fetchAllAccounts();
    fetchAllRecords1();
    fetchAllRecords2();
  }, [user])


  const incomeCategoryData = [
    { category: "Salary", amount: 5000 },
    { category: "Freelance", amount: 2000 },
    { category: "Investments", amount: 1500 },
    { category: "Rental", amount: 1200 },
    { category: "Miscellaneous", amount: 800 },
  ];

  const expenseCategoryData = [
    { category: "Rent", amount: 1500 },
    { category: "Groceries", amount: 800 },
    { category: "Transportation", amount: 500 },
    { category: "Utilities", amount: 400 },
    { category: "Entertainment", amount: 300 },
    { category: "Healthcare", amount: 200 },
  ];

  const xAxisLabelsforStatic = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  const renderAccount = ({ item }) => (
    <View style={styles.accountCard}>
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item.name}</Text>
        <Text style={styles.accountBalance}>
          {item.currency} {item.currentValue}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setSelectedAccountNumber(item.accountNumber);
          navigation.navigate('AccountStackScreen', { viewMore: false })
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
            ${acc ? acc?.currentValue : '0.00'}
            {/* {cashFlowData.length
              ? cashFlowData[cashFlowData.length - 1].cashFlow.toFixed(2)
              : '0.00'} */}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Incomes</Text>
          <Text
            style={styles.summaryAmount}
          >
            ${parseInt(incomes?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0, 10)}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeading}>Expenses</Text>
          <Text
            style={styles.summaryAmount}
          >
            ${parseInt(expense?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0, 10)}
          </Text>
        </View>

      </View>
      {allAccounts?.length > 0 && (
        <View style={styles.sectionContainer}>
          <View style={styles.header}>
            <Text style={styles.sectionHeading}>Accounts</Text>
          </View>
          <View style={styles.chartContainer}>
            {allAccounts.map((account, index) => (
              <View style={styles.accountCard} key={index}>
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>{account?.name}</Text>
                  <Text style={styles.accountBalance}>
                    {account?.currency} {account?.currentValue}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setSelectedAccountNumber(item.accountNumber);
                    navigation.navigate('AccountStackScreen', { viewMore: false })
                  }}
                >
                  <Feather name="eye" size={24} color="#007bff" />
                </TouchableOpacity>
              </View>
            ))} 
          </View>
        </View>
      )}



      {/* Cash Flow Overview */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Cash Flow Overview</Text>
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.navigate('AccountStackScreen', { viewMore: true })}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          <Chart
            style={{ height: 200, width: '100%' }}
            data={cashFlowChartData}
            padding={{ left: 40, bottom: 40, right: 20, top: 20 }}
            xDomain={{ min: 0, max: cashFlowChartData.length - 1 }}
            yDomain={{
              min: Math.min(...cashFlowChartData.map((d) => d.y)),
              max: Math.max(...cashFlowChartData.map((d) => d.y)),
            }}>

            <VerticalAxis
              tickCount={5}
              theme={{
                labels: {
                  formatter: (v) => `$${v.toFixed(2)}`,
                },
              }}
            />

            <HorizontalAxis
              tickCount={4}
              theme={{
                labels: {
                  formatter: (v) => xAxisLabelsforStatic[Math.round(v)] || '',
                  labelRotation: 45,
                },
              }}
            />

            {/* Area chart (optional) */}
            <Area
              theme={{
                gradient: {
                  from: { color: '#4caf50', opacity: 0.4 },
                  to: { color: '#4caf50', opacity: 0.0 },
                },
              }}
            />

            {/* Line chart */}
            <Line
              theme={{
                stroke: { color: '#4caf50', width: 2 },
              }}
            />

            {/* Tooltip (this should be customized if you need dynamic tooltips) */}
            <Tooltip
              containerStyle={{
                backgroundColor: 'transparent',
                zIndex: 1,
              }}
              renderTooltip={({ x, y, index }) => {
                const value = cashFlowChartData[index];
                return <CustomTooltip value={value} position={{ x, y }} />;
              }}
            />
          </Chart>
          {/* <Chart
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
              tooltipComponent={(tooltipProps) => (
                <CustomTooltip {...tooltipProps} value={tooltipValue} position={tooltipPosition} />
              )}
              theme={{
                stroke: { color: '#4caf50', width: 2 },
              }}
            />
            <Line
              tooltipComponent={<CustomTooltip value={tooltipValue} position={tooltipPosition} />}
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
          </Chart> */}
        </View>
      </View>
      {/* Income and Expense by Category */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Top 3 incomes</Text>
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.navigate('AccountStackScreen', { viewMore: true })}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: (IncomeCategoryData?.length !== undefined ? IncomeCategoryData : incomeCategoryData).map((item) => item.category),
              datasets: [
                {
                  data: (IncomeCategoryData?.length !== undefined ? IncomeCategoryData : incomeCategoryData).map((item) => item.amount),
                },
              ],
            }}
            width={screenWidth - 70} // Adjust for padding/margins
            height={300}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#f5f5f5",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(7, 125, 36, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            showValuesOnTopOfBars={true}
          />
          {/* <BarChart
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
          /> */}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>Top 3 expenses</Text>
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.navigate('AccountStackScreen', { viewMore: true })}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: (ExpenseCategoryData?.length !== undefined ? ExpenseCategoryData : expenseCategoryData).map((item) => item.category),
              datasets: [
                {
                  data: (ExpenseCategoryData?.length !== undefined ? ExpenseCategoryData : expenseCategoryData).map((item) => item.amount),
                },
              ],
            }}
            width={screenWidth - 70} // Adjust for padding/margins
            height={300}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#f5f5f5",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for expenses
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            showValuesOnTopOfBars={true}
          />
          {/* <BarChart
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
          /> */}
        </View>
      </View>


      {/* Income List */}
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Income</Text>
        {incomes?.length !== undefined ? (
          incomes?.map((income, index) => (
            <View style={[styles.listItem, styles.incomeItem]} key={index}>
              <View style={styles.verticalLine}></View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemText}>
                  {income?.Category?.name} - {income?.datetime?.split("T")[0]}
                </Text>
                <Text style={[styles.listItemAmount, styles.incomeAmount]}>
                  ${income?.amount}
                </Text>
              </View>
            </View>
          ))
        )
          :
          (<Text>No Income Found</Text>)
        }
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Expenses</Text>
        {expense?.length !== undefined ? (
          expense?.map((expense, index) => (
            <View style={[styles.listItem, styles.expenseItem]} key={index}>
              <View style={styles.verticalLine}></View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemText}>
                  {expense?.Category?.name} - {expense?.datetime ? expense.datetime?.split("T")[0] : null}
                </Text>
                <Text style={[styles.listItemAmount, styles.expenseAmount]}>
                  ${expense.amount}
                </Text>
              </View>
            </View>
          ))
        )
          :
          (<Text>No Expense Found</Text>)
        }
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
