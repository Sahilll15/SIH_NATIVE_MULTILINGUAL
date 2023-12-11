
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Image } from 'react-native'
import {} from 'react-native-gesture-handler';
import React, { useState } from 'react';
 

const LawyerSignupSelection = (navigation) => {
  const [licenseno, setLicense] = React.useState('');
  const handleLicenseNo = () => {
    // Implement your signup logic here
    console.log('Submitting License no:',licenseno, );
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);};
  return (
    <View>
      <Text style={styles.headingText}>Please Fill the details!</Text>
    <TouchableOpacity style={styles.card}
    onPress={() => navigation.navigate()}>
    <View style={styles.licensecontainer}>
      <Text style={styles.lcontainertext}>CONTAINER TO UPLOAD CERTIFICATE</Text>
      <Image 
  style={styles.imageStyle}
  source ={require("../../assets/license.png")}/>
    </View>
    </TouchableOpacity>    
    <View>
    <TextInput
          style={styles.input}
          placeholder="Enter License Number"
          secureTextEntry
          onChangeText={text => setLicense(text)}
        /></View>


      <View>
        <TouchableOpacity  style={[styles.radioButton,styles.rdb1, selectedOption === 'option1' && styles.selected]}
        onPress={() => handleOptionSelect('option1')}>
        <Text>Government Lawyer</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={[styles.radioButton, selectedOption === 'option2' && styles.selected]}
        onPress={() => handleOptionSelect('option2')}>
        <Text>Private Firm</Text>
      </TouchableOpacity></View>
      <TouchableOpacity style={styles.SignupButton} onPress={handleLicenseNo}>
        <Text style={styles.SignupButtonText}>Sign in</Text>
      </TouchableOpacity>
    
    

    </View>
  )
}
const styles = StyleSheet.create({
  headingText:{
    marginTop:"20%",
    fontSize:24,
    fontWeight:'bold',
    paddingHorizontal:8,
    textAlign:"center",
  },
  imageStyle:{
    marginTop:"10%",
    width:"50%",
    height:"150%",
   
     },
  licensecontainer:{
 height:"35%",
 width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"20%"
  },
  lcontainertext:{
    color:'black',
    marginTop:20,
    textAlign:'center'
  },
  input: {
    margin:20,
    height: 40,
    borderColor: 'black', // black border color
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black', // black text color
  },
  card: {
    
    height:"45%",
    width:"90%",
    alignContent:'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin:20,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    marginLeft:10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
rdb1:{
  marginBottom:10,
},
  selected: {
    backgroundColor: 'blue',
  },
  SignupButton: {
    backgroundColor:'red',
    margin:15,
    padding: 15,
    borderRadius: 5,
  },
  SignupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default LawyerSignupSelection