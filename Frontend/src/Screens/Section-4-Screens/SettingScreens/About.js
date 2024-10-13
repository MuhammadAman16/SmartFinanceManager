import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import CustomHeader from '@/src/components/SettingsScreens/CustomHeader';
import styles from '@/src/components/Styling/Stlyes';
import KeyFeature from '@/src/components/SettingsScreens/KeyFeatures';

const About = () => {
  CustomHeader('Settings');

  return (
    <ScrollView contentContainerStyle={styles.AboutScreenContainer}>
      <View style={styles.AboutScreenHeader}>
        <Image 
          source={require('../../../../assets/images/Wallet.png')} 
          style={styles.AboutScreenLogo}
        />
        <Text style={styles.AboutScreenTitle}>About Us</Text>
      </View>
      
      <Text style={styles.AboutScreenDescription}>
        Welcome to our app, your ultimate tool for managing finances effortlessly. We offer a range of features to help you keep track of your income and expenses, set budgets, and get valuable insights into your financial health.
      </Text>

      <View style={styles.AboutScreenFeatureSection}>
        <Text style={styles.AboutScreenFeatureTitle}>Key Features:</Text>
        <KeyFeature
          icon={'💰'}
          text={'Track Your Income & Expenses - Keep a record of all your financial transactions and see a summary of your financial health.'}
        />
        <KeyFeature
          icon={'📊'}
          text={'Dashboard Overview - Get a clear view of your cash flow, income, and expenses with detailed insights and visualizations.'}
        />
        <KeyFeature
          icon={'📅'}
          text={'Budgeting - Set budget goals by specifying start and end dates along with amounts. Receive notifications when your budget is close to being exceeded.'}
        />
        <KeyFeature
          icon={'🤖'}
          text={'Chatbot Assistance - Get instant answers to your financial queries, like tracking your highest expenses over the last year.'}
        />
      </View>

      <Text style={styles.AboutScreenFooter}>
        Thank you for choosing our app. We are dedicated to helping you manage your finances effectively and efficiently!
      </Text>
    </ScrollView>
  );
};

export default About;
