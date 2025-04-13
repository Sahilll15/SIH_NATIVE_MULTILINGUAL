import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar, Platform, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddCaseModal from './Case/AddCaseModal';
import { useAuth } from '../Context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from '../Context/TranslationContext';

const HomeScreen = ({ navigation }) => {
  const { userDetails, logout } = useAuth();
  const { translate, currentLanguage } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [caseCount, setCaseCount] = useState(0);
  const [allCases, setAllCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  
  const isPrisoner = userDetails?.type === 'Prisioner';
  const isLawyer = userDetails?.type === 'Lawyer';
  const isGovernor = userDetails?.type === 'Governor';
  
  // Navigate directly to GovernorCases if user is a governor
  useEffect(() => {
    console.log('isGovernor', isGovernor)
    if (isGovernor) {
      navigation.replace('GovernorCases', { cases: allCases });
    }

    console.log('userDetails.type', userDetails)
  }, [isGovernor, userDetails, allCases]);
  
  // Fetch case data based on user type
  useEffect(() => {
    if (!userDetails?._id) return;
    
    const fetchCaseData = async () => {
      try {
        setLoading(true);
        
        if (isPrisoner) {
          // Fetch prisoner's cases
          const response = await axiosInstance.get(`/priosioner/cases/${userDetails._id}`);
          
          if (response.data.success) {
            setCaseCount(response.data.cases.length);
          }
        } else if (isGovernor) {
          // Fetch all cases for governor
          const response = await axiosInstance.get('/goverenr/cases');
          
          if (response.data.success) {
            setAllCases(response.data.cases);
            setCaseCount(response.data.count);
          }
        } else if (isLawyer) {
          // Fetch lawyer's cases
          const response = await axiosInstance.get(`/lawyer/cases/${userDetails._id}`);
          
          if (response.data.success) {
            setCaseCount(response.data.cases?.length || 0);
          }
        }
      } catch (err) {
        console.error('Error fetching case data:', err);
        // Don't set error state to avoid showing error UI
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaseData();
  }, [userDetails, isPrisoner, isLawyer, isGovernor]);

  // Search cases function for Governor
  const handleSearchCases = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }
    
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/goverenr/cases?search=${searchQuery.trim()}`);
      
      if (response.data.success) {
        setAllCases(response.data.cases);
        Alert.alert('Success', `Found ${response.data.cases.length} cases`);
      }
    } catch (error) {
      console.error('Error searching cases:', error);
      Alert.alert('Error', 'Failed to search cases');
    } finally {
      setLoading(false);
    }
  };
  
  // Cards for prisoners
  // State for unread notification count
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Fetch notification count when the screen loads
  useEffect(() => {
    const fetchNotificationCount = async () => {
      if (userDetails?.userType === 'prisoner') {
        try {
          // Make sure we're using the correct path for notifications
          const response = await axiosInstance.get('/api/v1/notifications');
          if (response.data.success) {
            const unreadCount = response.data.notifications.filter(n => !n.isRead).length;
            setUnreadNotifications(unreadCount);
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };
    
    fetchNotificationCount();
    
    // Set up navigation listener to refresh on focus
    const unsubscribe = navigation.addListener('focus', fetchNotificationCount);
    return unsubscribe;
  }, [userDetails]);
  
  // Only include functional cards with working features
  const prisonerCards = [
    {
      id: 'rights',
      title: 'Know Your Rights',
      iconName: 'balance-scale',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('Rights')
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      iconName: 'robot',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('AIChatScreen')
    },
    {
      id: 'lawyer',
      title: 'Find a Lawyer',
      iconName: 'user-tie',
      color: '#45B7D1',
      onPress: () => navigation.navigate('LawyerList')
    },
    {
      id: 'documents',
      title: 'My Documents',
      iconName: 'file-alt',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('AddDoc')
    },
    {
      id: 'chat',
      title: 'Legal Chat',
      iconName: 'comments',
      color: '#4A90E2',
      onPress: () => navigation.navigate('Chat')
    },
    {
      id: 'cases',
      title: 'My Cases',
      iconName: 'gavel',
      color: '#96CEB4',
      onPress: () => navigation.navigate('MyCases')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      iconName: 'bell',
      color: '#FFB347',
      onPress: () => navigation.navigate('Notifications'),
      badge: unreadNotifications > 0 ? unreadNotifications : null
    },
  ];

  // Cards for Governor
  const governorCards = [
    {
      id: 'manage-cases',
      title: 'Manage Cases',
      iconName: 'tasks',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('GovernorCases', { cases: allCases })
    },
    {
      id: 'analytics',
      title: 'Case Analytics',
      iconName: 'chart-bar',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('GovernorAnalytics')
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      iconName: 'file-export',
      color: '#45B7D1',
      onPress: () => navigation.navigate('GovernorReports')
    },
    {
      id: 'approvals',
      title: 'Case Approvals',
      iconName: 'check-circle',
      color: '#96CEB4',
      onPress: () => navigation.navigate('GovernorApprovals')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      iconName: 'bell',
      color: '#45B7D1',
      onPress: () => navigation.navigate('GovernorNotifications')
    },
    {
      id: 'modifications',
      title: 'My Modifications',
      iconName: 'edit',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('GovernorModifications')
    },
  ];

  // Cards for lawyers
  // Only include functional cards with working features
  const lawyerCards = [
    {
      id: 'clients',
      title: 'My Clients',
      iconName: 'users',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('MyClients')
    },
    {
      id: 'cases',
      title: 'My Cases',
      iconName: 'gavel',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('MyCases')
    },
    {
      id: 'chat',
      title: 'Client Chat',
      iconName: 'comments',
      color: '#4A90E2',
      onPress: () => navigation.navigate('Chat')
    },
    {
      id: 'profile',
      title: 'My Profile',
      iconName: 'user-circle',
      color: '#45B7D1',
      onPress: () => navigation.navigate('Profile')
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText} numberOfLines={1} ellipsizeMode="tail">
            {translate('Welcome')} {userDetails?.name ? userDetails.name.split(' ')[0] : translate('Back')}!
          </Text>
          <Text style={styles.headerText}>{translate('Access Legal Help, Anytime, Anywhere')}</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.profileImageWrapper}>
              {userDetails?.profileImage ? (
                <Image 
                  source={{ uri: userDetails.profileImage }} 
                  style={styles.profileImage}
                />
              ) : (
                <Icon name="user-circle" size={24} color="#4A90E2" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleLogout}
          >
            <Icon name="sign-out-alt" size={22} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderGovernorCaseButtons = () => (
    <View style={styles.caseButtonsRow}>
      <TouchableOpacity 
        style={[styles.caseButton, styles.addCaseButton, { flex: 1 }]} 
        onPress={() => navigation.navigate('SearchCases')}
      >
        <View style={styles.caseButtonContent}>
          <View style={styles.caseIconContainer}>
            <Icon name="search" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.caseTextContainer}>
            <Text style={styles.caseButtonTitle}>Search Cases</Text>
            <Text style={styles.caseButtonSubtitle}>Find by case number, name, etc.</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderPrisonerCaseButtons = () => (
    <View style={styles.caseButtonsRow}>
      <TouchableOpacity 
        style={[styles.caseButton, styles.addCaseButton]} 
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.caseButtonContent}>
          <View style={styles.caseIconContainer}>
            <Icon name="plus-circle" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.caseTextContainer}>
            <Text style={styles.caseButtonTitle}>Add Case</Text>
            <Text style={styles.caseButtonSubtitle}>New proceeding</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.caseButton, styles.myCasesButton]}
        onPress={() => navigation.navigate('MyCases')}
      >
        <View style={styles.caseButtonContent}>
          <View style={[styles.caseIconContainer, styles.myCasesIcon]}>
            <Icon name="briefcase" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.caseTextContainer}>
            <Text style={styles.caseButtonTitle}>My Cases</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" style={{marginTop: 2}} />
            ) : (
              <Text style={styles.caseButtonSubtitle}>
                {caseCount > 0 ? `${caseCount} active case${caseCount !== 1 ? 's' : ''}` : 'View all cases'}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderLawyerCaseButtons = () => (
    <View style={styles.caseButtonsRow}>
      <TouchableOpacity 
        style={[styles.caseButton, styles.addCaseButton]} 
        onPress={() => navigation.navigate('NewCase')}
      >
        <View style={styles.caseButtonContent}>
          <View style={styles.caseIconContainer}>
            <Icon name="plus-circle" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.caseTextContainer}>
            <Text style={styles.caseButtonTitle}>New Case</Text>
            <Text style={styles.caseButtonSubtitle}>Start representation</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.caseButton, styles.myCasesButton]}
        onPress={() => navigation.navigate('MyCases')}
      >
        <View style={styles.caseButtonContent}>
          <View style={[styles.caseIconContainer, styles.myCasesIcon]}>
            <Icon name="briefcase" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.caseTextContainer}>
            <Text style={styles.caseButtonTitle}>Case Dashboard</Text>
            <Text style={styles.caseButtonSubtitle}>Manage your cases</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={[styles.card, { borderLeftColor: card.color }]}
      onPress={card.onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${card.color}15` }]}>
        <Icon 
          name={card.iconName} 
          size={26} 
          color={card.color} 
          solid
        />
        {card.badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{card.badge > 9 ? '9+' : card.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{translate(card.title)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCards = () => (
    <View style={styles.cardsContainer}>
      {(isPrisoner ? prisonerCards : isLawyer ? lawyerCards : governorCards).map(renderCard)}
    </View>
  );
  
  // If the user is a governor, we render a loading state while we redirect
  if (isGovernor) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>{translate('Loading case management...')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {renderHeader()}
          {isPrisoner ? renderPrisonerCaseButtons() : renderLawyerCaseButtons()}
          
          <Text style={styles.sectionTitle}>
            {isPrisoner ? translate('Legal Resources') : translate('Lawyer Resources')}
          </Text>
          {renderCards()}
        </View>
      </ScrollView>

      {isPrisoner && (
        <AddCaseModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          navigation={navigation}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  headerText: {
    fontSize: 13,
    color: '#718096',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImageWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4B55',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // ...
  caseButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  caseButton: {
    flex: 0.48,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  addCaseButton: {
    backgroundColor: '#4A90E2',
  },
  myCasesButton: {
    backgroundColor: '#6C63FF',
  },
  caseButtonContent: {
    padding: 16,
  },
  caseIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  myCasesIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  caseTextContainer: {
    marginTop: 4,
  },
  caseButtonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  caseButtonSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
    marginTop: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  cardIcon: {
    width: 32,
    height: 32,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  cardArrow: {
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;


// lawyer@gmail.com
// lawyer@123
// lawyer
// 1234567890
// 9012011
// 4
// crime