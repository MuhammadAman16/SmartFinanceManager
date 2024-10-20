import React, { useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../Styling/Stlyes";
import { AuthContext } from "@/app/context/AuthContext";

const ProfileNameForm = () => {
  const {user} = useContext(AuthContext);

  const handleNameChange = () => {
    console.log("Name changed to:", name);
  };

  return (
    <View style={styles.ProfileScreenInfoContainer}>
      <Text style={styles.ProfileScreenlabel}>Name</Text>
      <TextInput
        style={styles.ProfileScreenInput}
        value={user.fullName}
        onChangeText={(text) => {
          user.fullName = text;
        }}
        placeholder="Enter your name"
      />
      <TouchableOpacity style={styles.ProfileScreenButton} onPress={handleNameChange}>
        <Text style={styles.ProfileScreenButtonText}>Change Name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNameForm;
