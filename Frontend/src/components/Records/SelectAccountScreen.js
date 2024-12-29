import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import user_api from '@/app/api/user_api'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/app/context/AuthContext';

const SelectAccountScreen = ( income ) => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [accounts, setaccounts] = useState(null);
    const fetchAllAccounts = async () => {
        try {
            const result = await user_api.get(`accounts?userId=${user.id}`);
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
        // console.log("income is ", income.route.params.income);
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
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontStyle: 'italic'
                    }}
                >Select Account</Text>
            </View>
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
                            const { id, name, currency } = account;
                            {
                                income.route.params.income === true ?
                                navigation.navigate('Income Form', { selectedAccount: { id, name, currency } })
                                : navigation.navigate('Expense Form', { selectedAccount: { id, name, currency } })
                            }
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