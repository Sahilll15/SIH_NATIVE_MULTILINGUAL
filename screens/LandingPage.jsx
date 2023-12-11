import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://legalserviceindia.com/legal/uploads/theroleofindianjudiciaryinpromotinggoodgovernanceabriefdiscussion_104068708.jpg' }}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome to Your App</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Sign Up')}>
          <FontAwesome5 name="user-plus" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Sign In')}>
          <FontAwesome5 name="sign-in-alt" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.chatButton} onPress={() => console.log('Chat with AI')}>
        <FontAwesome5 name="robot" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Chat with AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  chatButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;
