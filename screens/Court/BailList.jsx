// BailList.js

import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { bailList } from '../../utils';

const BailList = ({ navigation }) => {

  const { selectedLang } = useAuth();
  const persons = [
    { id: 1, name: 'John Doe', lawyer: 'Lawyer Smith', caseNumber: 'ABC123' },
    { id: 2, name: 'Jane Doe', lawyer: 'Lawyer Johnson', caseNumber: 'XYZ456' },
    { id: 3, name: 'Alice Johnson', lawyer: 'Lawyer Williams', caseNumber: '123DEF' },
  ];





  return (
    <View style={styles.container}>
      <ScrollView>
        {persons.map((person) => (
          <TouchableOpacity
            key={person.id}
            style={styles.personContainer}
            onPress={() => navigation.navigate('BailDetail')}
          >
            <Text style={styles.personName}>{person.name}</Text>
            <Text style={styles.personDetails}>{
              selectedLang === 'Hindi' ? bailList[0].Hindi : bailList[0].English
            }: {person.id}</Text>
            <Text style={styles.personDetails}>{
              selectedLang === 'Hindi' ? bailList[1].Hindi : bailList[1].English
            }: {person.lawyer}</Text>
            <Text style={styles.personDetails}>{
              selectedLang === 'Hindi' ? bailList[2].Hindi : bailList[2].English
            }: {person.caseNumber}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  personContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
  },
  personName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  personDetails: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 8,
  },
});

export default BailList;
