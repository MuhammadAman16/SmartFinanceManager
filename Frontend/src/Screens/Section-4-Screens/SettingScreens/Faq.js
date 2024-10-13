import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "@/src/components/Styling/Stlyes";
import { faqData } from "@/src/components/Data/SettingScreens/FAQData";
import CustomHeader from "@/src/components/SettingsScreens/CustomHeader";

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  CustomHeader('Settings');

  return (
    <ScrollView contentContainerStyle={styles.FAQScreenContainer}>
      <Text style={styles.FAQScreenTitle}>Frequently Asked Questions</Text>
      {faqData.map((item, index) => (
        <View key={index} style={styles.FAQScreenItem}>
          <TouchableOpacity
            style={styles.FAQScreenQuestionContainer}
            onPress={() => handlePress(index)}
          >
            <Icon
              name={expandedIndex === index ? "expand-less" : "expand-more"}
              size={24}
              color="#000"
            />
            <Text style={styles.FAQScreenQuestion}>{item.question}</Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.FAQScreenAnswerContainer,
              { height: expandedIndex === index ? "auto" : 0 },
            ]}
          >
            <Text style={styles.FAQScreenAnswer}>{item.answer}</Text>
          </Animated.View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Faq;
