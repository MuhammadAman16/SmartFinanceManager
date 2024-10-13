import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '@/src/components/SettingsScreens/CustomHeader';
import { helpSections } from '@/src/components/Data/SettingScreens/HelpData';
import styles from '@/src/components/Styling/Stlyes';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  CustomHeader('Settings');

  return (
    <ScrollView contentContainerStyle={styles.HelpScreenContainer}>
      <View style={styles.HelpScreenSearchContainer}>
        <Icon name="search" size={24} color="#999" style={styles.HelpScreenSearchIcon} />
        <TextInput
          style={styles.HelpScreenSearchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Text style={styles.HelpScreenTitle}>Help & Documentation</Text>
      {filteredSections.length > 0 ? (
        filteredSections.map((section, index) => (
          <View key={index} style={styles.HelpScreenSection}>
            <Text style={styles.HelpScreenSectionTitle}>{section.title}</Text>
            <Text style={styles.HelpScreenSectionContent}>{section.content}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.HelpScreenNoResult}>No results found</Text>
      )}
    </ScrollView>
  );
};

export default Help;