import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import { rights, categories } from '../../utils/rights';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - (CARD_MARGIN * 6)) / 2;

const Rights = ({ navigation }) => {
  const { selectedLang } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRight, setSelectedRight] = useState(null);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const filteredRights = rights.filter(right => {
    const matchesCategory = selectedCategory === 'all' || right.category === selectedCategory;
    const matchesSearch = right[selectedLang]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         right.description[selectedLang]?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRightPress = useCallback((rightId) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedRight(selectedRight === rightId ? null : rightId);
  }, [selectedRight, fadeAnim]);

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedRight(null);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedLang === 'Hindi' ? 'कानूनी अधिकार' : 'Legal Rights'}
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color="#95A5A6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={selectedLang === 'Hindi' ? 'अधिकार खोजें...' : 'Search rights...'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#95A5A6"
        />
        {searchQuery !== '' && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="times-circle" size={16} color="#95A5A6" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton,
              { borderColor: category.color }
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Icon
                name={category.icon}
                size={18}
                color="#FFF"
              />
            </View>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && { color: category.color }
              ]}
            >
              {category[selectedLang]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderRightCard = (right) => {
    const isSelected = selectedRight === right.id;
    const categoryColor = categories.find(c => c.id === right.category)?.color;

    return (
      <Animated.View
        key={right.id}
        style={[
          styles.rightCard,
          isSelected && styles.selectedCard,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity
          onPress={() => handleRightPress(right.id)}
          activeOpacity={0.9}
          style={styles.rightCardTouchable}
        >
          <View style={[styles.rightIconContainer, { backgroundColor: categoryColor }]}>
            <Icon name={right.icon} size={24} color="#FFF" />
          </View>
          <View style={styles.rightContentContainer}>
            <Text 
              style={[styles.rightTitle, isSelected && { color: categoryColor }]} 
              numberOfLines={isSelected ? undefined : 2}
            >
              {right[selectedLang]}
            </Text>
            {isSelected && (
              <View style={styles.rightDescriptionContainer}>
                <Text style={styles.rightDescription}>
                  {right.description[selectedLang]}
                </Text>
                <View style={[styles.rightCategoryTag, { backgroundColor: `${categoryColor}15` }]}>
                  <Icon name={categories.find(c => c.id === right.category)?.icon} size={12} color={categoryColor} />
                  <Text style={[styles.rightCategoryText, { color: categoryColor }]}>
                    {categories.find(c => c.id === right.category)?.[selectedLang]}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Icon 
            name={isSelected ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color={isSelected ? categoryColor : '#95A5A6'} 
            style={styles.rightCardArrow}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      {renderHeader()}
      {renderCategories()}
      <ScrollView
        ref={scrollViewRef}
        style={styles.rightsContainer}
        contentContainerStyle={styles.rightsContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rightsList}>
          {filteredRights.map(renderRightCard)}
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
  header: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    paddingVertical: 12,
  },
  clearButton: {
    padding: 8,
  },
  categoriesWrapper: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  selectedCategoryButton: {
    backgroundColor: '#FFF',
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
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  rightsContainer: {
    flex: 1,
  },
  rightsContent: {
    padding: 16,
  },
  rightsList: {
    gap: 12,
  },
  rightCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
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
  selectedCard: {
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  rightCardTouchable: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  rightIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rightContentContainer: {
    flex: 1,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  rightDescriptionContainer: {
    marginTop: 8,
  },
  rightDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12,
  },
  rightCategoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  rightCategoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightCardArrow: {
    marginLeft: 12,
  },
});

export default Rights;
