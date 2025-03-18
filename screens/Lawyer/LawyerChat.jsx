import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';

const LawyerChat = ({ route, navigation }) => {
  const { lawyer } = route.params;
  const { selectedLang, userDetails } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  // Set up navigation header with lawyer name
  useEffect(() => {
    navigation.setOptions({
      title: lawyer.name,
      headerRight: () => (
        <TouchableOpacity 
          style={{ marginRight: 15 }}
          onPress={() => {
            // Future functionality: Show lawyer profile/details
          }}
        >
          <Image 
            source={{ uri: lawyer.image || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={{ width: 35, height: 35, borderRadius: 17.5 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, lawyer]);

  // Load initial sample messages
  useEffect(() => {
    // Mock API call to load messages
    setTimeout(() => {
      const initialMessages = [
        {
          id: '1',
          text: selectedLang === 'Hindi' 
            ? 'नमस्ते, मैं आपकी कैसे मदद कर सकता हूँ?' 
            : 'Hello, how can I help you today?',
          sender: 'lawyer',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'read'
        },
      ];
      
      if (lawyer.type === 'pro-bono') {
        initialMessages.push({
          id: '2',
          text: selectedLang === 'Hindi'
            ? 'मैं प्रो बोनो सेवाएं प्रदान करता हूं। कृपया अपने कानूनी मुद्दे का विवरण साझा करें।'
            : 'I provide pro bono services. Please share details about your legal issue.',
          sender: 'lawyer',
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          status: 'read'
        });
      } else {
        initialMessages.push({
          id: '2',
          text: selectedLang === 'Hindi'
            ? `मेरी फीस ₹${lawyer.fees}/घंटा है। क्या आप आगे बढ़ना चाहते हैं?`
            : `My fee is ₹${lawyer.fees}/hour. Would you like to proceed?`,
          sender: 'lawyer',
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          status: 'read'
        });
      }
      
      setMessages(initialMessages);
      setLoading(false);
    }, 1000);
  }, [lawyer, selectedLang]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage('');
    
    // Simulate lawyer response after a short delay
    setTimeout(() => {
      const lawyerReplies = [
        selectedLang === 'Hindi'
          ? 'धन्यवाद, मैं आपके मामले पर विचार करूंगा और जल्द ही जवाब दूंगा।'
          : 'Thank you, I will review your case and get back to you soon.',
        selectedLang === 'Hindi'
          ? 'क्या आप कृपया अधिक विवरण प्रदान कर सकते हैं?'
          : 'Could you please provide more details?',
        selectedLang === 'Hindi'
          ? 'हम इस मामले पर चर्चा करने के लिए एक मीटिंग शेड्यूल कर सकते हैं।'
          : 'We can schedule a meeting to discuss this matter further.'
      ];
      
      const randomReply = lawyerReplies[Math.floor(Math.random() * lawyerReplies.length)];
      
      const lawyerMessage = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        sender: 'lawyer',
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };
      
      setMessages(prevMessages => [...prevMessages, lawyerMessage]);
    }, 1500);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }) => {
    const isUserMessage = item.sender === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessageContainer : styles.lawyerMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          isUserMessage ? styles.userMessageBubble : styles.lawyerMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isUserMessage ? styles.userMessageText : styles.lawyerMessageText
          ]}>
            {item.text}
          </Text>
        </View>
        <View style={[
          styles.messageFooter,
          isUserMessage ? styles.userMessageFooter : styles.lawyerMessageFooter
        ]}>
          <Text style={styles.messageTime}>
            {formatTime(item.timestamp)}
          </Text>
          {isUserMessage && (
            <View style={styles.messageStatus}>
              {item.status === 'sent' && <FontAwesome5 name="check" size={10} color="#8A93A0" />}
              {item.status === 'delivered' && <FontAwesome5 name="check-double" size={10} color="#8A93A0" />}
              {item.status === 'read' && <FontAwesome5 name="check-double" size={10} color="#4A90E2" />}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderChatHeader = () => (
    <View style={styles.chatInfoContainer}>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          {selectedLang === 'Hindi' ? 'विशेषज्ञता' : 'Specialization'}:
        </Text>
        <Text style={styles.infoValue}>{lawyer.specialization}</Text>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          {selectedLang === 'Hindi' ? 'अनुभव' : 'Experience'}:
        </Text>
        <Text style={styles.infoValue}>
          {lawyer.experience} {selectedLang === 'Hindi' ? 'वर्ष' : 'years'}
        </Text>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          {selectedLang === 'Hindi' ? 'फीस' : 'Fees'}:
        </Text>
        <Text style={styles.infoValue}>
          {lawyer.fees > 0 
            ? `₹${lawyer.fees}/hr` 
            : (selectedLang === 'Hindi' ? 'निःशुल्क' : 'Pro Bono')}
        </Text>
      </View>
      
      <Text style={styles.chatStartText}>
        {selectedLang === 'Hindi' 
          ? 'आप अब बातचीत शुरू कर सकते हैं'
          : 'You can now start the conversation'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>
            {selectedLang === 'Hindi' ? 'संदेश लोड हो रहे हैं...' : 'Loading messages...'}
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
            ListHeaderComponent={renderChatHeader}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={selectedLang === 'Hindi' ? 'संदेश लिखें...' : 'Type a message...'}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={message.trim() === ''}
            >
              <FontAwesome5 
                name="paper-plane" 
                size={20} 
                color={message.trim() === '' ? '#A0AEC0' : '#FFFFFF'} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4A5568',
  },
  chatInfoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
  },
  chatStartText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  lawyerMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    minWidth: 80,
  },
  userMessageBubble: {
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  lawyerMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  lawyerMessageText: {
    color: '#2D3748',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginHorizontal: 4,
  },
  userMessageFooter: {
    justifyContent: 'flex-end',
  },
  lawyerMessageFooter: {
    justifyContent: 'flex-start',
  },
  messageTime: {
    fontSize: 11,
    color: '#718096',
    marginRight: 4,
  },
  messageStatus: {
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 45,
    height: 45,
    backgroundColor: '#4A90E2',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default LawyerChat;
