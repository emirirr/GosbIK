import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface NewsDetailScreenProps {
  onBack?: () => void;
  newsItem?: any;
}

const NewsDetailScreen: React.FC<NewsDetailScreenProps> = ({ onBack, newsItem }) => {
  // Örnek haber verisi (eğer newsItem prop'u gelmezse)
  const defaultNews = {
    id: 1,
    title: 'Yapay Zeka ile Üretimde Yeni Dönem Başladı',
    category: 'Teknoloji',
    time: '4 saat önce',
    author: 'Ahmet Yılmaz',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    content: `Türkiye'de yapay zeka teknolojilerinin üretim süreçlerine entegrasyonu ile yeni bir dönem başladı. 
    
    Organize Sanayi Bölgelerinde faaliyet gösteren firmalar, yapay zeka destekli üretim sistemlerini kullanmaya başladı. Bu gelişme, üretim verimliliğini %40'a kadar artırırken, maliyetleri de önemli ölçüde düşürüyor.
    
    Uzmanlar, yapay zeka teknolojilerinin önümüzdeki 5 yıl içinde Türk sanayisinde daha da yaygınlaşacağını öngörüyor. Özellikle otomotiv, tekstil ve gıda sektörlerinde bu teknolojilerin kullanımının hızla artacağı belirtiliyor.
    
    "Yapay zeka, üretim süreçlerimizi tamamen değiştiriyor. Daha akıllı, daha verimli ve daha sürdürülebilir bir üretim modeli oluşturuyoruz," diyor Teknoloji Uzmanı Dr. Mehmet Kaya.
    
    Bu gelişmeler, Türkiye'nin dijital dönüşüm sürecinde önemli bir adım olarak değerlendiriliyor.`,
    tags: ['Yapay Zeka', 'Üretim', 'Teknoloji', 'OSB']
  };

  const news = newsItem || defaultNews;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Haber Detayı</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#191D20"/>
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* News Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: news.image }}
            style={styles.newsImage}
            resizeMode="cover"
          />
        </View>

        {/* News Content */}
        <View style={styles.newsContent}>
          {/* Category and Time */}
          <View style={styles.metaInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{news.category}</Text>
            </View>
            <Text style={styles.timeText}>{news.time}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{news.title}</Text>

          {/* Author */}
          <View style={styles.authorContainer}>
            <Text style={styles.authorLabel}>Yazar:</Text>
            <Text style={styles.authorName}>{news.author}</Text>
          </View>

          {/* Content */}
          <Text style={styles.contentText}>{news.content}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsTitle}>Etiketler:</Text>
            <View style={styles.tagsList}>
              {news.tags.map((tag: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  newsImage: {
    width: '100%',
    height: '100%',
  },
  newsContent: {
    padding: 22,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191D20',
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 32,
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  authorLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  contentText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsContainer: {
    marginTop: 20,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 12,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default NewsDetailScreen;
