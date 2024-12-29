import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './app/context/AuthContext';
import { BudgetProvider } from './app/context/BudgetContext';
import { ColorProvider } from './app/context/ColorContext';
import Welcome from './src/Screens/Welcome';
import Home from './src/Screens/Home';
import BudgetScreen from './src/Screens/Section-2-Screens/TheHomeSackNavigationScreens/BudgetScreen';
import AccountScreen from './src/Screens/Section-2-Screens/TheHomeSackNavigationScreens/AccountScreen';
import { ActivityIndicator, StatusBar, SafeAreaView, View } from 'react-native';
import ChatScreen from './src/Screens/Chatbot';
import RecordCreation from './src/components/Records/RecordCreation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, marginTop: -40 }}>
            <StatusBar barStyle='dark-content' translucent={true} />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    statusBarTranslucent: true,
                }}
            >
                {
                    user ?
                        (<Stack.Screen name={'Home'} component={Home} />) :
                        (<Stack.Screen name={'Wellcome'} component={Welcome} />)
                }
                <Stack.Screen name='BudgetScreen' component={BudgetScreen} />
                <Stack.Screen name='AccountScreen' component={AccountScreen} />
                <Stack.Screen name='RecordCreationScreen' component={RecordCreation} />
                <Stack.Screen name='ChatBotScreen' component={ChatScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default () => (
    <GestureHandlerRootView>
            <AuthProvider>
                <BudgetProvider>
                    <ColorProvider>
                        <App />
                    </ColorProvider>
                </BudgetProvider>
            </AuthProvider>
    </GestureHandlerRootView>
);
