import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const helpSections = [
  {
    title: "Getting Started",
    content: "Learn how to set up and start using the app. This section covers installation, account creation, and initial setup.",
  },
  {
    title: "Troubleshooting",
    content: "Find solutions to common issues you might encounter while using the app. This section includes steps to resolve common errors and problems.",
  },
  {
    title: "Account Management",
    content: "Understand how to manage your account settings, update personal information, and configure app preferences.",
  },
  {
    title: "Budgeting Tips",
    content: "Get tips on effective budgeting and how to make the most out of the app's budgeting features to manage your finances better.",
  },
  {
    title: "Using the Chatbot",
    content: "Learn how to interact with the chatbot for financial advice and information. This section provides tips on how to ask questions and get useful responses.",
  },
  {
    title: "Contact Support",
    content: "Find out how to get in touch with our support team if you need additional help or have questions that are not covered in this guide.",
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Text style={styles.title}>Help & Documentation</Text>
      {filteredSections.length > 0 ? (
        filteredSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default Help;
