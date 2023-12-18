import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';

const AddDoc = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpload = async () => {
    console.log('Uploading document:', newDocumentName);
    console.log('Selected File:', selectedFile);

    // Perform the actual file upload logic here

    toggleModal();
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(
        result.uri,
        result.type, // mime type
        result.name,
        result.size
      );

      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        console.log(err);
      }
    }
  };

  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentItem}>
      <FontAwesome5 name="file-alt" size={20} color="#333" style={styles.documentIcon} />
      <Text style={styles.documentName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Documents</Text>

      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={renderDocumentItem}
        style={styles.documentList}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={toggleModal}>
        <FontAwesome5 name="cloud-upload-alt" size={25} color="#fff" style={styles.uploadIcon} />
        <Text style={styles.uploadButtonText}>Upload New Document</Text>
      </TouchableOpacity>

      {/* Modal for uploading new document */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Document</Text>
            <TextInput
              style={styles.input}
              placeholder="Document Name"
              value={newDocumentName}
              onChangeText={(text) => setNewDocumentName(text)}
            />

            {/* File input */}
            <TouchableOpacity style={styles.fileInput} onPress={pickDocument}>
              <Text style={styles.fileInputText}>Select File</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleUpload}>
              <Text style={styles.modalButtonText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  // File input styles
  fileInput: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  fileInputText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddDoc;
