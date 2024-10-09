import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Follow = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Follow Us</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity 
          style={[styles.link, styles.instagram]} 
          onPress={() => openLink('https://www.instagram.com/yourusername')}
        >
          <Icon name="camera-alt" size={36} color="#fff" />
          <Text style={styles.linkText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.link, styles.linkedin]} 
          onPress={() => openLink('https://www.linkedin.com/in/yourusername')}
        >
          <Icon name="business-center" size={36} color="#fff" />
          <Text style={styles.linkText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.link, styles.twitter]} 
          onPress={() => openLink('https://twitter.com/yourusername')}
        >
          <Icon name="twitter" size={36} color="#fff" />
          <Text style={styles.linkText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.link, styles.facebook]} 
          onPress={() => openLink('https://www.facebook.com/yourusername')}
        >
          <Icon name="facebook" size={36} color="#fff" />
          <Text style={styles.linkText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  linksContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 4,
  },
  linkText: {
    fontSize: 20,
    marginLeft: 12,
    color: '#fff',
    fontWeight: '500',
  },
  instagram: {
    backgroundColor: '#C13584',
  },
  linkedin: {
    backgroundColor: '#0077B5',
  },
  twitter: {
    backgroundColor: '#1DA1F2',
  },
  facebook: {
    backgroundColor: '#4267B2',
  },
});

export default Follow;
