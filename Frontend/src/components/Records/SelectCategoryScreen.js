import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import user_api from '@/app/api/user_api';
import { useNavigation } from '@react-navigation/native';

const SelectCategoryScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const result = await user_api.get('category');
      setCategories(result.data.data);
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error : ${error.response.data.error}`)
      } else if (error.request) {
        console.log("No response from server");
      } else {
        console.log("Error : ", error.error);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }

  return (
    <ScrollView>

      <View>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 10,
              marginVertical: 5,
              marginHorizontal: 10,
              paddingVertical: 15,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            onPress={() => {
              const { id, name } = category;
              navigation.navigate('Income Form', { selectedCategory: { id, name } });
            }}
          >
            <View
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderRadius: 50,
                marginRight: 10
              }}
            >
              <Image
                source={{ uri: category.icon }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                }}
              />
            </View>
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default SelectCategoryScreen