import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from '../../Context/TranslationContext';

const ConversationsScreen = ({ navigation }) => {
  const { userDetails } = useAuth();
  const { translate } = useTranslation();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const isPrisoner = userDetails?.type === 'Prisioner';
  const isLawyer = userDetails?.type === 'Lawyer';
  
  const fetchConversations = async () => {
    try {
      setRefreshing(true);
      const userType = isPrisoner ? 'prisoner' : 'lawyer';
      const response = await axiosInstance.get(`/chat/conversations?type=${userType}`);
      
      if (response.data.success) {
        setConversations(response.data.conversations);
      } else {
        Alert.alert(translate('Error'), translate('Failed to fetch conversations'));
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      Alert.alert(translate('Error'), translate('An unexpected error occurred'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchConversations();
    
    // Set up navigation listener to refresh on focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchConversations();
    });
    
    return unsubscribe;
  }, []);
  
  const getLastMessagePreview = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return translate('No messages yet');
    }
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const content = lastMessage.content.length > 30
      ? `${lastMessage.content.substring(0, 30)}...`
      : lastMessage.content;
    
    return content;
  };
  
  const getTimestamp = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return conversation.createdAt;
    }
    
    return conversation.messages[conversation.messages.length - 1].timestamp;
  };
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Within the last week
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    if (date > oneWeekAgo) {
      const options = { weekday: 'short' };
      return date.toLocaleDateString(undefined, options);
    }
    
    // More than a week ago
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const renderConversationItem = ({ item }) => {
    const otherParticipant = isPrisoner ? item.lawyer : item.prisoner;
    const unreadMessages = item.messages.filter(msg => 
      !msg.read && 
      (isPrisoner ? msg.senderModel === 'Lawyer' : msg.senderModel === 'Prisioner')
    ).length;
    
    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => navigation.navigate('ChatDetail', { conversationId: item._id, otherUser: otherParticipant })}
      >
        {otherParticipant?.profileImage ? (
          <Image
            source={{ uri: otherParticipant.profileImage }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.defaultAvatar]}>
            <Icon name="user" size={24} color="#FFFFFF" />
          </View>
        )}
        
        <View style={styles.conversationInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{otherParticipant?.name || translate('Unknown User')}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(getTimestamp(item))}</Text>
          </View>
          
          <View style={styles.messageRow}>
            <Text 
              style={[
                styles.lastMessage,
                unreadMessages > 0 && styles.unreadMessage
              ]}
              numberOfLines={1}
            >
              {getLastMessagePreview(item)}
            </Text>
            
            {unreadMessages > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>
                  {unreadMessages > 9 ? '9+' : unreadMessages}
                </Text>
              </View>
            )}
          </View>
          
          {isPrisoner && item.caseRequest && (
            <View style={styles.requestBadge}>
              <Text style={styles.requestStatus}>
                {translate(item.caseRequest.status.charAt(0).toUpperCase() + item.caseRequest.status.slice(1))}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="comments" size={60} color="#CCCCCC" />
      <Text style={styles.emptyText}>
        {translate('No conversations yet')}
      </Text>
      <Text style={styles.emptySubtext}>
        {isPrisoner 
          ? translate('Start a conversation with a lawyer to get legal help')
          : translate('You have no active conversations with prisoners')}
      </Text>
      
      {isPrisoner && (
        <TouchableOpacity
          style={styles.newChatButton}
          onPress={() => navigation.navigate('FindLawyer')}
        >
          <Text style={styles.newChatButtonText}>
            {translate('Find a Lawyer')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
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
        <Text style={styles.headerTitle}>
          {translate('Messages')}
        </Text>
        <View style={styles.rightHeaderButton}>
          {isPrisoner && (
            <TouchableOpacity
              onPress={() => navigation.navigate('FindLawyer')}
            >
              <Icon name="user-plus" size={20} color="#4A90E2" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>
            {translate('Loading conversations...')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={conversations.length === 0 ? { flex: 1 } : null}
          ListEmptyComponent={renderEmptyList}
          onRefresh={fetchConversations}
          refreshing={refreshing}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  rightHeaderButton: {
    width: 40,
    alignItems: 'flex-end',
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
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  defaultAvatar: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#333333',
  },
  unreadBadge: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  requestBadge: {
    marginTop: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  requestStatus: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  newChatButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  newChatButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConversationsScreen;
