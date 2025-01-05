import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from "react-native";
import styles from "../Styling/Stlyes";
import { AuthContext } from "@/app/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import user_api from "@/app/api/user_api";

const ProfilePasswordForm = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (oldPassword === '') {
      setPasswordError('Old Password Field is required');
      return;
    }

    try {
      const result = await user_api.put(`user/updatePassword?userId=${user.id}`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword
        }
      );

      Alert.alert(result.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response) {
        Alert.alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log('No response from server');
      } else {
        console.log('Error: ', error.error);
      }
    }
    // console.log(`${newPassword} and ${oldPassword}`);
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.ProfileScreenResetPasswordContainer}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={{ flexGrow: 1 }}
      >
        <Text style={styles.ProfileScreenSubTitle}>Reset Password</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 5,
            padding: 10
          }}
        >
          <TextInput
            style={{
              width: '90%'
            }}
            placeholder="Old Password"
            secureTextEntry={showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowOldPassword(!showOldPassword)}
          >
            <Ionicons
              name={showOldPassword === true ? "eye" : "eye-off"}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 5,
            padding: 10
          }}
        >
          <TextInput
            style={{
              width: '90%'
            }}
            placeholder="New Password"
            secureTextEntry={showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons
              name={showNewPassword === true ? "eye" : "eye-off"}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 5,
            padding: 10
          }}
        >
          <TextInput
            style={{
              width: '90%'
            }}
            placeholder="Confirm New Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
          />
        </View>
        {passwordError ? <Text style={styles.ProfileScreenErrorText}>{passwordError}</Text> : null}
        <TouchableOpacity style={styles.ProfileScreenButton} onPress={handlePasswordReset}>
          <Text style={styles.ProfileScreenButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfilePasswordForm;
