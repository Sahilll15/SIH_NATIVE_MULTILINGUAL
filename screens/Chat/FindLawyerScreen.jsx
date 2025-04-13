import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from '../../Context/TranslationContext';

const FindLawyerScreen = ({ navigation, route }) => {
  const { userDetails } = useAuth();
  const { translate, currentLanguage } = useTranslation();
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const { caseId, preselectedLawyer } = route.params || {};
  
  // Handle preselected lawyer from LawyerList
  useEffect(() => {
    if (preselectedLawyer) {
      // Transform lawyer data if needed to match expected format
      const formattedLawyer = {
        _id: preselectedLawyer._id,
        name: preselectedLawyer.name,
        specialization: preselectedLawyer.specialization || 'General',
        languages: preselectedLawyer.languages || ['English'],
        experience: preselectedLawyer.experience || '0',
        rating: preselectedLawyer.rating || 5,
        profileImage: preselectedLawyer.image || null
      };
      
      setSelectedLawyer(formattedLawyer);
      setContactModalVisible(true);
      
      // Set appropriate initial message
      setContactMessage(translate('I need legal assistance with my case.'));
    }
  }, [preselectedLawyer, translate]);
  
  // Predefined lists for filters
  const specializations = [
    'Criminal', 
    'Civil', 
    'Family', 
    'Constitutional', 
    'Corporate', 
    'Property', 
    'Intellectual Property',
    'General'
  ];
  
  const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu'];
  
  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/chat/lawyers');
      
      if (response.data.success) {
        setLawyers(response.data.lawyers);
        setFilteredLawyers(response.data.lawyers);
      } else {
        Alert.alert(translate('Error'), translate('Failed to fetch lawyers'));
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      Alert.alert(translate('Error'), translate('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLawyers();
  }, []);
  
  useEffect(() => {
    if (searchQuery || selectedSpecialization || selectedLanguage) {
      filterLawyers();
    } else {
      setFilteredLawyers(lawyers);
    }
  }, [searchQuery, selectedSpecialization, selectedLanguage, lawyers]);
  
  const filterLawyers = () => {
    let filtered = [...lawyers];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lawyer => 
        lawyer.name?.toLowerCase().includes(query)
      );
    }
    
    if (selectedSpecialization) {
      filtered = filtered.filter(lawyer => 
        lawyer.specialization?.includes(selectedSpecialization)
      );
    }
    
    if (selectedLanguage) {
      filtered = filtered.filter(lawyer => 
        lawyer.languages?.includes(selectedLanguage)
      );
    }
    
    setFilteredLawyers(filtered);
  };
  
  const contactLawyer = async () => {
    if (!selectedLawyer) return;
    
    if (!contactMessage.trim()) {
      Alert.alert(translate('Error'), translate('Please provide a message for the lawyer'));
      return;
    }
    
    try {
      setContactLoading(true);
      
      const response = await axiosInstance.post('/chat/request-lawyer', {
        lawyerId: selectedLawyer._id,
        caseId: caseId,
        message: contactMessage
      });
      
      if (response.data.success) {
        setContactModalVisible(false);
        Alert.alert(
          translate('Success'),
          translate('Your request has been sent to the lawyer.'),
          [
            {
              text: translate('View Conversation'),
              onPress: () => {
                navigation.navigate('ChatDetail', {
                  conversationId: response.data.conversation._id,
                  otherUser: selectedLawyer
                });
              }
            }
          ]
        );
      } else {
        Alert.alert(translate('Error'), translate('Failed to send request to lawyer'));
      }
    } catch (error) {
      console.error('Error contacting lawyer:', error);
      Alert.alert(translate('Error'), translate('An unexpected error occurred'));
    } finally {
      setContactLoading(false);
    }
  };
  
  const renderLawyerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lawyerCard}
      onPress={() => {
        setSelectedLawyer(item);
        setContactModalVisible(true);
      }}
    >
      {item.profileImage ? (
        <Image
          source={{ uri: item.profileImage }}
          style={styles.lawyerImage}
        />
      ) : (
        <View style={[styles.lawyerImage, styles.defaultAvatar]}>
          <Icon name="user-tie" size={24} color="#FFFFFF" />
        </View>
      )}
      
      <View style={styles.lawyerInfo}>
        <Text style={styles.lawyerName}>{item.name}</Text>
        
        <View style={styles.lawyerDetail}>
          <Icon name="briefcase" size={14} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            {translate('Specialization')}: {item.specialization || translate('General')}
          </Text>
        </View>
        
        <View style={styles.lawyerDetail}>
          <Icon name="language" size={14} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            {translate('Languages')}: {(item.languages || ['English']).join(', ')}
          </Text>
        </View>
        
        <View style={styles.lawyerDetail}>
          <Icon name="graduation-cap" size={14} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            {translate('Experience')}: {item.experience || '0'} {translate('years')}
          </Text>
        </View>
        
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            <Icon name="star" size={12} color="#FFC107" />
          </View>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => {
          setSelectedLawyer(item);
          setContactModalVisible(true);
        }}
      >
        <Text style={styles.contactButtonText}>{translate('Contact')}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  const renderFilterModal = () => (
    <Modal
      visible={filterVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setFilterVisible(false)}
    >
      <View style={styles.filterModalContainer}>
        <View style={styles.filterModalContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>{translate('Filter Lawyers')}</Text>
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.filterLabel}>{translate('Specialization')}</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                !selectedSpecialization && styles.selectedChip
              ]}
              onPress={() => setSelectedSpecialization('')}
            >
              <Text
                style={[
                  styles.chipText,
                  !selectedSpecialization && styles.selectedChipText
                ]}
              >
                {translate('All')}
              </Text>
            </TouchableOpacity>
            
            {specializations.map(specialization => (
              <TouchableOpacity
                key={specialization}
                style={[
                  styles.chip,
                  selectedSpecialization === specialization && styles.selectedChip
                ]}
                onPress={() => setSelectedSpecialization(specialization)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedSpecialization === specialization && styles.selectedChipText
                  ]}
                >
                  {translate(specialization)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.filterLabel}>{translate('Language')}</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                !selectedLanguage && styles.selectedChip
              ]}
              onPress={() => setSelectedLanguage('')}
            >
              <Text
                style={[
                  styles.chipText,
                  !selectedLanguage && styles.selectedChipText
                ]}
              >
                {translate('All')}
              </Text>
            </TouchableOpacity>
            
            {languages.map(language => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.chip,
                  selectedLanguage === language && styles.selectedChip
                ]}
                onPress={() => setSelectedLanguage(language)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedLanguage === language && styles.selectedChipText
                  ]}
                >
                  {translate(language)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSelectedSpecialization('');
                setSelectedLanguage('');
              }}
            >
              <Text style={styles.resetButtonText}>{translate('Reset')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.applyButtonText}>{translate('Apply Filters')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  
  const renderContactModal = () => (
    <Modal
      visible={contactModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setContactModalVisible(false)}
    >
      <View style={styles.contactModalContainer}>
        <View style={styles.contactModalContent}>
          <View style={styles.contactHeader}>
            <Text style={styles.contactTitle}>
              {translate('Contact')} {selectedLawyer?.name}
            </Text>
            <TouchableOpacity
              onPress={() => setContactModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="times" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.contactLabel}>
            {translate('Explain why you need legal assistance')}:
          </Text>
          <TextInput
            style={styles.contactMessageInput}
            value={contactMessage}
            onChangeText={setContactMessage}
            placeholder={translate('Describe your legal issue...')}
            multiline
            textAlignVertical="top"
            numberOfLines={6}
          />
          
          <View style={styles.contactActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setContactModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>{translate('Cancel')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sendRequestButton,
                (!contactMessage.trim() || contactLoading) && styles.disabledButton
              ]}
              onPress={contactLawyer}
              disabled={!contactMessage.trim() || contactLoading}
            >
              {contactLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.sendRequestButtonText}>
                  {translate('Send Request')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  
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
        <Text style={styles.headerTitle}>{translate('Find a Lawyer')}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={translate('Search for lawyers...')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Icon name="filter" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>
      
      {selectedSpecialization || selectedLanguage ? (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersLabel}>{translate('Active filters')}:</Text>
          <View style={styles.activeFiltersChips}>
            {selectedSpecialization && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterChipText}>
                  {translate(selectedSpecialization)}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedSpecialization('')}
                  style={styles.removeFilterButton}
                >
                  <Icon name="times" size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
            
            {selectedLanguage && (
              <View style={styles.activeFilterChip}>
                <Text style={styles.activeFilterChipText}>
                  {translate(selectedLanguage)}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedLanguage('')}
                  style={styles.removeFilterButton}
                >
                  <Icon name="times" size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : null}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>{translate('Finding lawyers...')}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredLawyers}
          renderItem={renderLawyerItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.lawyersList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="user-tie" size={60} color="#CCCCCC" />
              <Text style={styles.emptyText}>
                {translate('No lawyers found')}
              </Text>
              <Text style={styles.emptySubtext}>
                {translate('Try adjusting your filters or search criteria')}
              </Text>
            </View>
          }
        />
      )}
      
      {renderFilterModal()}
      {selectedLawyer && renderContactModal()}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  activeFiltersLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  activeFiltersChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 6,
  },
  removeFilterButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
  lawyersList: {
    padding: 16,
    paddingTop: 0,
  },
  lawyerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
  },
  lawyerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  defaultAvatar: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawyerInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  lawyerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 8,
    width: 16,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 4,
  },
  contactButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 60,
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
    textAlign: 'center',
    marginTop: 8,
  },
  filterModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  chip: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#4A90E2',
  },
  chipText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contactModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '90%',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  contactLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
  },
  contactMessageInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    height: 120,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  sendRequestButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sendRequestButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});

export default FindLawyerScreen;
