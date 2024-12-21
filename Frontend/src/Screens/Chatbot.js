import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BotIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Voice from '@react-native-voice/voice';
import styles from '../components/Styling/Stlyes';
import Tts from 'react-native-tts';

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
  const [BotinputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false); // New state for mic listening

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
      dotOpacity.setValue(1); // Reset opacity when not listening
    }
  }, [isListening]);


  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListning;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => console.log('onspeecherror:', error);

    const androidPermissionChecking = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        )
      }
    };

    androidPermissionChecking();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [isListening]);

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


  const sendMessage = () => {
    if (BotinputMessage.trim().length === 0) return;

    const newMessage = {
      id: Math.random().toString(),
      text: BotinputMessage,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = 'Thanks for your message!';
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random().toString(), text: botResponse, sender: 'bot' },
      ]);
      // if (Tts && Tts.speak) {
      //   Tts.speak(botResponse);
      // } else {
      //   console.error('Tts is not initialized or available');
      // }
      setIsTyping(false);
    }, 1000);
  };

  const renderMessageItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.BotmessageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.Botcontainer}>
        <View style={styles.Botheader}>
          <BotIcon name="robot" size={24} color="#fff" style={styles.botIcon} />
          <Text style={styles.BotheaderText}>ChatBot</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        {isTyping && <TypingIndicator />}

        <View style={styles.BotinputContainer}>
          <TextInput
            style={styles.Botinput}
            placeholder="Type a message..."
            placeholderTextColor="#A9A9A9"
            value={BotinputMessage}
            onChangeText={(text) => setInputMessage(text)}
          />
          <TouchableOpacity
            onPress={() => (isListening ? stopListning() : startListning())}
            style={styles.audioButton}
          >
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
