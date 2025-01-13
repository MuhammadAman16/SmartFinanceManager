import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectAccountScreen from './SelectAccountScreen';
import SelectCategoryScreen from './SelectCategoryScreen';
import LabelScreen from '@/src/Screens/Section-2-Screens/TheHomeSackNavigationScreens/LabelScreen';
import { Feather } from '@expo/vector-icons';
import EditRecord from './EditRecord';

const Stack = createNativeStackNavigator();

const EditRecordStackFile = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(56,142,60,255)',
                },
                headerTintColor: 'white',
            }}
            initialRouteName='Edit Record'
        >
            <Stack.Screen
                name='Edit Record'
                component={EditRecord}
                options={{
                    headerShown: true, // Hide the header for the Income Form screen
                }}
                initialParams={{ itemId: props?.route?.params?.itemId }}
            />
            <Stack.Screen
                name='Select Account'
                component={SelectAccountScreen}
            />
            <Stack.Screen
                name='Select Category'
                component={SelectCategoryScreen}
            />
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
    );
};

export default EditRecordStackFile;
