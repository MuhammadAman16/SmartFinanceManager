import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import user_api from '@/app/api/user_api'
// import CashFlowChart from './AccountDashboard/CashFlow'

const Accounts = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      let res = await user_api.get('accounts');
      const dataArray = res.data;
      // console.log(res.data);
      const account = dataArray.map(item => ({
        id: item.id,
        name: item.name
      }));
      const accountLastId = account.length - 1;
      const filteredArray = account.filter((_, index) => index === accountLastId || index === accountLastId - 1);
      setAccounts(filteredArray);
      // console.warn("Accounts : ", accounts);
    } catch (error) {
      if (error.response) {
        console.log(`Error: ${error.response.data}`);
      } else if (error.request) {
        console.log('No response from server');
      } else {
        console.log('Error in Account: ', error.error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // console.log("Fetching Accounts");
    fetchAccounts();
  }, [])

  return (
    <View style={{flex: 1}}>
      {loading ? (<View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>) : (
        <View
          style={{
            backgroundColor: 'white',
            height: 'auto',
            paddingBottom: 20
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
              marginHorizontal: 20,
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              rowGap: 10
            }}
          >
            {accounts.map((account, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  width: '50%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: 'rgba(3,155,230,255)',
                  backgroundColor: 'rgba(3,155,230,255)',
                  borderRadius: 5,
                  paddingHorizontal: 15,
                  paddingVertical: 10
                }}
                onPress={() => navigation.navigate('AccountScreen')}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >{account.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 10
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
      )}
    </View>
  )
}

export default Accounts