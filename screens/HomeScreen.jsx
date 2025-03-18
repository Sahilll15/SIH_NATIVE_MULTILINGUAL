import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddCaseModal from './Case/AddCaseModal';

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cards = [
    {
      id: 'rights',
      title: 'Know Your Rights',
      icon: 'https://cdn-icons-png.flaticon.com/512/1642/1642097.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('Rights')
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('AIChatScreen')
    },
    {
      id: 'market',
      title: 'Legal Documents',
      icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
      color: '#45B7D1',
      onPress: () => navigation.navigate('LegalDocuments')
    },
    {
      id: 'rehab',
      title: 'Rehabilitation',
      icon: 'https://cdn-icons-png.flaticon.com/512/4207/4207247.png',
      color: '#96CEB4',
      onPress: () => navigation.navigate('Rehab')
    },
    {
      id: 'lawyer',
      title: 'Find a Lawyer',
      icon: 'https://cdn-icons-png.flaticon.com/512/3116/3116416.png',
      color: '#45B7D1',
      onPress: () => navigation.navigate('LawyerList')
    },
    
    {
      id: 'My Documents',
      title: 'My Documents',
      icon: 'https://cdn-icons-png.flaticon.com/512/3117/3117712.png',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('AddDoc')
    },
    {
      id: 'myCases',
      title: 'My Cases',
      icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063711.png',
      color: '#96CEB4',
      onPress: () => navigation.navigate('MyCases')
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome Back!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Icon name="user-circle" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderAddCase = () => (
    <TouchableOpacity 
      style={styles.addCaseContainer} 
      onPress={() => setIsModalVisible(true)}
    >
      <View style={styles.addCaseContent}>
        <View style={styles.addCaseIconContainer}>
          <Icon name="plus-circle" size={32} color="#FFFFFF" />
        </View>
        <View style={styles.addCaseTextContainer}>
          <Text style={styles.addCaseTitle}>Add Case</Text>
          <Text style={styles.addCaseSubtitle}>Start a new legal proceeding</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#FFFFFF" style={styles.addCaseArrow} />
      </View>
    </TouchableOpacity>
  );

  const renderCards = () => (
    <View style={styles.cardsContainer}>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={[styles.card, { borderLeftColor: card.color }]}
          onPress={card.onPress}
        >
          <View style={[styles.cardIconContainer, { backgroundColor: `${card.color}15` }]}>
            <Image
              source={{ uri: card.icon }}
              style={styles.cardIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Icon name="arrow-right" size={16} color={card.color} style={styles.cardArrow} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {renderHeader()}
          {renderAddCase()}
          {renderCards()}
        </View>
      </ScrollView>

      <AddCaseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  addCaseContainer: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addCaseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  addCaseIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  addCaseTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  addCaseTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  addCaseSubtitle: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 14,
  },
  addCaseArrow: {
    marginLeft: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  cardIcon: {
    width: 32,
    height: 32,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  cardArrow: {
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
