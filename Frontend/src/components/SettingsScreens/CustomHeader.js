// CustomHeader.js
import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const CustomHeader = (targetScreen = 'Settings') => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={25}
          color={'white'}
          style={{ marginRight: 20 }}
          backgroundColor="transparent"
          onPress={() => navigation.navigate(targetScreen)}
        />
      ),
    });
  }, [navigation, targetScreen]);

  return null; // This component does not render anything
};

export default CustomHeader;
