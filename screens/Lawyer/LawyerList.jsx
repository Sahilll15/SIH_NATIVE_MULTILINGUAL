import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const LawyerList = ({ navigation }) => {
  const { selectedLang, userDetails } = useAuth();
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Fetch lawyers from the API
  const fetchLawyers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response=await axiosInstance.get('/lawyer/getAllLawyers');
      
      console.log('Lawyers data fetched:', response.data.Lawyer.length);
      
      if (response.data && response.data.Lawyer) {
        setLawyers(response.data.Lawyer);
        setFilteredLawyers(response.data.Lawyer);
      } else {
        setError('No lawyers found');
      }
    } catch (err) {
      console.error('Error fetching lawyers:', err);
      setError(`Failed to fetch lawyers: ${err.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch lawyers on component mount
  useEffect(() => {
    fetchLawyers();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchLawyers();
  };

  // Search and filter functionality
  useEffect(() => {
    if (lawyers.length > 0) {
      let results = [...lawyers];
      
      // Apply search filter
      if (searchQuery) {
        results = results.filter(
          lawyer => 
            lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (currentFilter !== 'All') {
        results = results.filter(lawyer => 
          lawyer.specialization === currentFilter
        );
      }
      
      // Apply lawyer type filter (paid vs pro-bono)
      if (typeFilter !== 'All') {
        results = results.filter(lawyer => 
          lawyer.type === typeFilter
        );
      }
      
      setFilteredLawyers(results);
    }
  }, [searchQuery, currentFilter, typeFilter, lawyers]);

  // Handle contact lawyer
  const handleContactLawyer = (lawyer) => {
    Alert.alert(
      selectedLang === 'Hindi' ? 'वकील से संपर्क करें' : 'Contact Lawyer',
      selectedLang === 'Hindi' 
        ? `क्या आप ${lawyer.name} से संपर्क करना चाहते हैं?` 
        : `Would you like to contact ${lawyer.name}?`,
      [
        {
          text: selectedLang === 'Hindi' ? 'रद्द करें' : 'Cancel',
          style: 'cancel',
        },
        {
          text: selectedLang === 'Hindi' ? 'कॉल करें' : 'Call',
          onPress: () => Linking.openURL(`tel:${lawyer.phone}`),
        },
        {
          text: selectedLang === 'Hindi' ? 'ईमेल करें' : 'Email',
          onPress: () => Linking.openURL(`mailto:${lawyer.email}`),
        },
      ],
    );
  };
  
  // Navigate to chat with lawyer
  const handleChatWithLawyer = (lawyer) => {
    // Show contact modal with options
    Alert.alert(
      selectedLang === 'Hindi' ? 'वकील से संवाद करें' : 'Chat with Lawyer',
      selectedLang === 'Hindi' 
        ? `${lawyer.name} के साथ कानूनी सहायता के लिए संवाद शुरू करें?` 
        : `Start a legal assistance conversation with ${lawyer.name}?`,
      [
        {
          text: selectedLang === 'Hindi' ? 'रद्द करें' : 'Cancel',
          style: 'cancel',
        },
        {
          text: selectedLang === 'Hindi' ? 'चैट शुरू करें' : 'Start Chat',
          onPress: () => {
            // Navigate to the new chat feature
            navigation.navigate('Chat', { 
              screen: 'FindLawyer',
              params: { preselectedLawyer: lawyer }
            });
          },
        },
      ],
    );
  };



  // List of specializations for filtering
  const specializations = [
    { id: 'All', nameEn: 'All', nameHi: 'सभी' },
    { id: 'Criminal', nameEn: 'Criminal', nameHi: 'आपराधिक' },
    { id: 'Family', nameEn: 'Family', nameHi: 'पारिवारिक' },
    { id: 'Civil', nameEn: 'Civil', nameHi: 'नागरिक' },
    { id: 'Corporate', nameEn: 'Corporate', nameHi: 'कॉर्पोरेट' },
  ];

  // List of lawyer types for filtering
  const lawyerTypes = [
    { id: 'All', nameEn: 'All Lawyers', nameHi: 'सभी वकील' },
    { id: 'paid', nameEn: 'Paid Lawyers', nameHi: 'सशुल्क वकील' },
    { id: 'pro-bono', nameEn: 'Pro Bono Lawyers', nameHi: 'निःशुल्क वकील' },
  ];

  // Render a lawyer type filter button
  const renderTypeButton = (type) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.typeButton,
        typeFilter === type.id && styles.selectedType,
      ]}
      onPress={() => setTypeFilter(type.id)}
    >
      <Text 
        style={[
          styles.typeText,
          typeFilter === type.id && styles.selectedTypeText,
        ]}
      >
        {selectedLang === 'Hindi' ? type.nameHi : type.nameEn}
      </Text>
    </TouchableOpacity>
  );

  // Render a category filter button
  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        currentFilter === category.id && styles.selectedCategory,
      ]}
      onPress={() => setCurrentFilter(category.id)}
    >
      <Text 
        style={[
          styles.categoryText,
          currentFilter === category.id && styles.selectedCategoryText,
        ]}
      >
        {selectedLang === 'Hindi' ? category.nameHi : category.nameEn}
      </Text>
    </TouchableOpacity>
  );

  // Render a lawyer item in the list
  const renderLawyerItem = ({ item }) => (
    <View style={styles.lawyerCard}>
      <View style={styles.lawyerHeader}>
        <Image 
          source={{ uri: item.image || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.lawyerImage} 
        />
        <View style={styles.lawyerInfo}>
          <Text style={styles.lawyerName}>{item.name}</Text>
          <View style={styles.specializationContainer}>
            <FontAwesome5 name="gavel" size={12} color="#4A90E2" />
            <Text style={styles.specializationText}>{item.specialization}</Text>
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome5 name="map-marker-alt" size={12} color="#4A90E2" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <FontAwesome5 name="star" solid size={12} color="#FFD700" />
        </View>
        {item.type === 'pro-bono' && (
          <View style={styles.proBonoTag}>
            <Text style={styles.proBonoText}>{selectedLang === 'Hindi' ? 'निःशुल्क' : 'PRO BONO'}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.lawyerBody}>
        <Text style={styles.experienceText}>
          {selectedLang === 'Hindi' ? 'अनुभव' : 'Experience'}: {item.experience} {selectedLang === 'Hindi' ? 'वर्ष' : 'years'}
        </Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      
      <View style={styles.lawyerFooter}>
        <View style={styles.feesContainer}>
          <Text style={styles.feesLabel}>{selectedLang === 'Hindi' ? 'फीस' : 'Fees'}:</Text>
          <Text style={styles.feesText}>{item.fees > 0 ? `₹${item.fees}/hr` : (selectedLang === 'Hindi' ? 'निःशुल्क' : 'Free')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => handleChatWithLawyer(item)}
          >
            <FontAwesome5 name="comment" size={14} color="#FFFFFF" />
            <Text style={styles.buttonText}>
              {selectedLang === 'Hindi' ? 'चैट' : 'Chat'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleContactLawyer(item)}
          >
            <FontAwesome5 name="phone-alt" size={14} color="#FFFFFF" />
            <Text style={styles.buttonText}>
              {selectedLang === 'Hindi' ? 'संपर्क' : 'Contact'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedLang === 'Hindi' ? 'वकीलों की सूची' : 'Lawyer Directory'}
        </Text>
        <Text style={styles.subtitle}>
          {selectedLang === 'Hindi' 
            ? 'अपनी आवश्यकता के अनुसार वकील खोजें और संपर्क करें'
            : 'Find and contact lawyers based on your needs'}
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={selectedLang === 'Hindi' ? 'वकील खोजें...' : 'Search lawyers...'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>
          {selectedLang === 'Hindi' ? 'वकील प्रकार' : 'Lawyer Type'}
        </Text>
        <View style={styles.typeContainer}>
          {lawyerTypes.map(type => renderTypeButton(type))}
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <Text style={styles.filterLabel}>
          {selectedLang === 'Hindi' ? 'विशेषज्ञता' : 'Specialization'}
        </Text>
        <FlatList
          horizontal
          data={specializations}
          renderItem={({ item }) => renderCategoryButton(item)}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>
            {selectedLang === 'Hindi' ? 'वकीलों की जानकारी लोड हो रही है...' : 'Loading lawyers...'}
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-circle" size={50} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchLawyers}>
            <Text style={styles.retryButtonText}>
              {selectedLang === 'Hindi' ? 'पुनः प्रयास करें' : 'Retry'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : filteredLawyers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="user-tie" size={50} color="#ccc" />
          <Text style={styles.emptyText}>
            {selectedLang === 'Hindi' ? 'कोई वकील नहीं मिला' : 'No lawyers found'}
          </Text>
          <Text style={styles.emptySubtext}>
            {selectedLang === 'Hindi' 
              ? 'कृपया अपनी खोज को संशोधित करें' 
              : 'Please try modifying your search'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredLawyers}
          renderItem={renderLawyerItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.lawyersList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#4A90E2']}
            />
          }
        />
      )}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  filterContainer: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 16,
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedType: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  proBonoTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#48BB78',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  proBonoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E6ED',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4A5568',
  },
  categoriesContainer: {
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedCategory: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4A5568',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  lawyersList: {
    padding: 16,
  },
  lawyerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lawyerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  lawyerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E2E8F0',
  },
  lawyerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  specializationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  specializationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4A5568',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#718096',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    height: 28,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginRight: 4,
  },
  lawyerBody: {
    marginBottom: 12,
  },
  experienceText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  lawyerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  feesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feesLabel: {
    fontSize: 14,
    color: '#718096',
    marginRight: 4,
  },
  feesText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  contactButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  chatButton: {
    backgroundColor: '#48BB78',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
});

export default LawyerList;
