import React, { useState, useEffect, useContext } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from '../../Context/TranslationContext';
import { formatDate, formatDateTime, getRelativeTime } from '../../utils/dateUtils';

const MyClientsScreen = ({ navigation }) => {
  const { userDetails } = useAuth();
  const { translate } = useTranslation();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch accepted clients
  const fetchAcceptedClients = async () => {
    try {
      setRefreshing(true);
      
      const response = await axiosInstance.get('/chat/accepted-clients');
      
      if (response.data.success) {
        setClients(response.data.clients);
      } else {
        setError(translate('Failed to fetch clients'));
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError(translate('An unexpected error occurred'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchAcceptedClients();
    
    // Set up navigation listener to refresh on focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAcceptedClients();
    });
    
    return unsubscribe;
  }, []);
  
  const getMessagePreview = (client) => {
    if (!client.lastMessage) {
      return translate('No messages yet');
    }
    
    const content = client.lastMessage.length > 30
      ? `${client.lastMessage.substring(0, 30)}...`
      : client.lastMessage;
    
    return content;
  };
  
  // Get current language for relative time formatting
  const { currentLanguage } = useTranslation();
  
  const renderClientItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.clientItem}
        onPress={() => navigation.navigate('Chat', { 
          screen: 'ChatDetail',
          params: { conversationId: item.conversationId, otherUser: item.prisoner }
        })}
      >
        {item.prisoner?.profileImage ? (
          <Image
            source={{ uri: item.prisoner.profileImage }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.defaultAvatar]}>
            <Icon name="user" size={24} color="#FFFFFF" />
          </View>
        )}
        
        <View style={styles.clientInfo}>
          <View style={styles.clientHeader}>
            <Text style={styles.clientName}>{item.prisoner?.name || translate('Unknown Client')}</Text>
            <Text style={styles.acceptedDate}>{translate('Accepted')}: {item.acceptedDate}</Text>
          </View>
          
          {item.case && (
            <View style={styles.caseInfo}>
              <Icon name="gavel" size={12} color="#666666" style={styles.icon} />
              <Text style={styles.caseNumber}>
                {item.case.cnr_number || translate('No Case Number')}
              </Text>
              {item.case.next_hearing_date && (
                <Text style={styles.hearingDate}>
                  {translate('Next Hearing')}: {item.case.next_hearing_date}
                </Text>
              )}
            </View>
          )}
          
          <View style={styles.messagePreview}>
            <Text style={styles.previewText} numberOfLines={1}>
              {getMessagePreview(item)}
            </Text>
            
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat', { 
                screen: 'ChatDetail',
                params: { conversationId: item.conversationId, otherUser: item.prisoner }
              })}
            >
              <Icon name="comment" size={14} color="#FFFFFF" />
              <Text style={styles.chatButtonText}>{translate('Chat')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="user-check" size={60} color="#CCCCCC" />
      <Text style={styles.emptyText}>
        {translate('No accepted clients yet')}
      </Text>
      <Text style={styles.emptySubtext}>
        {translate('When you accept a case request, the client will appear here')}
      </Text>
    </View>
  );
  
  if (loading && !refreshing) {
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
          <Text style={styles.headerTitle}>{translate('My Clients')}</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>{translate('Loading clients...')}</Text>
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
        <Text style={styles.headerTitle}>{translate('My Clients')}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Icon name="exclamation-circle" size={60} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchAcceptedClients}
          >
            <Text style={styles.retryButtonText}>{translate('Retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={clients}
          renderItem={renderClientItem}
          keyExtractor={(item) => item.conversationId.toString()}
          contentContainerStyle={clients.length === 0 ? { flex: 1 } : { padding: 16 }}
          ListEmptyComponent={renderEmptyList}
          onRefresh={fetchAcceptedClients}
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
  clientItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  defaultAvatar: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientInfo: {
    flex: 1,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  acceptedDate: {
    fontSize: 12,
    color: '#666666',
  },
  caseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 4,
  },
  caseNumber: {
    fontSize: 12,
    color: '#666666',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  hearingDate: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 16,
    fontStyle: 'italic',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    marginRight: 8,
  },
  chatButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
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
  },
});

export default MyClientsScreen;
