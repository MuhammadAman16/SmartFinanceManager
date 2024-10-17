import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import user_api from '@/app/api/user_api'
import styles from '@/src/components/Styling/Stlyes'
import { Feather } from '@expo/vector-icons'
import LabelCreaionModal from '@/src/components/OnGoingBudget/LabelCreaionModal'
import { Checkbox } from 'react-native-paper'

const LabelScreen = ({navigation, route}) => {
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setModalOpen] = useState(false);
    const { selectedLabels } = route.params;

    const loadLabels = async () => {
        try {
            const res = await user_api.get('/api/label');
            const updatedLabel = res.data.labels.map((label) => ({
                ...label,
                checked: selectedLabels.includes(label.id)
            }))
            setLabels(updatedLabel);
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

    useEffect(() => {
        const checkedLabels = labels.filter(label => label.checked);
        const selectedLabels = checkedLabels.map((label) => ({
            id: label.id,
            name: label.name
        }));

        navigation.setParams({selectedLabels: selectedLabels})
    }, [labels])

    const addNewLabel = (newLabel) => {
        setLabels((prevLables) => [...prevLables, newLabel])
    }

    const toggleCheckbox = (index) => {
        const updatedLabel = labels.map((label, ind) => {
            if (ind === index){
                return {...label, checked: !label.checked}   
            }
            return label
        })
        setLabels(updatedLabel)
    }

    if (loading) {
        return (
            <View style={styles.activityIndicatorViewStyle}>
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
        );
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.LabelScreenScrollViewStyling}>
                {labels.map((label, index) => (
                    <View key={index} style={styles.LabelScreenMapViewStyling}>
                        <View style={styles.LabelScreenTTextColorView}>
                            <View style={[styles.LabelScreenColorViewSyling, { backgroundColor: label.color }]}></View>
                            <Text style={styles.LabelScreenLabelTextStyling}>{label.name}</Text>
                        </View>
                        <Checkbox.Item
                            status={label.checked ? "checked" : "unchecked"}
                            onPress={() => toggleCheckbox(index)}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.LabelScreenAddLabelButtonViewStyling}>
                <TouchableOpacity
                    onPress={() => setModalOpen(true)}
                    style={styles.LabelScreenAddLabelButtonStyling}
                >
                    <Feather
                        name='plus'
                        size={25}
                        style={styles.LabelScreenAddLablePlusIconStyling}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
            {isModalOpen
                &&
                <LabelCreaionModal
                    setModalOpen={setModalOpen}
                    addNewLabel={addNewLabel}
                />
            }
        </>
    )
}

export default LabelScreen