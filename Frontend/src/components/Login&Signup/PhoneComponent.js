import { View, Text, TextInput } from 'react-native'
import React from 'react'

const PhoneComponent = ({
    phoneCode,
    phoneNumber,
    onChangeFunction,
    onBlurFunction,
    error
}) => {
    return (
        <View
            style={{
                display: 'flex',
                alignItems: 'start'
            }}
        >
            <Text
                style={{
                    marginBottom: 5,
                    marginTop: 13
                }}
            >
                Phone
            </Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <TextInput
                    value={phoneCode}
                    editable={false}
                />
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#1b1b33',
                        fontSize: 16,
                        paddingLeft: 10,
                        borderRadius: 8,
                        paddingVertical: 5,
                        width: '90%',
                        marginHorizontal: 6
                    }}
                    value={phoneNumber}
                    onChangeText={onChangeFunction}
                    onBlur={onBlurFunction}
                    keyboardType={'numeric'}
                />
            </View>
            {error && (
                <Text
                    style={{
                        color: 'red',
                        fontSize: 15,
                        flexWrap: 'wrap',
                        width: '90%',
                        marginLeft: 5
                    }}>
                    {error}
                </Text>)
            }
        </View>
    )
}

export default PhoneComponent