import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios'
import { useLawyer } from '../../Context/LawyerContext';

const NewCaseDoc = ({ navigation }) => {
  const [files, setFiles] = useState([
    { id: '1', name: 'File 1.pdf' },
    { id: '2', name: 'File 2.docx' },
    // Add more files as needed
  ]);


  const { currentCourtCase } = useLawyer();

  const data = {
    cnr_number: "",
    courtCaseRequestId: currentCourtCase._id,
    cnr_details: {
      case_details: {
        case_type: "",
        filing_number: "",
        filing_date: "",
        registration_number: "",
        registration_date: ""
      },
      case_status: {
        first_hearing_date: "",
        next_hearing_date: "",
        case_stage: "",
        court_number_and_judge: "",
        decision_date: "",
        nature_of_disposal: ""
      },
      petitioner_and_advocate_details: {
        petitioner: "",
        advocate: ""
      },
      respondent_and_advocate_details: [],
      act_details: [
        {
          under_act: "",
          under_section: ""
        },
        {
          under_act: "",
          under_section: ""
        }
      ],
      subordinate_court_information_details: {},
      case_history_details: [
        {
          judge: "",
          business_on_date: "",
          hearing_date: "",
          purpose_of_hearing: ""
        }
      ],
      interim_orders_details: [
        {
          order_number: "",
          order_date: ""
        }
      ],
      final_orders_and_judgements_details: [
        {
          order_number: "",
          order_date: ""
        }
      ],
      case_transfer_and_establishment_details: [
        {
          transfer_date: "",
          from_court_number_and_judge: "",
          to_court_number_and_judge: ""
        }
      ],
      process_details: []
    }
  }


  const generateCaseNumber = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/case/create`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('response.data', response.data);
        Alert.alert(response.data.message);
      } else {
        console.log();
      }
    } catch (error) {
      console.error(error.response.data.message);
      Alert.alert(error.response.data.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.fileContainer}>
      <Text style={styles.fileName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filesContainer}>
        <Text style={styles.heading}>Uploaded Files</Text>
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={generateCaseNumber}>
        <Text style={styles.generateButtonText}>Verfy And Generate Case Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  filesContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: '10%',
  },
  fileContainer: {
    backgroundColor: '#e5e7eb',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
  },
  generateButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NewCaseDoc;
