import React from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar, FlatList, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

const DATA = [
    {
        dt_txt: "2022-08-30 16:00:00",
        main: {
            temp_min: 296.34,
            temp_max: 298.24
        },
        weather: [
            {
                main: 'Clear'
            }
        ]
    },
    {
        dt_txt: "2022-02-10 16:00:00",
        main: {
            temp_min: 276.34,
            temp_max: 288.24
        },
        weather: [
            {
                main: 'Clouds'
            }
        ]
    },
    {
        dt_txt: "2022-07-25 18:00:00",
        main: {
            temp_min: 266.34,
            temp_max: 288.24
        },
        weather: [
            {
                main: 'Clouds'
            }
        ]
    }
]

const Item = (props) => {
    const { dt_txt, min, max, condition } = props;
    return (
        <View style={styles.wrapper}>
            <Feather name="sun" size={50} color='white' />
            <Text style={styles.date}>{dt_txt}</Text>
            <Text style={styles.temp}>{min}</Text>
            <Text style={styles.temp}>{max}</Text>
        </View>
    );
}

const UpcomingWeather = () => {
    const renderItem = ({ item }) => (
        <Item condition={item.weather[0].main} dt_txt={item.dt_txt} min={item.main.temp_min} max={item.main.temp_max} />
    )
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Text>Upcoming Weather</Text>
            <FlatList 
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.dt_txt}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'red'
    },
    wrapper: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 5,
        backgroundColor: 'pink'
    },
    temp: {
        color: 'white',
        fontSize: 15
    },
    date: {
        color: 'white',
        fontSize: 10
    }
})

export default UpcomingWeather