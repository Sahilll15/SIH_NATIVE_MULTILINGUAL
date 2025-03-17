import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import baseUrl from '../../config';

const CaseDashboard = ({ navigation }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { selectedLang, user } = useAuth();

  const fetchCases = async () => {
    try {
      const response = await axios.get(`${baseUrl}/case/get-cases/${user._id}`);
      setCases(response.data.cases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCases();
  };

  const filteredCases = cases.filter(caseItem =>
    caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.crimeType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFA500';
      case 'active':
        return '#4CAF50';
      case 'closed':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const CaseCard = ({ caseItem }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CaseDetail', { caseId: caseItem._id })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.caseNumberContainer}>
          <Text style={styles.caseNumber}>#{caseItem.caseNumber}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(caseItem.status) }]}>
            <Text style={styles.statusText}>{caseItem.status}</Text>
          </View>
        </View>
        <Text style={styles.crimeType}>{caseItem.crimeType}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <FontAwesome5 name="calendar-alt" size={14} color="#7F8C8D" />
          <Text style={styles.infoText}>
            {new Date(caseItem.filingDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#7F8C8D" />
          <Text style={styles.infoText}>{caseItem.court}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <FontAwesome5 name="gavel" size={14} color="#4A90E2" />
          <Text style={styles.lawyerName}>{caseItem.lawyer?.name || 'No Lawyer Assigned'}</Text>
        </View>
        <FontAwesome5 name="chevron-right" size={14} color="#A0A0A0" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedLang === 'Hindi' ? 'केस डैशबोर्ड' : 'Case Dashboard'}
        </Text>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={selectedLang === 'Hindi' ? 'केस नंबर या अपराध प्रकार खोजें' : 'Search by case number or crime type'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#A0A0A0"
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.casesContainer}>
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <CaseCard key={caseItem._id} caseItem={caseItem} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <FontAwesome5 name="folder-open" size={48} color="#A0A0A0" />
                <Text style={styles.emptyText}>
                  {selectedLang === 'Hindi' ? 'कोई केस नहीं मिला' : 'No cases found'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddCase')}
      >
        <FontAwesome5 name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 24 : 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  scrollView: {
    flex: 1,
  },
  casesContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    marginBottom: 12,
  },
  caseNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  caseNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  crimeType: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  cardBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E9ECEF',
    paddingVertical: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7F8C8D',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerName: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7F8C8D',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default CaseDashboard;
