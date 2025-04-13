import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const GovernorNotifications = ({ navigation }) => {
  const { userDetails, selectedLang } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Simulated data since we don't have a real endpoint
      setTimeout(() => {
        const mockData = [
          {
            id: '1',
            title: 'New case assigned',
            message: 'Case CR-2023-0189 has been assigned and requires your review.',
            timestamp: '2023-12-15T10:30:00Z',
            type: 'case_assignment',
            read: false,
            actionRequired: true,
            data: {
              caseId: 'CR-2023-0189',
              screen: 'GovernorCases'
            }
          },
          {
            id: '2',
            title: 'Lawyer Priya Patel accepted case',
            message: 'Lawyer Priya Patel has accepted to represent case CR-2023-0145.',
            timestamp: '2023-12-14T14:45:00Z',
            type: 'lawyer_accepted',
            read: false,
            actionRequired: false,
            data: {
              lawyerId: '789',
              caseId: 'CR-2023-0145'
            }
          },
          {
            id: '3',
            title: 'Hearing date updated',
            message: 'Hearing date for case CR-2023-0132 has been updated to January 15, 2024.',
            timestamp: '2023-12-13T09:15:00Z',
            type: 'hearing_update',
            read: true,
            actionRequired: false,
            data: {
              caseId: 'CR-2023-0132',
              newDate: '2024-01-15'
            }
          },
          {
            id: '4',
            title: '5 pending approvals',
            message: 'You have 5 pending approvals that require your attention.',
            timestamp: '2023-12-12T16:20:00Z',
            type: 'approvals',
            read: true,
            actionRequired: true,
            data: {
              count: 5,
              screen: 'GovernorApprovals'
            }
          },
          {
            id: '5',
            title: 'Monthly report ready',
            message: 'December 2023 monthly report is now available for review.',
            timestamp: '2023-12-11T11:05:00Z',
            type: 'report',
            read: true,
            actionRequired: false,
            data: {
              reportId: '2023-12',
              screen: 'GovernorReports'
            }
          },
          {
            id: '6',
            title: 'System maintenance',
            message: 'The system will be under maintenance on December 20, 2023, from 22:00 to 23:00 GMT.',
            timestamp: '2023-12-10T15:30:00Z',
            type: 'system',
            read: true,
            actionRequired: false,
            data: {}
          },
          {
            id: '7',
            title: 'Case closed successfully',
            message: 'Case CR-2023-0078 has been successfully closed.',
            timestamp: '2023-12-09T13:45:00Z',
            type: 'case_closed',
            read: true,
            actionRequired: false,
            data: {
              caseId: 'CR-2023-0078'
            }
          }
        ];
        
        setNotifications(mockData);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
      setRefreshing(false);
      Alert.alert('Error', 'Failed to load notifications');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const markAsRead = async (id) => {
    try {
      // Update local state first for immediate feedback
      setNotifications(
        notifications.map(item => 
          item.id === id ? { ...item, read: true } : item
        )
      );
      
      // In a real app, you would make an API call here
      // Simulated API call
      console.log(`Marking notification ${id} as read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Update local state
      setNotifications(
        notifications.map(item => ({ ...item, read: true }))
      );
      
      // Simulated API call
      Alert.alert('Success', 'All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      Alert.alert('Error', 'Failed to mark all notifications as read');
    }
  };

  const handleNotificationPress = (notification) => {
    // Mark as read
    markAsRead(notification.id);
    
    // Navigate to relevant screen if action is required
    if (notification.actionRequired && notification.data.screen) {
      navigation.navigate(notification.data.screen, notification.data);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'case_assignment':
        return 'clipboard-list';
      case 'lawyer_accepted':
        return 'user-check';
      case 'hearing_update':
        return 'calendar-alt';
      case 'approvals':
        return 'tasks';
      case 'report':
        return 'file-alt';
      case 'system':
        return 'cogs';
      case 'case_closed':
        return 'check-circle';
      default:
        return 'bell';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'case_assignment':
        return '#4A90E2';
      case 'lawyer_accepted':
        return '#4CAF50';
      case 'hearing_update':
        return '#FF9800';
      case 'approvals':
        return '#9C27B0';
      case 'report':
        return '#2196F3';
      case 'system':
        return '#607D8B';
      case 'case_closed':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today: show time
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffDays < 7) {
      // Within a week
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    } else {
      // More than a week ago
      return date.toLocaleDateString();
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[
        styles.iconContainer,
        { backgroundColor: `${getTypeColor(item.type)}15` }
      ]}>
        <Icon 
          name={getNotificationIcon(item.type)} 
          size={20} 
          color={getTypeColor(item.type)} 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{formatDate(item.timestamp)}</Text>
        </View>
        
        <Text 
          style={styles.notificationMessage}
          numberOfLines={2}
        >
          {item.message}
        </Text>
        
        {item.actionRequired && (
          <View style={styles.actionTag}>
            <Text style={styles.actionTagText}>Action Required</Text>
          </View>
        )}
      </View>
      
      {!item.read && (
        <View style={styles.unreadDot} />
      )}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(item => !item.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.markAllButton}
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text style={[
            styles.markAllText, 
            unreadCount === 0 && styles.disabledText
          ]}>
            Mark all as read
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="bell-slash" size={60} color="#CCC" />
          <Text style={styles.emptyText}>No Notifications</Text>
          <Text style={styles.emptySubtext}>You're all caught up!</Text>
        </View>
      ) : (
        <>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{notifications.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{unreadCount}</Text>
              <Text style={styles.statLabel}>Unread</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {notifications.filter(item => item.actionRequired).length}
              </Text>
              <Text style={styles.statLabel}>Action Required</Text>
            </View>
          </View>
        
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
          />
        </>
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
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  markAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  markAllText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  disabledText: {
    color: '#CCCCCC',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#F8F9FA',
    borderLeftWidth: 3,
    borderLeftColor: '#4A90E2',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666666',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  actionTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  actionTagText: {
    fontSize: 12,
    color: '#9C27B0',
    fontWeight: '600',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
  },
});

export default GovernorNotifications;
