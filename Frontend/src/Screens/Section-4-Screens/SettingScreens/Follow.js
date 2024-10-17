import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '@/src/components/SettingsScreens/CustomHeader';
import styles from '@/src/components/Styling/Stlyes';
import SocialMedaiHandle from '@/src/components/SettingsScreens/SocialMediaHandles';

const Follow = () => {
  CustomHeader('Settings');

  return (
    <View style={styles.FollowScreenContainer}>
      <Text style={styles.FollowScreenTitle}>Follow Us</Text>
      <View style={styles.FollowScreenLinksContainer}>
        <SocialMedaiHandle
          backgroundColor='#C13584'
          link={'https://www.instagram.com/yourusername'}
          iconName={'logo-instagram'}
          handleName={'Instagram'}
        />
        <SocialMedaiHandle
          backgroundColor='#0077B5'
          link={'https://www.linkedin.com/in/yourusername'}
          iconName={'logo-linkedin'}
          handleName={'LinkedIn'}
        />
        <SocialMedaiHandle
          backgroundColor='#1DA1F2'
          link={'https://twitter.com/yourusername'}
          iconName={'logo-twitter'}
          handleName={'Twitter'}
        />
        <SocialMedaiHandle
          backgroundColor='#4267B2'
          link={'https://www.facebook.com/yourusername'}
          iconName={'logo-facebook'}
          handleName={'Facebook'}
        />
      </View>
    </View>
  );
};

export default Follow;
