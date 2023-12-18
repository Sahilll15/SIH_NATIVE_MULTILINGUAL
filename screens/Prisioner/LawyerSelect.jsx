import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import { useFir } from '../../Context/FirContext';
import { useEffect } from 'react';

const LawyerDetailsPage = () => {
  const { fetchfir, FirData } = useFir();
  const [selectedCase, setSelectedCase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching FIR data...');
      try {
        await fetchfir();
        console.log('FIR data fetched successfully.');
      } catch (error) {
        console.error('Error fetching FIR data:', error);
      }
    };

    fetchData();
  }, []);

  const lawyerDetails = {
    id: '1',
    name: 'John Doe',
    contactNo: '+1234567890',
    licenseNumber: 'ABCD1234',
    approxCharge: '$200/hour',
    profilePic: 'https://cdn-icons-png.flaticon.com/256/1995/1995429.png',
  };

  const handleContactLawyer = () => {
    if (selectedCase) {
      // Implement logic to contact the lawyer with selectedCase
      Toast.show({
        type: 'success',
        text1: 'Booked',
        text2: 'Your Request Has Been Successfully Sent!',
      });
    } else {
      Alert.alert('Error', 'Please select a case before contacting the lawyer.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Lawyer Details */}
      <View style={styles.lawyerDetails}>
        <Image source={{ uri: lawyerDetails.profilePic }} style={styles.profilePic} />
        <View style={styles.detailsText}>
          <Text style={styles.lawyerName}>{lawyerDetails.name}</Text>
          <Text>Contact: {lawyerDetails.contactNo}</Text>
          <Text>License Number: {lawyerDetails.licenseNumber}</Text>
          <Text>Approx. Charge: {lawyerDetails.approxCharge}</Text>
        </View>
      </View>

      {/* Case Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text>Select Case:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
          <Text>{selectedCase || 'Select a Case'}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Case Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={FirData.filter((data) => data.FirNumber)}
              keyExtractor={(item) => item?.FirNumber?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCase('Fir -' + item?.FirNumber);
                    setModalVisible(false);
                  }}
                >
                  <Text>Fir - {item.FirNumber}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Contact Lawyer Button */}
      <TouchableOpacity style={styles.contactButton} onPress={handleContactLawyer}>
        <Text style={styles.contactButtonText}>Contact Lawyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: '15%',
  },
  lawyerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  detailsText: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  contactButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LawyerDetailsPage;
