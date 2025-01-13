import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CashFlowChart from '../AccountsFolder/CashFlow';
import AccountView from '../AccountsFolder/AccountView';

const Stack = createNativeStackNavigator();

const AccountStackFile = ({ route }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white'
            }}
            initialRouteName={'Account View'}
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
                initialParams={{ accountId: route?.params?.accountId }}
            />
        </Stack.Navigator>
    )
}

export default AccountStackFile