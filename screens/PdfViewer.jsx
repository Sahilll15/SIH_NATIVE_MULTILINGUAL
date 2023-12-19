// PdfViewer.js

import React from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfViewer = ({ route, navigation }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: pdfUrl }}
          style={styles.webview}
          scalesPageToFit
          bounces={false}
        />
      </View>
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
  webviewContainer: {
    marginTop: '10%',
    flex: 1,
    width: '95%',
    paddingHorizontal: 16, // Adjust the padding as needed
  },
  webview: {
    flex: 1,
    width: '95%',
  },
});

export default PdfViewer;
