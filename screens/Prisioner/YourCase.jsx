// CasesPage.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { useFir } from '../../Context/FirContext';

const CasesPage = () => {
  // Dummy data for testin






  const { fetchfir, FirData } = useFir()


  // const fetchfir = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/v1/fir/getFirByUser', {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdmMmFkMWFmY2Y1ZmNjNjk1NmY4YmUiLCJhZGRoYXJDYXJkIjoiNjA2My0zMjExLTg2OTQiLCJpYXQiOjE3MDI4MzQ1NDZ9.kMAdRnYe3oBB_hUbC5cpv_guOMG4zxBx36vMlccjHfo`
  //       }
  //     })


  //     if (response.status === 200) {
  //       console.log(response.data)
  //       setCaseData(response.data.Fir)
  //     } else {
  //       Alert.alert('error fetching')
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  useEffect(() => {
    const fetchData = async () => {
      await fetchfir();

    };

    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>All Cases</Text>
      <FlatList
        data={FirData.filter((casesData) => casesData.FirNumber)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Alert.alert(item._id)}>
            <View style={styles.caseItem} key={item._id}>
              <Text style={styles.caseNumber}>Case Number: {item.FirNumber}</Text>
              <Text style={styles.caseDescription}>{item.firDescription}</Text>
              {item.sections.map((section, index) => (
                <View style={{ display: 'flex', flexDirection: 'row' }} key={index}>
                  <Text>{section}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  caseItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  caseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caseDescription: {
    fontSize: 16,
  },
});

export default CasesPage;
