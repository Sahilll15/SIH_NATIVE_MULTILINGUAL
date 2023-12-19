import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLawyer } from '../../Context/LawyerContext';

const ExisitngClient = ({ route, navigation }) => {
  const { setCurrentClientFunction, currentClient } = useLawyer();

  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4NzFmOWZjZmJkNWI1M2MzNzQ3NzMiLCJpYXQiOjE3MDI2NTMyMzh9.htgnfrEThCRoY1gBlkLRDW_bSmK7nosmjtipnC_mdGo`


  const fetchDocs = async () => {
    console.log('fetching..')
    const response = await axios.get(`http://localhost:8000/api/v1/document/getDocuments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }

    })

    if (response.status === 200) {
      console.log(response.data)
      setDocuments(response.data.docs)
    }
    else {
      console.log('error')
    }
  }




  const handleViewDocuments = () => {
    // Navigate to the client documents page
    navigation.navigate('ClientDocument');
  };

  const handleCallClient = () => {

    alert(`Calling ${currentClient.accused.name} at ${currentClient.accused.phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Client Details</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* First Box: Client Details */}
        <View style={styles.box}>
          <Text>Name: {currentClient.accused.name}</Text>
          <Text>Case ID: {currentClient.accused._id}</Text>
          {/* <Text>Previous Date: {clientInfo.prevDate}</Text>
          <Text>Next Date: {clientInfo.nextDate}</Text>
          <Text>Sections: {clientInfo.sections.join(', ')}</Text> */}
        </View>

        {/* Second Box: Contact Information */}
        <View style={styles.box}>
          <Text>Email: {currentClient.accused.email}</Text>
          <Text>Contact No: {currentClient.accused.phoneNumber}</Text>
        </View>

        {/* View Client Documents Button */}
        <TouchableOpacity style={styles.button} onPress={handleViewDocuments}>
          <Icon name="file-text-o" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>View Client Documents</Text>
        </TouchableOpacity>

        {/* Call Client Button */}
        <TouchableOpacity style={styles.buttond} onPress={handleCallClient}>
          <Icon name="phone" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Call Client</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonde} onPress={handleCallClient}>
          <Icon name="phone" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>File Case Client</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2563eb', // Blue color
    padding: 16,
    alignItems: 'center',

  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '10%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#b2ebf2', // Light Cyan shade
  },
  buttond: {
    backgroundColor: '#16a34a', // Blue color
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 16,
    alignSelf: 'center',
    width: '100%',
    marginTop: '10%',
  },
  buttonde: {
    backgroundColor: '#16a34a', // Blue color
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 8,
    alignSelf: 'center',
    width: '100%',
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#2563eb', // Blue color
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 16,
    alignSelf: 'center',
    marginTop: '10%',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default ExisitngClient;
