import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '../../Context/TranslationContext';
import { formatDate, formatDateTime } from '../../utils/dateUtils';

export const CaseDetailsScreen = ({ route, navigation }) => {
  const { caseData } = route.params;
  const { translate, currentLanguage } = useTranslation();

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{translate('Case Details')}</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.caseTitle}>{caseData.title}</Text>
            <View style={[styles.statusBadge, 
              { backgroundColor: caseData.status === 'Active' ? '#4ECDC4' : '#FFB347' }]}>
              <Text style={styles.statusText}>{caseData.status}</Text>
            </View>
          </View>

          {renderSection(translate('Court'), caseData.court_name || caseData.cnr_details?.case_status?.court_number_and_judge || '-')}
          {renderSection(translate('Filing Date'), formatDate(caseData.filing_date, currentLanguage))}
          {renderSection(translate('Case Type'), caseData.cnr_details?.case_details?.case_type || 'Civil Case')}
          {renderSection(translate('Case Description'), caseData.cnr_details?.case_details?.description || 'No description available')}
          {renderSection(translate('Next Hearing'), formatDate(caseData.next_hearing_date || caseData.cnr_details?.case_status?.next_hearing_date, currentLanguage))}
          {renderSection(translate('Case Status'), caseData.status || caseData.cnr_details?.case_status?.case_stage || '-')}
          {renderSection(translate('Registration Number'), caseData.registration_number || '-')}
          
          <TouchableOpacity style={styles.documentsButton}>
            <Icon name="file-alt" size={20} color="#FFFFFF" />
            <Text style={styles.documentsButtonText}>{translate('View Case Documents')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  documentsButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  documentsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
