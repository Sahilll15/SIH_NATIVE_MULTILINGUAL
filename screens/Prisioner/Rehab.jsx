// Rehab.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Rehab = ({ navigation }) => {
  const categories = ['Meditate', 'Skills', 'Motivation'];

  const handleCategoryPress = (category) => {
    navigation.navigate('VideoPlayer', { category });
  };

  const renderHorizontalScrollView = (category) => {
    // Replace this with actual data or components for each category
    const dataForCategory = Array.from({ length: 10 }, (_, index) => `Video ${index + 1}`);

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {dataForCategory.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={styles.videoContainer}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.videoText}>{video}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{category}</Text>
          <TouchableOpacity onPress={() => handleCategoryPress(category)}>
            {renderHorizontalScrollView(category)}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
      },
  categoryLabel: {
    color: '#3498db',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    padding: 16,
  },
  horizontalScrollView: {
    flexDirection: 'row',
    overflow: 'scroll',
  },
  videoContainer: {
    backgroundColor: '#fff',
    padding: 24, // Increase the padding as needed
    borderRadius: 8,
    marginHorizontal: 8, // Adjust margin as needed
    marginVertical: 4, // Adjust margin as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    height:90,
    width:180,
  },
  
  videoText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Rehab;
