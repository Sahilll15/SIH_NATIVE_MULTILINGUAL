// screens/LoginScreen.js

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

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
        source={require('../../assets/logo.png')}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={(text) => setUsername(text)}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>


        <View style={styles.dwcontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate()}
          style={styles.helpLink}>
          <Text style={styles.helpText}>Forgot Username</Text>
        </TouchableOpacity>

        <Text style={styles.helpLink}> | </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate()}
          style={styles.helpLink}>
          <Text style={styles.helpText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>


        <View style={styles.dcontainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupLink}>
            <Text style={styles.signupText}>Sign up here </Text>
          </TouchableOpacity>
      
          

        </View>

      </View>

      

      <View>
      <TouchableOpacity style={styles.ChatBody} onPress={handleLogin}>
          <Text style={styles.ChatText}>CHAT WITH AI BOT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '50%',
    height: 50,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFF',
    // marginBottom: 30,
    // padding: 20,
    position: 'relative',
  },


  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  labelContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  loginButton: {
    backgroundColor: 'red',
    width: "50%",
    padding: 10,
    marginTop:"5%",
    marginBottom:"5%",
    borderRadius: 5,
    alignSelf:'center',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    fontSize: 16,
  },
  signupText: {
    color: 'blue',
    fontSize: 16,
    marginTop:7,
  },
  dcontainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 50,
    // marginTop: 10, 
  },
  dwcontainer: {
    flexDirection: 'row',
    marginTop:5, 
    alignSelf: 'center',
  },
  helpLink: {
    // backgroundColor:'blue',
    marginTop:-12,
  },
  ChatBody: {
    width: '70%',
    alignSelf: 'center', 
  },

  ChatText: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    fontSize: 12,
  },
});

export default LoginScreen;
