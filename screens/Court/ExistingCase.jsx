import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { existingCase } from '../../utils';

const ExistingCase = ({ navigation }) => {
  // Dummy data for new cases

  const { selectedLang } = useAuth();

  const newCasesData = [
    { caseNumber: 'sh122', lawyerName: 'John Doe', clientName: 'sahil' },
    { caseNumber: 'sh2321', lawyerName: 'Jane Smith', clientName: 'sahil' },
    { caseNumber: 'dsadd8877', lawyerName: 'Bob Johnson', clientName: 'sahil' },
    { caseNumber: 'sh122', lawyerName: 'John Doe', clientName: 'sahil' },
    { caseNumber: 'sh2321', lawyerName: 'Jane Smith', clientName: 'sahil' },
    { caseNumber: 'dsadd8877', lawyerName: 'Bob Johnson', clientName: 'sahil' },
    { caseNumber: 'sh122', lawyerName: 'John Doe', clientName: 'sahil' },
    { caseNumber: 'sh2321', lawyerName: 'Jane Smith', clientName: 'sahil' },
    { caseNumber: 'dsadd8877', lawyerName: 'Bob Johnson', clientName: 'sahil' },
    // Add more cases as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} >
      {newCasesData.map((caseData, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('CaseChat')}>
          <Text style={styles.firNumber}>{`${selectedLang === 'Hindi' ? existingCase[0].Hindi : existingCase[0].English}: ${caseData.caseNumber}`}</Text>
          <Text style={styles.lawyerName}>{`${selectedLang === 'Hindi' ? existingCase[1].Hindi : existingCase[1].English}: ${caseData.lawyerName}`}</Text>
          <Text style={styles.clientName}>{`${selectedLang === 'Hindi' ? existingCase[2].Hindi : existingCase[2].English}: ${caseData.clientName}`}</Text>

        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
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
  clientName: {
    fontSize: 12
  }
});

export default ExistingCase;
