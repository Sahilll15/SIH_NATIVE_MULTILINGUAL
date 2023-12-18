// SkillsScreen.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SkillsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Skills Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SkillsScreen;
