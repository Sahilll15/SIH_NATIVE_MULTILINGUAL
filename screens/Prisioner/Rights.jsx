import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const rightsData = [
  {
    id: 'right1',
    title: 'Right to Equality',
    description: 'This right includes equality before law, prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth, and equality of opportunity in matters of employment, abolition of untouchability, and abolition of titles.',
  },
  {
    id: 'right2',
    title: 'Right to Freedom',
    description: 'It includes freedom of speech and expression, assembly, association or union, movement, residence, and the right to practice any profession or occupation.',
  },
  {
    id: 'right3',
    title: 'Right Against Exploitation',
    description: 'Prohibits all forms of forced labor and child labor.',
  },
  {
    id: 'right4',
    title: 'Right to Freedom of Religion',
    description: 'Guarantees the freedom of conscience and the right to freely profess, practice, and propagate religion.',
  },
  {
    id: 'right5',
    title: 'Cultural and Educational Rights',
    description: 'Preserves the right of any section of citizens to conserve their culture, language, or script and the right of minorities to establish and administer educational institutions.',
  },
  {
    id: 'right6',
    title: 'Right to Constitutional Remedies',
    description: 'Provides for the enforcement of fundamental rights through legal remedies such as writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto).',
  },
  // Add more rights as needed
];


const Rights = () => {
  const [selectedRight, setSelectedRight] = useState(null);

  const showDescription = (rightId) => {
    setSelectedRight(selectedRight === rightId ? null : rightId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Indian Fundamental Rights</Text>
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
