import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PrisonerIntro = () => {
  const backgroundImageUrl = 'https://www.example.com/path/to/your/image.jpg'; // Replace with your image URL
  return (
    <View style={styles.container}>
      <Text style={styles.dashboardText}>Prisoner Dashboard</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          {/* Profile Image */}
          <Image
            source={{ uri: 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg' }} // Placeholder image URL
            style={styles.profileImage}
          />
          {/* Profile Information */}
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}>Name: John Doe</Text>
            <Text style={styles.profileInfoText}>Email: johndoe@example.com</Text>
            <Text style={styles.profileInfoText}>Phone: +1234567890</Text>
            <Text style={styles.profileInfoText}>Total Cases: 5</Text>
          </View>
        </View>
      </View>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="gavel" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>RIGHTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="balance-scale" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>LEGAL ASSISTANCE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="hospital" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>REHAB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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