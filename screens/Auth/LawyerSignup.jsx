import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import axios from 'axios'

const LawyerSignup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [licenseno, setLicense] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = async () => {

    const obj = {
      name,
      phone: phoneNumber,
      email,
      password,
      aadharNumber,
      LicenseNumber: licenseno,
      type: selectedOption,
      address
    }

    console.log(obj)


    try {
      const response = await axios.post(`http://localhost:8000/api/v1/lawyer/signupLawyer`, obj, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.status === 200) {
        console.log(response.data)
        navigation.navigate('Login')
      }
      else {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }

  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleModal();
  };

  // name, email, phone number, aadhar number, type, license number

  return (
    <ScrollView style={styles.mainn}>
      <Text style={styles.headingText}>Please Fill the Details!</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('UploadCertificate')}
      >
        <View style={styles.licenseContainer}>
          <Text style={styles.lcontainerText}>CLICK HERE TO UPLOAD CERTIFICATE</Text>
          <Image style={styles.imageStyle} source={require("../../assets/license.png")} />
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.inputt}
        placeholder="Enter Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.inputt}
        placeholder="Enter Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.inputt}
        placeholder="Enter License Number"
        onChangeText={(text) => setLicense(text)}
      />

      <TextInput
        style={styles.inputt}
        placeholder="Enter Address "
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.inputt}
        placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputt}
        placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.inputt}
        placeholder="Enter Aadhar Number"
        onChangeText={(text) => setAadharNumber(text)}
      />

      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <Text style={styles.dropdownButtonText}>{selectedOption || 'Select Lawyer Type'}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modal}>

          <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect('Government')}>
            <Text>Government Lawyer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect('private')}>
            <Text>Private Firm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalClose} onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={styles.signupButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainn: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  headingText: {
    marginTop: '10%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    height: '25%',
    width: '90%',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  licenseContainer: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  lcontainerText: {
    color: 'black',
    marginTop: 0,
    textAlign: 'center',
  },
  imageStyle: {
    marginTop: '5%',
    width: '20%',
    height: '100%',
  },
  input: {
    marginVertical: 20,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  inputt: {
    marginVertical: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    color: 'black',
  },
  dropdownButton: {
    marginTop: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: 'black',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',

  },
  modalClose: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  signupButton: {
    backgroundColor: 'red',
    marginVertical: 15,
    padding: 15,
    borderRadius: 5,
    marginBottom: '30%'
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',

  },
});

export default LawyerSignup;
