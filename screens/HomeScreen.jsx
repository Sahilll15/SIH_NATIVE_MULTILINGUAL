import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar, Platform, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddCaseModal from './Case/AddCaseModal';
import { useAuth } from '../Context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const HomeScreen = ({ navigation }) => {
  const { userDetails, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [caseCount, setCaseCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch user's case count
  useEffect(() => {
    const fetchCaseCount = async () => {
      if (!userDetails?._id) return;
      
      try {
        setLoading(true);
        
        // Use the existing API endpoint
        const response = await axiosInstance.get(`/priosioner/cases/${userDetails._id}`);
        
        if (response.data.success) {
          setCaseCount(response.data.cases.length);
        }
      } catch (err) {
        console.error('Error fetching case count:', err);
        // Don't set error state to avoid showing error UI
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaseCount();
  }, [userDetails]);

  const cards = [
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
      id: 'market',
      title: 'Legal Documents',
      icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
      color: '#45B7D1',
      onPress: () => navigation.navigate('LegalDocuments')
    },
    {
      id: 'rehab',
      title: 'Rehabilitation',
      icon: 'https://cdn-icons-png.flaticon.com/512/4207/4207247.png',
      color: '#96CEB4',
      onPress: () => navigation.navigate('Rehab')
    },
    {
      id: 'lawyer',
      title: 'Find a Lawyer',
      icon: 'https://cdn-icons-png.flaticon.com/512/3116/3116416.png',
      color: '#45B7D1',
      onPress: () => navigation.navigate('LawyerList')
    },
    {
      id: 'My Documents',
      title: 'My Documents',
      icon: 'https://cdn-icons-png.flaticon.com/512/3117/3117712.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('AddDoc')
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

  const renderCaseButtons = () => (
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

  const renderCards = () => (
    <View style={styles.cardsContainer}>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={[styles.card, { borderLeftColor: card.color }]}
          onPress={card.onPress}
        >
          <View style={[styles.cardIconContainer, { backgroundColor: `${card.color}15` }]}>
            <Image
              source={{ uri: card.icon }}
              style={styles.cardIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Icon name="arrow-right" size={16} color={card.color} style={styles.cardArrow} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {renderHeader()}
          {renderCaseButtons()}
          
          <Text style={styles.sectionTitle}>Legal Resources</Text>
          {renderCards()}
        </View>
      </ScrollView>

      <AddCaseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        navigation={navigation}
      />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#4A90E2',
    marginHorizontal: -16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  headerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
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
