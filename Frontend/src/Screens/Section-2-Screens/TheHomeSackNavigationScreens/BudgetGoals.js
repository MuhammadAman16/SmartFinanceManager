import { View, TouchableOpacity } from 'react-native'
import React from 'react';
import { Avatar, Card } from 'react-native-paper'
import { useNavigation } from 'expo-router';


const BudgetGoals = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 10}}>
      <TouchableOpacity style={{marginVertical: 20, height: '25%'}} onPress={() => navigation.navigate('BudgetScreen')}>
        <Card style={{flex: 1}}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', marginLeft: 20 }}
            subtitleStyle={{ marginLeft: 20 }}
            title="Budgets"
            subtitle="Budget Subtitle"
            left={(props) => <Avatar.Icon {...props} icon="currency-usd" style={{ backgroundColor: 'red' }} size={55} />}
          />
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={{height: '25%'}} onPress={() => console.warn("Goal Pressed")}>
        <Card style={{flex: 1}}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', marginLeft: 20 }}
            subtitleStyle={{ marginLeft: 20 }}
            title="Goals"
            subtitle="Goal Subtiles"
            left={(props) => <Avatar.Icon {...props} icon="flag-checkered" style={{ backgroundColor: '#23ded5' }} color='white' size={55} />}
          />
        </Card>
      </TouchableOpacity>
    </View>
  )
}

export default BudgetGoals