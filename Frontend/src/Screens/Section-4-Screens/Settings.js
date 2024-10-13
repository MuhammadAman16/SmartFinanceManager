import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Define your settings options with icon names and colors
const settingsOptions = [
  { title: "Profile", iconName: "person-outline", color: "#1DA1F2" },
  { title: "FAQ", iconName: "help-outline", color: "#1DA1F2" },
  { title: "Follow", iconName: "share", color: "#1DA1F2" },
  { title: "About", iconName: "info-outline", color: "#1DA1F2" },
  { title: "Help", iconName: "help-outline", color: "#1DA1F2" },
  { title: "Support", iconName: "support-agent", color: "#1DA1F2" }
];

const Settings = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: option.color }]}
            onPress={() => navigation.navigate('Setting Stack', {screen: option.title})}  // Handle navigation
          >
            <View style={styles.cardContent}>
              <Icon name={option.iconName} size={48} color="#fff" />
              <Text style={styles.text}>{option.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Adjust to fit 2 cards per row with a small gap
    borderRadius: 8,
    elevation: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardContent: {
    alignItems: "center",
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default Settings;
