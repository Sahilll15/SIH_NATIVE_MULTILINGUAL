import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Hello, THis page is only for development process !</Text>
      
    
      <Button
        title="Continue in as Lawyer"
        onPress={() => navigation.navigate('LawyerHomePage')}
      />
      
     
      <Button
        title="Continue in as Prisoner"
        onPress={() => navigation.navigate('PrisonerIntro')}
      />

     
      <Button
        title="Continue in as Guard"
        onPress={() => navigation.navigate('GuardHomePage')}
      />

        <Button
        title="Police Login"
        onPress={() => navigation.navigate('PoliceLand')}
      />
       <Button
        title="Text with bot"
        onPress={() => navigation.navigate('ChatBot')}
      />
    </View>
  );
}

export default HomeScreen;
