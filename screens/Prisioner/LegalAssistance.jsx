import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';

const LegalAssistance = ({ navigation }) => {
  const { selectedLang } = useAuth();

  const services = [
    {
      id: 1,
      icon: 'gavel',
      titleEn: 'Find a Lawyer',
      titleHi: 'वकील खोजें',
      descEn: 'Connect with experienced lawyers who can help with your case',
      descHi: 'अनुभवी वकीलों से जुड़ें जो आपके केस में मदद कर सकते हैं',
      route: 'LawyerListPage',
    },
    {
      id: 2,
      icon: 'file-alt',
      titleEn: 'Case Status',
      titleHi: 'केस की स्थिति',
      descEn: 'Track and monitor your ongoing case progress',
      descHi: 'अपने चल रहे केस की प्रगति को ट्रैक करें',
      route: 'CaseDashboard',
    },
    {
      id: 3,
      icon: 'balance-scale',
      titleEn: 'Legal Rights',
      titleHi: 'कानूनी अधिकार',
      descEn: 'Learn about your legal rights and protections',
      descHi: 'अपने कानूनी अधिकारों और सुरक्षा के बारे में जानें',
      route: 'Rights',
    },
    {
      id: 4,
      icon: 'robot',
      titleEn: 'Legal Assistant',
      titleHi: 'कानूनी सहायक',
      descEn: 'Get instant answers to your legal questions',
      descHi: 'अपने कानूनी सवालों के तुरंत जवाब पाएं',
      route: 'Bot',
    },
  ];

  const ServiceCard = ({ icon, title, description, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon} size={24} color="#4A90E2" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color="#A0A0A0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {selectedLang === 'Hindi' ? 'कानूनी सहायता' : 'Legal Assistance'}
          </Text>
          <Text style={styles.subtitle}>
            {selectedLang === 'Hindi' 
              ? 'आपकी कानूनी यात्रा में मदद के लिए उपलब्ध सेवाएं'
              : 'Available services to help in your legal journey'}
          </Text>
        </View>

        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={selectedLang === 'Hindi' ? service.titleHi : service.titleEn}
              description={selectedLang === 'Hindi' ? service.descHi : service.descEn}
              onPress={() => navigation.navigate(service.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
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
    lineHeight: 24,
  },
  servicesContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
});

export default LegalAssistance;
