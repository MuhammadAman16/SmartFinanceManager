import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import user_api from '@/app/api/user_api'
import { AuthContext } from '@/app/context/AuthContext'
import CashFlowChart from '../AccountsFolder/CashFlow'
import { AccountContext } from '@/app/context/AccountContext'

const Accounts = () => {
  const { user } = useContext(AuthContext);
  const { activeAccount, setActiveAccount } = useContext(AccountContext);
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  // const backgroundColorOfAccount = activeAccount ? 'rgba(3,155,230,255)' : 'none';
  // const textColor = activeAccount ? 'white' : 'rgba(3,155,230,255)';

  const fetchAccounts = async () => {
    try {
      let res = await user_api.get(`accounts?userId=${user.id}`);
      const dataArray = res.data;
      // console.log(res.data);
      const allAccounts = dataArray.map(item => ({
        id: item.id,
        name: item.name,
        currency: item.currency
      }));
      // const accountLastId = account.length - 1;
      // const filteredArray = account.filter((_, index) => index === accountLastId || index === accountLastId - 1);
      setAccounts(allAccounts);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
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
    fetchAccounts();
  }, [])

  useEffect(() => {
    console.log(activeAccount);
  }, [activeAccount])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
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
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 10,
            }}
          >
            {[...accounts, { name: 'ADD ACCOUNT', isAddAccount: true }].map(
              (account, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderWidth: 2,
                    borderColor: 'rgba(3,155,230,255)',
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    width: '48%',
                    marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: account.isAddAccount ? 'space-between' : 'center',
                    alignItems: 'center',
                    backgroundColor:
                      activeAccount && activeAccount.name === account.name
                        ? 'rgba(3,155,230,255)' // Background color for active account
                        : 'white', // No background for other accounts
                  }}
                  onPress={() =>
                    account.isAddAccount
                      ? navigation.navigate('AccountScreen')
                      : setActiveAccount(account)
                  }
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color:
                        activeAccount && activeAccount.name === account.name
                          ? 'white' // Text color for active account
                          : 'rgba(3,155,230,255)', // Text color for others
                    }}
                  >
                    {account.name}
                  </Text>
                  {account.isAddAccount && (
                    <AntDesign
                      name="pluscircle"
                      size={17}
                      color={'rgba(3,155,230,255)'}
                    />
                  )}
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </View>
      <CashFlowChart />
    </ScrollView>
  )
}

export default Accounts