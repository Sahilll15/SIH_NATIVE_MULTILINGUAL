import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
const LegalAssistance = ({ navigation }) => {

  const navigateToChat = () => {
    // Navigate to the Rehab screen
    Toast.show({
      type: 'error', // Can be 'success', 'error', 'info', or 'any custom type'
      text1: 'Hello',
      text2: 'This is UNDER DEVELOPMENT',
    });
  };
  
  const navigateToDoc = () => {
    // Navigate to the Rehab screen
    navigation.navigate('AddDoc');
  };
  const SelectLayer = () => {
    // Navigate to the Rehab screen
    navigation.navigate('LawyerListPage');
  };
  const YourApplication = () => {
    // Navigate to the Rehab screen
    navigation.navigate('YourApplication');
  };
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>How can we assist you today!</Text>

      <TouchableOpacity style={styles.option} onPress={navigateToChat}>
        <FontAwesome5 name="comments" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={navigateToDoc}>
        <FontAwesome5 name="file-alt" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>Add Your Documents</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={SelectLayer}>
        <FontAwesome5 name="phone" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>Choose Lawyer</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.option} onPress={YourApplication}>
      <FontAwesome5 name="briefcase" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>Your Application</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LegalAssistance;
