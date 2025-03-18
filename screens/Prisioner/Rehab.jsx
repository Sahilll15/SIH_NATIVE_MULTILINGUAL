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
  Linking,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const openYoutubeVideo = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Error",
        "Cannot open this video"
      );
    }
  } catch (error) {
    Alert.alert(
      "Error",
      "Failed to open video"
    );
  }
};

const Rehab = ({ navigation }) => {
  const { selectedLang } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const rehab = [
    { English: 'Meditation', Hindi: 'ध्यान', icon: 'peace', color: '#FF6B6B' },
    { English: 'Skills', Hindi: 'कौशल', icon: 'tools', color: '#4ECDC4' },
    { English: 'Motivation', Hindi: 'प्रेरणा', icon: 'fire', color: '#FFD93D' },
    { English: 'Education', Hindi: 'शिक्षा', icon: 'graduation-cap', color: '#6C5CE7' },
  ];

  const categories = [
    {
      name: selectedLang === 'Hindi' ? rehab[0].Hindi : rehab[0].English,
      icon: rehab[0].icon,
      color: rehab[0].color,
      videos: [
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&ab_channel=Headspace',
          imageSource: require('../../assets/Meditation.jpeg'),
          title: selectedLang === 'Hindi' ? 'ध्यान का परिचय' : 'Introduction to Meditation',
          duration: '10:00',
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&list=PLW8o3_GFoCBOexWd8WK-hAjReSYifh1nx',
          imageSource: require('../../assets/Meditation.jpeg'),
          title: selectedLang === 'Hindi' ? 'शांति ध्यान' : 'Peace Meditation',
          duration: '15:00',
        },
      ],
    },
    {
      name: selectedLang === 'Hindi' ? rehab[1].Hindi : rehab[1].English,
      icon: rehab[1].icon,
      color: rehab[1].color,
      videos: [
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY&ab_channel=JoshO%27Caoimh',
          imageSource: require('../../assets/skills.jpeg'),
          title: selectedLang === 'Hindi' ? 'बढ़ई कौशल' : 'Carpentry Skills',
          duration: '20:00',
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY',
          imageSource: require('../../assets/skills.jpeg'),
          title: selectedLang === 'Hindi' ? 'बुनियादी कौशल' : 'Basic Skills',
          duration: '25:00',
        },
      ],
    },
    {
      name: selectedLang === 'Hindi' ? rehab[2].Hindi : rehab[2].English,
      icon: rehab[2].icon,
      color: rehab[2].color,
      videos: [
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I&ab_channel=EsyID',
          imageSource: require('../../assets/motivation.jpeg'),
          title: selectedLang === 'Hindi' ? 'प्रेरक कहानी' : 'Motivational Story',
          duration: '12:00',
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I',
          imageSource: require('../../assets/motivation.jpeg'),
          title: selectedLang === 'Hindi' ? 'सफलता की कहानी' : 'Success Story',
          duration: '18:00',
        },
      ],
    },
    {
      name: selectedLang === 'Hindi' ? rehab[3].Hindi : rehab[3].English,
      icon: rehab[3].icon,
      color: rehab[3].color,
      videos: [
        {
          videoUrl: 'https://youtu.be/zUNrUqMwUkY?si=r0T8zE5w1zSGGGm2',
          imageSource: require('../../assets/education.jpeg'),
          title: selectedLang === 'Hindi' ? 'शिक्षा का महत्व' : 'Importance of Education',
          duration: '15:00',
        },
      ],
    },
  ];

  const CategoryButton = ({ category, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === index && { backgroundColor: category.color },
      ]}
      onPress={() => setSelectedCategory(index)}
    >
      <View style={styles.categoryContent}>
        <FontAwesome5 
          name={category.icon} 
          size={24} 
          color={selectedCategory === index ? '#FFFFFF' : category.color} 
        />
        <Text style={[
          styles.categoryText,
          selectedCategory === index ? { color: '#FFFFFF' } : { color: category.color },
        ]}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const VideoCard = ({ video, color }) => (
    <TouchableOpacity 
      style={styles.videoCard}
      onPress={() => openYoutubeVideo(video.videoUrl)}
    >
      <Image
        source={video.imageSource}
        style={styles.videoImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.videoGradient}
      />
      <View style={styles.videoContent}>
        <View style={[styles.playButton, { backgroundColor: color }]}>
          <FontAwesome5 name="play" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <View style={styles.videoDuration}>
            <FontAwesome5 name="clock" size={12} color={color} />
            <Text style={[styles.durationText, { color: color }]}>{video.duration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedLang === 'Hindi' ? 'पुनर्वास वीडियो' : 'Rehabilitation Videos'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {selectedLang === 'Hindi' 
            ? 'अपने विकास के लिए शिक्षाप्रद वीडियो देखें'
            : 'Watch educational videos for your development'}
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category, index) => (
            <CategoryButton key={index} category={category} index={index} />
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.videosContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.videosContent}
      >
        {categories[selectedCategory].videos.map((video, index) => (
          <VideoCard 
            key={index} 
            video={video} 
            color={categories[selectedCategory].color}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
  categoriesContainer: {
    marginVertical: 16,
    paddingLeft: 20,
  },
  categoriesScroll: {
    paddingRight: 20,
  },
  categoryButton: {
    marginRight: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#F0F3F4',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  videosContainer: {
    flex: 1,
  },
  videosContent: {
    padding: 20,
    gap: 20,
  },
  videoCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  videoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  videoContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  videoInfo: {
    marginTop: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  videoDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
 },
});

export default Rehab;