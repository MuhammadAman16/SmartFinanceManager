import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Accounts from './Accounts';
import BudgetGoals from './BudgetGoals';

const Tab = createMaterialTopTabNavigator();

const HomeSecondScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'rgba(56,142,60,255)'
                },
                tabBarLabelStyle: {
                    color: 'white'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'white',
                    height: 3
                }
            }}
        >
            <Tab.Screen name='Accounts' component={Accounts} />
            <Tab.Screen name='Budget&Goals' component={BudgetGoals} />
        </Tab.Navigator>
    )
}

export default HomeSecondScreen