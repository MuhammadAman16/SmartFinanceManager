import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExpenseForm from './ExpenseForm';
import SelectAccountScreen from './SelectAccountScreen';
import SelectCategoryScreen from './SelectCategoryScreen';
import LabelScreen from '@/src/Screens/Section-2-Screens/TheHomeSackNavigationScreens/LabelScreen';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const ExpenseFormStackFile = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white',
            }}
            initialRouteName='Expense Form'
        >
            <Stack.Screen name='Expense Form' component={ExpenseForm} />
            <Stack.Screen name='Select Account' component={SelectAccountScreen} />
            <Stack.Screen name='Select Category' component={SelectCategoryScreen} />
            <Stack.Screen name='Select Labels' component={LabelScreen}
                options={({ route, navigation }) => ({
                    headerRight: () => (
                        <Feather
                            name='check'
                            size={30}
                            color={'white'}
                            onPress={() => {
                                const selectedLabels = route.params?.selectedLabels || [];
                                route.params?.onLabelsSelected(selectedLabels);
                                navigation.goBack();
                            }}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
}

export default ExpenseFormStackFile