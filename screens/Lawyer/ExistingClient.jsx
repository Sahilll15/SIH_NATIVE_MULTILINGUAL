import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLawyer } from '../../Context/LawyerContext';
import { existingClient } from '../../utils';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';


const ExistingClient = ({ route, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [courts, setCourts] = useState([])
  const [selectedCourt, setSelectedCourt] = useState([])

  const { selectedLang } = useAuth();







  const fetchCourts = async () => {
    const response = await axios(`http://localhost:8000/api/v1/court/fetchCourts`)

    if (response.status === 200) {
      // console.log(response.data)
      setCourts(response.data.courts)
    }
    else {
      console.log('error')
    }

  }


  const createCourtFile = async () => {
    const response = await axios.post(`http://localhost:8000/api/v1/court/createCourtFileRequest`, {
      id: selectedCourt,
      lawyerId: currentClient.lawyer,
      accusedId: currentClient.accused._id,
      firId: currentClient.FirId._id,


    })

    if (response.status === 200) {
      console.log('response.data', response.data)
      Alert.alert(response.data.message)
    }
    else {
      console.log('error')
    }

  }


  useEffect(() => {
    fetchCourts()
  }, [])

  useEffect(() => {
    console.log(selectedCourt)
  }, [selectedCourt])


  const { currentClient } = useLawyer();


  const handleViewDocuments = () => {
    navigation.navigate('ClientDocument');
  };

  const handleCallClient = () => {

    navigation.navigate('VideoCall')
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);


  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{
          selectedLang === 'Hindi'
            ? existingClient[0].Hindi
            : existingClient[0].English
        }</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* First Box: Client Details */}
        <View style={styles.box}>
          <Text>{
            selectedLang === 'Hindi'
              ? existingClient[1].Hindi
              : existingClient[1].English
          }: {currentClient?.accused?.name}</Text>
          <Text>{
            selectedLang === 'Hindi'
              ? existingClient[2].Hindi
              : existingClient[2].English
          }: {currentClient?._id}</Text>
          {/* <Text>Previous Date: {clientInfo.prevDate}</Text>
          <Text>Next Date: {clientInfo.nextDate}</Text> */}
          <Text>{
            selectedLang === 'Hindi'
              ? existingClient[3].Hindi
              : existingClient[3].English
          }: {currentClient.FirId.sections.join(', ')}</Text>
        </View>

        {/* Second Box: Contact Information */}
        <View style={styles.box}>
          <Text>{
            selectedLang === 'Hindi'
              ? existingClient[4].Hindi
              : existingClient[4].English
          }: {currentClient.accused.email}</Text>
          <Text>{
            selectedLang === 'Hindi'
              ? existingClient[5].Hindi
              : existingClient[5].English
          }: {currentClient.accused.phoneNumber}</Text>
        </View>

        {/* View Client Documents Button */}
        <TouchableOpacity style={styles.button} onPress={handleViewDocuments}>
          <Icon name="file-text-o" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi'
              ? existingClient[6].Hindi
              : existingClient[6].English
          }</Text>
        </TouchableOpacity>

        {/* Call Client Button */}
        <TouchableOpacity style={styles.buttond} onPress={handleCallClient}>
          <Icon name="phone" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi'
              ? existingClient[7].Hindi
              : existingClient[7].English
          }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttond} onPress={toggleModal}>
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 10,
            textAlign: 'center',
            alignItems: 'center'
          }} >{
              selectedLang === 'Hindi'
                ? existingClient[8].Hindi
                : existingClient[8].English
            }</Text>

        </TouchableOpacity>


        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={courts.filter((court) => court.id)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedCourt(item.id)
                      createCourtFile()
                      setModalVisible(false);
                    }}
                  >
                    <Text>Court -{item.id}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>


      </View>
    </View >
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    height: 60,
    width: 300,

  },
  header: {
    backgroundColor: '#2563eb', // Blue color
    padding: 16,
    alignItems: 'center',

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

export default ExistingClient;