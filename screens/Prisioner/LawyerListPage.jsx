import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const LawyerListPage = () => {
  // Dummy data for the list of lawyers
  const [lawyers, setLawyers] = useState([
    { id: '1', name: 'John Doe', type: 'Pro Bono', profilePic: 'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg' },
    { id: '2', name: 'Jane Smith', type: 'Private', profilePic: 'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg' },
    // Add more lawyer data as needed
  ]);

  // State to track the current filter (Pro Bono, Private, or All)
  const [currentFilter, setCurrentFilter] = useState('All');

  const renderLawyerItem = ({ item }) => (
    <TouchableOpacity style={styles.lawyerItem} onPress={() => console.log(`Navigate to lawyer profile: ${item.name}`)}>
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.lawyerInfo}>
        <Text style={styles.lawyerName}>{item.name}</Text>
        <Text style={styles.lawyerType}>{item.type}</Text>
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
          <Text style={[styles.buttonText, currentFilter === 'All' && styles.activeButtonText]}>All Lawyers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, currentFilter === 'Pro Bono' && styles.activeSortButton]} onPress={() => handleSort('Pro Bono')}>
          <FontAwesome5 name="handshake" size={20} color={currentFilter === 'Pro Bono' ? '#fff' : '#3498db'} />
          <Text style={[styles.buttonText, currentFilter === 'Pro Bono' && styles.activeButtonText]}>Pro Bono</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, currentFilter === 'Private' && styles.activeSortButton]} onPress={() => handleSort('Private')}>
          <FontAwesome5 name="briefcase" size={20} color={currentFilter === 'Private' ? '#fff' : '#3498db'} />
          <Text style={[styles.buttonText, currentFilter === 'Private' && styles.activeButtonText]}>Private</Text>
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
    backgroundColor: '#e5e7eb',
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
