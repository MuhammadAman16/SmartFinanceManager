import React from 'react'
import Drawer from '../components/Drawer/Drawer'
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../components/Styling/Stlyes';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.DrawerView}>
        <Drawer />
      </View>
      <View style={styles.ChatBotView}>
        <TouchableOpacity
          onPress={() => setModalOpen(true)}
          style={styles.LabelScreenAddLabelButtonStyling}
        >
          <MaterialCommunityIcons
            name='robot-outline'
            size={25}
            style={styles.LabelScreenAddLablePlusIconStyling}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home