// MotivationScreen.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MotivationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Motivation Screen</Text>
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

export default MotivationScreen;
