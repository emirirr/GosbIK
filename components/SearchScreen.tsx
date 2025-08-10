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
} from 'react-native';
import { IndustryIcon, TechnologyIcon, CarIcon } from './icons/SvgIcons';
import Svg, { Path } from 'react-native-svg';

const MegaphoneIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path d="M11.5 8C11.4226 7.99999 11.3463 7.98202 11.277 7.9475L10.277 7.4475C10.1583 7.38822 10.068 7.28423 10.026 7.15839C9.98403 7.03256 9.99373 6.89518 10.053 6.7765C10.1123 6.65782 10.2163 6.56754 10.3421 6.52553C10.4679 6.48352 10.6053 6.49322 10.724 6.5525L11.724 7.0525C11.8249 7.1028 11.9059 7.18575 11.9537 7.28787C12.0016 7.38999 12.0135 7.50529 11.9876 7.61504C11.9616 7.72478 11.8993 7.82254 11.8108 7.89242C11.7223 7.96231 11.6128 8.00022 11.5 8ZM10.7235 3.45L11.7235 2.95C11.8422 2.89072 11.9325 2.78673 11.9745 2.66089C12.0165 2.53506 12.0068 2.39768 11.9475 2.279C11.8882 2.16032 11.7842 2.07004 11.6584 2.02803C11.5326 1.98602 11.3952 1.99572 11.2765 2.055L10.2765 2.555C10.1578 2.61428 10.0675 2.71827 10.0255 2.84411C9.98353 2.96994 9.99323 3.10732 10.0525 3.226C10.1118 3.34468 10.2158 3.43496 10.3416 3.47697C10.4674 3.51898 10.6048 3.50928 10.7235 3.45ZM12 5C12 4.86739 11.9473 4.74021 11.8536 4.64645C11.7598 4.55268 11.6326 4.5 11.5 4.5H10.5C10.3674 4.5 10.2402 4.55268 10.1464 4.64645C10.0527 4.74021 10 4.86739 10 5C10 5.13261 10.0527 5.25979 10.1464 5.35355C10.2402 5.44732 10.3674 5.5 10.5 5.5H11.5C11.6326 5.5 11.7598 5.44732 11.8536 5.35355C11.9473 5.25979 12 5.13261 12 5ZM9 9.5V0.5C9 0.367392 8.94732 0.240215 8.85355 0.146447C8.75979 0.0526784 8.63261 0 8.5 0C8.36739 0 8.24022 0.0526784 8.14645 0.146447C8.05268 0.240215 8 0.367392 8 0.5C8 1.9745 6.7085 2.5 5.5 2.5H2C1.46957 2.5 0.960859 2.71071 0.585787 3.08579C0.210714 3.46086 0 3.96957 0 4.5L0 5.5C0 6.03043 0.210714 6.53914 0.585787 6.91421C0.960859 7.28929 1.46957 7.5 2 7.5H5.5C6.7085 7.5 8 8.0255 8 9.5C8 9.63261 8.05268 9.75979 8.14645 9.85355C8.24022 9.94732 8.36739 10 8.5 10C8.63261 10 8.75979 9.94732 8.85355 9.85355C8.94732 9.75979 9 9.63261 9 9.5ZM4.093 8.5H2C1.76721 8.49907 1.53531 8.47105 1.309 8.4165L2.559 11.2075C2.66398 11.4434 2.83509 11.6438 3.05162 11.7845C3.26814 11.9251 3.5208 12 3.779 12C3.98443 11.9997 4.18652 11.948 4.36686 11.8497C4.5472 11.7513 4.70005 11.6094 4.81149 11.4368C4.92292 11.2642 4.9894 11.0665 5.00486 10.8616C5.02032 10.6568 4.98427 10.4513 4.9 10.264L4.093 8.5Z" fill="#191D20"/>
  </Svg>
);

interface SearchScreenProps {
  onBack?: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Responsibility']);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Header */}
        <View style={styles.searchHeader}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Arama Yapın</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path d="M5 21.3508C4.71667 21.3508 4.47917 21.2473 4.2875 21.0404C4.09583 20.8335 4 20.5772 4 20.2713C4 19.9655 4.09583 19.7091 4.2875 19.5022C4.47917 19.2953 4.71667 19.1919 5 19.1919H6V11.6357C6 10.1424 6.41667 8.81558 7.25 7.65516C8.08333 6.49474 9.16667 5.73463 10.5 5.37481V4.61919C10.5 4.16941 10.6458 3.7871 10.9375 3.47226C11.2292 3.15742 11.5833 3 12 3C12.4167 3 12.7708 3.15742 13.0625 3.47226C13.3542 3.7871 13.5 4.16941 13.5 4.61919V5.37481C14.8333 5.73463 15.9167 6.49474 16.75 7.65516C17.5833 8.81558 18 10.1424 18 11.6357V19.1919H19C19.2833 19.1919 19.5208 19.2953 19.7125 19.5022C19.9042 19.7091 20 19.9655 20 20.2713C20 20.5772 19.9042 20.8335 19.7125 21.0404C19.5208 21.2473 19.2833 21.3508 19 21.3508H5ZM12 24.5891C11.45 24.5891 10.9792 24.3778 10.5875 23.955C10.1958 23.5322 10 23.0239 10 22.4302H14C14 23.0239 13.8042 23.5322 13.4125 23.955C13.0208 24.3778 12.55 24.5891 12 24.5891ZM8 19.1919H16V11.6357C16 10.4483 15.6083 9.43177 14.825 8.58619C14.0417 7.74062 13.1 7.31783 12 7.31783C10.9 7.31783 9.95833 7.74062 9.175 8.58619C8.39167 9.43177 8 10.4483 8 11.6357V19.1919Z" fill="#191D20"/>
              </Svg>
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 16 }}>
                <Path d="M23.561 21.4452L18.9159 16.7981C22.3916 12.1533 21.4439 5.57034 16.7991 2.09462C12.1543 -1.3811 5.57131 -0.433388 2.09559 4.21139C-1.38013 8.85616 -0.432411 15.4392 4.21236 18.9149C7.94343 21.7069 13.068 21.7069 16.7991 18.9149L21.4462 23.562C22.0302 24.146 22.977 24.146 23.561 23.562C24.1449 22.978 24.1449 22.0312 23.561 21.4472L23.561 21.4452ZM10.5445 18.0179C6.4164 18.0179 3.06998 14.6715 3.06998 10.5435C3.06998 6.41542 6.4164 3.06901 10.5445 3.06901C14.6725 3.06901 18.0189 6.41542 18.0189 10.5435C18.0145 14.6697 14.6707 18.0136 10.5445 18.0179Z" fill="#666666"/>
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Arama Yapın"
                placeholderTextColor="#666666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Suggestions Section */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Öneri</Text>
          <View style={styles.suggestionsGrid}>
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Leadership') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Leadership')}
            >
              <Text style={styles.suggestionTagText}>Leadership</Text>
              <TouchableOpacity onPress={() => setSelectedTags(selectedTags.filter(t => t !== 'Leadership'))}>
                <Text style={styles.suggestionTagX}>×</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Teamwork') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Teamwork')}
            >
              <Text style={styles.suggestionTagText}>Teamwork</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Visioner') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Visioner')}
            >
              <Text style={styles.suggestionTagText}>Visioner</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Target oriented') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Target oriented')}
            >
              <Text style={styles.suggestionTagText}>Target oriented</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Consistent') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Consistent')}
            >
              <Text style={styles.suggestionTagText}>Consistent</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Good communication skills') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Good communication skills')}
            >
              <Text style={styles.suggestionTagText}>Good communication skills</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('English') && styles.suggestionTagActive]}
              onPress={() => toggleTag('English')}
            >
              <Text style={styles.suggestionTagText}>English</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.suggestionTag, selectedTags.includes('Responsibility') && styles.suggestionTagActive]}
              onPress={() => toggleTag('Responsibility')}
            >
              <Text style={styles.suggestionTagText}>Responsibility</Text>
              <Text style={styles.suggestionTagX}>×</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Geçmiş</Text>
          <View style={styles.historyList}>
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Leadership</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Target oriented</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Good communication skills</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>English</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Responsibility</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Consistent</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Visioner</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <Text style={styles.historyText}>Teamwork</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchesTitle}>Son Aramalar</Text>
          <View style={styles.recentSearchesList}>
            <TouchableOpacity style={styles.recentSearchItem}>
              <Text style={styles.recentSearchText}>Baykar Teknoloji</Text>
              <Text style={styles.recentSearchTime}>2 saat önce</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentSearchItem}>
              <Text style={styles.recentSearchText}>Yapay Zeka</Text>
              <Text style={styles.recentSearchTime}>1 gün önce</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentSearchItem}>
              <Text style={styles.recentSearchText}>Otomotiv Sektörü</Text>
              <Text style={styles.recentSearchTime}>3 gün önce</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Searches */}
        <View style={styles.popularSearchesContainer}>
          <Text style={styles.popularSearchesTitle}>Popüler Aramalar</Text>
          <View style={styles.popularSearchesTags}>
            <TouchableOpacity style={styles.popularSearchTag}>
              <Text style={styles.popularSearchTagText}>#Teknoloji</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularSearchTag}>
              <Text style={styles.popularSearchTagText}>#Sanayi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularSearchTag}>
              <Text style={styles.popularSearchTagText}>#İnovasyon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularSearchTag}>
              <Text style={styles.popularSearchTagText}>#Sürdürülebilirlik</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularSearchTag}>
              <Text style={styles.popularSearchTagText}>#E-ticaret</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#191D20',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  notificationButton: {
    padding: 8,
  },

  searchBarContainer: {
    paddingHorizontal: 0,
    marginTop: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    width: 370,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginLeft:-10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#191D20',
  },
  searchCategoriesContainer: {
    paddingHorizontal: 22,
    marginBottom: 32,
  },
  searchCategoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 16,
  },
  searchCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  searchCategoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchCategoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#191D20',
    textAlign: 'center',
  },
  recentSearchesContainer: {
    paddingHorizontal: 22,
    marginBottom: 32,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 16,
  },
  recentSearchesList: {
    gap: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#191D20',
    fontWeight: '500',
  },
  recentSearchTime: {
    fontSize: 14,
    color: '#666666',
  },
  popularSearchesContainer: {
    paddingHorizontal: 22,
    marginBottom: 32,
  },
  popularSearchesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 16,
  },
  popularSearchesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularSearchTag: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  popularSearchTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#191D20',
  },
  // Suggestions Styles
  suggestionsContainer: {
    paddingHorizontal: 22,
    marginBottom: 32,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 16,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  suggestionTagActive: {
    backgroundColor: '#FFBB01',
    borderColor: '#FFBB01',
  },
  suggestionTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#191D20',
    marginRight: 6,
  },
  suggestionTagX: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  // History Styles
  historyContainer: {
    paddingHorizontal: 22,
    marginBottom: 32,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 16,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    paddingVertical: 8,
  },
  historyText: {
    fontSize: 16,
    color: '#191D20',
  },
});

export default SearchScreen;
