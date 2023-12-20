import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useLawyer } from "../../Context/LawyerContext";
import { useAuth } from "../../Context/AuthContext";
import { clientCaseDetail } from "../../utils";
import axios from 'axios'

const ClientCaseDetail = () => {


  const { selectedLang } = useAuth();

  const { setCurrentClientFunction, currentClient } = useLawyer();

  const handleCall = async () => {

    const phoneNumber = currentClient?.accused?.phoneNumber;
    console.log(phoneNumber)

    if (phoneNumber) {
      const phoneNumberUrl = `tel:${phoneNumber}`;
      await Linking.openURL(phoneNumberUrl);
    } else {
      console.error('Client phone number is not available');
    }
  };


  console.log(currentClient)
  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdmMmI1MzlmYmEyNzA5MTFkNWNiYzMiLCJhZGRoYXJDYXJkIjoiNjA2My0zMjExLTg2OTQiLCJpYXQiOjE3MDI5NzU0NTN9.6pZNLLAtNFBk69-7YX3GcPIhwh3wYNkCosJKlMovY1Q`;

  const tokenn = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgxNTcxZGYwYmZmMWRmNTJmOWYyYzkiLCJpYXQiOjE3MDI5NzUzMzN9.CNcv55GhJu5d5eulb9jOaFQmKcf1nnGpSf0cB_3NIuc`
  const profilePic = 'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg'
  const fetchCaseFightBylawyer = async () => {
    try {

      const response = await axios.get('http://localhost:8000/api/v1/caseFight/fetchByLawyer', {
        headers: {
          'Authorization': `Bearer ${tokenn}`
        }
      })

      if (response.status === 200) {
        setClients(response.data.cases)
      }

    } catch (error) {
      console.log(error)


    }
  }



  const handleAccept = async () => {

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/caseFight/acceptRequest/${currentClient?._id}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );


      if (response.status === 200) {
        Alert.alert(response.data.message);
        fetchCaseFightBylawyer()

      } else {
        console.log('error');
      }

    } catch (error) {
      console.log('Error:', error.message);
      console.log('Error Response:', error.response.data);
    }

  }





  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardText}>{
          selectedLang === 'Hindi' ? clientCaseDetail[0].Hindi : clientCaseDetail[0].English
        }
        </Text>
        <View style={styles.clientDetails}>
          <Image
            style={styles.clientImage}
            source={{
              uri: "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg",
            }}
          />
          <View style={styles.clientText}>
            <Text style={styles.listItemTitle}>{
              selectedLang === 'Hindi' ? clientCaseDetail[1].Hindi : clientCaseDetail[1].English
            }</Text>
            <Text style={styles.listItemSubtitle}>{currentClient?.accused?.name}</Text>

            <Text style={styles.listItemTitle}>{
              selectedLang === 'Hindi' ? clientCaseDetail[2].Hindi : clientCaseDetail[2].English
            }</Text>
            <Text style={styles.listItemSubtitle}>Fir - {currentClient?.FirId?.FirNumber}</Text>

            <Text style={styles.listItemTitle}>{
              selectedLang === 'Hindi' ? clientCaseDetail[3].Hindi : clientCaseDetail[3].English
            }</Text>
            <Text style={styles.listItemSubtitle}>In Progress</Text>

            <Text style={styles.listItemTitle}>{
              selectedLang === 'Hindi' ? clientCaseDetail[4].Hindi : clientCaseDetail[4].English
            }</Text>
            <Text style={styles.listItemSubtitle}>{currentClient?.FirId?.sections[0]} {currentClient?.FirId?.sections[1]}</Text>

          </View>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardText}>{
          selectedLang === 'Hindi' ? clientCaseDetail[5].Hindi : clientCaseDetail[5].English
        }</Text>
        <Text>
          {currentClient?.FirId?.firDescription}
        </Text>
      </Card>

      <TouchableOpacity style={[styles.button, styles.contactClientButton]} onPress={handleCall}>

        <Text style={styles.buttonText} >{
          selectedLang === 'Hindi' ? clientCaseDetail[6].Hindi : clientCaseDetail[6].English
        }</Text>
        <FontAwesome5 name="phone" size={20} color="#fff" style={styles.buttonIcon} />
      </TouchableOpacity>
      {
        !currentClient.Accepted ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#3498db' }]} onPress={handleAccept}>
              <FontAwesome5 name="check" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{
                selectedLang === 'Hindi' ? clientCaseDetail[7].Hindi : clientCaseDetail[7].English
              }</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]}>
              <FontAwesome5 name="times" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{
                selectedLang === 'Hindi' ? clientCaseDetail[8].Hindi : clientCaseDetail[8].English
              }</Text>
            </TouchableOpacity>
          </View>
        ) :
          null
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: 'white',
  },
  card: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clientDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  clientText: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemSubtitle: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  contactClientButton: {
    backgroundColor: '#2ecc71',
    maxHeight: 50,

  },

});

export default ClientCaseDetail;
