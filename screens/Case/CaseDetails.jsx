import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CaseDetails = ({ route, navigation }) => {
  const { caseData } = route.params;

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {Object.entries(content).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.rowLabel}>
              {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
            </Text>
            <Text style={styles.rowValue}>
              {value instanceof Date ? value.toLocaleDateString() : value || 'N/A'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cnrContainer}>
          <Text style={styles.cnrLabel}>CNR Number</Text>
          <Text style={styles.cnrNumber}>{caseData.cnr_number}</Text>
        </View>

        {renderSection('Case Details', caseData.cnr_details.case_details)}
        {renderSection('Case Status', caseData.cnr_details.case_status)}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Petitioner & Advocate Details</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.rowLabel}>Petitioner:</Text>
            <Text style={styles.rowValue}>{caseData.cnr_details.petitioner_and_advocate_details.petitioner}</Text>
            <Text style={styles.rowLabel}>Advocate:</Text>
            <Text style={styles.rowValue}>{caseData.cnr_details.petitioner_and_advocate_details.advocate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respondents</Text>
          <View style={styles.sectionContent}>
            {caseData.cnr_details.respondent_and_advocate_details.map((respondent, index) => (
              <Text key={index} style={styles.rowValue}>{respondent}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Act Details</Text>
          <View style={styles.sectionContent}>
            {caseData.cnr_details.act_details.map((act, index) => (
              <View key={index} style={styles.actDetail}>
                <Text style={styles.rowValue}>{act.under_act} - {act.under_section}</Text>
              </View>
            ))}
          </View>
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
  header: {
    backgroundColor: '#4A90E2',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cnrContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cnrLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cnrNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  sectionContent: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  rowValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  actDetail: {
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 6,
  },
});

export default CaseDetails;
