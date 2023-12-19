import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const pdfUrl = 'https://drive.google.com/file/d/1HatoP0RbhW9pOLLTudZ2omee-Y3WAuyl/view';

const AddDoc = ({ navigation }) => {
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Document 1' },
    { id: '2', name: 'Document 2' },
    { id: '3', name: 'Document 3' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4NzFmOWZjZmJkNWI1M2MzNzQ3NzMiLCJpYXQiOjE3MDI2NTMyMzh9.htgnfrEThCRoY1gBlkLRDW_bSmK7nosmjtipnC_mdGo`


  const fetchDocs = async () => {
    console.log('fetching..')
    const response = await axios.get(`http://localhost:8000/api/v1/document/getDocuments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }

    })

    if (response.status === 200) {
      console.log(response.data)
      setDocuments(response.data.docs)
    }
    else {
      console.log('error')
    }
  }



  useEffect(() => {
    fetchDocs()
  }, [])

  const selectDoc = async ({ navigation }) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log('Selected Document:', result);


      if (!result.cancelled && result.size > 0) {
        // Continue with FormData creation
      } else {
        console.log('Invalid or empty file selected');
      }

      if (!result.cancelled) {
        setSelectedDocument(result);
        setNewDocumentName(result.name);
      }
    } catch (err) {
      console.log('DocumentPicker Error: ', err);
    }
  };



  const handleUpload = async () => {
    try {
      setLoading(true);

      if (newDocumentName === '') {
        Alert.alert('name is required')
      }

      if (selectedDocument) {
        const fileUri = selectedDocument.uri;
        const fileType = 'application/pdf';

        const formData = new FormData();
        formData.append('name', newDocumentName);
        formData.append('docs', {
          uri: fileUri,
          name: `${newDocumentName}.pdf`,
          type: fileType,
        });

        const response = await axios.post(
          'http://localhost:8000/api/v1/document/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4NzFmOWZjZmJkNWI1M2MzNzQ3NzMiLCJpYXQiOjE3MDI2NTMyMzh9.htgnfrEThCRoY1gBlkLRDW_bSmK7nosmjtipnC_mdGo`, // Replace with your actual access token
            },
          }
        );



        console.log('Upload response:', response.data);

        setLoading(false);
        toggleModal();
      } else {
        console.log('No document selected');
        setLoading(false);
      }
    } catch (error) {
      console.error('API Error:', error);
      setLoading(false);
    }
  };



  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentItem}>
      <FontAwesome5 name="file-alt" size={20} color="#333" style={styles.documentIcon} />
      <Text style={styles.documentName}>{item.name}</Text>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setNewDocumentName('');
    setSelectedDocument(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Documents</Text>

      <FlatList
        data={documents.filter((doc) => doc.document && doc.name !== undefined)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PdfViewer', { pdfUrl: item.pdfUrl })}>
            <View style={styles.documentItem}>
              <FontAwesome5 name="file-alt" size={20} color="#333" style={styles.documentIcon} />
              <Text style={styles.documentName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.documentList}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={toggleModal}>
        <FontAwesome5 name="cloud-upload-alt" size={25} color="#fff" style={styles.uploadIcon} />
        <Text style={styles.uploadButtonText}>Upload New Document</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Upload New Document</Text>
          <TextInput
            style={styles.input}
            placeholder="Document Name"
            value={newDocumentName}
            onChangeText={(text) => setNewDocumentName(text)}
          />
          <View style={styles.fileInputContainer}>
            <FontAwesome5 name="file" size={20} color="#333" style={styles.documentIcon} />
            <TouchableOpacity style={styles.fileInput} onPress={selectDoc} disabled={isLoading}>
              {selectedDocument ? (
                <Text>{selectedDocument.name}</Text>
              ) : (
                <Text>Select a file</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.uploadButtonContainer}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Upload</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal} disabled={isLoading}>
              <Text style={styles.buttonText}>Cancel</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  fileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fileInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddDoc;
