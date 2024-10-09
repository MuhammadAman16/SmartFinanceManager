import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://yourlogoimageurl.com/logo.png' }} 
          style={styles.logo}
        />
        <Text style={styles.title}>About Us</Text>
      </View>
      
      <Text style={styles.description}>
        Welcome to our app, your ultimate tool for managing finances effortlessly. We offer a range of features to help you keep track of your income and expenses, set budgets, and get valuable insights into your financial health.
      </Text>

      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>Key Features:</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>💰</Text>
          <Text style={styles.featureText}>Track Your Income & Expenses - Keep a record of all your financial transactions and see a summary of your financial health.</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={styles.featureText}>Dashboard Overview - Get a clear view of your cash flow, income, and expenses with detailed insights and visualizations.</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📅</Text>
          <Text style={styles.featureText}>Budgeting - Set budget goals by specifying start and end dates along with amounts. Receive notifications when your budget is close to being exceeded.</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureText}>Chatbot Assistance - Get instant answers to your financial queries, like tracking your highest expenses over the last year.</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Thank you for choosing our app. We are dedicated to helping you manage your finances effectively and efficiently!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  featureSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  footer: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default About;
