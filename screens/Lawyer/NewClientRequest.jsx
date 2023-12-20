import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios'
import { useLawyer } from '../../Context/LawyerContext';
import { useAuth } from '../../Context/AuthContext';
import { newClientRequest } from '../../utils';

const NewClientRequest = ({ navigation }) => {




  const { selectedLang } = useAuth();
  const [clients, setClients] = useState([])

  const { setCurrentClientFunction, currentClient } = useLawyer();

  const pressHandler = (id) => {
    console.log(id);
  };

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgxNTcxZGYwYmZmMWRmNTJmOWYyYzkiLCJpYXQiOjE3MDI5NzUzMzN9.CNcv55GhJu5d5eulb9jOaFQmKcf1nnGpSf0cB_3NIuc`
  const profilePic = 'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg'
  const fetchCaseFightBylawyer = async () => {
    try {

      const response = await axios.get('http://localhost:8000/api/v1/caseFight/fetchByLawyer', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        setClients(response.data.cases)
      }

    } catch (error) {
      console.log(error)


    }
  }


  useEffect(() => {
    fetchCaseFightBylawyer()
  }, [])

  const renderClientCard = (client) => (
    <TouchableOpacity key={client.id} style={styles.clientCard} onPress={() => {
      navigation.navigate('ClientCaseDetail')
      setCurrentClientFunction(client)
    }}>
      <View style={styles.cardContent}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: profilePic }}
          />
        </View>
        <View style={styles.clientInfoContainer}>
          <Text style={styles.clientName}>{client?.accused?.name}</Text>
          <Text style={styles.caseDetails}>
            <Text style={{ color: 'black' }}>{`${selectedLang === 'Hindi' ? newClientRequest[1].Hindi : newClientRequest[1].English}: ${client?.FirNumber}\n`}</Text>
            <Text style={{ color: 'black' }}>
              {selectedLang === 'Hindi' ? newClientRequest[2].Hindi : newClientRequest[2].English}: {client?.FirId?.sections?.map((section, index) => (
                <Text key={index} style={{ color: 'black' }}>{`${section} `}</Text>
              ))}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (clients.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>No New Client Requests</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.dashboardText}>{
            selectedLang === 'Hindi' ? newClientRequest[0].Hindi : newClientRequest[0].English
          }
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={clients}
          renderItem={({ item }) => renderClientCard(item)}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: '#7e22ce', // Cyan shade
    width: '100%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dashboardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '5%',
  },
  clientCard: {
    backgroundColor: '#d1d5db',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    borderColor: 'black',
  },
  cardContent: {
    flexDirection: 'row',
  },
  profileImageContainer: {
    marginRight: 20,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  clientInfoContainer: {
    flex: 1,
  },
  clientName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caseDetails: {
    fontSize: 16,
  },
  bottomContainer: {
    backgroundColor: 'white',
  }
});

export default NewClientRequest;
