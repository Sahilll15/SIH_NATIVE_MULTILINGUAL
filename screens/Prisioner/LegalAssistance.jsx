import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../Context/AuthContext';
import { legalAssistance } from '../../utils';

const LegalAssistance = ({ navigation }) => {

  // const navigateToChat = () => {
  //   // Navigate to the Rehab screen
  //   Toast.show({
  //     type: 'error', // Can be 'success', 'error', 'info', or 'any custom type'
  //     text1: 'Hello',
  //     text2: 'This is UNDER DEVELOPMENT',
  //   });
  // };

  const { selectedLang } = useAuth();

  const navigateToChat = () => {
    // Navigate to the Rehab screen
    navigation.navigate('Bot');

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
      <Text style={styles.title}>{
        selectedLang === 'Hindi' ? legalAssistance[0].Hindi : legalAssistance[0].English
      }</Text>

      <TouchableOpacity style={styles.option} onPress={navigateToChat}>
        <FontAwesome5 name="comments" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>{
          selectedLang === 'Hindi' ? legalAssistance[1].Hindi : legalAssistance[1].English
        }</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={navigateToDoc}>
        <FontAwesome5 name="file-alt" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>{
          selectedLang === 'Hindi' ? legalAssistance[2].Hindi : legalAssistance[2].English
        }</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={SelectLayer}>
        <FontAwesome5 name="phone" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>{
          selectedLang === 'Hindi' ? legalAssistance[3].Hindi : legalAssistance[3].English
        }</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.option} onPress={YourApplication}>
        <FontAwesome5 name="briefcase" size={30} color="#fff" style={styles.optionIcon} />
        <Text style={styles.optionText}>{
          selectedLang === 'Hindi' ? legalAssistance[4].Hindi : legalAssistance[4].English
        }</Text>
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
