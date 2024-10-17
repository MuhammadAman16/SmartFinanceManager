import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useBudget } from '@/app/context/BudgetContext';
import BudgetItem from '../../../components/OnGoingBudget/BudgetItem';
import styles from '@/src/components/Styling/Stlyes';
import { Feather } from '@expo/vector-icons';

const OngoingBudget = (props) => {
  const { budgets, addBudget, budgetCategories } = useBudget();

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
          <FlatList
            data={budgetCategories[category]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BudgetItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ))}
    </View>
  );
};

export default OngoingBudget;
