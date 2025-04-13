import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const GovernorApprovals = ({ navigation }) => {
  const { userDetails, selectedLang } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);
      // Simulated data since we don't have a real endpoint
      setTimeout(() => {
        const mockData = [
          {
            id: '1',
            type: 'case_status_change',
            caseNumber: 'CR-2023-0123',
            title: 'State vs. Kumar',
            requestedBy: 'Advocate Priya Patel',
            timestamp: '2023-12-15T10:30:00Z',
            details: {
              currentStatus: 'pending',
              requestedStatus: 'active',
              reason: 'Case proceedings have started and initial hearing is scheduled.'
            }
          },
          {
            id: '2',
            type: 'hearing_date_change',
            caseNumber: 'CR-2023-0145',
            title: 'State vs. Sharma',
            requestedBy: 'Advocate Vikram Singh',
            timestamp: '2023-12-14T14:45:00Z',
            details: {
              currentDate: '2023-12-20',
              requestedDate: '2024-01-10',
              reason: 'Key witness is unavailable on the current date.'
            }
          },
          {
            id: '3',
            type: 'lawyer_assignment',
            caseNumber: 'CR-2023-0178',
            title: 'State vs. Mehta',
            requestedBy: 'System',
            timestamp: '2023-12-13T09:15:00Z',
            details: {
              currentLawyer: null,
              requestedLawyer: 'Advocate Rahul Sharma',
              reason: 'New case assignment based on expertise match.'
            }
          },
          {
            id: '4',
            type: 'case_closure',
            caseNumber: 'CR-2023-0056',
            title: 'State vs. Gupta',
            requestedBy: 'Advocate Aisha Khan',
            timestamp: '2023-12-12T16:20:00Z',
            details: {
              currentStatus: 'active',
              requestedStatus: 'closed',
              reason: 'Case has been resolved with acquittal.'
            }
          },
          {
            id: '5',
            type: 'document_approval',
            caseNumber: 'CR-2023-0132',
            title: 'State vs. Joshi',
            requestedBy: 'Advocate Ankit Joshi',
            timestamp: '2023-12-11T11:05:00Z',
            details: {
              documentType: 'Bail Application',
              documentURL: 'https://example.com/documents/bail_application_132.pdf',
              reason: 'Urgent bail application for medical reasons.'
            }
          }
        ];
        
        setPendingApprovals(mockData);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      setLoading(false);
      setRefreshing(false);
      Alert.alert('Error', 'Failed to load pending approvals');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPendingApprovals();
  };

  const handleApproval = async (id, approved) => {
    try {
      setActionLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Remove the approval from the list
        setPendingApprovals(pendingApprovals.filter(item => item.id !== id));
        setActionLoading(false);
        setModalVisible(false);
        
        Alert.alert(
          approved ? 'Approved' : 'Rejected',
          approved 
            ? 'The request has been approved successfully.' 
            : 'The request has been rejected.'
        );
      }, 1000);
    } catch (error) {
      console.error('Error handling approval:', error);
      setActionLoading(false);
      Alert.alert('Error', 'Failed to process your action');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'case_status_change':
        return 'exchange-alt';
      case 'hearing_date_change':
        return 'calendar-alt';
      case 'lawyer_assignment':
        return 'user-tie';
      case 'case_closure':
        return 'check-circle';
      case 'document_approval':
        return 'file-alt';
      default:
        return 'exclamation-circle';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'case_status_change':
        return 'Status Change';
      case 'hearing_date_change':
        return 'Hearing Date Change';
      case 'lawyer_assignment':
        return 'Lawyer Assignment';
      case 'case_closure':
        return 'Case Closure';
      case 'document_approval':
        return 'Document Approval';
      default:
        return 'Unknown Request';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderApprovalCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        setSelectedApproval(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeContainer}>
          <Icon name={getTypeIcon(item.type)} size={16} color="#4A90E2" />
          <Text style={styles.typeText}>{getTypeLabel(item.type)}</Text>
        </View>
        <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
      </View>
      
      <View style={styles.caseInfoContainer}>
        <Text style={styles.caseNumber}>{item.caseNumber}</Text>
        <Text style={styles.caseTitle}>{item.title}</Text>
      </View>
      
      <View style={styles.requesterContainer}>
        <Icon name="user" size={14} color="#666" />
        <Text style={styles.requesterText}>Requested by {item.requestedBy}</Text>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => {
            setSelectedApproval(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.iconButton, styles.approveButton]}
            onPress={() => handleApproval(item.id, true)}
          >
            <Icon name="check" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, styles.rejectButton]}
            onPress={() => handleApproval(item.id, false)}
          >
            <Icon name="times" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetailsModal = () => {
    if (!selectedApproval) return null;
    
    const renderDetailField = (label, value, highlight = false) => (
      <View style={styles.detailField}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[
          styles.detailValue,
          highlight && styles.highlightedValue
        ]}>
          {value}
        </Text>
      </View>
    );
    
    const renderStatusChange = () => (
      <View style={styles.detailSection}>
        {renderDetailField('Current Status', selectedApproval.details.currentStatus)}
        <Icon name="arrow-down" size={16} color="#666" style={styles.arrowIcon} />
        {renderDetailField('Requested Status', selectedApproval.details.requestedStatus, true)}
        {renderDetailField('Reason', selectedApproval.details.reason)}
      </View>
    );
    
    const renderDateChange = () => (
      <View style={styles.detailSection}>
        {renderDetailField('Current Date', selectedApproval.details.currentDate)}
        <Icon name="arrow-down" size={16} color="#666" style={styles.arrowIcon} />
        {renderDetailField('Requested Date', selectedApproval.details.requestedDate, true)}
        {renderDetailField('Reason', selectedApproval.details.reason)}
      </View>
    );
    
    const renderLawyerAssignment = () => (
      <View style={styles.detailSection}>
        {renderDetailField('Current Lawyer', selectedApproval.details.currentLawyer || 'None assigned')}
        <Icon name="arrow-down" size={16} color="#666" style={styles.arrowIcon} />
        {renderDetailField('Requested Lawyer', selectedApproval.details.requestedLawyer, true)}
        {renderDetailField('Reason', selectedApproval.details.reason)}
      </View>
    );
    
    const renderDocumentApproval = () => (
      <View style={styles.detailSection}>
        {renderDetailField('Document Type', selectedApproval.details.documentType)}
        {renderDetailField('Document URL', selectedApproval.details.documentURL)}
        {renderDetailField('Reason', selectedApproval.details.reason)}
        <TouchableOpacity style={styles.viewDocumentButton}>
          <Icon name="file-pdf" size={16} color="#FFFFFF" style={styles.documentIcon} />
          <Text style={styles.viewDocumentText}>View Document</Text>
        </TouchableOpacity>
      </View>
    );
    
    const renderCaseClosure = () => (
      <View style={styles.detailSection}>
        {renderDetailField('Current Status', selectedApproval.details.currentStatus)}
        <Icon name="arrow-down" size={16} color="#666" style={styles.arrowIcon} />
        {renderDetailField('Requested Status', selectedApproval.details.requestedStatus, true)}
        {renderDetailField('Reason', selectedApproval.details.reason)}
        <View style={styles.warningContainer}>
          <Icon name="exclamation-triangle" size={16} color="#F44336" style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Case closure is permanent and cannot be undone easily.
          </Text>
        </View>
      </View>
    );
    
    const renderDetailsContent = () => {
      switch (selectedApproval.type) {
        case 'case_status_change':
          return renderStatusChange();
        case 'hearing_date_change':
          return renderDateChange();
        case 'lawyer_assignment':
          return renderLawyerAssignment();
        case 'document_approval':
          return renderDocumentApproval();
        case 'case_closure':
          return renderCaseClosure();
        default:
          return <Text>No details available</Text>;
      }
    };
    
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.typeContainerModal}>
                <Icon name={getTypeIcon(selectedApproval.type)} size={20} color="#4A90E2" />
                <Text style={styles.modalTitle}>{getTypeLabel(selectedApproval.type)}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="times" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.caseInfoModal}>
              <Text style={styles.caseNumberModal}>{selectedApproval.caseNumber}</Text>
              <Text style={styles.caseTitleModal}>{selectedApproval.title}</Text>
              <Text style={styles.requestedByModal}>
                Requested by {selectedApproval.requestedBy} on {formatDate(selectedApproval.timestamp)}
              </Text>
            </View>
            
            <View style={styles.detailsContainer}>
              {renderDetailsContent()}
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalActionButton, styles.rejectButtonModal]}
                onPress={() => handleApproval(selectedApproval.id, false)}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="times" size={16} color="#FFFFFF" style={styles.actionIcon} />
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalActionButton, styles.approveButtonModal]}
                onPress={() => handleApproval(selectedApproval.id, true)}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="check" size={16} color="#FFFFFF" style={styles.actionIcon} />
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case Approvals</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
        >
          <Icon name="sync-alt" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statValue}>{pendingApprovals.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Today</Text>
          <Text style={styles.statValue}>
            {pendingApprovals.filter(item => {
              const date = new Date(item.timestamp);
              const today = new Date();
              return date.toDateString() === today.toDateString();
            }).length}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Urgent</Text>
          <Text style={styles.statValue}>
            {pendingApprovals.filter(item => 
              item.type === 'case_closure' || 
              item.type === 'document_approval'
            ).length}
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading pending approvals...</Text>
        </View>
      ) : pendingApprovals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="check-circle" size={60} color="#4CAF50" />
          <Text style={styles.emptyText}>All caught up!</Text>
          <Text style={styles.emptySubtext}>There are no pending approvals at the moment.</Text>
        </View>
      ) : (
        <FlatList
          data={pendingApprovals}
          renderItem={renderApprovalCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      
      {renderDetailsModal()}
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
  refreshButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
    paddingVertical: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
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
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  typeText: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  dateText: {
    color: '#666666',
    fontSize: 12,
  },
  caseInfoContainer: {
    marginBottom: 12,
  },
  caseNumber: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 4,
  },
  caseTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requesterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requesterText: {
    color: '#666666',
    fontSize: 14,
    marginLeft: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewButton: {
    backgroundColor: '#F5F5F5',
  },
  viewButtonText: {
    color: '#333333',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeContainerModal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10,
  },
  caseInfoModal: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 16,
  },
  caseNumberModal: {
    color: '#666666',
    fontSize: 14,
  },
  caseTitleModal: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  requestedByModal: {
    color: '#666666',
    fontSize: 14,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailField: {
    marginBottom: 12,
  },
  detailLabel: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  highlightedValue: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  arrowIcon: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  viewDocumentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  documentIcon: {
    marginRight: 8,
  },
  viewDocumentText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  warningIcon: {
    marginRight: 8,
  },
  warningText: {
    color: '#F44336',
    flex: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.48,
  },
  rejectButtonModal: {
    backgroundColor: '#F44336',
  },
  approveButtonModal: {
    backgroundColor: '#4CAF50',
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GovernorApprovals;
