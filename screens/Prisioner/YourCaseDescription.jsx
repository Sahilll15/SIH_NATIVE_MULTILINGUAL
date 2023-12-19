import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFir } from '../../Context/FirContext';

const YourCaseDescription = () => {

  const { currentFir } = useFir();


  const formattedData = Object.entries(currentFir).map(([label, value]) => ({ label, value }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {formattedData.map((item) => (
          <View key={item.label} style={styles.itemContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '90%', // Adjust the width as needed
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10, // Decreased padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8, // Adjusted vertical padding
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});

export default YourCaseDescription;
