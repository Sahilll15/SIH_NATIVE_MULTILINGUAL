import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LawyerDetailsPage = () => {
  // Dummy data for lawyer details
  const lawyerDetails = {
    id: '1',
    name: 'John Doe',
    contactNo: '+1234567890',
    licenseNumber: 'ABCD1234',
    approxCharge: '$200/hour',
    profilePic: 'https://cdn-icons-png.flaticon.com/256/1995/1995429.png',
  };

  // Dummy data for case dropdown
  const [selectedCase, setSelectedCase] = useState('Criminal Case');
  const caseOptions = ['Criminal Case', 'Civil Case', 'Family Law', 'Personal Injury'];

  const handleContactLawyer = () => {
    // Implement logic to contact the lawyer
    console.log('Contacting lawyer...');
  };

  return (
    <View style={styles.container}>
      {/* Lawyer Details */}
      <View style={styles.lawyerDetails}>
        <Image source={{ uri: lawyerDetails.profilePic }} style={styles.profilePic} />
        <View style={styles.detailsText}>
          <Text style={styles.lawyerName}>{lawyerDetails.name}</Text>
          <Text>Contact: {lawyerDetails.contactNo}</Text>
          <Text>License Number: {lawyerDetails.licenseNumber}</Text>
          <Text>Approx. Charge: {lawyerDetails.approxCharge}</Text>
        </View>
      </View>

      {/* Case Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text>Select Case:</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedCase}
            onValueChange={(itemValue) => setSelectedCase(itemValue)}
            style={styles.picker}
          >
            {caseOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Contact Lawyer Button */}
      <TouchableOpacity style={styles.contactButton} onPress={handleContactLawyer}>
        <Text style={styles.contactButtonText}>Contact Lawyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: '15%',
  },
  lawyerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  detailsText: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ecf0f1', // Background color of the dropdown
  },
  picker: {
    color: '#3498db', // Color of the selected item
  },
  contactButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LawyerDetailsPage;
