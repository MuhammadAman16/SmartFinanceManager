import { View, Text, ActivityIndicator, Image, Button, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import user_api from '@/app/api/user_api'
import styles from '@/src/components/Styling/Stlyes'
import { Checkbox } from 'react-native-paper'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const AccountsArray = [
  { label: 'Cash', type: 'Cash', value: 'Cash', checked: false },
  { label: 'Account', type: 'Account', value: 'Account', checked: false },
  { label: 'Test', type: 'Test', value: 'Test', checked: false },
]

const CategoriesScreen = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allChecked, setAllChecked] = useState(true); // State for "All" checkbox
  const [accounts, setAccounts] = useState([]);
  const { fieldName } = route.params;

  const loadCategories = async () => {
    try {
      let res = await user_api.get('/api/category');
      const updatedCategoriesList = res.data.data.map((category) => ({
        ...category,
        checked: false
      }));
      setCategories(updatedCategoriesList);
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
  };

  useEffect(() => {
    if (fieldName === 'Category') {
      loadCategories();
    }
    else {
      setLoading(false);
    }
  }, []);

  const toggleCategories = (index) => {
    if (fieldName === 'Category') {
      const updatedCategories = categories.map((category, catIndex) => {
        if (catIndex === index) {
          return { ...category, checked: !category.checked };
        }
        return category;
      });
      setCategories(updatedCategories);
    }
    else {
      const updatedAccounts = AccountsArray.map((account, accIndex) => {
        if (accIndex === index) {
          return { ...account, checked: !account.checked };
        }
        return account;
      });
      setAccounts(updatedAccounts);
    }
  };

  const toggleAllCategories = () => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      checked: !allChecked // Toggle the checked state
    }));
    setCategories(updatedCategories);
    setAllChecked(!allChecked); // Update the "All" checkbox state
  };

  useEffect(() => {
    const checkedCategories = categories.filter(category => category.checked);
    const selectedCategoryIds = checkedCategories.map(category => category.id);

    // Update the navigation params with selected categories
    navigation.setParams({ selectedCategories: selectedCategoryIds });
  }, [categories]);

  if (loading) {
    return (
      <View style={styles.activityIndicatorViewStyle}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 5, alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#8fbc8f', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5 name={'dice-four'} size={20} color={'white'} />
          </View>
          <Text style={{ marginLeft: 20 }}>All</Text>
        </View>
        <Checkbox.Item
          status={allChecked ? "checked" : "unchecked"}
          onPress={toggleAllCategories} // Toggle all categories
        />
      </View>
      <View>
        <Text style={{ backgroundColor: '#dcdcdc', paddingHorizontal: 20 }}>Select {fieldName === 'Category' ? 'Categories' : 'Accounts'}</Text>
        {fieldName === 'Category' ? (categories.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 5, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{ width: 35, height: 35, borderRadius: 50 }}
                  source={{ uri: item.icon }}
                />
              </View>
              <Text style={{ marginLeft: 20 }}>{item.name}</Text>
            </View>
            <Checkbox.Item
              status={item.checked ? "checked" : "unchecked"}
              onPress={() => toggleCategories(index)}
            />
          </View>
        ))) :
          (AccountsArray.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 5, alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialCommunityIcons name={'cash'} size={30} color={'white'} />
                </View>
                <Text style={{ marginLeft: 20 }}>{item.value}</Text>
              </View>
              <Checkbox.Item
                status={item.checked ? "checked" : "unchecked"}
                onPress={() => toggleCategories(index)}
              />
            </View>
          )))
        }
      </View>
    </ScrollView>
  );
};

export default CategoriesScreen;
