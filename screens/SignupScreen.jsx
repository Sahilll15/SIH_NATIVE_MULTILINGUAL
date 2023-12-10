// screens/SignupScreen.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity ,StatusBar,StyleSheet,Image} from 'react-native';

const SignupScreen = (navigation) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signing up with:', username, password, email);
  };

  return (
    <View style={styles.container}>
   <Image 
  style={styles.imageStyle}
  source ={require("../assets/logo.png")}/>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Signup</Text>
      <View style={styles.inputContainer}>
      <TextInput
       style={styles.input}
        placeholder="EnterUsername"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
       style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TextInput
      style={styles.input}
        placeholder="Enter Email"
        onChangeText={text => setEmail(text)}
      />
      </View>
      <TouchableOpacity style={styles.SignupButton} onPress={handleSignup}>
        <Text style={styles.SignupButtonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  imageStyle:{
    width:200,
    height:150,
    alignContent:"space-between",
     },
     container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFF' ,
    paddingHorizontal: 10,
    marginBottom: 10,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', // White text color
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black', // black border color
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black', // black text color
  },
 SignupButton: {
    backgroundColor:'red',
    //'#98999A',
    //'#ECB183', 
    //'#2980b9', // Darker blue background color
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

export default SignupScreen;
