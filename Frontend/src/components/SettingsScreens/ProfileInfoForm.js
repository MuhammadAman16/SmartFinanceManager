import React from "react";
import { View, Text } from "react-native";
import styles from "../Styling/Stlyes";

const ProfileInfo = () => {
  const email = 'johndoe@example.com';

  return (
    <View style={styles.ProfileScreenInfoContainer}>
      <Text style={styles.ProfileScreenlabel}>Email</Text>
      <Text style={styles.ProfileScreenInfo}>{email}</Text>
      <Text style={styles.ProfileScreenEmailNote}>To change your email, please contact support.</Text>
    </View>
  );
};

export default ProfileInfo;
