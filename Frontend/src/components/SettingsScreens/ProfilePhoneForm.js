import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '@/app/context/AuthContext'
import user_api from '@/app/api/user_api'

const ProfilePhoneForm = () => {
    const { user } = useContext(AuthContext);
    const [phone, setPhone] = useState('');

    // Function to validate phone number
    const validatePhone = (phoneNumber) => {
        const regex = /^[0-9]{10}$/; // Regex for 10 digits
        return regex.test(phoneNumber); // Returns true if valid
    }

    const UpdatePhone = async () => {
        try {
            if (!phone) {
                Alert.alert("Error", "Phone number cannot be empty.");
                return;
            }

            if (!validatePhone(phone)) {
                Alert.alert("Error", "Phone number should consist of 10 digits only.");
                return;
            }

            // console.log('+92' + phone);
            const result = await user_api.put(`user/updatePhoneNumber?userId=${user.id}`, {
                phoneNumber: '+92' + phone
            });
            Alert.alert(result.data.message);
            setPhone('');
            // Proceed with your API call or other logic here
            // e.g., await user_api.put(`/updatePhone/${user.id}`, { phone });

        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error: ', error.error);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <ScrollView style={{ flexGrow: 1 }}>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'center',
                        marginTop: 15
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: 8,
                        }}
                    >Phone</Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                display: 'flex',
                                fontSize: 14,
                                marginRight: 5
                            }}
                        >+92</Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: '#ddd',
                                marginTop: 5,
                                padding: 10,
                                borderRadius: 8,
                                width: '90%'
                            }}
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            keyboardType='numeric'
                            maxLength={10} // Limit to 10 digits
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgba(34,68,35,255)',
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            marginBottom: 12,
                            alignSelf: 'center',
                            marginTop: 5
                        }}
                        onPress={UpdatePhone}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                            }}
                        >Change Phone</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ProfilePhoneForm
