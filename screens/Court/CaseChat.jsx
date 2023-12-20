import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { useAuth } from '../../Context/AuthContext';
import { caseChat } from '../../utils';

const UploadedFiles = () => {

  const { selectedLang } = useAuth();
  const [files, setFiles] = useState([
    { id: '1', name: 'File 1.pdf' },
    { id: '2', name: 'File 2.docx' },
    // Add more files as needed
  ]);

  const generateCaseNumber = () => {
    // Add your logic to generate a case number
    const caseNumber = Math.floor(1000 + Math.random() * 9000);
    alert(`Generated Case Number: ${caseNumber}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.fileContainer}>
      <Text style={styles.fileName}>{item.name}</Text>
    </View>
  );

  const handleUpload = () => {
    // Add your logic for handling document upload here
    alert('Handle Document Upload');
  };

  const markCaseAsClosed = useCallback(() => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to mark this case as closed?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Mark as Closed',
          onPress: () => {
            // Add your logic for marking the case as closed
            alert('Case Marked as Closed');
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.filesContainer}>
        <Text style={styles.heading}>{
          selectedLang === 'Hindi' ? caseChat[0].Hindi : caseChat[0].English
        }</Text>
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      {/* Button for Document Upload */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Ionicons name="ios-add" size={24} color="#fff" />
        <Text style={styles.buttonText}>{
          selectedLang === 'Hindi' ? caseChat[1].Hindi : caseChat[1].English
        }</Text>
      </TouchableOpacity>

      {/* Button for Marking Case as Closed */}
      <TouchableOpacity style={styles.closeButton} onPress={markCaseAsClosed}>
        <Text style={styles.buttonText}>{
          selectedLang === 'Hindi' ? caseChat[2].Hindi : caseChat[2].English
        }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  filesContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
});

export default UploadedFiles;
