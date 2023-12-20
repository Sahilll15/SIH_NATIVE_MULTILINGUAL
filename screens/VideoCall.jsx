import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoCall = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://video-call-hazel.vercel.app/room/lawyer' }}
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

export default VideoCall;