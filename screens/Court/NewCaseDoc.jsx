import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

const NewCaseDoc = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.filesContainer}>
        <Text style={styles.heading}>Uploaded Files</Text>
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={generateCaseNumber}>
        <Text style={styles.generateButtonText}>Verfy And Generate Case Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  filesContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: '10%',
  },
  fileContainer: {
    backgroundColor: '#e5e7eb',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
  },
  generateButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NewCaseDoc;
