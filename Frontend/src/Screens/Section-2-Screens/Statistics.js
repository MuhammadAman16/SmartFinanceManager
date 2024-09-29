import React from 'react'
import Balance from './StatisticsNavigationScreens/Balance';
import Outlook from './StatisticsNavigationScreens/Outlook';
import CashFlow from './StatisticsNavigationScreens/CashFlow';
import Spending from './StatisticsNavigationScreens/Spending';
import Credit from './StatisticsNavigationScreens/Credit';
import Reports from './StatisticsNavigationScreens/Reports';
import Assets from './StatisticsNavigationScreens/Assets';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

const Statistics = () => {
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
        },
        tabBarScrollEnabled: true
      }}
    >
      <Tab.Screen name='Balance' component={Balance} />
      <Tab.Screen name='Outlook' component={Outlook} />
      <Tab.Screen name='Cash-Flow' component={CashFlow} />
      <Tab.Screen name='Spending' component={Spending} />
      <Tab.Screen name='Credit' component={Credit} />
      <Tab.Screen name='Reports' component={Reports} />
      <Tab.Screen name='Assets' component={Assets} />
    </Tab.Navigator>
  )
}

export default Statistics