import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SelectTimePeriod = ({
    setTimePeriod,
    timePeriod
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
                    paddingVertical: 5,
                    backgroundColor: timePeriod === "7D" ? 'green' : 'white'
                }}
            >
                <Text style={{color: timePeriod === "7D" ? 'white' : 'green'}}>
                    7D
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTimePeriod("30D")}
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: timePeriod === "30D" ? 'green' : 'white'
                }}
            >
                <Text style={{color: timePeriod === "30D" ? 'white' : 'green'}}>
                    30D
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTimePeriod("12W")}
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: timePeriod === "12W" ? 'green' : 'white'
                }}
            >
                <Text style={{color: timePeriod === "12W" ? 'white' : 'green'}}>
                    12W
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTimePeriod("6M")}
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: timePeriod === "6M" ? 'green' : 'white'
                }}
            >
                <Text style={{color: timePeriod === "6M" ? 'white' : 'green'}}>
                    6M
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTimePeriod("1Y")}
                style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: timePeriod === "1Y" ? 'green' : 'white'
                }}
            >
                <Text style={{color: timePeriod === "1Y" ? 'white' : 'green'}}>
                    1Y
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectTimePeriod