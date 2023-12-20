import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have a library for icons

const HomeScreen = ({ navigation }) => {
  const handleViewPdf = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1HatoP0RbhW9pOLLTudZ2omee-Y3WAuyl/view';
    navigation.navigate('PdfViewer', { pdfUrl });
  };

  const apps = [
    { title: 'Lawyer', iconName: 'md-person', onPress: () => navigation.navigate('LawyerHomePage') },
    { title: 'Prisoner', iconName: 'md-person', onPress: () => navigation.navigate('PrisonerIntro') },
    { title: 'Guard', iconName: 'md-person', onPress: () => navigation.navigate('GuardHomePage') },
    { title: 'Court', iconName: 'md-person', onPress: () => navigation.navigate('CourtHome') },
    { title: 'Police', iconName: 'md-person', onPress: () => navigation.navigate('PoliceLand') },
    { title: 'Chat Screen', iconName: 'md-chatbubbles', onPress: () => navigation.navigate('ChatBot') },
    { title: 'PDF', iconName: 'md-document', onPress: handleViewPdf },
    { title: 'Chat Bot', iconName: 'md-chatbubbles', onPress: () => navigation.navigate('ChatScreen') },
  ];

  const renderAppButtons = () => {
    return apps.map((app, index) => (
      <TouchableOpacity key={index} style={styles.appButton} onPress={app.onPress}>
        <Icon name={app.iconName} size={30} color="#fff" style={styles.icon} />
        <Text style={styles.appText}>{app.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome To Home Page</Text>
      <ScrollView style={styles.scrollView}>
        {renderAppButtons()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  heading: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
  appButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    padding: 15,
  },
  icon: {
    marginRight: 15,
  },
  appText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
