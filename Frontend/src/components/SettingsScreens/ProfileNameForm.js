import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../Styling/Stlyes";
import { AuthContext } from "@/app/context/AuthContext";
import user_api from "@/app/api/user_api";

const ProfileNameForm = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userFullName, setUserFullName] = useState(null);

  useEffect(() => {
    setUserFullName(user.fullName);
  }, [])

  const handleNameChange = async () => {
    try {
      const result = await user_api.put(`user/updateFullName?userId=${user.id}`, {
        fullName: userFullName
      });
      setUser({...user, fullName: userFullName});
      Alert.alert(result.data.message)
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log('No response from server');
      } else {
        console.log('Error: ', error.error);
      }
    }
  };

  return (
    <View style={styles.ProfileScreenInfoContainer}>
      <Text style={styles.ProfileScreenlabel}>Name</Text>
      <TextInput
        style={styles.ProfileScreenInput}
        value={userFullName}
        onChangeText={(text) => setUserFullName(text)}
      />
      <TouchableOpacity style={styles.ProfileScreenButton} onPress={handleNameChange}>
        <Text style={styles.ProfileScreenButtonText}>Change Name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNameForm;
