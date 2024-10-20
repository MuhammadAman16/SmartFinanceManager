import React from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { settingsOptions } from "@/src/components/Data/SettingScreens/SettingsScreenData";

const icons = {
  Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign
}

const Settings = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {settingsOptions.map((option, index) => {
        const IconComponent = icons[option.iconCommunity];
        return (
          <TouchableOpacity
            key={index}
            style={styles.touch}
            onPress={() => navigation.navigate('Setting Stack', { screen: option.title })}
          >
            <IconComponent
              name={option.iconName}
              size={22}
              color={'rgba(56,142,60,255)'}
            />
            <View style={styles.View}>
              <Text style={styles.Heading}>{option.title}</Text>
              <Text style={styles.subHeading}>{option.subTitle}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginVertical: 0
  },
  touch: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 15,
    alignItems: 'center'
  },
  View: {
    marginHorizontal: 20,
    justifyContent: 'flex-start'
  },
  Heading: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subHeading: {
    fontSize: 13,
    color:'grey',
    marginVertical: 5
  }
});

export default Settings;
