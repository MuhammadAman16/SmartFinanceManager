import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Faq from './SettingScreens/Faq';
import About from './SettingScreens/About';
import SupportPage from './SettingScreens/Support';
import Profile from './SettingScreens/Profile';
import Follow from './SettingScreens/Follow';
import Help from './SettingScreens/Help';

const Stack = createNativeStackNavigator();

const SettingScreenStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white'
            }}>
            <Stack.Screen name='FAQ' component={Faq} />
            <Stack.Screen name='About' component={About}/>
            <Stack.Screen name='Support' component={SupportPage}/>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='Follow' component={Follow}/>
            <Stack.Screen name='Help' component={Help}/>
        </Stack.Navigator>
    )
}

export default SettingScreenStack