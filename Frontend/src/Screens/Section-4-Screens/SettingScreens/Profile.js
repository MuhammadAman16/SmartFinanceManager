import React from "react";
import { ScrollView, View, Text } from "react-native";
import ProfileInfo from "@/src/components/SettingsScreens/ProfileInfoForm";
import ProfileNameForm from "@/src/components/SettingsScreens/ProfileNameForm";
import ProfilePasswordForm from "@/src/components/SettingsScreens/ProfilePasswordForm";
import styles from "@/src/components/Styling/Stlyes";
import CustomHeader from "@/src/components/SettingsScreens/CustomHeader";

const Profile = () => {
  CustomHeader('Settings');

  return (
    <ScrollView contentContainerStyle={styles.ProfileScreencontainer}>
      <View style={styles.profileContainer}>
        <Text style={styles.ProfileScreenTitle}>Profile</Text>
        <ProfileNameForm />
        <ProfileInfo />
        <ProfilePasswordForm />
      </View>
    </ScrollView>
  );
};

export default Profile;
