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
            <Stack.Screen name='New Budget' component={BudgetCreation}/>
            <Stack.Screen name='Select Categories' component={CategoriesScreen}
                options={({ route, navigation }) => ({
                    title: route.params?.title || 'Select Categories',
                    headerRight: () => (
                        <Feather
                            name='check'
                            size={30}
                            color={'white'}
                            onPress={() => {
                                const selectedCategories = route.params?.selectedCategories || [];
                                route.params?.onCategoriesSelected(selectedCategories);
                                navigation.goBack();
                            }}
                        />
                    )
                })
                }
            />
            <Stack.Screen name='Select Labels' component={LabelScreen}
                options={({route, navigation}) => ({
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

export default BudgetScreen