import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  StatusBar, 
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axiosInstance from '../../utils/axiosInstance';

const GovernorCases = ({ navigation, route }) => {
  const { userDetails } = useAuth();
  const [cases, setCases] = useState(route.params?.cases || []);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [caseUpdates, setCaseUpdates] = useState({
    status: '',
    nextHearingDate: '',
    courtAndJudge: '',
    decisionDate: '',
    caseType: '',
    petitioner: '',
    advocate: '',
    respondent: '',
  });
  const [comment, setComment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Fetch all cases if not provided through route params
  useEffect(() => {
    fetchAllCases();
  }, []);

  // Filter cases when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCases(cases);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = cases.filter(
        caseItem => 
          caseItem.caseNumber?.toLowerCase().includes(lowerCaseQuery) ||
          caseItem.title?.toLowerCase().includes(lowerCaseQuery) ||
          caseItem.priosioner?.name?.toLowerCase().includes(lowerCaseQuery) ||
          caseItem.lawyer?.name?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredCases(filtered);
    }
  }, [searchQuery, cases]);

  // Filter based on selected status
  const filterByStatus = (status) => {
    if (status === 'all') {
      setFilteredCases(cases);
    } else {
      setFilteredCases(cases.filter(item => getCaseStatus(item) === status));
    }
    setSelectedStatus(status);
  };

  const fetchAllCases = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/goverenr/cases');
      
      if (response.data.success) {
        setCases(response.data.cases);
        setFilteredCases(response.data.cases);
        console.log('Cases loaded:', response.data.cases.length);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to fetch cases');
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
      Alert.alert('Error', 'An unexpected error occurred while fetching cases');
    } finally {
      setLoading(false);
    }
  };

  // Format date string to YYYY-MM-DD format
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      return '';
    }
  };

  const handleCasePress = (caseItem) => {
    setSelectedCase(caseItem);
    setCaseUpdates({
      status: getCaseStatus(caseItem),
      nextHearingDate: formatDateForInput(caseItem.cnr_details?.case_status?.next_hearing_date),
      firstHearingDate: formatDateForInput(caseItem.cnr_details?.case_status?.first_hearing_date),
      courtAndJudge: caseItem.cnr_details?.case_status?.court_number_and_judge || '',
      decisionDate: formatDateForInput(caseItem.cnr_details?.case_status?.decision_date),
      caseType: caseItem.cnr_details?.case_details?.case_type || '',
      petitioner: caseItem.cnr_details?.petitioner_and_advocate_details?.petitioner || '',
      advocate: caseItem.cnr_details?.petitioner_and_advocate_details?.advocate || '',
      respondent: caseItem.cnr_details?.respondent_and_advocate_details?.[0]?.split(' - ')?.[0] || '',
    });
    setComment('');
    console.log('Case selected for update:', caseItem._id);
    setIsEditModalVisible(true);
  };

  const handleUpdateCase = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please provide a comment for this update');
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        ...caseUpdates,
        comment: comment
      };
      
      console.log('Sending update data:', updateData);
      console.log('To case ID:', selectedCase._id);

      const response = await axiosInstance.put(
        `/goverenr/cases/${selectedCase._id}`,
        updateData
      );

      if (response.data.success) {
        // Update the case in the local state
        const updatedCases = cases.map(c => 
          c._id === selectedCase._id ? response.data.case : c
        );
        
        setCases(updatedCases);
        setFilteredCases(updatedCases);
        setIsEditModalVisible(false);
        Alert.alert('Success', 'Case updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update case');
      }
    } catch (error) {
      console.error('Error updating case:', error);
      Alert.alert('Error', 'An unexpected error occurred while updating the case');
    } finally {
      setLoading(false);
    }
  };

  // Map case statuses to their display values
  const getCaseStatusLabel = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'active': 'Active',
      'scheduled': 'Scheduled',
      'adjourned': 'Adjourned',
      'cancelled': 'Cancelled',
      'completed': 'Completed',
      'closed': 'Closed'
    };
    return statusMap[status] || status;
  };
  
  // Extract simplified case status from complex case object
  const getCaseStatus = (caseObj) => {
    if (caseObj?.cnr_details?.case_status?.case_stage) {
      return caseObj.cnr_details.case_status.case_stage.toLowerCase();
    }
    return 'pending'; // Default status
  };
  
  // Format date string to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': '#FFC107', // Yellow
      'active': '#4CAF50',  // Green
      'scheduled': '#2196F3', // Blue
      'adjourned': '#FF9800', // Orange
      'cancelled': '#F44336', // Red
      'completed': '#9C27B0', // Purple
      'disposed': '#9C27B0', // Purple (same as completed)
      'closed': '#607D8B'     // Gray
    };
    return colorMap[status] || '#9E9E9E';
  };

  const renderCaseItem = ({ item }) => {
    const statusColor = getStatusColor(getCaseStatus(item));

    return (
      <TouchableOpacity
        style={styles.caseCard}
        onPress={() => handleCasePress(item)}
      >
        <View style={styles.caseHeader}>
          <Text style={styles.caseNumber}>{item.cnr_number || 'No Case Number'}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{getCaseStatusLabel(getCaseStatus(item))}</Text>
          </View>
        </View>

        <Text style={styles.caseTitle}>{item.cnr_details?.case_details?.case_type || 'Untitled Case'}</Text>
        <Text style={styles.caseDescription} numberOfLines={2}>
          {item.cnr_details?.petitioner_and_advocate_details?.petitioner || 'No petitioner'} vs. {item.cnr_details?.respondent_and_advocate_details?.[0]?.split(' - ')?.[0] || 'No respondent'}
        </Text>

        <View style={styles.caseDetail}>
          <Icon name="user" size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            Respondent: {item.cnr_details?.respondent_and_advocate_details?.[0]?.split(' - ')?.[0] || 'Not assigned'}
          </Text>
        </View>

        <View style={styles.caseDetail}>
          <Icon name="gavel" size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            Advocate: {item.cnr_details?.respondent_and_advocate_details?.[0]?.split(' - ')?.[1] || 'Not assigned'}
          </Text>
        </View>
        
        <View style={styles.caseDetail}>
          <Icon name="building" size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            Court: {item.cnr_details?.case_details?.court_name || 'Not specified'}
          </Text>
        </View>

        <View style={styles.caseDetail}>
          <Icon name="calendar-alt" size={16} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            Next Hearing: {formatDate(item.cnr_details?.case_status?.next_hearing_date)}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleCasePress(item)}
        >
          <Text style={styles.editButtonText}>Manage Case</Text>
          <Icon name="edit" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderEditModal = () => {
    if (!selectedCase) return null;

    // Function to validate dates
    const isValidDate = (dateString) => {
      if (!dateString) return true; // Empty is valid (optional)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(dateString)) return false;
      
      const date = new Date(dateString);
      if (!(date instanceof Date) || isNaN(date)) return false;
      
      // Extract parts and verify valid month and date
      const parts = dateString.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      
      // Check month and day validity
      if (month < 1 || month > 12) return false;
      
      // Get last day of month
      const lastDay = new Date(year, month, 0).getDate();
      if (day < 1 || day > lastDay) return false;
      
      return true;
    };

    // Check if required fields are filled
    const validateForm = () => {
      if (!comment.trim()) {
        Alert.alert('Required Field', 'Please provide a comment about this update');
        return false;
      }

      if (caseUpdates.nextHearingDate && !isValidDate(caseUpdates.nextHearingDate)) {
        Alert.alert('Invalid Date', 'Next hearing date must be in YYYY-MM-DD format');
        return false;
      }

      if (caseUpdates.firstHearingDate && !isValidDate(caseUpdates.firstHearingDate)) {
        Alert.alert('Invalid Date', 'First hearing date must be in YYYY-MM-DD format');
        return false;
      }

      return true;
    };

    // Submit form with validation
    const submitForm = () => {
      if (validateForm()) {
        handleUpdateCase();
      }
    };

    return (
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Case</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="times" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalBody}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.modalScrollContent}
            >
              {/* Case Information Card */}
              <View style={styles.caseInfoCard}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Case Number:</Text>
                  <Text style={styles.infoValue}>{selectedCase.cnr_number || 'Not Assigned'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Case Type:</Text>
                  <Text style={styles.infoValue}>{selectedCase.cnr_details?.case_details?.case_type || 'Not Specified'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Current Status:</Text>
                  <View style={[styles.statusBadgeMini, { backgroundColor: getStatusColor(getCaseStatus(selectedCase)) }]}>
                    <Text style={styles.statusTextMini}>{getCaseStatusLabel(getCaseStatus(selectedCase))}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Update Case Status</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>New Status</Text>
                <View style={styles.statusOptions}>
                  {['pending', 'active', 'scheduled', 'adjourned', 'completed', 'closed'].map(status => (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.statusOption,
                        caseUpdates.status === status && styles.selectedStatusOption
                      ]}
                      onPress={() => setCaseUpdates({...caseUpdates, status})}
                    >
                      <View style={[styles.statusDot, { backgroundColor: getStatusColor(status) }]} />
                      <Text style={[
                        styles.statusOptionText,
                        caseUpdates.status === status && styles.selectedStatusOptionText
                      ]}>
                        {getCaseStatusLabel(status)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Text style={styles.sectionTitle}>Hearing Information</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Next Hearing Date</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="calendar-alt" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={caseUpdates.nextHearingDate}
                    onChangeText={(text) => {
                      // Format as user types
                      let formattedText = text.replace(/[^0-9-]/g, '');
                      
                      // Auto-add dashes for better UX
                      if (formattedText.length === 4 && !formattedText.includes('-')) {
                        formattedText += '-';
                      } else if (formattedText.length === 7 && formattedText.lastIndexOf('-') === 4) {
                        formattedText += '-';
                      }
                      
                      // Limit to proper YYYY-MM-DD format length
                      if (formattedText.length <= 10) {
                        setCaseUpdates({...caseUpdates, nextHearingDate: formattedText});
                      }
                    }}
                    placeholder="YYYY-MM-DD"
                    keyboardType="numbers-and-punctuation"
                    maxLength={10}
                  />
                  {caseUpdates.nextHearingDate ? (
                    <TouchableOpacity 
                      style={styles.clearDateButton}
                      onPress={() => setCaseUpdates({...caseUpdates, nextHearingDate: ''})}
                    >
                      <Icon name="times-circle" size={16} color="#999" />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Text style={styles.helperText}>{isValidDate(caseUpdates.nextHearingDate) || !caseUpdates.nextHearingDate ? 'Format: YYYY-MM-DD' : 'Invalid date format'}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>First Hearing Date</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="calendar-alt" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={caseUpdates.firstHearingDate}
                    onChangeText={(text) => {
                      // Format as user types
                      let formattedText = text.replace(/[^0-9-]/g, '');
                      
                      // Auto-add dashes for better UX
                      if (formattedText.length === 4 && !formattedText.includes('-')) {
                        formattedText += '-';
                      } else if (formattedText.length === 7 && formattedText.lastIndexOf('-') === 4) {
                        formattedText += '-';
                      }
                      
                      // Limit to proper YYYY-MM-DD format length
                      if (formattedText.length <= 10) {
                        setCaseUpdates({...caseUpdates, firstHearingDate: formattedText});
                      }
                    }}
                    placeholder="YYYY-MM-DD"
                    keyboardType="numbers-and-punctuation"
                    maxLength={10}
                  />
                  {caseUpdates.firstHearingDate ? (
                    <TouchableOpacity 
                      style={styles.clearDateButton}
                      onPress={() => setCaseUpdates({...caseUpdates, firstHearingDate: ''})}
                    >
                      <Icon name="times-circle" size={16} color="#999" />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Text style={[styles.helperText, !isValidDate(caseUpdates.firstHearingDate) && caseUpdates.firstHearingDate ? styles.errorText : null]}>
                  {isValidDate(caseUpdates.firstHearingDate) || !caseUpdates.firstHearingDate ? 'Format: YYYY-MM-DD' : 'Invalid date format'}
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Court and Judge</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="gavel" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    value={caseUpdates.courtAndJudge}
                    onChangeText={(text) => setCaseUpdates({...caseUpdates, courtAndJudge: text})}
                    placeholder="Court number and judge name"
                  />
                </View>
              </View>

              <Text style={styles.sectionTitle}>Case Details</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Case Type</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="folder-open" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    value={caseUpdates.caseType}
                    onChangeText={(text) => setCaseUpdates({...caseUpdates, caseType: text})}
                    placeholder="Criminal/Civil/etc."
                  />
                </View>
              </View>

              <Text style={styles.sectionTitle}>Parties Information</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Petitioner</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    value={caseUpdates.petitioner}
                    onChangeText={(text) => setCaseUpdates({...caseUpdates, petitioner: text})}
                    placeholder="Petitioner name"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Petitioner's Advocate</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="user-tie" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    value={caseUpdates.advocate}
                    onChangeText={(text) => setCaseUpdates({...caseUpdates, advocate: text})}
                    placeholder="Advocate name"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Respondent</Text>
                <View style={styles.dateInputWrapper}>
                  <Icon name="user" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    value={caseUpdates.respondent}
                    onChangeText={(text) => setCaseUpdates({...caseUpdates, respondent: text})}
                    placeholder="Respondent name"
                  />
                </View>
              </View>

              <View style={styles.commentSection}>
                <Text style={styles.commentTitle}>Comments <Text style={styles.requiredAsterisk}>*</Text></Text>
                <Text style={styles.commentHelper}>Please provide a comment explaining your update</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Add a comment about this update"
                  multiline
                  numberOfLines={4}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.updateButton, loading && styles.disabledButton]}
                onPress={submitForm}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.updateButtonText}>Update Case</Text>
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
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Cases</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={fetchAllCases}
        >
          <Icon name="sync-alt" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by case number, title, name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="times-circle" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading && !filteredCases.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading cases...</Text>
        </View>
      ) : (
        <>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{filteredCases.length}</Text>
              <Text style={styles.statLabel}>Total Cases</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {filteredCases.filter(c => getCaseStatus(c) === 'active').length}
              </Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {filteredCases.filter(c => getCaseStatus(c) === 'pending').length}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {filteredCases.filter(c => getCaseStatus(c) === 'closed').length}
              </Text>
              <Text style={styles.statLabel}>Closed</Text>
            </View>
          </View>
          
          {filteredCases.length > 0 ? (
            <FlatList
              data={filteredCases}
              renderItem={renderCaseItem}
              keyExtractor={(item) => item._id.toString()}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="folder-open" size={50} color="#CCC" />
              <Text style={styles.emptyText}>No cases found</Text>
              <Text style={styles.emptySubtext}>
                {searchQuery ? 'Try a different search term' : 'Cases will appear here'}
              </Text>
            </View>
          )}
        </>
      )}

      {renderEditModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Case info card styles
  caseInfoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  statusBadgeMini: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  statusTextMini: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  // Input with icon wrapper
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 4,
    paddingRight: 4,
  },
  textInputWithIcon: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  inputIcon: {
    marginRight: 10,
  },
  // Status selection styles
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  // Helper text style
  helperText: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
    marginLeft: 2,
    marginBottom: 4,
  },
  errorText: {
    color: '#FF3B30',
  },
  clearDateButton: {
    padding: 4,
    marginLeft: 4,
  },
  modalScrollContent: {
    paddingBottom: 24,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  // Comment section styles
  commentSection: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  requiredAsterisk: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  commentHelper: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  selectedStatusOption: {
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedStatusOptionText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  cancelButtonText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0C1E7',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  caseDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  caseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#555555',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
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
    color: '#666666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxHeight: '85%', // Reduce max height to ensure it fits on smaller screens
    paddingTop: 15,
    paddingBottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  modalBody: {
    padding: 16,
    paddingBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginTop: 14,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
  },
  statusOption: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: 6,
  },
  selectedStatusButton: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  statusButtonText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  selectedStatusButtonText: {
    color: '#FFFFFF',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default GovernorCases;
