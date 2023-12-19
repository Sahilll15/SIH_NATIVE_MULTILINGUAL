import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LawyerList = () => {
  const navigation = useNavigation();

  const lawyers = [
    { id: 1, name: 'Lawyer 1', status: 'Accepted' },
    { id: 2, name: 'Lawyer 2', status: 'Rejected' },
    { id: 3, name: 'Lawyer 3', status: 'Waiting' },
    // Add more lawyers as needed
  ];

  const getTextColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Waiting':
        return 'orange';
      default:
        return 'black';
    }
  };

  const handleStatusClick = (item) => {
    if (item.status === 'Accepted') {
      // Navigate to another page when status is 'Accepted'
      navigation.navigate('LawyerConnect');
    }
  };

  const renderLawyerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lawyerItem}
      onPress={() => handleStatusClick(item)}
    >
      <Text style={styles.lawyerName}>{item.name}</Text>
      <Text style={[styles.lawyerStatus, { color: getTextColor(item.status) }]}>
        Status: {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Contacted Lawyers</Text>
      <FlatList
        data={lawyers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLawyerItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lawyerItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lawyerStatus: {
    fontSize: 16,
  },
});

export default LawyerList;
