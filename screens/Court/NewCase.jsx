import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useLawyer } from '../../Context/LawyerContext';

const NewCase = ({ navigation }) => {
  // Dummy data for new cases
  const [newCasesData, setnewCasesData] = useState([])

  const { setCurrentCourtCaseFunction, currentCourtCase } = useLawyer()


  const fetchCasesByCourt = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/court/fetchCourtCaseFileRequest/65820a2b9084d68554b45303`)

    if (response.status === 200) {
      console.log(response.data)
      setnewCasesData(response.data.courtss)
    }
    else {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchCasesByCourt()

  }, [])



  return (
    <ScrollView contentContainerStyle={styles.container}>
      {newCasesData?.map((caseData, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => {
          setCurrentCourtCaseFunction(caseData)
          navigation.navigate('NewCaseDoc')
        }}>
          <Text style={styles.firNumber}>{`FIR Number: ${caseData.FirId.FirNumber}`}</Text>
          <Text style={styles.lawyerName}>{`Lawyer Name: ${caseData.lawyer.name}`}</Text>
          <Text style={styles.lawyerName}>{`Lawyer Phone: ${caseData.lawyer.phone}`}</Text>
          <Text style={styles.lawyerName}>{`Lawyer Phone: ${caseData.lawyer.LicenseNumber}`}</Text>
          <Text style={styles.clientName}>{`Sections: ${caseData.FirId.sections.join(', ')}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  firNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lawyerName: {
    fontSize: 16,
    color: '#666',
  },
});

export default NewCase;
