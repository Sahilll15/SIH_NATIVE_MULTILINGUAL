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
      icon: 'https://cdn-icons-png.flaticon.com/512/1642/1642097.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('Rights')
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('AIChatScreen')
    },
    {
      id: 'lawyer',
      title: 'Find a Lawyer',
      icon: 'https://cdn-icons-png.flaticon.com/512/3116/3116416.png',
      color: '#45B7D1',
      onPress: () => navigation.navigate('LawyerList')
    },
    {
      id: 'documents',
      title: 'My Documents',
      icon: 'https://cdn-icons-png.flaticon.com/512/3117/3117712.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('AddDoc')
    },
    {
      id: 'chat',
      title: 'Legal Chat',
      icon: 'https://cdn-icons-png.flaticon.com/512/724/724715.png',
      color: '#4A90E2',
      onPress: () => navigation.navigate('Chat')
    },
    {
      id: 'cases',
      title: 'My Cases',
      icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
      color: '#96CEB4',
      onPress: () => navigation.navigate('MyCases')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'https://cdn-icons-png.flaticon.com/512/2645/2645883.png',
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
      icon: 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('GovernorCases', { cases: allCases })
    },
    // {
    //   id: 'analytics',
    //   title: 'Case Analytics',
    //   icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910791.png',
    //   color: '#4ECDC4',
    //   onPress: () => navigation.navigate('GovernorAnalytics')
    // },
    // {
    //   id: 'reports',
    //   title: 'Generate Reports',
    //   icon: 'https://cdn-icons-png.flaticon.com/512/1195/1195562.png',
    //   color: '#45B7D1',
    //   onPress: () => navigation.navigate('GovernorReports')
    // },
    // {
    //   id: 'approvals',
    //   title: 'Case Approvals',
    //   icon: 'https://cdn-icons-png.flaticon.com/512/1478/1478873.png',
    //   color: '#96CEB4',
    //   onPress: () => navigation.navigate('GovernorApprovals')
    // },
    // {
    //   id: 'notifications',
    //   title: 'Notifications',
    //   icon: 'https://cdn-icons-png.flaticon.com/512/2645/2645883.png',
    //   color: '#45B7D1',
    //   onPress: () => navigation.navigate('GovernorNotifications')
    // },
    // {
    //   id: 'modifications',
    //   title: 'My Modifications',
    //   icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    //   color: '#FF6B6B',
    //   onPress: () => navigation.navigate('GovernorModifications')
    // },
  ];

  // Cards for lawyers
  // Only include functional cards with working features
  const lawyerCards = [
    {
      id: 'clients',
      title: 'My Clients',
      icon: 'https://cdn-icons-png.flaticon.com/512/3126/3126647.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('MyClients')
    },
    {
      id: 'cases',
      title: 'My Cases',
      icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('MyCases')
    },
    {
      id: 'chat',
      title: 'Client Chat',
      icon: 'https://cdn-icons-png.flaticon.com/512/724/724715.png',
      color: '#4A90E2',
      onPress: () => navigation.navigate('Chat')
    },
    {
      id: 'profile',
      title: 'My Profile',
      icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
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
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>
          Welcome {userDetails?.name ? `${userDetails.name.split(' ')[0]}` : 'Back'}!
        </Text>
        <Text style={styles.headerText}>Access Legal Help, Anytime, Anywhere</Text>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="sign-out-alt" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          {userDetails?.profileImage ? (
            <Image 
              source={{ uri: userDetails.profileImage }} 
              style={styles.profileImage} 
              defaultSource={{ uri: 'https://ui-avatars.com/api/?name=User&background=4A90E2&color=fff' }}
            />
          ) : (
            <Icon name="user-circle" size={30} color="#fff" />
          )}
        </TouchableOpacity>
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
        <Image
          source={{ uri: card.icon }}
          style={styles.icon}
          resizeMode="contain"
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