import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';

const Rehab = ({ navigation }) => {
  const categories = [
    {
      name: 'Meditate',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&ab_channel=Headspace',
          imageSource: require('../../assets/Meditation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&list=PLW8o3_GFoCBOexWd8WK-hAjReSYifh1nx&ab_channel=Headspace',
          imageSource: require('../../assets/Meditation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&list=PLW8o3_GFoCBOexWd8WK-hAjReSYifh1nx&ab_channel=Headspace',
          imageSource: require('../../assets/Meditation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&list=PLW8o3_GFoCBOexWd8WK-hAjReSYifh1nx&ab_channel=Headspace',
          imageSource: require('../../assets/Meditation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=nsGbtrl1WkU&list=PLW8o3_GFoCBOexWd8WK-hAjReSYifh1nx&ab_channel=Headspace',
          imageSource: require('../../assets/Meditation.jpeg'),
        },
      ],
    },
    {
      name: 'Skills',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY&ab_channel=JoshO%27Caoimh',
          imageSource: require('../../assets/skills.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY&ab_channel=JoshO%27Caoimh',
          imageSource: require('../../assets/skills.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY&ab_channel=JoshO%27Caoimh',
          imageSource: require('../../assets/skills.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY&ab_channel=JoshO%27Caoimh',
          imageSource: require('../../assets/skills.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=zUNrUqMwUkY&ab_channel=JoshO%27Caoimh',
          imageSource: require('../../assets/skills.jpeg'),
        },
      ],
    },
    {
      name: 'Motivation',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I&ab_channel=EsyID',
          imageSource: require('../../assets/motivation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I&ab_channel=EsyID',
          imageSource: require('../../assets/motivation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I&ab_channel=EsyID',
          imageSource: require('../../assets/motivation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I&ab_channel=EsyID',
          imageSource: require('../../assets/motivation.jpeg'),
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=domCDwp5u3I&ab_channel=EsyID',
          imageSource: require('../../assets/motivation.jpeg'),
        },

      ],
    },

    {
      name: 'Educational Videos',
      videos: [
        {
          videoUrl: 'https://youtu.be/zUNrUqMwUkY?si=r0T8zE5w1zSGGGm2',
          imageSource: require('../../assets/education.jpeg'),
        },
        {
          videoUrl: 'https://youtu.be/zUNrUqMwUkY?si=r0T8zE5w1zSGGGm2',
          imageSource: require('../../assets/education.jpeg'),
        },
        {
          videoUrl: 'https://youtu.be/zUNrUqMwUkY?si=r0T8zE5w1zSGGGm2',
          imageSource: require('../../assets/education.jpeg'),
        },
      ],
    },

  ];

  const handleVideoPress = (videoUrl) => {
    Linking.canOpenURL(videoUrl).then((supported) => {
      if (supported) {
        Linking.openURL(videoUrl);
      } else {
        console.log("Cannot open YouTube URL");
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{category.name}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.videos.map((video, videoIndex) => (
              <TouchableOpacity key={videoIndex} onPress={() => handleVideoPress(video.videoUrl)}>
                <View style={styles.videoContainer}>
                  <Image source={video.imageSource} style={styles.videoButton} />
                  <Text style={styles.videoText}>Video {videoIndex + 1}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  categoryLabel: {
    color: '#3498db',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    padding: 16,
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  videoButton: {
    height: 120,
    width: 150,
    resizeMode: 'cover',
    marginHorizontal: 8,
  },
  videoText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Rehab;
