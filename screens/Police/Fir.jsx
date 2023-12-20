import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import baseUrl from '../../config'

import axios from 'axios'
import { useAuth } from '../../Context/AuthContext';
import { fir } from '../../utils';

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

  const { selectedLang
  } = useAuth();

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
      <Text style={styles.title}>{selectedLang === 'Hindi' ? fir[0].Hindi : fir[0].English}</Text>
      <View style={styles.formContainer}>
        {/* Suspect Section */}
        <Text style={styles.sectionTitle}>{selectedLang === 'Hindi' ? fir[1].Hindi : fir[1].English}</Text>
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[2].Hindi : fir[2].English}
          value={accusedName}
          onChangeText={(text) => handleChange('accusedName', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[3].Hindi : fir[3].English}

          value={accusedAge}
          onChangeText={(text) => handleChange('accusedAge', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[4].Hindi : fir[4].English}
          value={sections.join(", ")}
          onChangeText={(text) => handleChange('sections', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[5].Hindi : fir[5].English}
          value={accusedAddress}
          onChangeText={(text) => handleChange('accusedAddress', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[6].Hindi : fir[6].English}
          value={accusedContactNumber}
          onChangeText={(text) => handleChange('accusedContactNumber', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[7].Hindi : fir[7].English}
          value={accusedAddharCard}
          onChangeText={(text) => handleChange('accusedAddharCard', text)}
          required
        />

        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[9].Hindi : fir[9].English}
          value={accusedGender}
          onChangeText={(text) => handleChange('accusedGender', text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[10].Hindi : fir[10].English}
          value={firPlace}
          onChangeText={(text) => handleChange('firPlace', text)}
          required
        />

        {/* Police Officer Section */}
        <Text style={styles.sectionTitle}>{selectedLang === 'Hindi' ? fir[11].Hindi : fir[11].English}</Text>
        <Picker
          selectedValue={policeName}
          onValueChange={(value) => handleChange('policeName', value)}
          style={styles.input}
        >
          <Picker.Item label=
            {selectedLang === 'Hindi' ? fir[10].Hindi : fir[10].English}
            value="" />
          <Picker.Item label="Officer 1" value="Officer 1" />
          <Picker.Item label="Officer 2" value="Officer 2" />
          {/* Add more officers as needed */}
        </Picker>

        {/* Description Section */}
        <Text style={styles.sectionTitle}>{selectedLang === 'Hindi' ? fir[12].Hindi : fir[12].English}</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder={selectedLang === 'Hindi' ? fir[11].Hindi : fir[11].English}
          multiline
          value={firDescription}
          onChangeText={(text) => handleChange('firDescription', text)}
          required
        />

        {/* Informer Section */}
        <Text style={styles.sectionTitle}>
          {selectedLang === 'Hindi' ? fir[12].Hindi : fir[12].English}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[13].Hindi : fir[13].English}
          value={informerName}
          onChangeText={(text) => handleChange('informerName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[14].Hindi : fir[14].English}
          value={informerAddress}
          onChangeText={(text) => handleChange('informerAddress', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={selectedLang === 'Hindi' ? fir[15].Hindi : fir[15].English}
          value={informerContactNumber}
          onChangeText={(text) => handleChange('informerContactNumber', text)}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {selectedLang === 'Hindi' ? fir[16].Hindi : fir[16].English}
          </Text>
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
