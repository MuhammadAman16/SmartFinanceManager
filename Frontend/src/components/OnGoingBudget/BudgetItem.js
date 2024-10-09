import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import styles from '@/src/components/Styling/Stlyes';

const BudgetItem = ({ item }) => {
  const amountSpent = calculateAmountSpent(item); // Assuming this function is accessible
  const remainingAmount = item.remainingAmount;
  const percentageSpent = (amountSpent / item.totalAmount) * 100;

  return (
    <View style={[styles.card, item.remainingAmount >= 0 ? styles.successfulCard : styles.unsuccessfulCard]}>
      <View style={styles.budgetHeader}>
        <Text style={[styles.category, item.remainingAmount >= 0 ? styles.successfulCategory : styles.unsuccessfulCategory]}>
          {item.category}
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('View More')}>
          <Text style={[styles.viewMore, item.remainingAmount >= 0 ? styles.successfulViewMore : styles.unsuccessfulViewMore]}>
            View More
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.amount}>Total: {item.totalAmount}</Text>
      <Text style={styles.amountSpent}>Spent: {amountSpent}</Text>
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          color={item.remainingAmount >= 0 ? '#4CAF50' : '#F44336'}
          progress={percentageSpent / 100}
          width={300}
        />
      </View>
      <Text style={styles.remainingAmount}>
        {item.remainingAmount >= 0 ? `Remaining: ${remainingAmount} (${(100 - percentageSpent).toFixed(1)}%)` : ''}
      </Text>
    </View>
  );
};

export default BudgetItem;
