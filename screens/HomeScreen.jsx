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
        title="Guard under bug will update as soon as updated"
        onPress={() => navigation.navigate('JailerLogin')}
      />
    </View>
  );
}

export default HomeScreen;
