import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { courtHome } from '../../utils';

const CourtHome = ({ navigation }) => {

  const { selectedLang } = useAuth();
  return (
    <View style={styles.container}>
      {/* Top Half: Image */}
      <View style={styles.topHalf}>
        <Image
          source={require('../../assets/law.png')} // Replace with the actual image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Half: New Case and Existing Case Buttons */}
      <View style={styles.bottomHalf}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewCase')}>
          <Image
            source={require('../../assets/law.png')} // Replace with the actual image path for new case
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi' ? courtHome[0].Hindi : courtHome[0].English
          }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExistingCase')}>
          <Image
            source={require('../../assets/law.png')} // Replace with the actual image path for existing case
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi' ? courtHome[1].Hindi : courtHome[1].English
          }</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bail} onPress={() => navigation.navigate('BailList')}>

        <Text style={styles.bailText}>{
          selectedLang === 'Hindi' ? courtHome[2].Hindi : courtHome[2].English

        }</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: '20%',
    width: '80%',
    height: '100%',
  },
  bottomHalf: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bail: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    width: '80%',
    height: 50,
    backgroundColor: '#2a2a2a', // Dark grey background color
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#1a1a1a', // Border color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3, // Android shadow
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // You can add more styles based on your design needs
  },
  bailText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

});

export default CourtHome;
