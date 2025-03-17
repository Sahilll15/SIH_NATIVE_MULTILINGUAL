import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import { useLawyer } from '../../Context/LawyerContext';
import { useAuth } from '../../Context/AuthContext';
import { lawyerListPage } from '../../utils';
import baseUrl from '../../config';

const LawyerListPage = ({ navigation }) => {

  const { selectedLang } = useAuth();
  const [lawyers, setLawyers] = useState([]);

  const { currentLawyer, setCurrentLawyerFunction } = useLawyer()

  const profilePic = 'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg'
  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/lawyer/getAllLawyers`);
      console.log(response.data)

      if (response.status === 200) {
        setLawyers(response.data.Lawyer)
        console.log(response.data.Lawyer)
      }

    } catch (error) {
      console.log(error)
      Alert.alert(error.response.data.message)

    }
  }

  useEffect(() => {
    fetchLawyers();
  }, [])

  const LawyerProfile = () => {

    navigation.navigate('LawyerSelect');
  };
  const [currentFilter, setCurrentFilter] = useState('All');

  const renderLawyerItem = ({ item }) => (
    <TouchableOpacity style={styles.lawyerItem} onPress={() => {
      setCurrentLawyerFunction(item)
      navigation.navigate('LawyerSelect')
    }}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
      <View style={styles.lawyerInfo}>
        <Text style={styles.lawyerName}>{item.name}</Text>
        <Text style={styles.lawyerType}>{item.LicenseNumber}</Text>
      </View>
    </TouchableOpacity>
  );



  // Function to filter lawyers based on the current filter
  const filterLawyers = () => {
    if (currentFilter === 'All') {
      return lawyers;
    } else {
      return lawyers.filter((lawyer) => lawyer.type === currentFilter);
    }
  };

  // Function to handle sorting button press
  const handleSort = (filter) => {
    setCurrentFilter(filter);
  };




  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.sortButton, currentFilter === 'All' && styles.activeSortButton]} onPress={() => handleSort('All')}>
          <FontAwesome5 name="globe" size={20} color={currentFilter === 'All' ? '#fff' : '#3498db'} />
          <Text style={[styles.buttonText, currentFilter === 'All' && styles.activeButtonText]}>{
            selectedLang === 'Hindi'
              ? lawyerListPage[0].Hindi
              : lawyerListPage[0].English
          }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, currentFilter === 'Pro Bono' && styles.activeSortButton]} onPress={() => handleSort('Pro Bono')}>
          <FontAwesome5 name="handshake" size={20} color={currentFilter === 'Pro Bono' ? '#fff' : '#3498db'} />
          <Text style={[styles.buttonText, currentFilter === 'Pro Bono' && styles.activeButtonText]}>{
            selectedLang === 'Hindi'
              ? lawyerListPage[1].Hindi
              : lawyerListPage[1].English

          }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, currentFilter === 'Private' && styles.activeSortButton]} onPress={() => handleSort('Private')}>
          <FontAwesome5 name="briefcase" size={20} color={currentFilter === 'Private' ? '#fff' : '#3498db'} />
          <Text style={[styles.buttonText, currentFilter === 'Private' && styles.activeButtonText]}>{
            selectedLang === 'Hindi'
              ? lawyerListPage[2].Hindi
              : lawyerListPage[2].English
          }</Text>
        </TouchableOpacity>
      </View>

      {/* Display list of lawyers */}
      <FlatList

        data={filterLawyers()}
        keyExtractor={(item) => item.id}
        renderItem={renderLawyerItem}

        style={styles.lawyerList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: '0%',
    // backgroundColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },
  activeSortButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#3498db',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  activeButtonText: {
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lawyerList: {
    marginTop: 10,
  },
  lawyerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  lawyerInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lawyerType: {
    fontSize: 14,
    color: '#888',
  },
});

export default LawyerListPage;
