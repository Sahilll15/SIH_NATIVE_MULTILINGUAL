import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const CourtHome = ({ navigation }) => {
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
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('NewCase')}>
          <Image
            source={require('../../assets/law.png')} // Replace with the actual image path for new case
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>New Case</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExistingCase')}>
          <Image
            source={require('../../assets/law.png')} // Replace with the actual image path for existing case
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Existing Case</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
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
});

export default CourtHome;
