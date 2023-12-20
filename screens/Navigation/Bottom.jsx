import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Add this line

const Bottom = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    // Add additional logic if needed, such as navigating to the corresponding screen.
    // Example: navigation.navigate(tabName);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'home' && styles.selectedTab && styles.selectedTabText]}
        onPress={() => navigation.navigate('Home')} // Fix here
      >
        <Icon name="home" size={24} color={selectedTab === 'home' ? '#3498db' : 'black'} />
        <Text style={[styles.tabText, selectedTab === 'home' && styles.selectedTabText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'cogs' && styles.selectedTab && styles.selectedTabText]}
        onPress={() => handleTabPress('cogs')}
      >
        <Icon name="cogs" size={24} color={selectedTab === 'cogs' ? '#3498db' : 'black'} />
        <Text style={[styles.tabText, selectedTab === 'cogs' && styles.selectedTabText]}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'dashboard' && styles.selectedTab && styles.selectedTabText]}
        onPress={() => handleTabPress('dashboard')}
      >
        <Icon name="dashboard" size={24} color={selectedTab === 'dashboard' ? '#3498db' : 'black'} />
        <Text style={[styles.tabText, selectedTab === 'dashboard' && styles.selectedTabText]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'users' && styles.selectedTab && styles.selectedTabText]}
        onPress={() => handleTabPress('users')}
      >
        <Icon name="users" size={24} color={selectedTab === 'users' ? '#3498db' : 'black' } />
        <Text style={[styles.tabText, selectedTab === 'users' && styles.selectedTabText]}>Clients</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, 
    backgroundColor: 'white', 
    borderRadius: 25, 
    marginHorizontal: 20, 
    marginBottom: 10, 
    backgroundColor: '#e5e5e5',
    
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    // borderBottomWidth: 4,
    borderBottomColor: '#3498db',
    paddingBottom: 2, // Adjust the paddingBottom to control the length
    marginBottom: -2,
    
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black', // Text color for each tab
    marginTop: 5, // Add some space between the icon and text
  },
  selectedTabText: {
    transform: [{ translateY: -5  }],
  },
});

export default Bottom;
