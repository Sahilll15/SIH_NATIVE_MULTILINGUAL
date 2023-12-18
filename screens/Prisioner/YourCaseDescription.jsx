import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YourCaseDescription = () => {
  const data = {
    "FirNumber": 7723,
    "PoliceStation": "City Central Police Station",
    "__v": 0,
    "_id": "657ff768071c5dbf8014ed0e",
    "accusedAddharCard": "6063-3211-8694",
    "accusedAge": 30,
    "accusedName": "John Doe",
    "firDate": "2023-12-17T00:00:00.000Z",
    "firDescription": "Theft of personal property",
    "firPlace": "Example City",
    "policeName": "Officer Smith",
    "sections": ["Section 380", "Section 457"],
  };

  const formattedData = Object.entries(data).map(([label, value]) => ({ label, value }));

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
