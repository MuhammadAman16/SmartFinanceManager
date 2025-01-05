import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SelectTemplateScreen from './SelectTemplateScreen';
import TemplateCreationScreen from './TemplateCreationScreen';
import LabelScreen from '@/src/Screens/Section-2-Screens/TheHomeSackNavigationScreens/LabelScreen';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const TemplateStackFile = ({ route }) => {
    useEffect(() => {
        console.log(route?.params);
    }, [])
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white',
                headerShown: true
            }}
            initialRouteName='Select Template'
        >
            <Stack.Screen name='Select Template' component={() => <SelectTemplateScreen income={route.params.income}/>} />
            <Stack.Screen name='Create Template' component={TemplateCreationScreen} />
            <Stack.Screen
                name='Select Labels'
                component={LabelScreen}
                options={({ route, navigation }) => ({
                    headerRight: () => (
                        <Feather
                            name='check'
                            size={30}
                            color={'white'}
                            onPress={() => {
                                const selectedLabels = route.params?.selectedLabels || [];
                                route.params?.onLabelsSelected(selectedLabels);
                                navigation.goBack();
                            }}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    )
}

export default TemplateStackFile