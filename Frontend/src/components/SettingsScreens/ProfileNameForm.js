import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../Styling/Stlyes";

const ProfileNameForm = () => {
  const [name, setName] = useState('John Doe');

  const handleNameChange = () => {
    console.log("Name changed to:", name);
  };

  return (
    <View style={styles.ProfileScreenInfoContainer}>
      <Text style={styles.ProfileScreenlabel}>Name</Text>
      <TextInput
        style={styles.ProfileScreenInput}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <TouchableOpacity style={styles.ProfileScreenButton} onPress={handleNameChange}>
        <Text style={styles.ProfileScreenButtonText}>Change Name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNameForm;
