import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CashFlowChart from '../AccountsFolder/CashFlow';
import AccountView from '../AccountsFolder/AccountView';
import ViewMoreScreen from '../AccountsFolder/ViewMore';

const Stack = createNativeStackNavigator();

const AccountStackFile = ({route}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white'
            }}
            initialRouteName={route.params.viewMore === true ? 'View' : 'Account View'}
        >
            <Stack.Screen
                name='Cash Flow'
                component={CashFlowChart}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='Account View'
                component={AccountView}
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen
                name='View'
                component={ViewMoreScreen}
                options={{
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    )
}

export default AccountStackFile