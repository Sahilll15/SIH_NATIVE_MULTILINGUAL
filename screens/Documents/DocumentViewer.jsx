import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const DocumentViewer = ({ route, navigation }) => {
  const { document } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      if (Platform.OS === 'web') {
        // For web, open in new tab
        window.open(document.url, '_blank');
        setIsDownloading(false);
        return;
      }

      // For mobile, download and share
      const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
      };

      const downloadResumable = FileSystem.createDownloadResumable(
        document.url,
        FileSystem.documentDirectory + document.title + '.pdf',
        {},
        callback
      );

      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert('Error', 'Sharing is not available on your platform');
        }
      } catch (e) {
        console.error('Download error:', e);
        Alert.alert('Error', 'Failed to download the document. Please try again later.');
      }
      
      setIsDownloading(false);
    } catch (error) {
      console.error('Error handling download:', error);
      Alert.alert('Error', 'Failed to process your request. Please try again later.');
      setIsDownloading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <View style={styles.downloadProgress}>
              <ActivityIndicator size="small" color="#4A90E2" />
              <Text style={styles.progressText}>{Math.round(downloadProgress * 100)}%</Text>
            </View>
          ) : (
            <Icon name="download" size={20} color="#4A90E2" />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDownloading, downloadProgress]);

  return (
    <View style={styles.container}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{document.title}</Text>
        <Text style={styles.documentDescription}>{document.description}</Text>
        <View style={styles.documentMeta}>
          <Text style={styles.metaText}>Language: {document.language}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{document.format}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{document.size}</Text>
        </View>
      </View>

      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: document.url }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Loading document...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  documentInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  documentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  headerButton: {
    padding: 10,
  },
  downloadProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#4A90E2',
  },
});

export default DocumentViewer;
