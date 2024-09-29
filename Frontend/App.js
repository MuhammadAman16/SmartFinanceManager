import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './app/context/AuthContext';
import Welcome from './src/Screens/Welcome';
import Home from './src/Screens/Home';
import { Text, StatusBar, SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Text>Loading....</Text>
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
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
