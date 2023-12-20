import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { rights, rightsInfo } from '../../utils';






const Rights = () => {

  const { selectedLang } = useAuth();

  const rightsData = [
    {
      id: 'right1',
      title: selectedLang === 'Hindi' ? rights[0].Hindi : rights[0].English,
      description: selectedLang === 'Hindi' ? rightsInfo[0].Hindi : rightsInfo[0].English,
    },
    {
      id: 'right2',
      title: selectedLang === 'Hindi' ? rights[1].Hindi : rights[1].English,
      description: selectedLang === 'Hindi' ? rightsInfo[1].Hindi : rightsInfo[1].English,
    },
    {
      id: 'right3',
      title: selectedLang === 'Hindi' ? rights[2].Hindi : rights[2].English,
      description: selectedLang === 'Hindi' ? rightsInfo[2].Hindi : rightsInfo[2].English,
    },
    {
      id: 'right4',
      title: selectedLang === 'Hindi' ? rights[3].Hindi : rights[3].English,
      description: selectedLang === 'Hindi' ? rightsInfo[3].Hindi : rightsInfo[3].English,
    },
    {
      id: 'right5',
      title: selectedLang === 'Hindi' ? rights[4].Hindi : rights[4].English,
      description: selectedLang === 'Hindi' ? rightsInfo[4].Hindi : rightsInfo[4].English,
    },
    {
      id: 'right6',
      title: selectedLang === 'Hindi' ? rights[5].Hindi : rights[5].English,
      description: selectedLang === 'Hindi' ? rightsInfo[5].Hindi : rightsInfo[5].English,
    },

  ];

  const [selectedRight, setSelectedRight] = useState(null);

  const showDescription = (rightId) => {
    setSelectedRight(selectedRight === rightId ? null : rightId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{

        selectedLang === 'Hindi' ? `भारतीय मौलिक अधिकार` : `Indian Fundamental Rights`
      }
      </Text>
      <ScrollView style={styles.scrollView}>
        {rightsData.map((right) => (
          <TouchableOpacity
            key={right.id}
            style={styles.rightItem}
            onPress={() => showDescription(right.id)}
          >
            <Text style={styles.rightTitle}>{right.title}</Text>
            {selectedRight === right.id && (
              <Text style={styles.rightDescription}>{right.description}</Text>
            )}
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  rightItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#bbdefb',
    borderRadius: 8,
  },
  rightTitle: {
    fontWeight: 'bold',
    color: '#1565c0',
  },
  rightDescription: {
    marginTop: 5,
    color: '#000000',
  },
});

export default Rights;
