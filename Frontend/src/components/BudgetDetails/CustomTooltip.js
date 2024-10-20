// src/components/BudgetDetail/CustomTooltip.js

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styling/Stlyes';

const CustomTooltip = ({ value, position }) => {
  return (
    <View
      style={[
        styles.BudgetDetailtooltipContainer,
        { left: position.x, top: position.y },
      ]}>
      <Text style={styles.BudgetDetailtooltipText}>Date: {value.date}</Text>
      <Text style={styles.BudgetDetailtooltipText}>Amount: ${value.amount.toFixed(2)}</Text>
    </View>
  );
};

export default CustomTooltip;
