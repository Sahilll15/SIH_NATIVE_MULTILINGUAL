import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import baseUrl from '../../config'

import axios from 'axios'

const Fir = () => {
  const [accusedName, setAccusedName] = useState("");
  const [accusedAge, setAccusedAge] = useState("");
  const [sections, setSections] = useState([]);
  const [accusedAddress, setAccusedAddress] = useState("");
  const [accusedContactNumber, setAccusedContactNumber] = useState("");
  const [accusedAddharCard, setAccusedAddharCard] = useState("");
  const [accusedGender, setAccusedGender] = useState("");
  const [firPlace, setFirPlace] = useState("");
  const [policeName, setPoliceName] = useState("");
  const [firDescription, setFirDescription] = useState("");
  const [informerName, setInformerName] = useState("");
  const [informerAddress, setInformerAddress] = useState("");
  const [informerContactNumber, setInformerContactNumber] = useState(0);


  const handleChange = (field, value) => {
    switch (field) {
      case 'accusedName':
        setAccusedName(value);
        break;
      case 'accusedAge':
        setAccusedAge(value);
        break;
      case 'sections':
        setSections(value.split(", "));
        break;
      case 'accusedAddress':
        setAccusedAddress(value);
        break;
      case 'accusedContactNumber':
        setAccusedContactNumber(value);
        break;
      case 'accusedAddharCard':
        setAccusedAddharCard(value);
        break;
      case 'accusedGender':
        setAccusedGender(value);
        break;
      case 'firPlace':
        setFirPlace(value);
        break;
      case 'policeName':
        setPoliceName(value);
        break;
      case 'firDescription':
        setFirDescription(value);
        break;
      case 'informerName':
        setInformerName(value);
        break;
      case 'informerAddress':
        setInformerAddress(value);
        break;
      case 'informerContactNumber':
        setInformerContactNumber(value);
        break;
      default:
        break;
    }
  };

  const submitFir = async () => {
    const formData = {
      accusedName,
      accusedAge,
      sections,
      accusedAddress,
      accusedContactNumber,
      accusedAddharCard,
      accusedGender,
      firPlace,
      policeName,
      firDescription,
      informer: {
        name: informerName,
        address: informerAddress,
        contactNumber: informerContactNumber
      }
    };

    try {
      const response = await axios.post(`${baseUrl}/fir/createFir`, formData)

      if (response.status === 200) {
        Alert.alert('FIR created')
      } else {
        Alert.alert('FIR not created')
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {

    console.log('Form submitted');
    await submitFir();

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
          value={accusedName}
          onChangeText={(text) => handleChange('accusedName', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={accusedAge}
          onChangeText={(text) => handleChange('accusedAge', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="IPC Sections"
          value={sections.join(", ")}
          onChangeText={(text) => handleChange('sections', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={accusedAddress}
          onChangeText={(text) => handleChange('accusedAddress', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={accusedContactNumber}
          onChangeText={(text) => handleChange('accusedContactNumber', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="AadharCard"
          value={accusedAddharCard}
          onChangeText={(text) => handleChange('accusedAddharCard', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="AadharCard"
          onChangeText={(text) => handleChange('suspect', 'aadhar', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={accusedGender}
          onChangeText={(text) => handleChange('accusedGender', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Place of Occurrence"
          value={firPlace}
          onChangeText={(text) => handleChange('firPlace', text)}
          required
        />

        {/* Police Officer Section */}
        <Text style={styles.sectionTitle}>Police Officer Details</Text>
        <Picker
          selectedValue={policeName}
          onValueChange={(value) => handleChange('policeName', value)}
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
          value={firDescription}
          onChangeText={(text) => handleChange('firDescription', text)}
          required
        />

        {/* Informer Section */}
        <Text style={styles.sectionTitle}>Informer Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={informerName}
          onChangeText={(text) => handleChange('informerName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={informerAddress}
          onChangeText={(text) => handleChange('informerAddress', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={informerContactNumber}
          onChangeText={(text) => handleChange('informerContactNumber', text)}
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
    marginTop: '10%',
    marginBottom: '10%',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
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
