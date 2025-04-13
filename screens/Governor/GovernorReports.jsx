import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const GovernorReports = ({ navigation }) => {
  const { userDetails } = useAuth();
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportUrl, setReportUrl] = useState('');

  const reportTypes = [
    { id: 'daily', label: 'Daily Report', icon: 'calendar-day' },
    { id: 'weekly', label: 'Weekly Report', icon: 'calendar-week' },
    { id: 'monthly', label: 'Monthly Report', icon: 'calendar-alt' },
    { id: 'quarterly', label: 'Quarterly Report', icon: 'chart-line' },
    { id: 'annual', label: 'Annual Report', icon: 'chart-bar' },
    { id: 'custom', label: 'Custom Date Range', icon: 'calendar-plus' },
  ];

  const reportContent = [
    { id: 'case_summary', label: 'Case Summary', selected: true },
    { id: 'lawyer_performance', label: 'Lawyer Performance', selected: true },
    { id: 'prisoner_data', label: 'Prisoner Data', selected: true },
    { id: 'case_progression', label: 'Case Progression', selected: false },
    { id: 'hearings', label: 'Hearing Schedule', selected: false },
  ];

  const [selectedContent, setSelectedContent] = useState(
    reportContent.filter(item => item.selected).map(item => item.id)
  );

  const handleContentToggle = (contentId) => {
    if (selectedContent.includes(contentId)) {
      setSelectedContent(selectedContent.filter(id => id !== contentId));
    } else {
      setSelectedContent([...selectedContent, contentId]);
    }
  };

  const handleGenerateReport = async () => {
    if (selectedContent.length === 0) {
      Alert.alert('Error', 'Please select at least one content type for the report');
      return;
    }
    
    if (reportType === 'custom' && (!dateRange.startDate || !dateRange.endDate)) {
      Alert.alert('Error', 'Please enter both start and end dates for custom report');
      return;
    }

    setLoading(true);
    
    // Simulating report generation since we don't have a real endpoint
    setTimeout(() => {
      setReportGenerated(true);
      setReportUrl('https://example.com/report-12345.pdf');
      setLoading(false);
      
      Alert.alert(
        'Report Generated',
        'Your report has been successfully generated.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out the latest report: ${reportUrl}`,
        url: reportUrl,
        title: 'Case Management Report'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the report');
    }
  };

  const handleDownload = () => {
    Alert.alert(
      'Download Started',
      'Your report is being downloaded.',
      [{ text: 'OK' }]
    );
  };

  const renderDateRangeInputs = () => {
    if (reportType !== 'custom') return null;
    
    return (
      <View style={styles.dateRangeContainer}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            value={dateRange.startDate}
            onChangeText={(text) => setDateRange({...dateRange, startDate: text})}
          />
        </View>
        <View style={styles.dateInputContainer}>
          <Text style={styles.dateLabel}>End Date</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            value={dateRange.endDate}
            onChangeText={(text) => setDateRange({...dateRange, endDate: text})}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Generate Reports</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Type</Text>
          <Text style={styles.sectionSubtitle}>Select the type of report you want to generate</Text>
          
          <View style={styles.reportTypeContainer}>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.reportTypeCard,
                  reportType === type.id && styles.selectedReportType
                ]}
                onPress={() => setReportType(type.id)}
              >
                <Icon 
                  name={type.icon} 
                  size={24} 
                  color={reportType === type.id ? '#4A90E2' : '#666'} 
                />
                <Text 
                  style={[
                    styles.reportTypeText,
                    reportType === type.id && styles.selectedReportTypeText
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {renderDateRangeInputs()}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Content</Text>
          <Text style={styles.sectionSubtitle}>Select what to include in the report</Text>
          
          <View style={styles.contentContainer}>
            {reportContent.map((content) => (
              <TouchableOpacity
                key={content.id}
                style={styles.contentOption}
                onPress={() => handleContentToggle(content.id)}
              >
                <View style={styles.checkboxContainer}>
                  <View 
                    style={[
                      styles.checkbox,
                      selectedContent.includes(content.id) && styles.checkboxSelected
                    ]}
                  >
                    {selectedContent.includes(content.id) && (
                      <Icon name="check" size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.contentLabel}>{content.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateReport}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Icon name="file-alt" size={16} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.generateButtonText}>Generate Report</Text>
            </>
          )}
        </TouchableOpacity>

        {reportGenerated && (
          <View style={styles.reportActionsContainer}>
            <Text style={styles.reportGeneratedText}>Report Generated Successfully</Text>
            
            <View style={styles.reportActions}>
              <TouchableOpacity
                style={styles.reportActionButton}
                onPress={handleShare}
              >
                <Icon name="share-alt" size={16} color="#4A90E2" style={styles.actionIcon} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.reportActionButton}
                onPress={handleDownload}
              >
                <Icon name="download" size={16} color="#4A90E2" style={styles.actionIcon} />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  reportTypeCard: {
    width: '46%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedReportType: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  reportTypeText: {
    fontSize: 14,
    color: '#333333',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedReportTypeText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dateInputContainer: {
    width: '48%',
  },
  dateLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    fontSize: 14,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contentOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  contentLabel: {
    fontSize: 16,
    color: '#333333',
  },
  generateButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportActionsContainer: {
    backgroundColor: '#E8F4FF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  reportGeneratedText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reportActionButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionText: {
    color: '#4A90E2',
    fontSize: 14,
  },
});

export default GovernorReports;
