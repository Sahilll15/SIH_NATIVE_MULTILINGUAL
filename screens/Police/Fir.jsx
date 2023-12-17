import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Fir = () => {
  const [formData, setFormData] = useState({
    suspect: {
      name: '',
      age: '',
      ipcSections: '',
      address: '',
      contactNumber: '',
      gender: '',
      placeOfOccurrence: '',
    },
    policeOfficerName: '',
    description: '',
    informer: {
      name: '',
      address: '',
      contactNumber: '',
    },
  });

  const handleChange = (field, subfield, value) => {
    setFormData({
      ...formData,
      [field]: { ...formData[field], [subfield]: value },
    });
  };

  const handlePoliceOfficerChange = (value) => {
    setFormData({ ...formData, policeOfficerName: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FIR Form</Text>
      <View style={styles.formContainer}>
        {/* Suspect Section */}
        <Text style={styles.sectionTitle}>Suspect Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => handleChange('suspect', 'name', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => handleChange('suspect', 'age', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="IPC Sections"
          onChangeText={(text) => handleChange('suspect', 'ipcSections', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(text) => handleChange('suspect', 'address', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          onChangeText={(text) => handleChange('suspect', 'contactNumber', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(text) => handleChange('suspect', 'gender', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Place of Occurrence"
          onChangeText={(text) => handleChange('suspect', 'placeOfOccurrence', text)}
          required
        />

        {/* Police Officer Section */}
        <Text style={styles.sectionTitle}>Police Officer Details</Text>
        <Picker
          selectedValue={formData.policeOfficerName}
          onValueChange={(value) => handlePoliceOfficerChange(value)}
          style={styles.input}
        >
          <Picker.Item label="Select Police Officer" value="" />
          <Picker.Item label="Officer 1" value="Officer 1" />
          <Picker.Item label="Officer 2" value="Officer 2" />
          {/* Add more officers as needed */}
        </Picker>

        {/* Description Section */}
        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          multiline
          onChangeText={(text) => handleChange('description', '', text)}
          required
        />

        {/* Informer Section */}
        <Text style={styles.sectionTitle}>Informer Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => handleChange('informer', 'name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(text) => handleChange('informer', 'address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          onChangeText={(text) => handleChange('informer', 'contactNumber', text)}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'10%',
    marginBottom:'10%',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor:'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: '15%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Fir;
