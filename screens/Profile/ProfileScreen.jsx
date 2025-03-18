import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userDetails: authUserDetails } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [cases, setCases] = useState([]);
  
  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using current user details from AuthContext
      if (authUserDetails) {
        // Map authUserDetails to our userDetails state format
        const formattedUserDetails = {
          name: authUserDetails.name || 'User',
          id: authUserDetails._id || 'N/A',
          phone: authUserDetails.phoneNumber || 'N/A',
          email: authUserDetails.email || 'N/A',
          aadhaarId: authUserDetails.addharCard || 'N/A',
          dateOfArrest: authUserDetails.dateOfArrest || 'N/A',
          nextHearing: authUserDetails.nextHearing || 'N/A',
          caseStatus: authUserDetails.caseStatus || 'Under Trial',
          profileImage: authUserDetails.profileImage || null
        };
        
        // Update state with user details from context
        setUserDetails(formattedUserDetails);
        setLoading(false);
      } else {
        console.warn('No user details found in AuthContext');
        // If not available in context, try to fetch from API
        try {
          // Attempt to fetch from API if you have a user ID
          // const response = await axiosInstance.get('/api/profile');
          
          // For demo, using a mock API as fallback
          const response = await axios.get('https://run.mocky.io/v3/2de0e3d2-4917-4a96-ad47-03b16afb7b43');
          await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
          
          setUserDetails(response.data.userDetails);
          setLoading(false);
        } catch (apiErr) {
          console.error('Error fetching profile from API:', apiErr);
          throw apiErr; // Propagate error to outer catch block
        }
      }
    } catch (err) {
      console.error('Error processing user profile:', err);
      setError('Failed to load profile data. Please try again.');
      setLoading(false);
      
      // Fallback to default data if everything fails
      setUserDetails({
        name: 'User',
        id: 'UTK123456',
        phone: 'N/A',
        email: 'N/A',
        aadhaarId: 'N/A',
        dateOfArrest: 'N/A',
        nextHearing: 'N/A',
        caseStatus: 'Under Trial'
      });
    }
  };
  
  // Fetch user's cases using the same API endpoint as in MyCasesScreen
  const fetchUserCases = async () => {
    if (!authUserDetails?._id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/priosioner/cases/${authUserDetails._id}`);
      console.log('Response:', response.data);
      
      if (response.data.success) {
        // Transform the API response to match expected UI format
        const formattedCases = response.data.cases.map(caseItem => ({
          id: caseItem._id,
          caseNumber: caseItem.cnr_number,
          court: caseItem.cnr_details.case_status.court_number_and_judge,
          charges: caseItem.cnr_details.case_details.case_type,
          status: caseItem.cnr_details.case_status.case_stage,
          nextHearing: new Date(caseItem.cnr_details.case_status.next_hearing_date).toLocaleDateString('en-IN'),
          advocate: caseItem.cnr_details.petitioner_and_advocate_details.advocate,
          filingNumber: caseItem.cnr_details.case_details.filing_number,
          petitioner: caseItem.cnr_details.petitioner_and_advocate_details.petitioner,
          acts: caseItem.cnr_details.act_details?.map(act => `${act.under_act} - ${act.under_section}`).join(', ') || 'N/A',
          respondents: caseItem.cnr_details.respondent_and_advocate_details?.join(', ') || 'N/A'
        }));
        
        setCases(formattedCases);
      } else {
        setError(response.data.message || 'Failed to fetch cases');
      }
    } catch (err) {
      console.error('Error fetching cases:', err);
      setError(err.response?.data?.message || 'Failed to fetch cases. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Load data on initial render
  useEffect(() => {
    fetchUserProfile();
    fetchUserCases();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch fresh data from APIs
    Promise.all([fetchUserProfile(), fetchUserCases()])
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const renderCaseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.caseCard}
      onPress={() => navigation.navigate('CaseDetails', { caseId: item.id })}
    >
      <View style={styles.caseHeader}>
        <Text style={styles.caseNumber}>{item.caseNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Pending' ? '#FFA500' : '#4CAF50' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.caseInfo}>
        <Icon name="gavel" size={16} color="#666" />
        <Text style={styles.caseText}>{item.court}</Text>
      </View>
      <View style={styles.caseInfo}>
        <Icon name="file-alt" size={16} color="#666" />
        <Text style={styles.caseText}>{item.charges}</Text>
      </View>
      <View style={styles.caseInfo}>
        <Icon name="user-tie" size={16} color="#666" />
        <Text style={styles.caseText}>{item.advocate}</Text>
      </View>
      <View style={styles.caseInfo}>
        <Icon name="calendar" size={16} color="#666" />
        <Text style={styles.caseText}>Next Hearing: {item.nextHearing}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing && !userDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading profile information...</Text>
      </View>
    );
  }

  if (error && !userDetails && !cases.length) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="exclamation-circle" size={50} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ 
              uri: userDetails?.profileImage || 
                   `https://ui-avatars.com/api/?name=${encodeURIComponent(userDetails?.name || 'User')}&background=4A90E2&color=fff&size=120` 
            }}
            style={styles.profileImage}
            defaultSource={{ uri: 'https://ui-avatars.com/api/?name=User&background=4A90E2&color=fff&size=120' }}
          />
        </View>
        <Text style={styles.name}>{userDetails?.name}</Text>
        <Text style={styles.id}>ID: {userDetails?.id}</Text>
        
        {userDetails?.caseStatus && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{userDetails.caseStatus}</Text>
          </View>
        )}
      </View>

      {/* Personal Information Section */}
      <View style={styles.infoSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {refreshing && <ActivityIndicator size="small" color="#4A90E2" />}
        </View>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="user" size={20} color="#666" />
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{userDetails?.name || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color="#666" />
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{userDetails?.phone || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="envelope" size={20} color="#666" />
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userDetails?.email || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="id-card" size={20} color="#666" />
            <Text style={styles.infoLabel}>Aadhaar ID:</Text>
            <Text style={styles.infoValue}>{userDetails?.aadhaarId || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar-minus" size={20} color="#666" />
            <Text style={styles.infoLabel}>Date of Arrest:</Text>
            <Text style={styles.infoValue}>{userDetails?.dateOfArrest || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="gavel" size={20} color="#666" />
            <Text style={styles.infoLabel}>Next Hearing:</Text>
            <Text style={styles.infoValue}>{userDetails?.nextHearing || '-'}</Text>
          </View>
        </View>
      </View>

      {/* Cases Section */}
      <View style={styles.casesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Cases</Text>
          {refreshing && <ActivityIndicator size="small" color="#4A90E2" />}
        </View>
        
        {cases.length > 0 ? (
          <FlatList
            data={cases}
            renderItem={renderCaseItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noCasesContainer}>
            <Icon name="folder-open" size={40} color="#CCC" />
            <Text style={styles.noCasesText}>No cases found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusContainer: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  id: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  noCasesContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    elevation: 2,
  },
  noCasesText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  infoValue: {
    flex: 2,
    fontSize: 16,
    color: '#333',
  },
  casesSection: {
    padding: 15,
  },
  caseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  caseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  caseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  caseText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen;
