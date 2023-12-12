// Import necessary React and React Native components
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Import your local images
const topImage = require('../../assets/signupm.png');
const image1 = require('../../assets/person.png');
const image2 = require('../../assets/prisoner.png');
const image3 = require('../../assets/police.png');

// Define your component
const MyPage = () => {
  return (
    <View style={styles.container}>
      {/* Top half with an image */}
      <View style={styles.topHalf}>
        <Image
          source={topImage}
          style={styles.image}
        />
      </View>

      <View style={styles.bottomHalf}>
        {/* Text instruction */}
        <Text style={styles.selectRoleText}>Select Your Role</Text>

        {/* First row with two boxes */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={() => console.log('Lawyer button pressed')}>
            <Image
              source={image1}
              style={styles.boxImage}
            />
            <Text style={styles.boxText}>LAWYER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => console.log('Prisoner button pressed')}>
            <Image
              source={image2}
              style={styles.boxImage}
            />
            <Text style={styles.boxText}>PRISONER</Text>
          </TouchableOpacity>
        </View>

        {/* Second row with one box */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={() => console.log('Jailer button pressed')}>
            <Image
              source={image3}
              style={styles.boxImage}
            />
            <Text style={styles.boxText}>JAILER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topHalf: {
    flex: 1,
    marginTop:'5%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  bottomHalf: {
    flex: 1,
    padding: 10,
  },
  selectRoleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf:'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  boxImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  boxText: {
    fontSize: 16,
  },
});


// Export the component
export default MyPage;
