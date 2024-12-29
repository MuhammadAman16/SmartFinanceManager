import React from 'react'
import IncomeFormStackFile from './IncomeFormStackFile';
import ExpenseFormStackFile from './ExpenseStackFile';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const RecordCreation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(56,142,60,255)',
        },
        headerTintColor: 'white',
        headerShown: false
      }}
    >
      <Stack.Screen
        name='IncomeFormStackFile'
        component={IncomeFormStackFile}
        // options={{ headerShown: true, title: 'Income Form' }}
      />
      <Stack.Screen
        name='ExpenseFormStackFile'
        component={ExpenseFormStackFile}
        // ptions={{ headerShown: true, title: 'Expense Form' }}
      />
    </Stack.Navigator>
  );
}

export default RecordCreation