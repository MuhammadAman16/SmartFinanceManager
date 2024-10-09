import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const faqData = [
  {
    question: "What is this app used for?",
    answer:
      "This app helps you manage your investments and expenses, providing a dashboard to track your income, expenses, and cash flow. It also allows you to set budgets and receive notifications if you exceed 80% of your budget. Additionally, the app features a chatbot to answer questions about your financial activities.",
  },
  {
    question: "How do I set a budget?",
    answer:
      "To set a budget, navigate to the budgeting section of the app, enter the start and end dates, and specify the amount. The app will notify you if you approach or exceed 80% of your budget.",
  },
  {
    question: "What features does the dashboard provide?",
    answer:
      "The dashboard shows a summary of your income, expenses, and cash flow. It helps you visualize your financial activities and understand your financial health at a glance.",
  },
  {
    question: "How does the chatbot work?",
    answer:
      "The chatbot provides answers based on your financial data. You can ask questions about your spending, budget status, and other financial insights. The chatbot uses your account data to give accurate responses.",
  },
  {
    question: "Can I track my investments?",
    answer:
      "Yes, the app allows you to track your investments and monitor their performance over time. You can view detailed reports and insights related to your investments.",
  },
  {
    question: "How do I access my account history?",
    answer:
      "You can access your account history through the dashboard. It provides a detailed view of your past transactions, categorized by type and date.",
  },
];

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqData.map((item, index) => (
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
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
