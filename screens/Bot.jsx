import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Bot = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://mediafiles.botpress.cloud/5008f4fd-6f2a-4a41-ab56-df5b3c8f9c2c/webchat/bot.html' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Bot;
