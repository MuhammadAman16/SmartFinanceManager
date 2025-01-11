import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SelectTimePeriod = ({
    setTimePeriod
}) => {
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
                onPress={() => setTimePeriod("7D")}
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
                onPress={() => setTimePeriod("30D")}
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
                onPress={() => setTimePeriod("12W")}
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5
                }}
            >
                <Text>12W</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTimePeriod("6M")}
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
                onPress={() => setTimePeriod("1Y")}
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