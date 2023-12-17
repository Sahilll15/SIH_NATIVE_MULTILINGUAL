import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';

const NewCase = ({navigation}) => {
  // Dummy data for new cases
  const newCasesData = [
    { firNumber: '2023/001', lawyerName: 'John Doe' },
    { firNumber: '2023/002', lawyerName: 'Jane Smith' },
    { firNumber: '2023/003', lawyerName: 'Bob Johnson' },
    // Add more cases as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {newCasesData.map((caseData, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('NewCaseDoc')}>
          <Text style={styles.firNumber}>{`FIR Number: ${caseData.firNumber}`}</Text>
          <Text style={styles.lawyerName}>{`Lawyer Name: ${caseData.lawyerName}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  firNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lawyerName: {
    fontSize: 16,
    color: '#666',
  },
});

export default NewCase;
