import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import user_api from '@/app/api/user_api'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/app/context/AuthContext';

const SelectAccountScreen = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [accounts, setaccounts] = useState(null);
    const fetchAllAccounts = async () => {
        try {
            const result = await user_api.get('accounts');
            setaccounts(result.data);
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error : ${error.response.data.error}`)
            } else if (error.request) {
                console.log("No response from server");
            } else {
                console.log("Error : ", error.error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllAccounts();
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View>
                {accounts.map((account, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            paddingHorizontal: 10,
                            marginVertical: 5,
                            marginHorizontal: 10,
                            paddingVertical: 15,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            const { id, name } = account;
                            navigation.navigate('Income Form', { selectedAccount: { id, name } });
                        }}
                    >
                        <FontAwesome5
                            name="coins"
                            size={24}
                            color={'green'}
                        />
                        <Text
                            style={{
                                marginLeft: 10
                            }}
                        >{account.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

export default SelectAccountScreen