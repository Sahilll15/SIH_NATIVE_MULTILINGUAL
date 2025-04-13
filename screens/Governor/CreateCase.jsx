import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '../../Context/TranslationContext';
import axiosInstance from '../../utils/axiosInstance';

const CreateCase = ({ navigation }) => {
  const { translate } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Case form state
  const [caseData, setCaseData] = useState({
    cnr_number: '',
    cnr_details: {
      case_details: {
        case_type: '',
        filing_number: '',
        filing_date: new Date(),
        registration_number: '',
        registration_date: new Date()
      },
      case_status: {
        first_hearing_date: new Date(),
        next_hearing_date: new Date(),
        case_stage: 'New',
        court_number_and_judge: '',
      },
      petitioner_and_advocate_details: {
        petitioner: '',
        advocate: ''
      },
      respondent_and_advocate_details: [],
      act_details: [
        {
          under_act: '',
          under_section: ''
        }
      ]
    },
    status: 'Pending',
    court_name: ''
  });

  // Update form fields
  const updateField = (field, value) => {
    // Handle nested fields using a helper function
    const updateNestedField = (obj, path, value) => {
      const pathArray = path.split('.');
      const lastKey = pathArray.pop();
      let current = obj;
      
      // Navigate to the correct level
      for (const key of pathArray) {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      
      // Set the value
      current[lastKey] = value;
      return { ...obj };
    };
    
    setCaseData(prevData => updateNestedField(prevData, field, value));
  };

  // Date picker helpers
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getYearsList = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const applySelectedDate = () => {
    if (dateField) {
      const newDate = new Date(selectedYear, selectedMonth, selectedDay);
      updateField(dateField, newDate);
    }
    setDatePickerVisible(false);
  };

  // Opens the custom date picker modal
  const showDatePickerFor = (field) => {
    const currentValue = getNestedValue(caseData, field) || new Date();
    setSelectedYear(currentValue.getFullYear());
    setSelectedMonth(currentValue.getMonth());
    setSelectedDay(currentValue.getDate());
    setDateField(field);
    setDatePickerVisible(true);
  };
  
  // Helper to get value from nested object using dot notation
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj);
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN');
  };

  // Add respondent
  const addRespondent = () => {
    const newRespondent = '';
    setCaseData(prev => ({
      ...prev,
      cnr_details: {
        ...prev.cnr_details,
        respondent_and_advocate_details: [
          ...prev.cnr_details.respondent_and_advocate_details,
          newRespondent
        ]
      }
    }));
  };

  // Update respondent
  const updateRespondent = (index, value) => {
    const updatedRespondents = [...caseData.cnr_details.respondent_and_advocate_details];
    updatedRespondents[index] = value;
    
    setCaseData(prev => ({
      ...prev,
      cnr_details: {
        ...prev.cnr_details,
        respondent_and_advocate_details: updatedRespondents
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!caseData.cnr_number || !caseData.cnr_details.case_details.case_type) {
      Alert.alert(
        translate('Error'),
        translate('Please fill all required fields'),
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setLoading(true);
      
      // Send creation request
      const response = await axiosInstance.post('/case/create', caseData);
      
      if (response.data) {
        Alert.alert(
          translate('Success'),
          translate('Case created successfully'),
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('GovernorCases')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error creating case:', error);
      Alert.alert(
        translate('Error'),
        translate('Failed to create case. Please try again.'),
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>{translate('Create New Case')}</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{translate('Case Information')}</Text>
          
          {/* CNR Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('CNR Number')} *</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_number}
              onChangeText={(text) => updateField('cnr_number', text)}
              placeholder={translate('Enter CNR Number')}
            />
          </View>
          
          {/* Case Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Case Type')} *</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.case_details.case_type}
              onChangeText={(text) => updateField('cnr_details.case_details.case_type', text)}
              placeholder={translate('Enter Case Type')}
            />
          </View>
          
          {/* Filing Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Filing Number')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.case_details.filing_number}
              onChangeText={(text) => updateField('cnr_details.case_details.filing_number', text)}
              placeholder={translate('Enter Filing Number')}
            />
          </View>
          
          {/* Filing Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Filing Date')}</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => showDatePickerFor('cnr_details.case_details.filing_date')}
            >
              <Text>
                {formatDate(caseData.cnr_details.case_details.filing_date)}
              </Text>
              <Icon name="calendar" size={16} color="#555" />
            </TouchableOpacity>
          </View>
          
          {/* Registration Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Registration Number')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.case_details.registration_number}
              onChangeText={(text) => updateField('cnr_details.case_details.registration_number', text)}
              placeholder={translate('Enter Registration Number')}
            />
          </View>
          
          {/* Court Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Court Name')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.court_name}
              onChangeText={(text) => updateField('court_name', text)}
              placeholder={translate('Enter Court Name')}
            />
          </View>
          
          <Text style={styles.sectionTitle}>{translate('Hearing Information')}</Text>
          
          {/* First Hearing Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('First Hearing Date')}</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => showDatePickerFor('cnr_details.case_status.first_hearing_date')}
            >
              <Text>
                {formatDate(caseData.cnr_details.case_status.first_hearing_date)}
              </Text>
              <Icon name="calendar" size={16} color="#555" />
            </TouchableOpacity>
          </View>
          
          {/* Next Hearing Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Next Hearing Date')}</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => showDatePickerFor('cnr_details.case_status.next_hearing_date')}
            >
              <Text>
                {formatDate(caseData.cnr_details.case_status.next_hearing_date)}
              </Text>
              <Icon name="calendar" size={16} color="#555" />
            </TouchableOpacity>
          </View>
          
          {/* Court Number and Judge */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Court Number and Judge')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.case_status.court_number_and_judge}
              onChangeText={(text) => updateField('cnr_details.case_status.court_number_and_judge', text)}
              placeholder={translate('Enter Court Number and Judge')}
            />
          </View>
          
          <Text style={styles.sectionTitle}>{translate('Petitioner & Advocate Details')}</Text>
          
          {/* Petitioner */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Petitioner')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.petitioner_and_advocate_details.petitioner}
              onChangeText={(text) => updateField('cnr_details.petitioner_and_advocate_details.petitioner', text)}
              placeholder={translate('Enter Petitioner Name')}
            />
          </View>
          
          {/* Advocate */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Advocate')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.petitioner_and_advocate_details.advocate}
              onChangeText={(text) => updateField('cnr_details.petitioner_and_advocate_details.advocate', text)}
              placeholder={translate('Enter Advocate Name')}
            />
          </View>
          
          <Text style={styles.sectionTitle}>{translate('Respondent Details')}</Text>
          
          {/* Respondents */}
          {caseData.cnr_details.respondent_and_advocate_details.map((respondent, index) => (
            <View key={index} style={styles.inputGroup}>
              <Text style={styles.label}>{translate('Respondent')} {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={respondent}
                onChangeText={(text) => updateRespondent(index, text)}
                placeholder={translate('Enter Respondent Name')}
              />
            </View>
          ))}
          
          {/* Add Respondent Button */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addRespondent}
          >
            <Icon name="plus" size={16} color="#FFF" />
            <Text style={styles.addButtonText}>{translate('Add Respondent')}</Text>
          </TouchableOpacity>
          
          <Text style={styles.sectionTitle}>{translate('Act Details')}</Text>
          
          {/* Under Act */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Under Act')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.act_details[0].under_act}
              onChangeText={(text) => {
                const updatedActDetails = [...caseData.cnr_details.act_details];
                updatedActDetails[0].under_act = text;
                updateField('cnr_details.act_details', updatedActDetails);
              }}
              placeholder={translate('Enter Act')}
            />
          </View>
          
          {/* Under Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{translate('Under Section')}</Text>
            <TextInput
              style={styles.input}
              value={caseData.cnr_details.act_details[0].under_section}
              onChangeText={(text) => {
                const updatedActDetails = [...caseData.cnr_details.act_details];
                updatedActDetails[0].under_section = text;
                updateField('cnr_details.act_details', updatedActDetails);
              }}
              placeholder={translate('Enter Section')}
            />
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>{translate('Create Case')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Custom Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={datePickerVisible}
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <Text style={styles.datePickerTitle}>{translate('Select Date')}</Text>
              <TouchableOpacity onPress={() => setDatePickerVisible(false)}>
                <Icon name="times" size={20} color="#555" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.datePickerContent}>
              {/* Year Selector */}
              <View style={styles.datePickerSection}>
                <Text style={styles.datePickerLabel}>{translate('Year')}</Text>
                <FlatList
                  data={getYearsList()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={[styles.datePickerItem, selectedYear === item && styles.datePickerItemSelected]}
                      onPress={() => setSelectedYear(item)}
                    >
                      <Text style={selectedYear === item ? styles.datePickerItemTextSelected : styles.datePickerItemText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              
              {/* Month Selector */}
              <View style={styles.datePickerSection}>
                <Text style={styles.datePickerLabel}>{translate('Month')}</Text>
                <FlatList
                  data={months}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity 
                      style={[styles.datePickerItem, selectedMonth === index && styles.datePickerItemSelected]}
                      onPress={() => setSelectedMonth(index)}
                    >
                      <Text style={selectedMonth === index ? styles.datePickerItemTextSelected : styles.datePickerItemText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              
              {/* Day Selector */}
              <View style={styles.datePickerSection}>
                <Text style={styles.datePickerLabel}>{translate('Day')}</Text>
                <FlatList
                  data={[...Array(getDaysInMonth(selectedYear, selectedMonth)).keys()].map(i => i + 1)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={[styles.datePickerItem, selectedDay === item && styles.datePickerItemSelected]}
                      onPress={() => setSelectedDay(item)}
                    >
                      <Text style={selectedDay === item ? styles.datePickerItemTextSelected : styles.datePickerItemText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.datePickerApplyButton}
              onPress={applySelectedDate}
            >
              <Text style={styles.datePickerApplyButtonText}>{translate('Apply')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginTop: 24,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#FFF',
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 32,
    marginBottom: 40,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Date Picker Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  datePickerContent: {
    marginBottom: 16,
  },
  datePickerSection: {
    marginBottom: 16,
  },
  datePickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  datePickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  datePickerItemSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  datePickerItemText: {
    fontSize: 14,
    color: '#4A5568',
  },
  datePickerItemTextSelected: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  datePickerApplyButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  datePickerApplyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CreateCase;
