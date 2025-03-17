import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import ErrorBoundary from '../../components/ErrorBoundary';

/**
 * PrisonerIntroScreen component displays user information and actions for prisoners.
 * Redirects to Login screen if the user is not authenticated.
 * 
 * @param {object} props - Contains navigation object for screen navigation.
 */
const PrisonerIntroScreen = ({ navigation }) => {
  // Extract authentication-related data and functions
  const { selectedLang, userDetails, token, logout } = useAuth();

  // Redirect to Login screen if token is not present
  useEffect(() => {
    if (!token) {
      navigation.replace('Login');
    }
  }, [token, navigation]);

  // Display loading screen if userDetails are not available
  if (!userDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>
          {selectedLang === 'Hindi' ? 'लोड हो रहा है...' : 'Loading...'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with user avatar and welcome message */}
      <View style={styles.header}>
        <Image
          source={'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>
          {selectedLang === 'Hindi'
            ? `नमस्ते, ${userDetails.name}`
            : `Welcome, ${userDetails.name}`}
        </Text>
      </View>

      {/* User information section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            {selectedLang === 'Hindi' ? 'आपकी जानकारी' : 'Your Information'}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              {selectedLang === 'Hindi' ? 'नाम:' : 'Name:'}
            </Text>
            <Text style={styles.value}>{userDetails.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              {selectedLang === 'Hindi' ? 'ईमेल:' : 'Email:'}
            </Text>
            <Text style={styles.value}>{userDetails.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              {selectedLang === 'Hindi' ? 'फोन:' : 'Phone:'}
            </Text>
            <Text style={styles.value}>{userDetails.phoneNumber || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              {selectedLang === 'Hindi' ? 'आधार:' : 'Aadhar:'}
            </Text>
            <Text style={styles.value}>{userDetails.addharCard || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Action buttons for navigation */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('FindLawyer')}
        >
          <Text style={styles.actionButtonText}>
            {selectedLang === 'Hindi'
              ? 'वकील खोजें'
              : 'Find a Lawyer'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CaseStatus')}
        >
          <Text style={styles.actionButtonText}>
            {selectedLang === 'Hindi'
              ? 'केस की स्थिति'
              : 'Case Status'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={() => {
            logout();
            navigation.replace('Login');
          }}
        >
          <Text style={styles.actionButtonText}>
            {selectedLang === 'Hindi'
              ? 'लॉग आउट'
              : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Wrap with ErrorBoundary
const PrisonerIntro = (props) => (
  <ErrorBoundary>
    <PrisonerIntroScreen {...props} />
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    gap: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#4A90E2',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  label: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  value: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  actionContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    marginTop: 24,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PrisonerIntro;
