// Import necessary React and React Native components
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Import your local images
const topImage = require('../../assets/signupm.png');
const image1 = require('../../assets/person.png');
const image2 = require('../../assets/prisoner.png');
const image3 = require('../../assets/police.png');
import axios from 'axios'
import baseUrl from '../../config';
import { useAuth } from '../../Context/AuthContext';


// Define your component
const MyPage = ({ navigation }) => {
  const [userType, setUserType] = useState('');

  const { setUserDetailsFunctions, userDetails } = useAuth();

  const handleUserTypeSelection = (selectedUserType) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to select ${selectedUserType}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log(`${selectedUserType} button pressed`);

            setUserType(selectedUserType);
            setUserTypeFunction();

          },
        },
      ],
      { cancelable: false }
    );
  };


  const setUserTypeFunction = async () => {
    try {

      const response = await axios.post(`${baseUrl}/priosioner/setUserType/${userDetails._id}`, {
        type: userType
      })

      if (response.status === 200) {
        setUserDetailsFunctions(response.data.user)
        navigation.navigate('Login')
      }
    } catch (error) {
      Alert.alert(error.response.data.message)
      console.log(error.message)
    }
  }




  return (
    <View style={styles.container}>
      {/* Top half with an image */}
      <View style={styles.topHalf}>
        <Image source={topImage} style={styles.image} />
      </View>

      <View style={styles.bottomHalf}>
        {/* Text instruction */}
        <Text style={styles.selectRoleText}>Select Your Role</Text>

        {/* First row with two boxes */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleUserTypeSelection('Lawyer')}
          >
            <Image source={image1} style={styles.boxImage} />
            <Text style={styles.boxText}>LAWYER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleUserTypeSelection('Prisoner')}
          >
            <Image source={image2} style={styles.boxImage} />
            <Text style={styles.boxText}>PRISONER</Text>
          </TouchableOpacity>
        </View>

        {/* Second row with one box */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleUserTypeSelection('Jailer')}
          >
            <Image source={image3} style={styles.boxImage} />
            <Text style={styles.boxText}>JAILER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topHalf: {
    flex: 1,
    marginTop: '5%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  bottomHalf: {
    flex: 1,
    padding: 10,
  },
  selectRoleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  boxImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  boxText: {
    fontSize: 16,
  },
});

// Export the component
export default MyPage;
