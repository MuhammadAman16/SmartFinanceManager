import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Imports for Section 1 Screens
import BankSync from '@/src/Screens/Section-1-Screens/BankSync';
import Imports from '@/src/Screens/Section-1-Screens/Imports';
// Imports for Section 2 Screens
import Records from '@/src/Screens/Section-2-Screens/Records';
import HomeSecondScreen from '@/src/Screens/Section-2-Screens/TheHomeSackNavigationScreens/HomeSecondScreen';
import Investments from '@/src/Screens/Section-2-Screens/Investments';
import PlannedPayments from '@/src/Screens/Section-2-Screens/PlannedPayments';
// Importts for Statisics Screens
import Statistics from '@/src/Screens/Section-2-Screens/Statistics';
import Balance from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/Balance';
import Outlook from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/Outlook';
import CashFlow from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/CashFlow';
import Spending from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/Spending';
import Credit from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/Credit';
import Reports from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/Reports';
import Assets from '@/src/Screens/Section-2-Screens/StatisticsNavigationScreens/Assets';
// Imports for Section 3 Screens
import Budgets from '@/src/Screens/Section-3-Screens/Budgets';
import Debts from '@/src/Screens/Section-3-Screens/Debts';
import Goals from '@/src/Screens/Section-3-Screens/Goals';
import Warranties from '@/src/Screens/Section-3-Screens/Warranties';
import ShoppingLists from '@/src/Screens/Section-3-Screens/ShoppingLists';
import LoyaltyCards from '@/src/Screens/Section-3-Screens/LoyaltyCards';
import CurrencyRates from '@/src/Screens/Section-3-Screens/CurrencyRates';
import GroupSharing from '@/src/Screens/Section-3-Screens/GroupSharing';
import Exports from '@/src/Screens/Section-3-Screens/Exports';
// Impor for Section 4 Screens
import Settings from '@/src/Screens/Section-4-Screens/Settings';

import { FontAwesome } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent';


const DrawerComponent = createDrawerNavigator();

const Drawer = () => {
    return (
            <DrawerComponent.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName='Home Screen'
                screenOptions={{
                    headerStatusBarHeight: 35,
                    headerStyle: {
                        backgroundColor: 'rgba(56,142,60,255)'
                    },
                    drawerActiveTintColor: 'white',
                    drawerActiveBackgroundColor: 'black',
                    drawerInactiveTintColor: 'black',
                    drawerInactiveBackgroundColor: 'transparent',
                    headerTintColor: 'white',
                    headerRight: () => <FontAwesome style={{ marginHorizontal: 10 }} name='bell' size={20} color={'white'} onPress={() => console.warn('Pressed')} />
                }}
            >
                {/* Components for Secion 1 Screens */}
                <DrawerComponent.Screen name='Bank Sync' component={BankSync} />
                <DrawerComponent.Screen name='Imports' component={Imports} />

                {/* Components for Section 2 Screens */}
                <DrawerComponent.Screen name='Home Screen' component={HomeSecondScreen} />
                <DrawerComponent.Screen name='Records' component={Records} />
                <DrawerComponent.Screen name='Investments' component={Investments} />
                <DrawerComponent.Screen name='Planned Payments' component={PlannedPayments} />

                {/* Components for Staistics Screens */}
                <DrawerComponent.Screen name='Statistics' component={Statistics}/>
                <DrawerComponent.Screen name='Balance' component={Balance} />
                <DrawerComponent.Screen name='Outlook' component={Outlook} />
                <DrawerComponent.Screen name='Cash-Flow' component={CashFlow} />
                <DrawerComponent.Screen name='Spending' component={Spending} />
                <DrawerComponent.Screen name='Credit' component={Credit} />
                <DrawerComponent.Screen name='Reports' component={Reports} />
                <DrawerComponent.Screen name='Assets' component={Assets} />

                {/* Components for Section 3 Screens */}
                <DrawerComponent.Screen name='Budgets' component={Budgets} />
                <DrawerComponent.Screen name='Debts' component={Debts} />
                <DrawerComponent.Screen name='Goals' component={Goals} />
                <DrawerComponent.Screen name='Shopping Lists' component={ShoppingLists} />
                <DrawerComponent.Screen name='Warranties' component={Warranties} />
                <DrawerComponent.Screen name='Loyalty Cards' component={LoyaltyCards} />
                <DrawerComponent.Screen name='Currency Rates' component={CurrencyRates} />
                <DrawerComponent.Screen name='Group Sharing' component={GroupSharing} />
                <DrawerComponent.Screen name='Exports' component={Exports} />

                {/* Components for Section 4 Screens */}
                <DrawerComponent.Screen name='Settings' component={Settings} />
            </DrawerComponent.Navigator>
    )
}

export default Drawer