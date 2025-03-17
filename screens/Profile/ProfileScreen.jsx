import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    id: 'UTK123456',
    age: 32,
    gender: 'Male',
    address: '123 Main Street, Mumbai, Maharashtra',
    dateOfArrest: '2024-01-15',
    nextHearing: '2025-04-20',
    caseStatus: 'Under Trial'
  });

  const [cases, setCases] = useState([
    {
      id: '1',
      caseNumber: 'CR123/2024',
      court: 'Mumbai High Court',
      charges: 'Section 302 IPC',
      status: 'Pending',
      nextHearing: '2025-04-20',
      advocate: 'Adv. Rajesh Kumar'
    },
    {
      id: '2',
      caseNumber: 'CR124/2024',
      court: 'Sessions Court, Mumbai',
      charges: 'Section 420 IPC',
      status: 'Under Investigation',
      nextHearing: '2025-05-15',
      advocate: 'Adv. Priya Singh'
    }
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch updated data here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=4A90E2&color=fff&size=120' }}
            style={styles.profileImage}
            defaultSource={{ uri: 'https://ui-avatars.com/api/?name=User&background=4A90E2&color=fff&size=120' }}
          />
        </View>
        <Text style={styles.name}>{userDetails.name}</Text>
        <Text style={styles.id}>ID: {userDetails.id}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="user" size={20} color="#666" />
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>{userDetails.age} years</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="venus-mars" size={20} color="#666" />
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>{userDetails.gender}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker-alt" size={20} color="#666" />
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{userDetails.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar-minus" size={20} color="#666" />
            <Text style={styles.infoLabel}>Date of Arrest:</Text>
            <Text style={styles.infoValue}>{userDetails.dateOfArrest}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="gavel" size={20} color="#666" />
            <Text style={styles.infoLabel}>Next Hearing:</Text>
            <Text style={styles.infoValue}>{userDetails.nextHearing}</Text>
          </View>
        </View>
      </View>

      <View style={styles.casesSection}>
        <Text style={styles.sectionTitle}>My Cases</Text>
        <FlatList
          data={cases}
          renderItem={renderCaseItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
