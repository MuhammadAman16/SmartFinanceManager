import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { faqData } from "@/src/components/Data/SettingScreens/FAQData";
import CustomHeader from "@/src/components/SettingsScreens/CustomHeader";

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  CustomHeader('Settings');

  const groupFAQsByCategory = (data) => {
    return data.reduce((groups, item) => {
      const { category } = item;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };

  const groupedFAQs = groupFAQsByCategory(faqData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {Object.keys(groupedFAQs).map((category) => (
        <View key={category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {groupedFAQs[category].map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.questionContainer}
                onPress={() => handlePress(index)}
              >
                <Icon
                  name={expandedIndex === index ? "expand-less" : "expand-more"}
                  size={24}
                  color="#000"
                />
                <Text style={styles.question}>{item.question}</Text>
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.answerContainer,
                  { height: expandedIndex === index ? "auto" : 0 },
                ]}
              >
                <Text style={styles.answer}>{item.answer}</Text>
              </Animated.View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  faqItem: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e0e0e0",
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    overflow: "hidden",
  },
  answer: {
    fontSize: 14,
    color: "#555",
  },
});

export default Faq;
