// screens/HomeScreen.js

import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import {  } from 'react-native-gesture-handler';

const SignUpSelection = () => {
  return (
    <View>
      <Text style={styles.headingText}>Welcome! Please select your role</Text>
      <TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate()}>
       <View >
         <Image 
           style={styles.imageStyle}
              source ={require("../assets/person.png")}/>
     
      <Text style={styles.cardText}>Lawyer</Text> 
     
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate()}>
       <View >
         <Image 
           style={styles.imageStyle}
              source ={require("../assets/police.png")}/>
     
      <Text style={styles.cardText}>Jailer</Text> 
     
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate()}>
       <View >
         <Image 
           style={styles.imageStyle}
              source ={require("../assets/prisoner.png")}/>
     
      <Text style={styles.cardText}>Undertrial Prisoner</Text> 
     
    </View>
    </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
  headingText:{
    marginTop:"20%",
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
    margin: 10,
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
    alignSelf:'center',
   // marginLeft:"40%",
  height:"80%",
  width:"30%",
     },
  });
export default SignUpSelection;
