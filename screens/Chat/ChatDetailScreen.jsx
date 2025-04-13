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
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from '../../Context/TranslationContext';

const ChatDetailScreen = ({ route, navigation }) => {
  const { conversationId, otherUser } = route.params;
  const { userDetails } = useAuth();
  const { translate } = useTranslation();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const flatListRef = useRef(null);
  const isPrisoner = userDetails?.type === 'Prisioner';
  const isLawyer = userDetails?.type === 'Lawyer';
  
  const fetchConversation = async () => {
    try {
      setRefreshing(true);
      const userType = isPrisoner ? 'prisoner' : 'lawyer';
      const response = await axiosInstance.get(`/chat/conversation/${otherUser._id}?userType=${userType}`);
      
      if (response.data.success) {
        setConversation(response.data.conversation);
        setMessages(response.data.conversation.messages || []);
      } else {
        setError(translate('Failed to fetch conversation'));
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
      setError(translate('An unexpected error occurred'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchConversation();
    
    // Poll for new messages every 10 seconds
    const intervalId = setInterval(fetchConversation, 10000);
    
    return () => clearInterval(intervalId);
  }, [conversationId]);
  
  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    try {
      setSending(true);
      
      const userType = isPrisoner ? 'prisoner' : 'lawyer';
      
      const response = await axiosInstance.post(`/chat/conversation/${conversation._id}/message`, {
        content: inputText.trim(),
        userType
      });
      
      if (response.data.success) {
        setInputText('');
        
        // Optimistically update UI
        const newMessage = response.data.newMessage;
        setMessages([...messages, newMessage]);
        
        // Scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
        
        // Refetch to ensure we have the latest data
        fetchConversation();
      } else {
        Alert.alert(translate('Error'), translate('Failed to send message'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert(translate('Error'), translate('An unexpected error occurred'));
    } finally {
      setSending(false);
    }
  };
  
  const handleAcceptCase = async () => {
    try {
      const response = await axiosInstance.put(`/chat/conversation/${conversation._id}/respond`, {
        status: 'accepted',
        message: translate('I have accepted your case request. I will be representing you.')
      });
      
      if (response.data.success) {
        fetchConversation();
      } else {
        Alert.alert(translate('Error'), translate('Failed to accept case'));
      }
    } catch (error) {
      console.error('Error accepting case:', error);
      Alert.alert(translate('Error'), translate('An unexpected error occurred'));
    }
  };
  
  const handleRejectCase = async () => {
    try {
      const response = await axiosInstance.put(`/chat/conversation/${conversation._id}/respond`, {
        status: 'rejected',
        message: translate('I am unable to take your case at this time.')
      });
      
      if (response.data.success) {
        fetchConversation();
      } else {
        Alert.alert(translate('Error'), translate('Failed to reject case'));
      }
    } catch (error) {
      console.error('Error rejecting case:', error);
      Alert.alert(translate('Error'), translate('An unexpected error occurred'));
    }
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const renderMessageItem = ({ item, index }) => {
    const isCurrentUser = (isPrisoner && item.senderModel === 'Prisioner') ||
                         (isLawyer && item.senderModel === 'Lawyer');
    
    // Check if we need to show date header
    const showDateHeader = index === 0 || 
      new Date(item.timestamp).toDateString() !== 
      new Date(messages[index - 1].timestamp).toDateString();
    
    return (
      <>
        {showDateHeader && (
          <View style={styles.dateHeaderContainer}>
            <Text style={styles.dateHeader}>{formatDate(item.timestamp)}</Text>
          </View>
        )}
        
        <View style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
        ]}>
          <View style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
          ]}>
            <Text style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText
            ]}>
              {item.content}
            </Text>
            <Text style={[
              styles.messageTime,
              isCurrentUser ? styles.currentUserTime : styles.otherUserTime
            ]}>
              {formatTime(item.timestamp)}
            </Text>
          </View>
        </View>
      </>
    );
  };
  
  // Render case request banner for lawyers
  const renderCaseRequestBanner = () => {
    if (!isLawyer || !conversation?.caseRequest) return null;
    
    if (conversation.caseRequest.status === 'pending') {
      return (
        <View style={styles.caseRequestBanner}>
          <Text style={styles.caseRequestText}>
            {translate('This prisoner is requesting your legal assistance')}
          </Text>
          <View style={styles.caseRequestActions}>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={handleRejectCase}
            >
              <Text style={styles.rejectButtonText}>{translate('Decline')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAcceptCase}
            >
              <Text style={styles.acceptButtonText}>{translate('Accept')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (conversation.caseRequest.status === 'accepted') {
      return (
        <View style={styles.caseStatusBanner}>
          <Icon name="check-circle" size={16} color="#4CAF50" style={styles.statusIcon} />
          <Text style={styles.caseStatusText}>
            {translate('You are representing this prisoner')}
          </Text>
        </View>
      );
    } else if (conversation.caseRequest.status === 'rejected') {
      return (
        <View style={styles.caseStatusBanner}>
          <Icon name="times-circle" size={16} color="#F44336" style={styles.statusIcon} />
          <Text style={styles.caseStatusText}>
            {translate('You declined to represent this prisoner')}
          </Text>
        </View>
      );
    }
    
    return null;
  };
  
  // Render case status banner for prisoners
  const renderCaseStatusBanner = () => {
    if (!isPrisoner || !conversation?.caseRequest) return null;
    
    if (conversation.caseRequest.status === 'pending') {
      return (
        <View style={styles.caseStatusBanner}>
          <Icon name="clock" size={16} color="#FFC107" style={styles.statusIcon} />
          <Text style={styles.caseStatusText}>
            {translate('Case request pending. Waiting for lawyer to respond.')}
          </Text>
        </View>
      );
    } else if (conversation.caseRequest.status === 'accepted') {
      return (
        <View style={styles.caseStatusBanner}>
          <Icon name="check-circle" size={16} color="#4CAF50" style={styles.statusIcon} />
          <Text style={styles.caseStatusText}>
            {translate('This lawyer has accepted your case')}
          </Text>
        </View>
      );
    } else if (conversation.caseRequest.status === 'rejected') {
      return (
        <View style={styles.caseStatusBanner}>
          <Icon name="times-circle" size={16} color="#F44336" style={styles.statusIcon} />
          <Text style={styles.caseStatusText}>
            {translate('This lawyer has declined your case')}
          </Text>
        </View>
      );
    }
    
    return null;
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>{translate('Loading conversation...')}</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.errorContainer}>
          <Icon name="exclamation-circle" size={60} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchConversation}
          >
            <Text style={styles.retryButtonText}>{translate('Retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.profileSection}
          onPress={() => {
            // Navigate to profile screen of the other user if needed
          }}
        >
          {otherUser?.profileImage ? (
            <Image
              source={{ uri: otherUser.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={[styles.profileImage, styles.defaultAvatar]}>
              <Icon name="user" size={20} color="#FFFFFF" />
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{otherUser?.name || translate('Unknown User')}</Text>
            <Text style={styles.profileRole}>
              {isPrisoner ? translate('Lawyer') : translate('Prisoner')}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="info-circle" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>
      
      {renderCaseRequestBanner()}
      {renderCaseStatusBanner()}
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item, index) => `message-${index}`}
          contentContainerStyle={styles.messageList}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          inverted={false}
          onRefresh={fetchConversation}
          refreshing={refreshing}
          ListEmptyComponent={
            <View style={styles.emptyMessagesContainer}>
              <Icon name="comments" size={60} color="#CCCCCC" />
              <Text style={styles.emptyMessagesText}>
                {isPrisoner
                  ? translate('Start the conversation with this lawyer')
                  : translate('No messages yet. Start the conversation')}
              </Text>
            </View>
          }
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={translate('Type a message...')}
            multiline
            maxHeight={100}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || sending) && styles.disabledSendButton
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || sending}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Icon name="paper-plane" size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  defaultAvatar: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileRole: {
    fontSize: 12,
    color: '#666666',
  },
  headerButton: {
    padding: 8,
  },
  caseRequestBanner: {
    backgroundColor: '#E1F5FE',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#B3E5FC',
  },
  caseRequestText: {
    fontSize: 14,
    color: '#01579B',
    marginBottom: 12,
  },
  caseRequestActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rejectButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 12,
  },
  rejectButtonText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  caseStatusBanner: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statusIcon: {
    marginRight: 8,
  },
  caseStatusText: {
    fontSize: 14,
    color: '#666666',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    paddingBottom: 8,
  },
  dateHeaderContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateHeader: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  currentUserBubble: {
    backgroundColor: '#DCF8C6',
  },
  otherUserBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  currentUserText: {
    color: '#333333',
  },
  otherUserText: {
    color: '#333333',
  },
  messageTime: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  currentUserTime: {
    color: '#7CB342',
  },
  otherUserTime: {
    color: '#999999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#CCCCCC',
  },
  emptyMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyMessagesText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: '70%',
  },
});

export default ChatDetailScreen;
