import React from 'react'
import IncomeFormStackFile from './IncomeFormStackFile';
import ExpenseFormStackFile from './ExpenseStackFile';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditRecordStackFile from './EditRecordStackFile';

const Stack = createNativeStackNavigator();

const RecordCreation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(56,142,60,255)',
        },
        headerTintColor: 'white',
        headerShown: false
      }}
      initialRouteName={props?.route?.params?.isEdit ? 'EditRecordStackFile' : 'IncomeFormStackFile'}
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
      <Stack.Screen
        name='EditRecordStackFile'
        component={EditRecordStackFile}
        initialParams={{ itemId: props?.route?.params?.itemId }}
      />
    </Stack.Navigator>
  );
}

export default RecordCreation