import React from 'react';
import { WebView } from 'react-native-webview';

const VideoCall = () => {
  const url = 'https://www.noteshare.online';

  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

export default VideoCall;
