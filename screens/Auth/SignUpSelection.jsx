import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SignUpSelection = ({ navigation }) => {
  const handleSelection = (type) => {
    if (type === 'lawyer') {
      navigation.navigate('LawyerSignup');
    } else {
      navigation.navigate('PrisionerSignup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Choose your account type</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => handleSelection('lawyer')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="gavel" size={32} color="#4A90E2" />
          </View>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>Lawyer</Text>
            <Text style={styles.optionDescription}>
              Create an account as a legal professional to provide assistance
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#A0A0A0" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => handleSelection('prisoner')}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user" size={32} color="#4A90E2" />
          </View>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>Prisoner</Text>
            <Text style={styles.optionDescription}>
              Create an account to seek legal assistance and support
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 24 : 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loginButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpSelection;
