import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

// Example user object
const user = {
  id: "user123", // This would be dynamically retrieved in a real application
};

const SupportPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!subject || !message) {
      Alert.alert("Error", "Please fill out both fields.");
      return;
    }

    // Create a support request object
    const supportRequest = {
      userId: user.id,
      subject: subject,
      message: message,
    };

    // Here you would typically send this data to your server
    console.log("Support Request Submitted:", supportRequest);

    // For demonstration, show an alert and reset the form
    Alert.alert(
      "Support Request Sent",
      "Thank you for reaching out! Our support team will get back to you soon."
    );
    setSubject("");
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Contact Support</Text>
      <Text style={styles.description}>
        If you have any questions or need assistance, please fill out the form
        below. For requests such as updating your email, provide the details in
        the message box.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        placeholderTextColor="#888"
      />

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={setMessage}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Request</Text>
      </TouchableOpacity>

      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>
          Alternatively, contact us directly:
        </Text>
        <Text style={styles.contactDetail}>Email: support@example.com</Text>
        <Text style={styles.contactDetail}>Phone: (123) 456-7890</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
    lineHeight: 24,
  },
  input: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  messageInput: {
    height: 120,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
    width: "100%", // Make button full width
    maxWidth: 400, // Restrict maximum width
    alignSelf: "center", // Center the button
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contactInfo: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  contactDetail: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
});

export default SupportPage;
