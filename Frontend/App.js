import React from 'react'
import Welcome from './src/Pages/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Pages/Home';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <Stack.Navigator
            initialRouteName='Wellcome'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={'Wellcome'} component={Welcome} />
            <Stack.Screen name={'Home'} component={Home} />
        </Stack.Navigator>
    );
}

export default App
