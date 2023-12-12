import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CaseDetail = () => {
  const caseDetails = {
    caseNumber: '12345',
    caseDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    caseStatus: 'Yet to prove',
    chargesImposed: 'Theft, Assault',
    lawyerDetails: {
      name: 'John Doe',
      specialization: 'Criminal Law',
      contact: 'johndoe@example.com',
    },
  };

  return (
    <View style={styles.container}>
      {/* Case Number */}
      <View style={styles.section}>
        <Text style={styles.title}>Case Number:</Text>
        <Text style={styles.content}>{caseDetails.caseNumber}</Text>
      </View>

      {/* Case Details */}
      <View style={styles.section}>
        <Text style={styles.title}>Case Details:</Text>
        <Text style={styles.content}>{caseDetails.caseDetails}</Text>
      </View>

      {/* Case Status */}
      <View style={styles.section}>
        <Text style={styles.title}>Case Status:</Text>
        <Text style={[styles.content, styles.status]}>{caseDetails.caseStatus}</Text>
      </View>

      {/* Charges Imposed */}
      <View style={styles.section}>
        <Text style={styles.title}>Charges Imposed:</Text>
        <Text style={styles.content}>{caseDetails.chargesImposed}</Text>
      </View>

      {/* Lawyer Details */}
      <View style={styles.section}>
        <Text style={styles.title}>Lawyer Details:</Text>
        <Text style={styles.content}>
          Name: {caseDetails.lawyerDetails.name}
          {'\n'}
          Specialization: {caseDetails.lawyerDetails.specialization}
          {'\n'}
          Contact: {caseDetails.lawyerDetails.contact}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom:"10%",
  },
  section: {
    marginBottom: 10,
    marginTop: '10%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  status: {
    color: 'orange', // Change the color as needed for different statuses
    fontWeight: 'bold',
  },
});

export default CaseDetail;
