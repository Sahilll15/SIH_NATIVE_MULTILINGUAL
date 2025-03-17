import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';

const { width } = Dimensions.get('window');

const Rehab = ({ navigation }) => {
  const { selectedLang } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', icon: 'th-large', nameEn: 'All', nameHi: 'सभी', color: '#4A90E2' },
    { id: 'education', icon: 'graduation-cap', nameEn: 'Education', nameHi: 'शिक्षा', color: '#2ECC71' },
    { id: 'skills', icon: 'tools', nameEn: 'Skills', nameHi: 'कौशल', color: '#E74C3C' },
    { id: 'wellness', icon: 'heart', nameEn: 'Wellness', nameHi: 'कल्याण', color: '#9B59B6' },
  ];

  const programs = [
    {
      id: 1,
      category: 'education',
      imageUrl: require('../../assets/education.jpeg'),
      titleEn: 'Basic Education Program',
      titleHi: 'बुनियादी शिक्षा कार्यक्रम',
      descEn: 'Complete your basic education with our certified teachers',
      descHi: 'हमारे प्रमाणित शिक्षकों के साथ अपनी बुनियादी शिक्षा पूरी करें',
      duration: '6 months',
      enrolled: 45,
      color: '#2ECC71',
    },
    {
      id: 2,
      category: 'skills',
      imageUrl: require('../../assets/skills.jpeg'),
      titleEn: 'Carpentry Workshop',
      titleHi: 'बढ़ई कार्यशाला',
      descEn: 'Learn professional carpentry skills from experts',
      descHi: 'विशेषज्ञों से पेशेवर बढ़ई कौशल सीखें',
      duration: '3 months',
      enrolled: 30,
      color: '#E74C3C',
    },
    {
      id: 3,
      category: 'wellness',
      imageUrl: require('../../assets/Meditation.jpeg'),
      titleEn: 'Yoga & Meditation',
      titleHi: 'योग और ध्यान',
      descEn: 'Improve mental and physical well-being through yoga',
      descHi: 'योग के माध्यम से मानसिक और शारीरिक स्वास्थ्य में सुधार करें',
      duration: 'Ongoing',
      enrolled: 60,
      color: '#9B59B6',
    },
    {
      id: 4,
      category: 'skills',
      imageUrl: require('../../assets/skills.jpeg'),
      titleEn: 'Computer Skills',
      titleHi: 'कंप्यूटर कौशल',
      descEn: 'Learn basic computer operations and typing',
      descHi: 'बुनियादी कंप्यूटर संचालन और टाइपिंग सीखें',
      duration: '2 months',
      enrolled: 50,
      color: '#E74C3C',
    },
  ];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const CategoryButton = ({ category }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && { backgroundColor: category.color },
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <View style={styles.categoryContent}>
        <FontAwesome5 
          name={category.icon} 
          size={20} 
          color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
        />
        <Text 
          style={[
            styles.categoryText,
            selectedCategory === category.id ? { color: '#FFFFFF' } : { color: category.color },
          ]}
        >
          {selectedLang === 'Hindi' ? category.nameHi : category.nameEn}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ProgramCard = ({ program }) => (
    <TouchableOpacity 
      style={[styles.programCard, { borderLeftWidth: 4, borderLeftColor: program.color }]}
      onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
    >
      <Image
        source={program.imageUrl}
        style={styles.programImage}
      />
      <View style={styles.programContent}>
        <View style={styles.programHeader}>
          <Text style={styles.programTitle}>
            {selectedLang === 'Hindi' ? program.titleHi : program.titleEn}
          </Text>
          <View style={[styles.programBadge, { backgroundColor: program.color }]}>
            <Text style={styles.programBadgeText}>
              {program.category.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.programDescription}>
          {selectedLang === 'Hindi' ? program.descHi : program.descEn}
        </Text>
        <View style={styles.programFooter}>
          <View style={styles.programStat}>
            <FontAwesome5 name="clock" size={14} color={program.color} />
            <Text style={[styles.programStatText, { color: program.color }]}>{program.duration}</Text>
          </View>
          <View style={styles.programStat}>
            <FontAwesome5 name="users" size={14} color={program.color} />
            <Text style={[styles.programStatText, { color: program.color }]}>{program.enrolled} enrolled</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedLang === 'Hindi' ? 'पुनर्वास कार्यक्रम' : 'Rehabilitation Programs'}
        </Text>
        <Text style={styles.subtitle}>
          {selectedLang === 'Hindi' 
            ? 'अपने कौशल को बढ़ाएं और एक बेहतर भविष्य के लिए तैयार हों'
            : 'Enhance your skills and prepare for a better future'}
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.programsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.programsContent}
      >
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ScrollView>
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
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 24,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '600',
  },
  programsContainer: {
    flex: 1,
  },
  programsContent: {
    padding: 16,
  },
  programCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  programImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E9ECEF',
  },
  programContent: {
    padding: 16,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  programTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginRight: 12,
  },
  programBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  programBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  programDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 16,
  },
  programFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 12,
  },
  programStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  programStatText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default Rehab;
