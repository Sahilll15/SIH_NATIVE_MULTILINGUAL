// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SignUpSelection = ({ navigation }) => {
  const roles = [
    { name: 'Lawyer', image: require("../assets/person.png") },
    { name: 'Jailer', image: require("../assets/police.png") },
    { name: 'Under trial Prisoner', image: require("../assets/prisoner.png") },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Choose Your Role</Text>
      <View style={styles.cardContainer}>
        {roles.map((role, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(/* Specify the screen name for the role */)}>
            <View>
              <Image style={styles.imageStyle} source={role.image} />
              <Text style={styles.cardText}>{role.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    flex: 1,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  imageStyle: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
});

export default SignUpSelection;
