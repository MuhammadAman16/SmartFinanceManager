import { View, Text, TextInput, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AccountContext } from '@/app/context/AccountContext';
import axios from 'axios';
import FXRateModal from '@/src/components/CurrencyRates/FXRateModal';

const CurrencyRates = () => {
  const { activeAccount } = useContext(AccountContext);
  const [allExchangeRates, setAllExchangeRates] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fromCurrency, setFromCurrency] = useState(activeAccount.currency);
  const [ToCurrency, setToCurrency] = useState("USD");
  const [FXRate, setFXRate] = useState();
  const [keys, setKeys] = useState();
  const [showModal, setShowModal] = useState(false);

  const fetchAllExchangeRates = async () => {
    try {
      const result = await axios.get(
        `https://v6.exchangerate-api.com/v6/9123f09cb89fba29bea55f7f/latest/${activeAccount.currency}`
      );
      setAllExchangeRates(result.data.conversion_rates);
      setKeys(Object.keys(result.data.conversion_rates));
      // console.log(allExchangeRates.USD);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log('No response from server');
      } else {
        console.log('Error in Account: ', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllExchangeRates();
  }, [])

  useEffect(() => {
    if (allExchangeRates && ToCurrency) {
      const fxRate = allExchangeRates[ToCurrency];
      setFXRate(fxRate ? fxRate.toString() : '0');
    }
  }, [ToCurrency, allExchangeRates]);

  useEffect(() => {
    if (activeAccount.currency) {
      setFromCurrency(activeAccount.currency);
      fetchAllExchangeRates();
    }
  }, [activeAccount.currency]);


  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator
          size={'large'}
          color={'blue'}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10
      }}
    >
      <FXRateModal
        showModal={showModal}
        keys={keys}
        setToCurrency={setToCurrency}
        setShowModal={setShowModal}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          fontStyle: 'italic'
        }}
      >
        Currency Exchange Rates
      </Text>
      <Text
        style={{
          flexWrap: 'wrap',
          fontSize: 15,
          textAlign: 'center',
          fontStyle: 'italic',
          marginHorizontal: 10,
          marginVertical: 5
        }}
      >
        You want to know the Exchange Rates of your currency
      </Text>
      <TextInput
        style={{
          fontSize: 16,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          padding: 10,
          width: '70%',
          textAlign: 'center'
        }}
        value={fromCurrency}
        placeholder='PKR'
        editable={false}
      />
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          fontStyle: 'italic'
        }}
      >
        TO
      </Text>
      <TouchableWithoutFeedback
        onPress={() => setShowModal(true)}
      >
        <Text
          style={{
            fontSize: 16,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            padding: 10,
            width: '70%',
            textAlign: 'center'
          }}
        >
          {ToCurrency}
        </Text>
      </TouchableWithoutFeedback>
      <Text
        style={{
          fontSize: 15,
          marginTop: 20,
          fontStyle: 'italic'
        }}
      >
        FX Rate
      </Text>
      <TextInput
        style={{
          fontSize: 16,
          padding: 10,
          width: '70%',
          textAlign: 'center',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          color: 'black',
          fontStyle: 'italic'
        }}
        value={FXRate}
        editable={false}
        placeholder='0'
      />
    </View>
  )
}

export default CurrencyRates