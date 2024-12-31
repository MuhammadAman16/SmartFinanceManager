import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Voice from '@react-native-voice/voice';
import user_api from '@/app/api/user_api';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../components/Styling/Stlyes';
import DisplayBudgetTable from '../components/ChatBot/DisplayBudgetTable';

const audioRecorderPlayer = new AudioRecorderPlayer();

const TypingIndicator = () => {
  const dot1 = new Animated.Value(0);
  const dot2 = new Animated.Value(0);
  const dot3 = new Animated.Value(0);

  const animateDots = (dot) => {
    Animated.sequence([
      Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => animateDots(dot));
  };

  useEffect(() => {
    animateDots(dot1);
    setTimeout(() => animateDots(dot2), 150);
    setTimeout(() => animateDots(dot3), 300);
  }, []);

  return (
    <View style={styles.typingContainer}>
      <Animated.Text style={[styles.typingDot, { opacity: dot1 }]}>•</Animated.Text>
      <Animated.Text style={[styles.typingDot, { opacity: dot2 }]}>•</Animated.Text>
      <Animated.Text style={[styles.typingDot, { opacity: dot3 }]}>•</Animated.Text>
    </View>
  );
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const FlatListRef = useRef(null);
  const navigation = useNavigation();

  const dotOpacity = new Animated.Value(1);

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotOpacity, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      dotOpacity.setValue(1);
    }
  }, [isListening]);


  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListning;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => console.log('onspeecherror:', error);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [isListening]);

  useEffect(() => {
    if (FlatListRef.current) {
      FlatListRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  const onSpeechStart = event => {
    console.log('recording start', event)
  };

  const startListning = async () => {
    setIsListening(true)
    try {
      await Voice.start('en-US');
    }
    catch (error) {
      console.log('start listning', error)
    }
  }

  const stopListning = async () => {
    try {
      Voice.removeAllListeners;
      await Voice.stop()
      setIsListening(false)

    }
    catch (error) {
      console.log('stop listning', error)
    }
  }


  const onSpeechResults = event => {
    console.log('on speech result', event)
    const text = event.value[0]
    setInputMessage(text)
  };


  const sendMessage = async () => {
    if (inputMessage.trim().length === 0) return;

    const newMessage = {
      id: Math.random().toString(),
      text: inputMessage,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    const token = await SecureStore.getItemAsync('jwtToken');
    await user_api.post(
      'chatbot',
      { query: inputMessage },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          Authorization: token
        }
      }).then(response => {
        const allBudgets = response.data;
        // console.log(allBudgets.response);
        if (allBudgets.length !== undefined) {
          const budgetNames = allBudgets.map((budget) => {
            return {
              name: budget.name,
              amount: budget.amount,
              remainingAmount: budget.remainingAmount,
              period: budget.period,
              currency: budget.currency,
              startDate: budget.startDate.split("T")[0],
              endDate: budget.endDate.split("T")[0]
            };
          })
          setMessages((prevMessage) => [
            ...prevMessage,
            { id: Math.random().toString(), component: <DisplayBudgetTable data={budgetNames} />, sender: 'bot' }
          ])
        } else {
          // console.log("ALL BUDGETS");
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: Math.random().toString(), text: allBudgets.response, sender: 'bot' }
          ])
        }
      }).catch(error => {
        console.error("The error is : ", error);
      }).finally(() => {
        setIsTyping(false);
      });
  };

  const renderMessageItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      {item.text ?
        (<Text style={[styles.BotmessageText, { color: item.sender === 'bot' ? '#000' : '#fff' }]}>{item.text}</Text>)
        : (item.component) }
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.Botcontainer}>
        <View style={styles.Botheader}>
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
            <AntDesign
              name='arrowleft'
              size={24}
              color={'white'}
            />
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <BotIcon name="robot" size={24} color="#fff" style={styles.botIcon} /> */}
            <MaterialCommunityIcons
              name='robot-outline'
              size={25}
              style={styles.botIcon}
              color={'white'}
            />
            <Text style={styles.BotheaderText}>ChatBot</Text>
          </View>
        </View>

        <ScrollView horizontal={true} style={styles.chatContainer}>
          <FlatList
            ref={FlatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
            keyboardShouldPersistTaps="handled"
            style={{
              paddingRight: 20
            }}
          />
        </ScrollView>

        {isTyping && <TypingIndicator />}

        <View style={styles.BotinputContainer}>
          <TextInput
            style={styles.Botinput}
            placeholder="Type a message..."
            placeholderTextColor="#A9A9A9"
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
          />
          <TouchableOpacity onPress={() => isListening ? stopListning() : startListning()} style={styles.audioButton}>
            {isListening ? (
              <Animated.Text style={[styles.voiceButtonText, { opacity: dotOpacity }]}>
                •••
              </Animated.Text>
            ) : (
              <Icon name="mic" size={24} color="rgba(56,142,60,255)" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
