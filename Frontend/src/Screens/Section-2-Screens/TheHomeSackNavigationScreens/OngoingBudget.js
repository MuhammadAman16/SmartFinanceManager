import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { useBudget } from '@/app/context/BudgetContext';
import BudgetItem from '../../../components/OnGoingBudget/BudgetItem';
import BudgetDetail from './BudgetDetail';
import styles from '@/src/components/Styling/Stlyes';
import { Feather } from '@expo/vector-icons';

const OngoingBudget = (props) => {
  const { budgetCategories, loading, budgets } = useBudget();

  useEffect(() => {
    console.warn(budgets);
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }

  return (
    <View style={styles.OnGoingBudgetContainer}>
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

      {['ongoingBudgets', 'successfulBudgets', 'unsuccessfulBudgets'].map(category => (
        <View style={styles.section} key={category}>
          <Text style={styles.sectionHeader}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          {budgets.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{backgroundColor: 'white', margin: 7, padding: 20, borderColor: 'green',
                borderWidth: 1, borderRadius: 10}}
              onPress={() => props.navigation.navigate('Budget Detail')}
            >
              <Text style={{color: 'black'}}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default OngoingBudget;
