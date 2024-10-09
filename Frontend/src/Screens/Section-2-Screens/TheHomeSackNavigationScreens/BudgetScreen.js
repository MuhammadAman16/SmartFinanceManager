import OngoingBudget from './OngoingBudget';
import BudgetCreation from './BudgetCreation';
import CategoriesScreen from './CategoriesAccountsScreen';
import LabelScreen from './LabelScreen';
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const BudgetScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white'
            }}>
            <Stack.Screen name='Your Budgets' component={OngoingBudget} />
            <Stack.Screen name='New Budget' component={BudgetCreation} options={{
                headerRight: () => (
                    <Feather name='check' size={30} color={'white'} />
                )
            }} />
            <Stack.Screen name='Select Categories' component={CategoriesScreen}
                options={({ route, navigation }) => ({
                    title: route.params?.title || 'Select Categories',
                    headerRight: () => (
                        <Feather
                            name='check'
                            size={30}
                            color={'white'}
                            onPress={() => {
                                const selectedCategories = route.params?.selectedCategories
                                navigation.navigate('New Budget', { selectedCategories })
                            }}
                        />
                    )
                })
                }
            />
            <Stack.Screen name='Select Labels' component={LabelScreen}
                options={{
                    headerRight: () => (
                        <Feather
                            name='search'
                            size={20}
                            color={'white'}
                            onPress={() => console.warn('Search Pressed')}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    )
}

export default BudgetScreen