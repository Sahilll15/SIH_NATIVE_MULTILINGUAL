// PdfViewer.js

import React from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfViewer = ({ route, navigation }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfUrl }}
        style={styles.webview}
        scalesPageToFit
        bounces={false}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default PdfViewer;
