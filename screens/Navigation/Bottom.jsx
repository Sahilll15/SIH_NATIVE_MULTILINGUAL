import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import AIChatScreen from '../AI/AIChatScreen';
import MyDocuments from '../Documents/MyDocuments';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <BlurView intensity={100} style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const getIcon = () => {
          switch (route.name) {
            case 'Home':
              return 'home-variant';
            case 'Documents':
              return 'file-document-multiple';
            case 'Chat':
              return 'chat-processing';
            case 'Profile':
              return 'account-circle';
            default:
              return 'circle';
          }
        };

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tabItem, isFocused && styles.tabItemFocused]}
            onPress={() => navigation.navigate(route.name)}
          >
            <View style={styles.tabContent}>
              <Icon
                name={getIcon()}
                size={24}
                color={isFocused ? '#4A90E2' : '#8E8E93'}
                style={styles.tabIcon}
              />
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? '#4A90E2' : '#8E8E93' }
              ]}>
                {route.name}
              </Text>
              {isFocused && <View style={styles.activeDot} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

const Bottom = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Documents" component={MyDocuments} />
      <Tab.Screen name="Chat" component={AIChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 84 : 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.9)' : '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabItemFocused: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 16,
    margin: 4,
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeDot: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4A90E2',
  },
});

export default Bottom;
