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
  Modal,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const GovernorModifications = ({ navigation }) => {
  const { userDetails, selectedLang } = useAuth();
  const [loading, setLoading] = useState(true);
  const [modifications, setModifications] = useState([]);
  const [selectedMod, setSelectedMod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchModifications();
  }, []);

  const fetchModifications = async () => {
    try {
      setLoading(true);
      // Mock data - in a real app, you would fetch from an API
      setTimeout(() => {
        const mockData = [
          {
            id: '1',
            caseNumber: 'CR-2023-0123',
            caseTitle: 'State vs. Kumar',
            modifiedBy: 'Governor Rajesh Singh',
            timestamp: '2023-12-15T10:30:00Z',
            type: 'status_update',
            details: {
              previous: 'pending',
              current: 'active',
              reason: 'Case proceedings have started'
            }
          },
          {
            id: '2',
            caseNumber: 'CR-2023-0145',
            caseTitle: 'State vs. Sharma',
            modifiedBy: 'Lawyer Priya Patel',
            timestamp: '2023-12-14T14:45:00Z',
            type: 'hearing_update',
            details: {
              previous: '2023-12-20',
              current: '2024-01-10',
              reason: 'Key witness unavailable'
            }
          },
          {
            id: '3',
            caseNumber: 'CR-2023-0178',
            caseTitle: 'State vs. Mehta',
            modifiedBy: 'System Administrator',
            timestamp: '2023-12-13T09:15:00Z',
            type: 'lawyer_assignment',
            details: {
              previous: 'Unassigned',
              current: 'Advocate Rahul Sharma',
              reason: 'Expertise match'
            }
          },
          {
            id: '4',
            caseNumber: 'CR-2023-0056',
            caseTitle: 'State vs. Gupta',
            modifiedBy: 'Governor Rajesh Singh',
            timestamp: '2023-12-12T16:20:00Z',
            type: 'case_closed',
            details: {
              previous: 'active',
              current: 'closed',
              reason: 'Case resolved with acquittal'
            }
          },
          {
            id: '5',
            caseNumber: 'CR-2023-0132',
            caseTitle: 'State vs. Joshi',
            modifiedBy: 'Lawyer Ankit Joshi',
            timestamp: '2023-12-11T11:05:00Z',
            type: 'document_added',
            details: {
              documentType: 'Bail Application',
              reason: 'Urgent bail request for medical reasons'
            }
          },
          {
            id: '6',
            caseNumber: 'CR-2023-0189',
            caseTitle: 'State vs. Reddy',
            modifiedBy: 'Governor Rajesh Singh',
            timestamp: '2023-12-10T13:25:00Z',
            type: 'prison_transfer',
            details: {
              previous: 'Central Jail, Mumbai',
              current: 'District Jail, Pune',
              reason: 'Overcrowding and security concerns'
            }
          },
          {
            id: '7',
            caseNumber: 'CR-2023-0112',
            caseTitle: 'State vs. Patel',
            modifiedBy: 'Lawyer Sanjay Desai',
            timestamp: '2023-12-09T09:30:00Z',
            type: 'notes_added',
            details: {
              noteTitle: 'Case Progress Update',
              reason: 'Important developments in investigation'
            }
          }
        ];
        
        setModifications(mockData);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching modifications:', error);
      setLoading(false);
      setRefreshing(false);
      Alert.alert('Error', 'Failed to load case modifications');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchModifications();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'status_update':
        return 'exchange-alt';
      case 'hearing_update':
        return 'calendar-alt';
      case 'lawyer_assignment':
        return 'user-tie';
      case 'case_closed':
        return 'check-circle';
      case 'document_added':
        return 'file-alt';
      case 'prison_transfer':
        return 'exchange';
      case 'notes_added':
        return 'sticky-note';
      default:
        return 'edit';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'status_update':
        return 'Status Update';
      case 'hearing_update':
        return 'Hearing Date Change';
      case 'lawyer_assignment':
        return 'Lawyer Assignment';
      case 'case_closed':
        return 'Case Closed';
      case 'document_added':
        return 'Document Added';
      case 'prison_transfer':
        return 'Prison Transfer';
      case 'notes_added':
        return 'Notes Added';
      default:
        return 'Modification';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const filteredModifications = filter === 'all' 
    ? modifications 
    : modifications.filter(item => item.type === filter);

  const renderModCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        setSelectedMod(item);
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
        <Text style={styles.caseTitle}>{item.caseTitle}</Text>
      </View>
      
      <View style={styles.modifierContainer}>
        <Icon name="user-edit" size={14} color="#666" />
        <Text style={styles.modifierText}>Modified by {item.modifiedBy}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.viewDetailsButton}
        onPress={() => {
          setSelectedMod(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
        <Icon name="chevron-right" size={14} color="#4A90E2" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFilterChips = () => {
    const filterTypes = [
      { id: 'all', label: 'All Changes' },
      { id: 'status_update', label: 'Status Updates' },
      { id: 'hearing_update', label: 'Hearing Updates' },
      { id: 'lawyer_assignment', label: 'Lawyer Assignments' },
      { id: 'case_closed', label: 'Closed Cases' },
      { id: 'document_added', label: 'Document Updates' }
    ];
    
    return (
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filterTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.filterChip,
              filter === type.id && styles.activeFilterChip
            ]}
            onPress={() => setFilter(type.id)}
          >
            <Text style={[
              styles.filterChipText,
              filter === type.id && styles.activeFilterChipText
            ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderDetailsModal = () => {
    if (!selectedMod) return null;
    
    const renderDetailRow = (label, value) => (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    );
    
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
                <Icon 
                  name={getTypeIcon(selectedMod.type)} 
                  size={20} 
                  color="#4A90E2" 
                />
                <Text style={styles.modalTitle}>{getTypeLabel(selectedMod.type)}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="times" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalDivider} />
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.caseInfoModal}>
                <Text style={styles.caseNumberModal}>{selectedMod.caseNumber}</Text>
                <Text style={styles.caseTitleModal}>{selectedMod.caseTitle}</Text>
              </View>
              
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Modification Details</Text>
                
                {renderDetailRow('Modified By', selectedMod.modifiedBy)}
                {renderDetailRow('Date & Time', formatDate(selectedMod.timestamp))}
                
                {selectedMod.type !== 'document_added' && selectedMod.type !== 'notes_added' && (
                  <>
                    <View style={styles.changeContainer}>
                      <View style={styles.previousValue}>
                        <Text style={styles.changeLabel}>Previous Value</Text>
                        <Text style={styles.changeValue}>{selectedMod.details.previous}</Text>
                      </View>
                      <Icon name="arrow-right" size={16} color="#666" style={styles.arrowIcon} />
                      <View style={styles.currentValue}>
                        <Text style={styles.changeLabel}>Current Value</Text>
                        <Text style={styles.changeValue}>{selectedMod.details.current}</Text>
                      </View>
                    </View>
                  </>
                )}
                
                {(selectedMod.type === 'document_added') && (
                  renderDetailRow('Document Type', selectedMod.details.documentType)
                )}
                
                {(selectedMod.type === 'notes_added') && (
                  renderDetailRow('Note Title', selectedMod.details.noteTitle)
                )}
                
                <View style={styles.reasonContainer}>
                  <Text style={styles.reasonLabel}>Reason for Change</Text>
                  <Text style={styles.reasonText}>{selectedMod.details.reason}</Text>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.footerButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('GovernorCases', { caseNumber: selectedMod.caseNumber });
                }}
              >
                <Icon name="folder-open" size={16} color="#4A90E2" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Go to Case</Text>
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
        <Text style={styles.headerTitle}>Case Modifications</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
        >
          <Icon name="sync-alt" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {renderFilterChips()}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading modifications...</Text>
        </View>
      ) : filteredModifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="history" size={60} color="#CCC" />
          <Text style={styles.emptyText}>No Modifications Found</Text>
          <Text style={styles.emptySubtext}>
            {filter === 'all' 
              ? 'No case modifications have been recorded yet.'
              : `No ${getTypeLabel(filter).toLowerCase()} have been recorded yet.`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredModifications}
          renderItem={renderModCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
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
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    marginBottom: 8,
  },
  filtersContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#4A90E2',
  },
  filterChipText: {
    color: '#666666',
    fontSize: 14,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
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
  modifierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modifierText: {
    color: '#666666',
    fontSize: 14,
    marginLeft: 8,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(74, 144, 226, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewDetailsText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
  closeButton: {
    padding: 4,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
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
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    width: 120,
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  previousValue: {
    flex: 1,
  },
  currentValue: {
    flex: 1,
  },
  arrowIcon: {
    marginHorizontal: 12,
  },
  changeLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  changeValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  reasonContainer: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  reasonLabel: {
    fontSize: 14,
    color: '#F57C00',
    fontWeight: '600',
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 14,
    color: '#333333',
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 16,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GovernorModifications;
