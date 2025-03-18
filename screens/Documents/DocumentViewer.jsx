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
  
  // Get document URL from the appropriate nested property
  const documentURL = document?.apiDocument?.document || document?.uri || document?.url;
  
  console.log('----------document path check-------', {
    fromApiDocument: document?.apiDocument?.document,
    fromUri: document?.uri,
    fromUrl: document?.url,
    finalDocumentURL: documentURL
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      if (Platform.OS === 'web') {
        // For web, open in new tab
        console.log('Opening document in new tab:', documentURL);
        window.open(documentURL, '_blank');
        setIsDownloading(false);
        return;
      }

      // For mobile, download and share
      const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
      };

      const downloadResumable = FileSystem.createDownloadResumable(
        documentURL,
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
          <Text style={styles.metaText}>Language: {document.language || 'English'}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{document.format || 'PDF'}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{document.size || 'Unknown'}</Text>
        </View>
      </View>

      {documentURL ? (
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: documentURL }}
            style={styles.webview}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={(error) => {
              console.error('WebView error:', error);
              Alert.alert('Error', 'Failed to load the document. Please try downloading instead.');
              setIsLoading(false);
            }}
            renderError={(errorName) => (
              <View style={styles.errorContainer}>
                <Icon name="exclamation-triangle" size={50} color="#e74c3c" />
                <Text style={styles.errorText}>Failed to load document</Text>
                <Text style={styles.errorSubtext}>{errorName}</Text>
                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={handleDownload}
                >
                  <Text style={styles.downloadButtonText}>Download Instead</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text style={styles.loadingText}>Loading document...</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noPreviewContainer}>
          <Icon name="file-pdf" size={80} color="#ccc" />
          <Text style={styles.noPreviewText}>No preview available</Text>
          <TouchableOpacity 
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadButtonText}>Download Document</Text>
          </TouchableOpacity>
        </View>
      )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 20,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 10,
    marginBottom: 20,
  },
  noPreviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  noPreviewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 20,
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  downloadButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DocumentViewer;
