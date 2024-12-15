import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BotIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Voice from '@react-native-voice/voice';

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
    Voice.onSpeechError = error => console.log('onspeecherror:' , error);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [isListening]);

const onSpeechStart = event => {
  console.log('recording start', event)
};

const startListning = async  () => {
 setIsListening(true)
 try {
 await Voice.start('en-US');
 }
 catch (error) {
   console.log('start listning', error)
 }
}

const stopListning = async  () => {
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
    if (inputMessage.trim().length === 0) return;

    const newMessage = {
      id: Math.random().toString(),
      text: inputMessage,
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
      Tts.speak(botResponse);
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
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BotIcon name="robot" size={24} color="#fff" style={styles.botIcon} />
        <Text style={styles.headerText}>ChatBot</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {isTyping && <TypingIndicator />}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#A9A9A9"
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
           <TouchableOpacity onPress={() => isListening ? stopListning() : startListning() } style={styles.audioButton}>
          {isListening ? (
            <Animated.Text style={[styles.voiceButtonText, { opacity: dotOpacity }]}>
              •••
            </Animated.Text>
          ) : (
            <Icon name="mic" size={24} color="#6C63FF" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    height: 60,
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botIcon: {
    right: 5,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6C63FF',
    borderBottomRightRadius: 0,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40,
  },
  audioButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  sendButton: {
    width: 40,
    height: 30,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  typingDot: {
    fontSize: 26,
    color: '#6C63FF',
    marginHorizontal: 2,
  },
   voiceButtonText: {
    fontSize: 18,
    color: '#6C63FF',
  },
});

export default ChatScreen;
