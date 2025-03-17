import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have a library for icons

const HomeScreen = ({ navigation }) => {
  const cards = [

    {
      id: 'rights',
      title: 'Know Your Rights',
      icon: 'https://cdn-icons-png.flaticon.com/512/1642/1642097.png',
      onPress: () => console.log('Know Your Rights')
    },
    {
      id: 'legal',
      title: 'Legal Assistance',
      icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
      onPress: () => console.log('Legal Assistance')
    },
    {
      id: 'market',
      title: 'Market Place',
      icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
      onPress: () => console.log('Market Place')
    },
    {
      id: 'rehab',
      title: 'Rehabilitation',
      icon: 'https://cdn-icons-png.flaticon.com/512/4207/4207247.png',
      onPress: () => navigation.navigate('Rehab')
    },
  ];

  const renderCards = () => {
    return (
      <View style={styles.cardsContainerWrapper}>
        <View style={styles.headingContainer}>
          <TouchableOpacity>
            <Text style={styles.heading}>
              <Text>
                +
              </Text>
                <Text>
                  Add Case
                </Text>
            </Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.cardsContainer}>

        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={card.onPress}
          >
            <Image
              source={{ uri: card.icon }}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
        </View>
       
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderCards()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
    display: 'flex',
  },
  cardsContainerWrapper: {
    flex: 1,
    display: 'flex',
  },
  headingContainer:{
    width:'100%',
    height:'100%',
    margin:"10px",
    padding:"10px",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#4A90E2',
    borderRadius:12
  },
  heading:{
    color:'#ffffff',
    fontSize:60,
    fontWeight:'600',
    textAlign:'center'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default HomeScreen;
