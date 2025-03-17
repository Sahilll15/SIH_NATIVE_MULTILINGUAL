import React, { useState } from 'react';
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

const MyDocuments = ({ navigation }) => {
  const [documents, setDocuments] = useState([
    {
      id: '1',
      title: 'Bail Application',
      type: 'Legal',
      date: '2025-03-15',
      size: '1.2 MB',
      status: 'Pending',
      description: 'Application for bail submitted to court',
      tags: ['urgent', 'legal'],
    },
    {
      id: '2',
      title: 'Medical Certificate',
      type: 'Medical',
      date: '2025-03-10',
      size: '850 KB',
      status: 'Approved',
      description: 'Medical certificate for health condition',
      tags: ['medical', 'important'],
    },
    {
      id: '3',
      title: 'Character Certificate',
      type: 'Personal',
      date: '2025-03-05',
      size: '500 KB',
      status: 'Verified',
      description: 'Character certificate from previous employer',
      tags: ['personal'],
    },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: '',
    description: '',
    tags: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const newDoc = {
          id: Date.now().toString(),
          title: newDocument.title || result.name,
          type: newDocument.type || 'Other',
          date: new Date().toISOString().split('T')[0],
          size: (result.size / 1024).toFixed(2) + ' KB',
          status: 'Pending',
          description: newDocument.description,
          tags: newDocument.tags.split(',').map(tag => tag.trim()),
          uri: result.uri,
        };

        setDocuments(prev => [newDoc, ...prev]);
        setIsAddModalVisible(false);
        setNewDocument({ title: '', type: '', description: '', tags: '' });
        Alert.alert('Success', 'Document added successfully');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to add document. Please try again.');
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
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDocumentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.documentCard}
      onPress={() => navigation.navigate('DocumentViewer', { document: item })}
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
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
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
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredDocuments}
        renderItem={renderDocumentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="folder-open" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No documents found</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
