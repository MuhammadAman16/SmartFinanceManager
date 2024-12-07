import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

const Accounts = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          height: '50%'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >List of accounts</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: 'rgb(229,228,226)'
            }}
          >
            <Ionicons
              name='settings-sharp'
              size={22}
              color={'rgba(3,155,230,255)'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 20
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '50%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: 'rgba(3,155,230,255)',
              borderRadius: 5,
              paddingHorizontal: 15,
              paddingVertical: 10
            }}
            onPress={() => navigation.navigate('AccountScreen')}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: 'rgba(3,155,230,255)'
              }}
            >ADD ACCOUNT</Text>
            <AntDesign
              name='pluscircle'
              size={17}
              color={'rgba(3,155,230,255)'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Accounts