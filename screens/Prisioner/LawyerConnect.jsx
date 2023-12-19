import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const LawyerConnect = ({ route }) => {
  const handleCall = () => {
    // Implement the logic to initiate a phone call
    // You can use the Linking module for this
  };

  const handleMessage = () => {
    // Implement the logic to open the messaging app
    // You can use the Linking module for this
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <Image source={{ uri: 'https://avatars.githubusercontent.com/u/121731399?v=4' }} style={styles.lawyerImage} />
        <Text style={styles.lawyerName}>Lawyer Name </Text>
        <Text style={styles.lawyerInfo}>Specialty: Criminal</Text>
        {/* Add more lawyer information as needed */}
      </View>
      <View style={styles.bottomHalf}>
        <TouchableOpacity style={[styles.button, styles.callButton]} onPress={handleCall}>
          <FontAwesome5 name="phone" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMessage}>
          <FontAwesome5 name="envelope" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  topHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'center',
  },
  lawyerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  lawyerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lawyerInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  callButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default LawyerConnect;
