import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../Styling/Stlyes";

const ProfilePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }
    if (oldPassword !== 'password123') {
      setPasswordError('Old password is incorrect');
      return;
    }
    setPasswordError('');
    console.log("Password reset successfully");
  };

  return (
    <View style={styles.ProfileScreenResetPasswordContainer}>
      <Text style={styles.ProfileScreenSubTitle}>Reset Password</Text>
      <TextInput
        style={styles.ProfileScreenInput}
        placeholder="Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.ProfileScreenInput}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.ProfileScreenInput}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {passwordError ? <Text style={styles.ProfileScreenErrorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.ProfileScreenButton} onPress={handlePasswordReset}>
        <Text style={styles.ProfileScreenButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePasswordForm;
