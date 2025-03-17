import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const mockCaseData = {
  cnr_number: "DEMO123456",
  cnr_details: {
    case_details: {
      case_type: "Criminal",
      filing_number: "F123/2024",
      filing_date: "2024-01-15",
      registration_number: "REG789",
      registration_date: "2024-01-20"
    },
    case_status: {
      first_hearing_date: "2024-02-01",
      next_hearing_date: "2024-04-15",
      case_stage: "Under Trial",
      court_number_and_judge: "Court 5, Judge Smith",
      decision_date: null,
      nature_of_disposal: null
    },
    petitioner_and_advocate_details: {
      petitioner: "John Doe",
      advocate: "Adv. Jane Smith"
    },
    respondent_and_advocate_details: ["State of Maharashtra"],
    act_details: [
      {
        under_act: "IPC",
        under_section: "Section 302"
      }
    ]
  }
};

const AddCaseModal = ({ visible, onClose, navigation }) => {
  const [cnrNumber, setCnrNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!cnrNumber || !registrationNumber) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, using mock data
      const caseData = mockCaseData;
      
      // Navigate to case details screen with the data
      navigation.navigate('CaseDetails', { caseData });
      onClose();
    } catch (err) {
      setError('Failed to fetch case details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Case</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="times" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CNR Number</Text>
            <TextInput
              style={styles.input}
              value={cnrNumber}
              onChangeText={setCnrNumber}
              placeholder="Enter CNR Number"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Registration Number</Text>
            <TextInput
              style={styles.input}
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
              placeholder="Enter Registration Number"
              placeholderTextColor="#999"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>Search Case</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  closeButton: {
    padding: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  errorText: {
    color: '#E74C3C',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCaseModal;
