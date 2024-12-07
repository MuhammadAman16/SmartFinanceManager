// AccountScreen.js
import React, { useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountType from './AccountType';
import AccountForm from './AccountForm';
import { Feather } from '@expo/vector-icons';
import HomeSecondScreen from './HomeSecondScreen';

const Stack = createNativeStackNavigator();

const AccountScreen = () => {
    const handleSubmitRef = useRef(null);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white'
            }}
        >
            <Stack.Screen
                name='Account Type'
                component={AccountType}
                options={{
                    title: 'Choose an account type'
                }}
            />
            <Stack.Screen
                name='Account Form'
                options={{
                    title: 'New account',
                    headerRight: () => (
                        <Feather
                            name='check'
                            size={30}
                            color={'white'}
                            onPress={() => {
                                if (handleSubmitRef.current) {
                                    handleSubmitRef.current();
                                }
                            }}
                        />
                    )
                }}
            >
                {({ navigation }) => <AccountForm handleSubmitRef={handleSubmitRef} navigation={navigation}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AccountScreen;
