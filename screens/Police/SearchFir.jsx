import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native'; // Add 'Text' import
import { SearchBar, Button } from 'react-native-elements';
import axios from 'axios'
import baseUrl from '../../config';
import { useAuth } from '../../Context/AuthContext';
import { searchFir } from '../../utils';
const SearchFir = () => {
  const [searchText, setSearchText] = useState('');
  const [firNumber, setFirNumber] = useState('');

  const { selectedLang } = useAuth();


  const fetchFir = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fir/getFirByNumber/${firNumber}`)

      if (response.status === 200) {
        Alert.alert("fir fetched")
        console.log(response.data)
      } else {
        Alert.alert("fir not found")
      }
    } catch (error) {
      console.log(error)
      console.log(error.message)
      // Alert.alert(error.response.data.message)
    }
  }



  const handleFormSubmit = async () => {
    // Add your form submission logic here
    console.log('Submitting FIR Details...');
    console.log('FIR Number:', firNumber);
    await fetchFir();
  };

  return (
    <View style={styles.container}>
      {/* Top Half: Image */}
      <View style={styles.topHalf}>
        {/* Use require to reference the local image */}
        <Image
          source={require('../../assets/search.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Half: Search Bar, Year Input, and Search Button */}
      <View style={styles.bottomHalf}>


        {/* FIR Details Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formInput}
            placeholder={
              selectedLang === 'Hindi' ? searchFir[0].Hindi : searchFir[0].English
            }
            onChangeText={(text) => setFirNumber(text)}
            value={firNumber}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleFormSubmit}
          >
            <Text style={styles.submitButtonText}>
              {selectedLang === 'Hindi' ? searchFir[1].Hindi : searchFir[1].English}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomHalf: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
  },
  searchBarInput: {
    fontSize: 14,
  },
  yearInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  searchButton: {
    backgroundColor: '#3498db',
    marginTop: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    marginTop: 20,
  },
  formInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchFir;
