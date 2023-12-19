// BailList.js

import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BailList = () => {
  // Sample data representing persons
  const persons = [
    { id: 1, name: 'John Doe', lawyer: 'Lawyer Smith', caseNumber: 'ABC123' },
    { id: 2, name: 'Jane Doe', lawyer: 'Lawyer Johnson', caseNumber: 'XYZ456' },
    { id: 3, name: 'Alice Johnson', lawyer: 'Lawyer Williams', caseNumber: '123DEF' },
    // Add more persons as needed
  ];

  const handlePersonClick = (person) => {
    // Handle the click event for a person (e.g., navigate to a detailed view)
    console.log(`Clicked on ${person.name} with ID ${person.id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {persons.map((person) => (
          <TouchableOpacity
            key={person.id}
            style={styles.personContainer}
            onPress={() => handlePersonClick(person)}
          >
            <Text style={styles.personName}>{person.name}</Text>
            <Text style={styles.personDetails}>ID: {person.id}</Text>
            <Text style={styles.personDetails}>Lawyer: {person.lawyer}</Text>
            <Text style={styles.personDetails}>Case Number: {person.caseNumber}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  personContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
  },
  personName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  personDetails: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 8,
  },
});

export default BailList;
