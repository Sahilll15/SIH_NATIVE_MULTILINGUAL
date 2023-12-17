// CasesPage.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CasesPage = () => {
  // Dummy data for testing
  const casesData = [
    { id: '1', caseNumber: 'CASE001', description: 'Lorem ipsum dolor sit amet.' },
    { id: '2', caseNumber: 'CASE002', description: 'Consectetur adipiscing elit.' },
    // Add more cases as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>All Cases</Text>
      <FlatList
        data={casesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.caseItem}>
            <Text style={styles.caseNumber}>Case Number: {item.caseNumber}</Text>
            <Text style={styles.caseDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  caseItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  caseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caseDescription: {
    fontSize: 16,
  },
});

export default CasesPage;
