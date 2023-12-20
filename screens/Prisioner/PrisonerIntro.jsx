import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../Context/AuthContext';
import { prisionerIntro } from '../../utils';

const PrisonerIntro = ({ navigation }) => {
  const backgroundImageUrl = 'https://www.example.com/path/to/your/image.jpg'; // Replace with your image URL

  const { selectedLang } = useAuth();

  const navigateToRights = () => {
    navigation.navigate('Rights');

  };

  const navigateToLegalAssistance = () => {
    // Navigate to the Legal Assistance screen
    navigation.navigate('LegalAssistance');
  };

  const navigateToRehab = () => {
    navigation.navigate('Rehab');
  };


  // const navigateToRehab = () => {
  //   Toast.show({
  //     type: 'error',
  //     text1: 'Hello',
  //     text2: 'This is UNDER DEVELOPMENT',
  //   });
  // };



  return (
    <View style={styles.container}>
      <Text style={styles.dashboardText}>
        {
          selectedLang === 'Hindi' ? prisionerIntro[0].Hindi : prisionerIntro[0].English
        }
      </Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          {/* Profile Image */}
          <Image
            source={{
              uri:
                'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg',
            }}
            style={styles.profileImage}
          />
          {/* Profile Information */}
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}>{
              selectedLang === 'Hindi' ? prisionerIntro[1].Hindi : prisionerIntro[1].English
            } : John Doe</Text>
            <Text style={styles.profileInfoText}>{
              selectedLang === 'Hindi' ? prisionerIntro[2].Hindi : prisionerIntro[2].English
            }: johndoe@example.com</Text>
            <Text style={styles.profileInfoText}>{
              selectedLang === 'Hindi' ? prisionerIntro[3].Hindi : prisionerIntro[3].English
            }: +1234567890</Text>
            {/* Replace "Total Cases" text with a button */}
            <TouchableOpacity style={styles.redButton} onPress={() => navigation.navigate('YourCase')}>
              <Text style={styles.buttonText}>{
                selectedLang === 'Hindi' ? prisionerIntro[4].Hindi : prisionerIntro[4].English
              }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToRights}>
          <FontAwesome5 name="gavel" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi' ? prisionerIntro[5].Hindi : prisionerIntro[5].English
          }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToLegalAssistance}>
          <FontAwesome5 name="balance-scale" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi' ? prisionerIntro[6].Hindi : prisionerIntro[6].English
          }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToRehab}>
          <FontAwesome5 name="hospital" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{
            selectedLang === 'Hindi' ? prisionerIntro[7].Hindi : prisionerIntro[7].English
          }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  dashboardText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '15%',
    marginBottom: '10%',
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileInfoText: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  redButton: {
    backgroundColor: 'red',
    padding: 7,
    width: '50%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default PrisonerIntro;
