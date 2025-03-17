import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const Bottom = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const navigation = useNavigation();

  const handleTabPress = (tabName, screenName) => {
    setSelectedTab(tabName);
    navigation.navigate(screenName);
  };

  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'home' && styles.selectedTab]}
          onPress={() => handleTabPress('home', 'Home')}
        >
          <View style={styles.tabContent}>
            <Icon 
              name="home-variant" 
              size={24} 
              color={selectedTab === 'home' ? '#4A90E2' : '#8E8E93'} 
            />
            <Text style={[
              styles.tabText, 
              selectedTab === 'home' && styles.selectedTabText
            ]}>Home</Text>
            {selectedTab === 'home' && <View style={styles.indicator} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'documents' && styles.selectedTab]}
          onPress={() => handleTabPress('documents', 'AddDoc')}
        >
          <View style={styles.tabContent}>
            <Icon 
              name="file-document-multiple" 
              size={24} 
              color={selectedTab === 'documents' ? '#4A90E2' : '#8E8E93'} 
            />
            <Text style={[
              styles.tabText, 
              selectedTab === 'documents' && styles.selectedTabText
            ]}>Docs</Text>
            {selectedTab === 'documents' && <View style={styles.indicator} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'chat' && styles.selectedTab]}
          onPress={() => handleTabPress('chat', 'AIChatScreen')}
        >
          <View style={styles.tabContent}>
            <Icon 
              name="chat-processing" 
              size={24} 
              color={selectedTab === 'chat' ? '#4A90E2' : '#8E8E93'} 
            />
            <Text style={[
              styles.tabText, 
              selectedTab === 'chat' && styles.selectedTabText
            ]}>Chat</Text>
            {selectedTab === 'chat' && <View style={styles.indicator} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'profile' && styles.selectedTab]}
          onPress={() => handleTabPress('profile', 'Profile')}
        >
          <View style={styles.tabContent}>
            <Icon 
              name="account-circle" 
              size={24} 
              color={selectedTab === 'profile' ? '#4A90E2' : '#8E8E93'} 
            />
            <Text style={[
              styles.tabText, 
              selectedTab === 'profile' && styles.selectedTabText
            ]}>Profile</Text>
            {selectedTab === 'profile' && <View style={styles.indicator} />}
          </View>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  selectedTab: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#8E8E93',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4A90E2',
  },
});

export default Bottom;
