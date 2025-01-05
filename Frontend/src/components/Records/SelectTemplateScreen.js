import { View, TouchableOpacity, ScrollView, ActivityIndicator, Text, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { Feather } from '@expo/vector-icons'
import user_api from '@/app/api/user_api'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '@/app/context/AuthContext'
import { Entypo } from '@expo/vector-icons'
import { useCallback } from 'react'

const SelectTemplateScreen = ({ income }) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [recordsWithTemplate, setRecordsWithTemplate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllRecordsWithTemplate = async () => {
        try {
            const recordType = income ? 'INCOME' : 'EXPENSE'
            const result = await user_api.get(`record?isTemplate=Yes&userId=${user.id}&type=${recordType}`);
            setRecordsWithTemplate(result.data);
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error: ', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true); // Show the loading indicator during fetch
            fetchAllRecordsWithTemplate();
        }, [])
    );

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
        );
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    backgroundColor: '#dcdcdc'
                }}
            >
                {recordsWithTemplate.length > 0 ? (
                    recordsWithTemplate.map((template, index) => (
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
                                const { name,
                                    Account: { id: accountId, name: accountName, currency: accountCurrency },
                                    Category: { id: categoryId, name: categoryName },
                                    Labels,
                                    note,
                                    payee,
                                    type,
                                    amount,
                                    paymentType
                                } = template;

                                const selectedAccount = {
                                    id: accountId,
                                    name: accountName,
                                    currency: accountCurrency
                                };

                                const selectedCategory = {
                                    id: categoryId,
                                    name: categoryName
                                }

                                income ?
                                    navigation.navigate('Income Form', {
                                        selectedTemplate: {
                                            name,
                                            selectedAccount,
                                            selectedCategory,
                                            note,
                                            payee,
                                            Labels,
                                            type,
                                            amount,
                                            paymentType
                                        }
                                    })
                                    :
                                    navigation.navigate('Expense Form', {
                                        selectedTemplate: {
                                            name,
                                            selectedAccount,
                                            selectedCategory,
                                            note,
                                            payee,
                                            Labels,
                                            type,
                                            amount,
                                            paymentType
                                        }
                                    })
                            }}
                        >
                            <Entypo
                                name="documents"
                                size={24}
                                color={'green'}
                                style={{
                                    marginRight: 10
                                }}
                            />
                            <Text>{template.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17
                            }}
                        >
                            No Template has been Created Yet!
                        </Text>
                    </View>
                )}
            </ScrollView>
            <View
                style={{
                    backgroundColor: '#dcdcdc',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Create Template')}
                    style={{
                        margin: 20,
                        backgroundColor: 'rgba(34,68,35,255)',
                        borderRadius: 50,
                        boxShadow: 'black',
                        elevation: 5
                    }}
                >
                    <Feather
                        name="plus"
                        size={25}
                        style={{
                            margin: 15
                        }}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default SelectTemplateScreen;
