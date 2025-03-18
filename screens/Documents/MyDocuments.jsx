import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../Context/AuthContext';

const MyDocuments = ({ navigation }) => {
  const { userDetails } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user documents when component mounts or userDetails changes
  useEffect(() => {
    fetchUserDocuments();
  }, [userDetails]);
  
  // Function to fetch user documents from API
  const fetchUserDocuments = async () => {
    if (!userDetails || !userDetails._id) {
      setError('User information not available. Please log in again.');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Use the prisoner ID from user details
      const prisonerId = userDetails._id;
      console.log('Fetching documents for prisoner:', prisonerId);
      
      // Make the API call using axiosInstance
      const response = await axiosInstance.get(`/document/getDocuments/${prisonerId}`);
      
      if (response.data && response.data.documents) {
        // Map API response to document format
        const formattedDocs = response.data.documents.map((doc, index) => ({
          id: doc._id || `local-doc-${index}-${Date.now()}`,
          title: doc.title || 'Untitled Document',
          type: doc.type || 'Other',
          date: doc.createdAt ? new Date(doc.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          size: doc.size || 'Unknown size',
          status: doc.status || 'Pending',
          description: doc.description || 'No description provided',
          tags: doc.tags || [],
          uri: doc.fileUrl || '',
          apiDocument: doc, // Store the full API document for reference
        }));
        
        setDocuments(formattedDocs);
        console.log('Documents fetched successfully:', formattedDocs.length);
      } else {
        setDocuments([]);
        console.log('No documents found or invalid response format');
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(`Failed to fetch documents: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: '',
    description: '',
    tags: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle document refresh
  const handleRefresh = () => {
    fetchUserDocuments();
  };

  const handleAddDocument = async () => {
    try {
      if (!userDetails || !userDetails._id) {
        Alert.alert('Error', 'User information not available. Please log in again.');
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        // Create a new FormData object
        const formData = new FormData();
        
        // Get file info
        const fileUri = result.uri;
        const fileName = result.name;
        const fileType = result.mimeType;
        
        // Create file object for FormData
        const fileToUpload = {
          uri: fileUri,
          name: fileName,
          type: fileType,
        };
        
        // Append all required fields to FormData
        formData.append('docs', fileToUpload, "1ef087be-3ecc-47c0-85b9-bca686342b1d");
        formData.append('title', newDocument.title || fileName);
        formData.append('description', newDocument.description || 'No description provided');
        formData.append('tags', newDocument.tags || '');
        formData.append('type', newDocument.type || 'Other');
        
        // Show loading indicator
        Alert.alert('Uploading', 'Please wait while your document is being uploaded...');
        
        // Configure axiosInstance for file upload
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        
        // Use the prisoner ID from user details
        const prisonerId = userDetails._id;
        console.log('Uploading document for prisoner:', prisonerId);
        
        // Make the API call using axiosInstance with the prisoner ID
        const response = await axiosInstance.post(
          `/document/upload/${prisonerId}`, 
          formData,
          config
        );
        
        const responseData = response.data;
        
        // Create document object for local state
        const newDoc = {
          id: Date.now().toString(),
          title: newDocument.title || fileName,
          type: newDocument.type || 'Other',
          date: new Date().toISOString().split('T')[0],
          size: (result.size / 1024).toFixed(2) + ' KB',
          status: 'Pending',
          description: newDocument.description || 'No description provided',
          tags: newDocument.tags ? newDocument.tags.split(',').map(tag => tag.trim()) : [],
          uri: fileUri,
          // Store API response data if needed
          apiResponse: responseData,
        };

        // Update local state
        setDocuments(prev => [newDoc, ...prev]);
        setIsAddModalVisible(false);
        setNewDocument({ title: '', type: '', description: '', tags: '' });
        Alert.alert('Success', 'Document uploaded successfully');
        
        // Refresh documents from server
        fetchUserDocuments();
        
        console.log('API Response:', responseData);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      Alert.alert('Error', `Failed to upload document: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'verified':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  const filteredDocuments = documents.filter(doc =>
    (doc.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDocumentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.documentCard}
      onPress={() => navigation.navigate('DocumentViewer', { document: item, documentURL: item.document })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Icon 
            name={item.type.toLowerCase() === 'legal' ? 'gavel' : 
                 item.type.toLowerCase() === 'medical' ? 'notes-medical' : 'file-alt'} 
            size={24} 
            color="#4A90E2" 
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.documentTitle}>{item.title}</Text>
          <Text style={styles.documentType}>{item.type}</Text>
        </View>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.tagsContainer}>
          {Array.isArray(item.tags) && item.tags.length > 0 ? (
            item.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))
          ) : typeof item.tags === 'string' ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.tags}</Text>
            </View>
          ) : (
            <Text style={styles.noTagsText}>No tags</Text>
          )}
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>{item.date}</Text>
        <Text style={styles.footerText}>{item.size}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Icon name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading documents...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Icon name="exclamation-circle" size={50} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUserDocuments}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredDocuments}
          renderItem={renderDocumentItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContainer}
          refreshing={loading}
          onRefresh={fetchUserDocuments}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="folder-open" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No documents found</Text>
              <TouchableOpacity 
                style={styles.addFirstButton} 
                onPress={() => setIsAddModalVisible(true)}
              >
                <Text style={styles.addFirstButtonText}>Add Your First Document</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}



      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Document</Text>
              <TouchableOpacity
                onPress={() => setIsAddModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <TextInput
                style={styles.input}
                placeholder="Document Title"
                value={newDocument.title}
                onChangeText={text => setNewDocument(prev => ({ ...prev, title: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Document Type (Legal, Medical, Personal, etc.)"
                value={newDocument.type}
                onChangeText={text => setNewDocument(prev => ({ ...prev, type: text }))}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={newDocument.description}
                onChangeText={text => setNewDocument(prev => ({ ...prev, description: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Tags (comma-separated)"
                value={newDocument.tags}
                onChangeText={text => setNewDocument(prev => ({ ...prev, tags: text }))}
              />

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleAddDocument}
              >
                <Icon name="file-upload" size={20} color="#fff" style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Upload Document</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginRight: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF3FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  documentType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EBF3FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  noTagsText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addFirstButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  addFirstButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  modalScroll: {
    padding: 16,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadIcon: {
    marginRight: 8,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default MyDocuments;
