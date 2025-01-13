import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
  StatusBar, StyleSheet, ScrollView, Alert
} from 'react-native';
import styles from '@/src/components/Styling/Stlyes';
import { Feather } from '@expo/vector-icons';
import user_api from '@/app/api/user_api';
import { AuthContext } from '@/app/context/AuthContext';
import RenderBudget from '@/src/components/OnGoingBudget/RenderBudget';


const OngoingBudget = () => {
  const { user } = useContext(AuthContext);
  // const [budgetCategories, setBudgetCategories] = useState({
  //   ongoingbudgets: [],
  //   successfulbudgets: [],
  //   unsuccessfulbudgets: []
  // });
  const [allBudgets, setAllBudgets] = useState();

  const fetchAllBudget = async () => {
    try {
      if (!user || !user.id) {
        console.error("User ID is not available");
        return;
      }

      const res = await user_api.get(`budget?userId=${user.id}`);
      console.log(res.data);
      setAllBudgets(res.data);
      // const today = new Date();
      // const ongoing = res.data.filter((budget) => {
      //   const start = new Date(budget.startDate);
      //   const end = new Date(budget.endDate);
      //   return end.getTime() >= today.getTime() && start.getTime() <= today.getTime();
      // })
      // const successful = res.data.filter((budget) => {
      //   const end = new Date(budget.endDate);
      //   return end.getTime() <= today.getTime() && budget.remainingAmount >= 0;
      // })
      // const unsuccessful = res.data.filter((budget) => {
      //   const end = new Date(budget.endDate);
      //   return end.getTime() <= today.getTime() && budget.remainingAmount < 0;
      // })
      // setBudgetCategories({
      //   ongoingbudgets: ongoing,
      //   successfulbudgets: successful,
      //   unsuccessfulbudgets: unsuccessful
      // });
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log('No response from server');
      } else {
        console.log('Error: ', error.error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllBudget();
  }, [user])

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center' }}>
  //       <ActivityIndicator size={'large'} color={'blue'} />
  //     </View>
  //   )
  // }

  return (
    // <View>
    //   <Text>OnGoingBudget</Text>
    //   </View>
    <ScrollView style={styles.OnGoingBudgetContainer}>
      <StatusBar translucent barStyle='dark-content' />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Budget</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => props.navigation.navigate('New Budget')}
        >
          <Feather name="plus" size={24} color={'white'} />
          <Text style={styles.createBudgetButonText}>New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.BudgetViewStyling}>
        {allBudgets?.length > 0 && allBudgets?.length !== undefined ?
          allBudgets.map((item, index) => (
            <View
              key={index}
              style={styles.BudgetButttonStyling}
            // onPress={() => props.navigation.navigate('Budget Detail',{budgetId: item.id})}
            >
              {/* <Text>{item.name}</Text> */}
              <RenderBudget item={item} />
            </View>
          ))
          :
          null
        }
      </View>

    </ScrollView>
  );
};

const st = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 3,
    marginVertical: 8
  },
  successfulCard: {
    backgroundColor: '#dcedc8', // Light green for successful budgets
  },
  unsuccessfulCard: {
    backgroundColor: '#ffebee', // Light red for unsuccessful budgets
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  viewMore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red'
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
  remainingAmount: {
    fontSize: 14,
    fontWeight: 'bold',

  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
  },
  positiveIncomeMessage: {
    fontSize: 14,
    color: '#2e7d32', // Dark green for positive message
    fontWeight: 'bold',
    marginTop: 8,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

export default OngoingBudget;
