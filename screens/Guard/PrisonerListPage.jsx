import React from 'react';
import Toast from 'react-native-toast-message';

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PrisonerListPage = () => {
  const prisoners = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    // Add more prisoners as needed
  ];
  const headerImage = require('../../assets/cellular-jail.png'); 

  const PrisionerDetail = () => {
    // Implement logic to contact the lawyer
    Toast.show({
      type: 'error', // Can be 'success', 'error', 'info', or 'any custom type'
      text1: 'Under Development',
    
    });
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      stickyHeaderIndices={[0]} // Index of the header
    >
      <Image
        source={headerImage}
        style={styles.headerImage}
      />
      <View style={styles.prisonersContainer} >
        {prisoners.map((prisoner) => (
          <TouchableOpacity
            key={prisoner.id}
            style={styles.prisonerCard}
            onPress={PrisionerDetail}
          >
            <FontAwesome5 name="user-circle" size={40} color="#3498db" style={styles.icon} />
            <Text style={styles.prisonerName}>{prisoner.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'2%',
  },
  
  prisonersContainer: {
    width: '95%',
    alignItems: 'center',
    marginTop: 0, // No spacing at the top
  },
  prisonerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    minWidth: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  prisonerName: {
    fontSize: 15,
  },
});

export default PrisonerListPage;
