import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddDoc = () => {
  // Dummy data for uploaded documents
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Document 1' },
    { id: '2', name: 'Document 2' },
    { id: '3', name: 'Document 3' },
  ]);

  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentItem}>
      <FontAwesome5 name="file-alt" size={20} color="#333" style={styles.documentIcon} />
      <Text style={styles.documentName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Documents</Text>

      {/* Display uploaded documents */}
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={renderDocumentItem}
        style={styles.documentList}
      />

      {/* Option to upload new document */}
      <TouchableOpacity style={styles.uploadButton} onPress={() => console.log('Navigate to Upload')}>
        <FontAwesome5 name="cloud-upload-alt" size={25} color="#fff" style={styles.uploadIcon} />
        <Text style={styles.uploadButtonText}>Upload New Document</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  documentList: {
    marginTop: 10,
    marginBottom: 20,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  documentIcon: {
    marginRight: 10,
  },
  documentName: {
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddDoc;
