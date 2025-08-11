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
  FlatList,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CategoryButton from './CategoryButton';
import { GridIcon, TechnologyIcon, IndustryIcon, ScienceIcon, EducationIcon, CarIcon, OSBIcon } from './icons/SvgIcons';

interface NewsScreenProps {
  onBack?: () => void;
  onNewsPress?: (newsItem: any) => void;
}

const NewsScreen: React.FC<NewsScreenProps> = ({ onBack, onNewsPress }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  // Haber kategorileri
  const categories = [
    { id: 'Tümü', name: 'Tümü', icon: GridIcon },
    { id: 'Teknoloji', name: 'Teknoloji', icon: TechnologyIcon },
    { id: 'Sanayi', name: 'Sanayi', icon: IndustryIcon },
    { id: 'Bilim', name: 'Bilim', icon: ScienceIcon },
    { id: 'Eğitim', name: 'Eğitim', icon: EducationIcon },
    { id: 'Otomotiv', name: 'Otomotiv', icon: CarIcon },
    { id: 'OSB', name: 'OSB', icon: OSBIcon }
  ];

  // Örnek haber verileri
  const newsData = [
    {
      id: 1,
      title: 'Yapay Zeka ile Üretimde Yeni Dönem Başladı',
      category: 'Teknoloji',
      time: '4 saat önce',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
      description: 'Türkiye\'de yapay zeka teknolojilerinin üretim süreçlerine entegrasyonu ile yeni bir dönem başladı...'
    },
    {
      id: 2,
      title: 'OSB\'lerde Sürdürülebilir Enerji Projeleri',
      category: 'Sanayi',
      time: '1 gün önce',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop',
      description: 'Organize Sanayi Bölgelerinde yenilenebilir enerji projeleri hızla yaygınlaşıyor...'
    },
    {
      id: 3,
      title: 'Elektrikli Araç Üretiminde Rekor',
      category: 'Otomotiv',
      time: '2 gün önce',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=200&fit=crop',
      description: 'Türkiye\'de elektrikli araç üretimi geçen yıla göre %150 artış gösterdi...'
    },
    {
      id: 4,
      title: 'Bilim İnsanlarından Önemli Keşif',
      category: 'Bilim',
      time: '3 gün önce',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=200&fit=crop',
      description: 'Türk bilim insanları tarafından yapılan araştırmada önemli bulgular elde edildi...'
    },
    {
      id: 5,
      title: 'Eğitimde Dijital Dönüşüm',
      category: 'Eğitim',
      time: '4 gün önce',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      description: 'Üniversitelerde dijital eğitim platformları yaygınlaşıyor...'
    },
    {
      id: 6,
      title: 'OSB\'lerde İstihdam Artışı',
      category: 'OSB',
      time: '5 gün önce',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop',
      description: 'Organize Sanayi Bölgelerinde istihdam oranları %25 arttı...'
    }
  ];

  const filteredNews = selectedCategory === 'Tümü' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const renderCategoryButton = (category: any) => {
    const IconComponent = category.icon;
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryButton,
          selectedCategory === category.id && styles.activeCategoryButton
        ]}
        onPress={() => setSelectedCategory(category.id)}
      >
        <View style={styles.categoryIcon}>
          <IconComponent 
            width={24} 
            height={24} 
            color={selectedCategory === category.id ? '#191D20' : '#666666'} 
          />
        </View>
        <Text style={[
          styles.categoryText,
          selectedCategory === category.id && styles.activeCategoryText
        ]}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };



  const renderNewsCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.newsCard}
      onPress={() => onNewsPress && onNewsPress(item)}
    >
      <Image 
        source={{ uri: item.image }}
        style={styles.newsImage}
        resizeMode="cover"
      />
      <View style={styles.newsContent}>
        <View style={styles.newsHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.newsTime}>{item.time}</Text>
        </View>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tüm Haberler</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M5 21.3508C4.71667 21.3508 4.47917 21.2473 4.2875 21.0404C4.09583 20.8335 4 20.5772 4 20.2713C4 19.9655 4.09583 19.7091 4.2875 19.5022C4.47917 19.2953 4.71667 19.1919 5 19.1919H6V11.6357C6 10.1424 6.41667 8.81558 7.25 7.65516C8.08333 6.49474 9.16667 5.73463 10.5 5.37481V4.61919C10.5 4.16941 10.6458 3.7871 10.9375 3.47226C11.2292 3.15742 11.5833 3 12 3C12.4167 3 12.7708 3.15742 13.0625 3.47226C13.3542 3.7871 13.5 4.16941 13.5 4.61919V5.37481C14.8333 5.73463 15.9167 6.49474 16.75 7.65516C17.5833 8.81558 18 10.1424 18 11.6357V19.1919H19C19.2833 19.1919 19.5208 19.2953 19.7125 19.5022C19.9042 19.7091 20 19.9655 20 20.2713C20 20.5772 19.9042 20.8335 19.7125 21.0404C19.5208 21.2473 19.2833 21.3508 19 21.3508H5ZM12 24.5891C11.45 24.5891 10.9792 24.3778 10.5875 23.955C10.1958 23.5322 10 23.0239 10 22.4302H14C14 23.0239 13.8042 23.5322 13.4125 23.955C13.0208 24.3778 12.55 24.5891 12 24.5891ZM8 19.1919H16V11.6357C16 10.4483 15.6083 9.43177 14.825 8.58619C14.0417 7.74062 13.1 7.31783 12 7.31783C10.9 7.31783 9.95833 7.74062 9.175 8.58619C8.39167 9.43177 8 10.4483 8 11.6357V19.1919Z" fill="#191D20"/>
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>

        {/* News List */}
        <View style={styles.newsList}>
          {filteredNews.map((item) => (
            <View key={item.id} style={styles.newsListContent}>
              {renderNewsCard({ item })}
            </View>
          ))}
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
  mainScroll: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
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
  categoryContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  activeCategoryButton: {
    backgroundColor: '#FFBB01',
  },
  categoryIcon: {
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: '#191D20',
    fontWeight: 'bold',
  },
  newsList: {
    flex: 1,
    paddingHorizontal: 22,
  },
  newsListContent: {
    marginBottom: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 1,
  },
  newsImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 16,
    height: '40%',
    justifyContent: 'space-between',
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191D20',
  },
  newsTime: {
    fontSize: 12,
    color: '#666666',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
    lineHeight: 20,
  },
  newsDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
});

export default NewsScreen;
