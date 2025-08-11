import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CategorySelector from './CategorySelector';

const YonIcon: React.FC<{ color?: string }> = ({ color = "#191D20" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" 
      fill={color}
    />
  </Svg>
);

const NotificationIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" 
      fill="#191D20"
    />
  </Svg>
);

const SearchIcon: React.FC = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path 
      d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" 
      stroke="#666666" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const CompaniesScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');



  const companies = [
    {
      id: 1,
      name: 'RobotTech Industries',
      category: 'Teknoloji',
      description: 'Endüstriyel robot ve otomasyon çözümleri',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: 'AutoMotive Solutions',
      category: 'Otomativ',
      description: 'Otomotiv parçaları ve sistemleri',
      logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop',
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Industrial Systems',
      category: 'Sanayi',
      description: 'Endüstriyel sistemler ve ekipmanlar',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      rating: 4.7,
      reviews: 203,
    },
    {
      id: 4,
      name: 'Science Labs',
      category: 'Bilim',
      description: 'Bilimsel araştırma ve geliştirme',
      logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop',
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 5,
      name: 'Education Center',
      category: 'Eğitim',
      description: 'Eğitim teknolojileri ve çözümleri',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      rating: 4.5,
      reviews: 124,
    },
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = activeCategory === 'Tümü' || company.category === activeCategory;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <YonIcon color="#191D20" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Firmalar</Text>
      <TouchableOpacity style={styles.notificationButton}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Firma ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666666"
        />
      </View>
    </View>
  );



  const renderCompanyCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.companyCard}>
      <Image source={{ uri: item.logo }} style={styles.companyLogo} />
      <View style={styles.companyContent}>
        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
        </View>
        <Text style={styles.companyCategory}>{item.category}</Text>
        <Text style={styles.companyDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderHeader()}
      {renderSearchBar()}
      
      <View style={styles.categoryWrapper}>
        <CategorySelector
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </View>
      
      <FlatList
        data={filteredCompanies}
        renderItem={renderCompanyCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.companiesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.companiesListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#191D20',
  },
  categoryWrapper: {
    marginBottom: 16,
  },

  companiesList: {
    flex: 1,
  },
  companiesListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  companyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  companyContent: {
    flex: 1,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFBB01',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666666',
  },
  companyCategory: {
    fontSize: 12,
    color: '#FFBB01',
    fontWeight: '600',
    marginBottom: 4,
  },
  companyDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default CompaniesScreen;
