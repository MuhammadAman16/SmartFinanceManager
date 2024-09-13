import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const Login = (props) => {
    return(
        <View style={stylles.container}>
            <Text style={stylles.text}>Login Screen</Text>
            <Button title="Go to Login Screen" onPress={() => props.navigation.navigate("Home", {name: "sidhu", age: 20})}/>
            {/* <Text style={stylles.text}>Name : {name}</Text>
            <Text style={stylles.text}>Age: {age}</Text> */}
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

export default Login