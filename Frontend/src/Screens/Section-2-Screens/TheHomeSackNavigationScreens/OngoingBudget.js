import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
  StatusBar, StyleSheet, ScrollView, Alert
} from 'react-native';
import { useBudget } from '@/app/context/BudgetContext';
import styles from '@/src/components/Styling/Stlyes';
import { Feather } from '@expo/vector-icons';
import RenderBudget from '@/src/components/OnGoingBudget/RenderBudget';


const OngoingBudget = (props) => {
  const { budgetCategories, loading, budgets } = useBudget();

  // useEffect(() => {
  //   console.warn(budgetCategories);
  // }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }

  return (
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
        <Text style={styles.BudgetTextStyling}>OnGoing Budgets</Text>
        {budgetCategories.ongoingbudgets.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.BudgetButttonStyling}
            onPress={() => props.navigation.navigate('Budget Detail',{budgetId: item.id})}
          >
            {/* <Text>{item.name}</Text> */}
            <RenderBudget item={item} type={'ongoing'}/>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.BudgetViewStyling}>
        <Text style={styles.BudgetTextStyling}>Successful Budgets</Text>
        {budgetCategories.successfulbudgets.map((item, index) => (
          <TouchableOpacity key={index} style={styles.BudgetButttonStyling}>
            {/* <Text>{item.name}</Text> */}
            <RenderBudget item={item} type={'success'}/>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.BudgetViewStyling}>
        <Text style={styles.BudgetTextStyling}>Unsuccessful Budgets</Text>
        {budgetCategories.unsuccessfulbudgets.map((item, index) => (
          <View key={index} style={styles.BudgetButttonStyling}>
            {/* <Text>{item.name}</Text> */}
            <RenderBudget item={item} type={'success'}/>
          </View>
        ))}
      </View>
      {/* <View>
        <Text>Successful Budgets</Text>
        <FlatList
          data={budgetCategories.successfulbudgets}
          renderItem={renderBudget}
        />
      </View> */}

      {/* {budgets.map((budget, index) => {
        const amountspent = budget.amount - budget.remainingAmount;
        const percentage = (amountspent / budget.amount) * 100;
        return (
          // <View style={styles.section} key={category}>
          //   <Text style={styles.sectionHeader}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          //   {budgets.map((item, index) => (
          //     <TouchableOpacity
          //       key={index}
          //       style={{
          //         backgroundColor: 'white', margin: 7, padding: 20, borderColor: 'green',
          //         borderWidth: 1, borderRadius: 10
          //       }}
          //       onPress={() => props.navigation.navigate('Budget Detail')}
          //     >
          //       <Text style={{ color: 'black' }}>{item.name}</Text>
          //     </TouchableOpacity>
          //   ))}
          // </View>
          <View
            key={index}
            style={[
              st.card,
              budget.remainingAmount >= 0
                ? st.successfulCard
                : st.unsuccessfulCard,
            ]}
          >
            <View style={st.budgetHeader}>
              <Text
                style={[
                  st.category,
                  budget.remainingAmount >= 0
                    ? st.successfulCategory
                    : st.unsuccessfulCategory,
                ]}
              >
                {budget.name}
              </Text>
              <TouchableOpacity onPress={() => Alert.alert('View More')}>
                <Text
                  style={[
                    st.viewMore,
                    budget.remainingAmount >= 0
                      ? st.successfulViewMore
                      : st.unsuccessfulViewMore,
                  ]}
                >
                  View More
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={st.amount}>Total: {budget.amount}</Text>
            <Text style={st.amountSpent}>Spent: {amountspent}</Text>
            {amountspent < 0 && (
              <Text style={styles.positiveIncomeMessage}>
                Your income is greater than your expenses!
              </Text>
            )}
            <View style={{ marginVertical: 5 }}>
              <Progress.Bar
                style={{ borderRadius: 6, overflow: 'hidden', }}
                color={
                  budget.remainingAmount >= 0
                    ? '#4CAF50' // Green for successful budgets
                    : '#F44336' // Red for unsuccessful budgets
                }
                width={screenWidth * 0.78}
                height={8}
                progress={percentage / 100}
              />
            </View>
            <Text style={st.remainingAmount}>
              {budget.remainingAmount >= 0
                ? `Remaining: ${budget.remainingAmount} (${(100 - percentage).toFixed(1)}%)`
                : ''}
            </Text>
            <View style={st.separator} />
          </View>
        );
      }
      )} */}
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
