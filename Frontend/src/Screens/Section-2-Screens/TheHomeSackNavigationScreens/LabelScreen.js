import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import user_api from '@/app/api/user_api'
import styles from '@/src/components/Styling/Stlyes'
import { Feather } from '@expo/vector-icons'
import LabelCreaionModal from '@/src/components/OnGoingBudget/LabelCreaionModal'

const LabelScreen = () => {
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setModalOpen] = useState(false);

    const loadLabels = async () => {
        try {
            const res = await user_api.get('/api/label');
            setLabels(res.data.labels);
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error: ', error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLabels();
    }, [])

    if (loading) {
        return (
            <View style={styles.activityIndicatorViewStyle}>
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
        );
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#dcdcdc' }}>
                {labels.map((label, index) => (
                    <TouchableOpacity key={index}>
                        <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: 'white' }}>
                            <View style={{ width: 30, height: 30, backgroundColor: label.color, marginHorizontal: 20, borderRadius: 10 }}></View>
                            <Text style={{ fontSize: 16 }}>{label.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView contentContainerStyle={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1, backgroundColor: '#dcdcdc' }}>
                <TouchableOpacity
                    onPress={() => setModalOpen(true)}
                >
                    <View style={{
                        margin: 20, backgroundColor: 'rgba(34,68,35,255)', borderRadius: 50, boxShadow: 'black', elevation: 5
                    }}>
                        <Feather
                            name='plus'
                            size={25}
                            style={{ margin: 15 }}
                            color={'white'}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>
            {isModalOpen && <LabelCreaionModal />}
        </>
    )
}

export default LabelScreen