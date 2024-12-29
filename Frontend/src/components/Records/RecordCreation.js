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
      <Stack.Screen name='IncomeFormStackFile' component={IncomeFormStackFile} />
      <Stack.Screen name='ExpenseFormStackFile' component={ExpenseFormStackFile} />
    </Stack.Navigator>
  );

  // const { selectedAccount } = route?.params || {};
  // const { selectedCategory } = route?.params || {};
  // const { selectedLabels } = route?.params || {};
  // const [type, setType] = useState('income');
  // const [account, setAccount] = useState({ id: 0, name: "" });
  // const [category, setCategory] = useState({ id: 0, name: "" });
  // const [labels, setLabels] = useState();

  // useEffect(() => {
  //   if (selectedAccount) {
  //     setAccount(selectedAccount);
  //   }
  // }, [selectedAccount])

  // useEffect(() => {
  //   if (selectedCategory) {
  //     setCategory(selectedCategory);
  //   }
  // }, [selectedCategory])

  // useEffect(() => {
  //   setLabels(selectedLabels);
  // }, [selectedLabels])

  // return (
  //   <View style={{ flex: 1 }}>
  //     {/* <Text>RecordCreation</Text> */}
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         width: '100%',
  //         alignItems: 'center',
  //         justifyContent: 'space-evenly',
  //         marginVertical: 10
  //       }}>
  //       <View
  //         style={{
  //           backgroundColor: 'purple',
  //           padding: 10,
  //           borderRadius: 10
  //         }}>
  //         <Text style={{ color: 'white' }}>Income</Text>
  //       </View>
  //       <View
  //         style={{
  //           backgroundColor: 'purple',
  //           padding: 10,
  //           borderRadius: 10
  //         }}>
  //         <Text style={{ color: 'white' }}>Expense</Text>
  //       </View>
  //     </View>
  //     {type === 'income'
  //       ? <IncomeForm
  //         account={account}
  //         category={category}
  //         label={labels}
  //       />
  //       : <ExpenseForm />}
  //   </View>
  // )
}

export default RecordCreation