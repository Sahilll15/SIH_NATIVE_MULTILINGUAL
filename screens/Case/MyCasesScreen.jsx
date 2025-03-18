import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

export default MyCasesScreen = ({ navigation }) => {
  const { userDetails } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserCases();
  }, []);

  const fetchUserCases = async () => {
    if (!userDetails?._id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/priosioner/cases/${userDetails._id}`);
      
      if (response.data.success) {
        setCases(response.data.cases);
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

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Legal Cases</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchUserCases}>
          <Icon name="sync" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const getStatusColor = (stage) => {
    const stageColors = {
      'Mediation': '#4ECDC4',
      'Under Trial': '#FFB347',
      'Pending': '#FFB347',
      'Completed': '#6C63FF',
      'Dismissed': '#FF6B6B'
    };
    return stageColors[stage] || '#45B7D1';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderCaseCard = (caseItem) => {
    const statusColor = getStatusColor(caseItem.cnr_details.case_status.case_stage);
    const nextHearingDate = caseItem.cnr_details.case_status.next_hearing_date;
    const formattedDate = formatDate(nextHearingDate);
    
    return (
      <TouchableOpacity
        key={caseItem._id}
        style={styles.caseCard}
        onPress={() => navigation.navigate('CaseDetails', { caseData: caseItem })}
      >
        <View style={[styles.caseTypeIndicator, { backgroundColor: statusColor }]} />
        
        <View style={styles.caseContent}>
          <View style={styles.caseHeader}>
            <View style={styles.caseTitleContainer}>
              <Text style={styles.caseType}>{caseItem.cnr_details.case_details.case_type}</Text>
              <Text style={styles.caseTitle}>{caseItem.cnr_number}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusText}>{caseItem.cnr_details.case_status.case_stage}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.caseInfo}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="gavel" size={14} color={statusColor} />
              </View>
              <Text style={styles.infoLabel}>Filing Number:</Text>
              <Text style={styles.infoText}>{caseItem.cnr_details.case_details.filing_number}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="calendar-alt" size={14} color={statusColor} />
              </View>
              <Text style={styles.infoLabel}>Next Hearing:</Text>
              <Text style={styles.infoText}>{formattedDate}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="user-tie" size={14} color={statusColor} />
              </View>
              <Text style={styles.infoLabel}>Court:</Text>
              <Text style={styles.infoText}>{caseItem.cnr_details.case_status.court_number_and_judge}</Text>
            </View>
          </View>
          
          <View style={styles.petitionerRow}>
            <Text style={styles.petitionerLabel}>Petitioner:</Text>
            <Text style={styles.petitionerName}>{caseItem.cnr_details.petitioner_and_advocate_details.petitioner}</Text>
          </View>
        </View>
        
        <View style={styles.arrowContainer}>
          <Icon name="chevron-right" size={18} color="#CCC" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading your cases...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="exclamation-circle" size={60} color="#FF6B6B" />
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUserCases}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (cases.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="folder-open" size={60} color="#999" />
          <Text style={styles.emptyTitle}>No Cases Found</Text>
          <Text style={styles.emptyText}>You don't have any cases added to your profile yet</Text>
          <TouchableOpacity 
            style={styles.addCaseButton} 
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.addCaseButtonText}>Add Your First Case</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <Text style={styles.casesCountText}>Showing {cases.length} case{cases.length !== 1 ? 's' : ''}</Text>
        {cases.map(renderCaseCard)}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {renderHeader()}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {renderContent()}
      </ScrollView>
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
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  content: {
    padding: 16,
  },
  casesCountText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  caseTypeIndicator: {
    width: 6,
    height: '100%',
  },
  caseContent: {
    flex: 1,
    padding: 16,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  caseTitleContainer: {
    flex: 1,
  },
  caseType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  caseInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIconContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  infoLabel: {
    width: 100,
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '400',
  },
  petitionerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 8,
  },
  petitionerLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginRight: 8,
  },
  petitionerName: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '600',
    flex: 1,
  },
  arrowContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 22,
    color: '#FF6B6B',
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addCaseButton: {
    marginTop: 24,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addCaseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
