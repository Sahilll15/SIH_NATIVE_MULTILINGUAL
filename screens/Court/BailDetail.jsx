// BailDetail.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BailDetail = () => {
  const [bailAmount, setBailAmount] = useState(10000); // Initial bail amount
  const [selectedDocument, setSelectedDocument] = useState('Proven innocent'); // Initial selected document

  const increaseBail = () => {
    setBailAmount(bailAmount + 10000);
  };

  const decreaseBail = () => {
    setBailAmount(bailAmount - 10000);
  };

  const handleDocumentChange = (document) => {
    setSelectedDocument(document);
  };

  const handleAccept = () => {
    // Logic for accepting bail
    console.log('Bail accepted!');
  };

  const handleReject = () => {
    // Logic for rejecting bail
    console.log('Bail rejected!');
  };

  return (
    <View style={styles.container}>
      {/* Bail Detail */}
      <View style={styles.bailDetailContainer}>
        <Text style={styles.title}>Bail Detail</Text>
        <View style={styles.pdfBox}>
        <Text style={styles.pdfText}>DOCUMENTS</Text>
      </View>
        <Text style={styles.amount}>Bail Amount: ₹{bailAmount}</Text>

        {/* Document selection box */}
        <View style={styles.documentBox}>
          <Text style={styles.documentLabel}>Bail Granted On</Text>
          <Picker
            selectedValue={selectedDocument}
            onValueChange={(itemValue) => handleDocumentChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Proven innocent" value="Proven innocent" />
            <Picker.Item label="Sick" value="Sick" />
            <Picker.Item label="First time (19 to 21 years)" value="First time (19 to 21 years)" />
            <Picker.Item label="Mentally Unsound" value="Mentally Unsound" />
          </Picker>
        </View>

        {/* Accept and Reject buttons */}
        <TouchableOpacity onPress={handleAccept} style={styles.buttonAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReject} style={styles.buttonReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  bailDetailContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    marginBottom: 20,
  },
  documentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  documentLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    width: 150,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonAccept: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonReject: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pdfBox: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#e5e7eb',
  },
  pdfText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BailDetail;
