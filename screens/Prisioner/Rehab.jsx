import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Rehab = () => {
  const navigation = useNavigation();

  const rehabOptions = [
    { title: 'Yoga', screenName: 'YogaScreen' },
    { title: 'Skills', screenName: 'SkillsScreen' },
    { title: 'Motivation', screenName: 'MotivationScreen' },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          {/* You can use an arrow icon or any other back button component */}
          {/* <Text style={styles.backButtonText}>{'< Back'}</Text> */}
        </TouchableOpacity>
        <Text style={styles.heading}>Rehab Options</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {rehabOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => navigateToScreen(option.screenName)}
          >
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#1565c0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  scrollView: {
    flex: 1,
  },
  optionItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#bbdefb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565c0',
  },
});

export default Rehab;
