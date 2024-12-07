import React, {useContext} from "react";
import { View, Text } from "react-native";
import styles from "../Styling/Stlyes";
import { AuthContext } from "@/app/context/AuthContext";

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.ProfileScreenInfoContainer}>
      <Text style={styles.ProfileScreenlabel}>Email</Text>
      <Text style={styles.ProfileScreenInfo}>{user.email}</Text>
      <Text style={styles.ProfileScreenEmailNote}>To change your email, please contact support.</Text>
    </View>
  );
};

export default ProfileInfo;
