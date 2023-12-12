import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [chat, setChat] = useState([
    { id: 1, message: 'Hi, how can I help you?', type: 'bot' },
    { id: 2, message: 'Hello!', type: 'user' },
  ]);

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }

    // Add user message to the chat
    const newChat = [...chat, { id: chat.length + 1, message: inputText, type: 'user' }];
    setChat(newChat);
    setInputText('');

    try {
      // Make a request to your backend API here
      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server.');
      }

      const data = await response.json();

      // Add the bot response to the chat
      newChat.push({ id: newChat.length + 1, message: data.message, type: 'bot' });
      setChat(newChat);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {chat.map((message) => (
          <View key={message.id} style={message.type === 'bot' ? styles.botMessage : styles.userMessage}>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome5 name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'flex-end',
    },
    chatContainer: {
      flex: 1,
      marginBottom: 10,
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#3498db',
      borderRadius: 8,
      padding: 10,
      marginBottom: 5,
      maxWidth: '80%',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#2ecc71',
      borderRadius: 8,
      padding: 10,
      marginBottom: 5,
      maxWidth: '80%',
    },
    messageText: {
      color: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginRight: 10,
      paddingHorizontal: 10,
    },
    sendButton: {
      backgroundColor: '#3498db',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default ChatBot;
