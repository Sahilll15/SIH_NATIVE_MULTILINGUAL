import React from 'react';
import { View, Text, Button } from 'react-native';
import PdfViewer from './PdfViewer';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {

  const handleViewPdf = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1HatoP0RbhW9pOLLTudZ2omee-Y3WAuyl/view'; // Replace with your actual PDF URL
    navigation.navigate('PdfViewer', { pdfUrl });
  };

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
        title="Continue as Court"
        onPress={() => navigation.navigate('CourtHome')}
      />

        <Button
        title="Continue as Police"
        onPress={() => navigation.navigate('PoliceLand')}
      />
       <Button
        title="Text with bot"
        onPress={() => navigation.navigate('ChatBot')}
      />

<Button title="View PDF" onPress={handleViewPdf} />
<Button
        title="Gifted Chat"
        onPress={() => navigation.navigate('ChatScreen')}
      />
    </View>
  );
}

export default HomeScreen;
