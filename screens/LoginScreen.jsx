// screens/LoginScreen.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar ,Image} from 'react-native';
 


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <View style={styles.container}>
  <Image 
  style={styles.imageStyle}
  source ={require("../assets/logo.png")}/>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.dcontainer}>
      <Text>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.signupLink}>
        <Text style={styles.signupText}>Sign up here</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.dwcontainer}> 
      <TouchableOpacity
      onPress={() => navigation.navigate()}
        style={styles.signupLink}>
       <Text style={styles.signupText}>Forgot Username</Text>
      </TouchableOpacity>
      <Text style={styles.signupLink}>   |   </Text>
      <TouchableOpacity
      onPress={() => navigation.navigate()}
        style={styles.signupLink}>
       <Text style={styles.signupText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  <View>
  <TouchableOpacity
      onPress={() => navigation.navigate()}
        style={styles.loginButton}>
       <Text style={styles.loginButtonText}>How can I help you</Text>
      </TouchableOpacity>
  </View>
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
    paddingHorizontal: 10,
    backgroundColor: '#FFFF',
    marginBottom: 10,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#808080', // A more neutral gray color
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    fontSize: 16,
  },
  signupText: {
    color: 'blue',
    fontSize: 16,
  },
  dcontainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 50,
    marginBottom: -25,
  },
  dwcontainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
});

export default LoginScreen;
