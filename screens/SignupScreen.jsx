// screens/SignupScreen.js

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signing up with:', username, password, email);
  };

  return (
    <View>
      <Text>Signup</Text>
      <TextInput
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

export default SignupScreen;
