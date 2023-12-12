import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native';

const LawyerSignupSelection = ({ navigation }) => {
  const [licenseno, setLicense] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLicenseNo = () => {
    // Implement your signup logic here
    console.log('Submitting License no:', licenseno);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleModal();
  };

  return (
    <View style={styles.mainn}>
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
        style={styles.input}
        placeholder="Enter License Number"
        onChangeText={(text) => setLicense(text)}
      />

      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <Text style={styles.dropdownButtonText}>{selectedOption || 'Select Lawyer Type'}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modal}>
         
          <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect('Government Lawyer')}>
            <Text>Government Lawyer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect('Private Firm')}>
            <Text>Private Firm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalClose} onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.signupButton} onPress={handleLicenseNo}>
        <Text style={styles.signupButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainn: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  headingText: {
    marginTop: '20%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    height: '45%',
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
    marginTop: 20,
    textAlign: 'center',
  },
  imageStyle: {
    marginTop: '10%',
    width: '50%',
    height: '150%',
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
  dropdownButton: {
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
    backgroundColor:'white',
  },
  signupButton: {
    backgroundColor: 'red',
    marginVertical: 15,
    padding: 15,
    borderRadius: 5,
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LawyerSignupSelection;
