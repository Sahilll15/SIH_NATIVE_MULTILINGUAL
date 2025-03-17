import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../Context/AuthContext';

class ErrorBoundaryFallback extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to your error reporting service
    console.error('Error Boundary caught an error:', {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
      componentStack: errorInfo.componentStack
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    const { hasError } = this.state;
    const { selectedLang } = this.props;

    if (hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {selectedLang === 'Hindi' 
              ? 'कुछ गलत हो गया'
              : 'Something went wrong'}
          </Text>
          <Text style={styles.message}>
            {selectedLang === 'Hindi'
              ? 'हमें खेद है, एक त्रुटि हुई है'
              : 'We\'re sorry, an error has occurred'}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={this.handleRetry}
          >
            <Text style={styles.retryButtonText}>
              {selectedLang === 'Hindi'
                ? 'पुनः प्रयास करें'
                : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide context
const ErrorBoundary = ({ children, onRetry }) => {
  const { selectedLang } = useAuth();
  
  return (
    <ErrorBoundaryFallback selectedLang={selectedLang} onRetry={onRetry}>
      {children}
    </ErrorBoundaryFallback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12
  },
  message: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ErrorBoundary;
