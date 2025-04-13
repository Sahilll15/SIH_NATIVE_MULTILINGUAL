import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import { useTranslation } from '../../Context/TranslationContext';
import axiosInstance from '../../utils/axiosInstance';
import { getRelativeTime } from '../../utils/dateUtils';

const NotificationsScreen = ({ navigation }) => {
  const { userDetails } = useAuth();
  const { translate, currentLanguage } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setRefreshing(true);
      const response = await axiosInstance.get('/notifications');
      
      if (response.data.success) {
        setNotifications(response.data.notifications);
      } else {
        setError(translate('Failed to fetch notifications'));
      }
    } catch (error) {
      // console.error('Error fetching notifications:', error);
      // setError(translate('An unexpected error occurred'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Set up navigation listener to refresh on focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotifications();
    });
    
    return unsubscribe;
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await axiosInstance.patch(`/notifications/${id}/read`);
      
      if (response.data.success) {
        // Update the notification in the state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            notification._id === id ? { ...notification, isRead: true } : notification
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Alert.alert(translate('Error'), translate('Failed to mark notification as read'));
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await axiosInstance.patch('/notifications/mark-all-read');
      
      if (response.data.success) {
        // Update all notifications in the state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => ({ ...notification, isRead: true }))
        );
        Alert.alert(translate('Success'), translate('All notifications marked as read'));
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      Alert.alert(translate('Error'), translate('Failed to mark all notifications as read'));
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'CASE_UPDATE':
        return { name: 'clipboard-check', color: '#4A90E2' };
      case 'HEARING_DATE':
        return { name: 'calendar-day', color: '#4ECDC4' };
      case 'DOCUMENT_ADDED':
        return { name: 'file-upload', color: '#FF6B6B' };
      case 'CASE_STATUS_CHANGE':
        return { name: 'gavel', color: '#FFB347' };
      case 'LAWYER_ASSIGNED':
        return { name: 'user-tie', color: '#6C63FF' };
      case 'GENERAL':
      default:
        return { name: 'bell', color: '#999999' };
    }
  };

  const handleNotificationPress = (notification) => {
    // Mark as read when opened
    if (!notification.isRead) {
      markAsRead(notification._id);
    }

    // Navigate based on notification type
    if (notification.type === 'CASE_STATUS_CHANGE' || notification.type === 'HEARING_DATE') {
      if (notification.relatedCase) {
        navigation.navigate('CaseDetails', { caseData: notification.relatedCase });
      }
    }
  };

  const renderNotificationItem = ({ item }) => {
    const iconInfo = getNotificationIcon(item.type);
    const timeAgo = getRelativeTime(item.createdAtRaw, currentLanguage);
    
    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !item.isRead && styles.unreadNotification
        ]}
        onPress={() => handleNotificationPress(item)}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconInfo.color }]}>
          <Icon name={iconInfo.name} size={18} color="#FFFFFF" solid />
        </View>
        
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          
          <View style={styles.notificationFooter}>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
            
            {!item.isRead && (
              <TouchableOpacity
                style={styles.markReadButton}
                onPress={() => markAsRead(item._id)}
              >
                <Icon name="check" size={12} color="#4A90E2" solid />
                <Text style={styles.markReadText}>{translate('Mark as read')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{translate('Notifications')}</Text>
      
      {notifications.some(n => !n.isRead) && (
        <TouchableOpacity
          style={styles.markAllReadButton}
          onPress={markAllAsRead}
        >
          <Icon name="check-double" size={18} color="#FFF" solid />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="bell-slash" size={60} color="#CCCCCC" />
      <Text style={styles.emptyTitle}>{translate('No Notifications')}</Text>
      <Text style={styles.emptyMessage}>
        {translate('You don\'t have any notifications at the moment')}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>{translate('Loading notifications...')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {renderHeader()}
      
      {error ? (
        <View style={styles.errorContainer}>
          <Icon name="exclamation-circle" size={60} color="#FF6B6B" />
          <Text style={styles.errorTitle}>{translate('Oops!')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchNotifications}
          >
            <Text style={styles.retryButtonText}>{translate('Try Again')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item._id}
          contentContainerStyle={
            notifications.length === 0 
              ? styles.emptyListContainer 
              : styles.notificationList
          }
          ListEmptyComponent={renderEmpty}
          onRefresh={fetchNotifications}
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
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markAllReadButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    color: '#333333',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginTop: 8,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyListContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    color: '#333333',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginTop: 8,
  },
  notificationList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999999',
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markReadText: {
    fontSize: 12,
    color: '#4A90E2',
    marginLeft: 4,
  },
});

export default NotificationsScreen;
