import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';

const prisonerLawyerData = [
  {
    id: '1',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '2',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  },
  {
    id: '3',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '4',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '5',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '6',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '7',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '8',
    prisonerName: 'Atharva Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '9',
    prisonerName: 'aarchyi Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '10',
    prisonerName: 'slice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '11',
    prisonerName: 'Siddhi Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '12',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '13',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '14',
    prisonerName: 'Sahil Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '15',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '16',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '17',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '18',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '19',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '20',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '21',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '22',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '23',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '24',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '25',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '26',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '27',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '28',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '29',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '30',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '31',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '32',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '33',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '34',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '35',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '36',
    prisonerName: 'Alice Johnson',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  }, {
    id: '37',
    prisonerName: 'John Doe',
    lawyerName: 'Jane Smith',
    lawyerContact: '123-456-7890',
  },
  {
    id: '38',
    prisonerName: 'Omkar',
    lawyerName: 'Robert Anderson',
    lawyerContact: '987-654-3210',
  },
  // Add more prisoner-lawyer pairs as needed
];

const PrisonerLawyer = () => {
  const [selectedPair, setSelectedPair] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showDetails = (pairId) => {
    setSelectedPair(selectedPair === pairId ? null : pairId);
  };

  const filteredPairs = prisonerLawyerData.filter(
    (pair) =>
      pair.prisonerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.lawyerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Prisoner-Lawyer Information</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <ScrollView style={styles.scrollView}>
        {filteredPairs.map((pair) => (
          <TouchableOpacity
            key={pair.id}
            style={styles.pairItem}
            onPress={() => showDetails(pair.id)}
          >
            <Text style={styles.pairTitle}>{pair.prisonerName}</Text>
            {selectedPair === pair.id && (
              <View>
                <Text style={styles.pairText}>Lawyer: {pair.lawyerName}</Text>
                <Text style={styles.pairText}>Contact: {pair.lawyerContact}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  pairItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#bbdefb',
    borderRadius: 8,
  },
  pairTitle: {
    fontWeight: 'bold',
    color: '#1565c0',
  },
  pairText: {
    marginTop: 5,
    color: '#000000',
  },
});

export default PrisonerLawyer;