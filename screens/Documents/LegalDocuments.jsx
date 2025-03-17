import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const legalDocuments = [
  {
    id: '1',
    title: 'Bail Application Form',
    description: 'Standard format for filing bail application in Indian courts',
    language: 'Multilingual',
    format: 'PDF',
    size: '156 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/bail%20application%20form.pdf'
  },
  {
    id: '2',
    title: 'Vakalatnama',
    description: 'Document authorizing a lawyer to represent a client in court',
    language: 'English',
    format: 'PDF',
    size: '124 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/vakalatnama.pdf'
  },
  {
    id: '3',
    title: 'Legal Aid Application',
    description: 'Application for free legal services from Legal Services Authority',
    language: 'English',
    format: 'PDF',
    size: '142 KB',
    url: 'https://nalsa.gov.in/acts-rules/regulations/nalsa-regulations-2010'
  },
  {
    id: '4',
    title: 'Power of Attorney',
    description: 'Format for general power of attorney for legal representation',
    language: 'English',
    format: 'PDF',
    size: '168 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/power_of_attorney.pdf'
  },
  {
    id: '5',
    title: 'Undertaking Format',
    description: 'General format for legal undertaking in criminal matters',
    language: 'English',
    format: 'PDF',
    size: '98 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/undertaking.pdf'
  },
  {
    id: '6',
    title: 'RTI Application',
    description: 'Right to Information application format for legal matters',
    language: 'Multilingual',
    format: 'PDF',
    size: '134 KB',
    url: 'https://rti.gov.in/rti-act.pdf'
  },
  {
    id: '7',
    title: 'Affidavit Template',
    description: 'General affidavit format for court submissions',
    language: 'English',
    format: 'PDF',
    size: '112 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/affidavit.pdf'
  },
  {
    id: '8',
    title: 'Mercy Petition',
    description: 'Format for filing mercy petition to authorities',
    language: 'English',
    format: 'PDF',
    size: '145 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/mercy_petition.pdf'
  },
  {
    id: '9',
    title: 'Complaint Format',
    description: 'Standard format for filing complaints in criminal matters',
    language: 'English',
    format: 'PDF',
    size: '132 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/complaint.pdf'
  },
  {
    id: '10',
    title: 'Review Petition',
    description: 'Format for filing review petition in court',
    language: 'English',
    format: 'PDF',
    size: '158 KB',
    url: 'https://districts.ecourts.gov.in/sites/default/files/review_petition.pdf'
  }
];

const LegalDocuments = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDocumentPress = (document) => {
    navigation.navigate('DocumentViewer', { document });
  };

  const filteredDocuments = legalDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDocumentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.documentCard}
      onPress={() => handleDocumentPress(item)}
    >
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{item.title}</Text>
        <Text style={styles.documentDescription}>{item.description}</Text>
        <View style={styles.documentMeta}>
          <Text style={styles.metaText}>Language: {item.language}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{item.format}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{item.size}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevron-right" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search legal documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredDocuments}
        renderItem={renderDocumentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  documentInfo: {
    flex: 1,
    marginRight: 16,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LegalDocuments;
