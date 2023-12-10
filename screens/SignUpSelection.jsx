// screens/HomeScreen.js

import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import {  } from 'react-native-gesture-handler';

const SignUpSelection = () => {
  return (
    <View>
      <Text style={styles.headingText}>Welcome! Please select your role</Text>
      <View style={styles.card}>
        <TouchableOpacity
        onPress={() => navigation.navigate()}>
        <Image 
  style={styles.imageStyle}
  source ={require("../assets/person.png")}/>
        </TouchableOpacity>
      <Text style={styles.cardText}>Lawyer</Text>
    </View>


    <View style={styles.card}>
      <Text style={styles.cardText}>UndertrialPrisoner</Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardText}>Jail Authority</Text>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
headingText:{
  fontSize:24,
  fontWeight:'bold',
  paddingHorizontal:8,
},
card: {
  height:"25%",
  width:"90%",
  alignContent:'center',
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 16,
  margin: 16,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
cardText: {
  textAlign:'center',
  fontSize: 16,
  color: 'black',
},
imageStyle:{
height:100,
width:80,
  resizeMode: 'cover',
   },
});

export default SignUpSelection;
