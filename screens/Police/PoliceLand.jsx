import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const PoliceLand = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <Image
          source={{ uri: 'https://example.com/your-image-url.jpg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bottomHalf}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchFir')} >
          {/* You can replace the icon source with your own image */}
          <Image source={require('../../assets/search.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Find FIR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fir')} >
          {/* You can replace the icon source with your own image */}
          <Image source={require('../../assets/make.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Make FIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color for the bottom half
  },
  button: {
    width: 160,
    height: 150,
    backgroundColor: '#3498db', // Button background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonIcon: {
    width: 100,
    height: 80,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PoliceLand;
