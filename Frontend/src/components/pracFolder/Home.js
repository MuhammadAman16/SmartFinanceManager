import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

const Home = (props) => {
    const {name, age} = props.route.params;
    return(
        <View style={stylles.container}>
            <Text style={stylles.text}>Home Screen</Text>
            <Text style={stylles.text}>Name = {name}</Text>
            <Text style={stylles.text}>Age = {age}</Text>
        </View>
    );
}

const stylles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30
    }
})

export default Home