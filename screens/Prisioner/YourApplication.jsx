import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useLawyer } from '../../Context/LawyerContext';
import baseUrl from '../../config';

const LawyerList = () => {

  const navigation = useNavigation();

  const { selectedLang } = useAuth();

  const { activeContactedLawyer, setActiveContactedFunction } = useLawyer()

  const [lawyers, setLawyers] = React.useState([]);

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgxODcwMjc1ODc1YTBjY2M5NmRmZGIiLCJhZGRoYXJDYXJkIjoiNjA2My0zMjExLTg2OTQiLCJpYXQiOjE3MDMwNDQwOTV9._u2sNMSkPFztJ0LxJGIvy0Zu9-pxBGBPD5gy4jIKN1U`;

  const fetchYourCases = async () => {
    try {
      const response = await axios.get(`${baseUrl}/caseFight/fetchByUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        console.log(response.data);
        setLawyers(response.data.cases);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYourCases();
  }, []);

  const getTextColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Waiting':
        return 'orange';
      default:
        return 'black';
    }
  };

  const handleStatusClick = (item) => {
    if (item.Accepted) {
      // Navigate to another page when status is 'Accepted'
      navigation.navigate('LawyerConnect');
    }
  };

  const renderLawyerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lawyerItem}
      onPress={() => handleStatusClick(item)}
    >
      <Text style={styles.lawyerName}>{item.lawyer.name}</Text>
      <Text style={styles.lawyerName}>{item.lawyer.email}</Text>
      <Text style={[styles.lawyerStatus, { color: getTextColor(item.status) }]}>
        {
          selectedLang === 'Hindi' ? 'स्थिति' : 'Status'
        }: {item.Accepted ? 'Accepted' : 'Waiting'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{
        selectedLang === 'Hindi' ? 'आपके मामले' : 'Your Cases'

      }</Text>
      <FlatList
        data={lawyers}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderLawyerItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lawyerItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lawyerStatus: {
    fontSize: 16,
  },
});

export default LawyerList;
