import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SelectTimePeriod = () => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 10
            }}
        >
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}
            >
                <Text>7D</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}
            >
                <Text>30D</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}
            >
                <Text>12D</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}
            >
                <Text>6M</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}
            >
                <Text>1Y</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectTimePeriod