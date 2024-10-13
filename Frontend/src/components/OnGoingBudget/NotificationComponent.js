import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { Switch } from 'react-native-paper';

const NotificationComponent = () => {
    const [isBudgetOverspent, setIsBudgetOverspent] = useState(true);
    const [isRiskOverspending, setIsRiskOverspending] = useState(true);
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={{marginVertical: 20, fontWeight: 'bold', fontSize: 15}}>NOIFICATIONS</Text>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                <View>
                    <Text>Budget Overspent</Text>
                    <Text style={{marginTop: 5, fontSize: 10}}>Noify when amount has exceeded he budget</Text>
                </View>
                <Switch value={isBudgetOverspent} onValueChange={() => setIsBudgetOverspent(!isBudgetOverspent)} color='blue'/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginVertical: 10 }}>
                <View>
                    <Text>Risk of overspending</Text>
                    <Text style={{marginTop: 5, fontSize: 10}}>Noify when budget is trending o be overspent</Text>
                </View>
                <Switch value={isRiskOverspending} onValueChange={() => setIsRiskOverspending(!isRiskOverspending)} color='blue'/>
            </View>
        </View>
    )
}

export default NotificationComponent