import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect, Circle } from 'react-native-svg';
import Navbar from './Navbar';
import BottomTabNavigator from './BottomTabNavigator';
import { GridIcon, TechnologyIcon, IndustryIcon, ScienceIcon, EducationIcon, CarIcon, OSBIcon, NotificationIcon, UserIcon, GradientOverlay, NewsCardIcon } from './icons/SvgIcons';

const MainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { width } = Dimensions.get('window');
  const slideWidth = width * 0.8;
  const slideSpacing = width * 0.1;

  // API'den haberleri çek
  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  const fetchFeaturedNews = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data with real image URLs
      const mockData = [
        {
          id: 1,
          title: "Teknoloji Dünyasında Yeni Gelişmeler",
          subtitle: "Yapay zeka ve robotik alanında çığır açan yenilikler",
          category: "Teknoloji",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          title: "Sanayi 4.0 ve Dijital Dönüşüm",
          subtitle: "Türkiye'de sanayi sektöründe dijitalleşme süreci",
          category: "Sanayi",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
        },
        {
          id: 3,
          title: "Eğitimde Teknolojik Yenilikler",
          subtitle: "Uzaktan eğitim ve dijital öğrenme platformları",
          category: "Eğitim",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop"
        },
        {
          id: 4,
          title: "Otomotiv Sektöründe Elektrikli Araçlar",
          subtitle: "Elektrikli araç üretimi ve şarj istasyonları",
          category: "Otomotiv",
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop"
        }
      ];
      
      setFeaturedNews(mockData);
    } catch (error) {
      console.error('Error fetching featured news:', error);
      // Fallback data with better images
      const fallbackData = [
        {
          id: 1,
          title: "Teknoloji Dünyasında Yeni Gelişmeler",
          subtitle: "Yapay zeka ve robotik alanında çığır açan yenilikler",
          category: "Teknoloji",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
        },
        {
          id: 2,
          title: "Sanayi 4.0 ve Dijital Dönüşüm",
          subtitle: "Türkiye'de sanayi sektöründe dijitalleşme süreci",
          category: "Sanayi",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
        },
        {
          id: 3,
          title: "Eğitimde Teknolojik Yenilikler",
          subtitle: "Uzaktan eğitim ve dijital öğrenme platformları",
          category: "Eğitim",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop"
        },
        {
          id: 4,
          title: "Otomotiv Sektöründe Elektrikli Araçlar",
          subtitle: "Elektrikli araç üretimi ve şarj istasyonları",
          category: "Otomotiv",
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop"
        }
      ];
      setFeaturedNews(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const categories = [
    { id: 'Tümü', name: 'Tümü', icon: GridIcon },
    { id: 'Teknoloji', name: 'Teknoloji', icon: TechnologyIcon },
    { id: 'Sanayi', name: 'Sanayi', icon: IndustryIcon },
    { id: 'Bilim', name: 'Bilim', icon: ScienceIcon },
    { id: 'Eğitim', name: 'Eğitim', icon: EducationIcon },
    { id: 'Otomativ', name: 'Otomativ', icon: CarIcon },
    { id: 'OSB', name: 'OSB', icon: OSBIcon },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <UserIcon width={24} height={24} color="#191D20" />
        </View>
      </View>
             <View style={styles.logoContainer}>
         <View style={styles.logo}>
           <Image source={require('../assets/images/splash/splash logo.png')} style={styles.logoImage} />
         </View>
       </View>
      <View style={styles.notificationContainer}>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon width={24} height={24} color="#191D20" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategoryButton = (category: any) => {
    const IconComponent = category.icon;
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryButton,
          activeCategory === category.id && styles.activeCategoryButton
        ]}
        onPress={() => setActiveCategory(category.id)}
      >
                 <View style={styles.categoryIcon}>
           <IconComponent 
             width={24} 
             height={24} 
             color={activeCategory === category.id ? '#191D20' : '#666666'} 
           />
         </View>
        <Text style={[
          styles.categoryText,
          activeCategory === category.id && styles.activeCategoryText
        ]}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFeaturedNews = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Haberler yükleniyor...</Text>
        </View>
      );
    }

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'Teknoloji':
          return '#4A90E2';
        case 'Sanayi':
          return '#F5A623';
        case 'Eğitim':
          return '#7ED321';
        case 'Otomotiv':
          return '#D0021B';
        default:
          return '#9B9B9B';
      }
    };

    return (
      <View style={styles.carouselContainer}>
        <FlatList
          data={featuredNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={slideWidth + slideSpacing}
          decelerationRate={0.8}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (slideWidth + slideSpacing));
            setCurrentSlide(index);
          }}
          renderItem={({ item, index }) => (
            <View style={[styles.featuredCard, { width: slideWidth }]}>
              <View style={[styles.featuredImageContainer, { backgroundColor: getCategoryColor(item.category) }]}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.featuredImageStyle}
                  onError={() => {
                    console.log('Image failed to load:', item.image);
                  }}
                />
                
                {/* Gradient overlay */}
                <View style={styles.gradientOverlayContainer}>
                  <GradientOverlay />
                </View>
                

              </View>
              
              <View style={styles.featuredContent}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{item.category}</Text>
                </View>
                <Text style={styles.featuredTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.featuredTime}>Pazar 16 dk Önce</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        
        {/* Dots indicator */}
        <View style={styles.carouselDots}>
          {featuredNews.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderSection = (title: string, showViewAll: boolean = true) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.yellowLine} />
      </View>
      {showViewAll && (
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Tümü</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderNewsCard = () => (
    <View style={styles.newsCard}>
      <View style={styles.newsImage}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop' }}
          style={styles.newsImageStyle}
          onError={() => {
            console.log('News image failed to load');
          }}
        />
      </View>
      <View style={styles.newsContent}>
        <View style={styles.newsMeta}>
          <View style={styles.yellowDot} />
          <Text style={styles.newsCategory}>Otomotiv</Text>
        </View>
        <Text style={styles.newsTitle}>
          158 projeye 394 milyar liralık kaynak... Doğu Karadeniz Projesi Eylem Planı açıklandı!
        </Text>
        <Text style={styles.newsTime}>Pazar 16 dk Önce</Text>
      </View>
    </View>
  );

  const renderCompanyCard = (name: string, logo: string) => (
    <View style={styles.companyCard}>
      <View style={styles.companyLogo}>
        <Text style={styles.companyLogoText}>{logo}</Text>
      </View>
      <Text style={styles.companyName}>{name}</Text>
    </View>
  );

  const renderProductCard = (title: string, category: string, image: string, isActive: boolean = false) => (
    <View style={[styles.productCard, isActive && styles.activeProductCard]}>
      <View style={styles.productImage}>
        <Text style={styles.productIcon}>{image}</Text>
      </View>
      <View style={styles.productBadge}>
        <Text style={styles.productBadgeText}>{category}</Text>
      </View>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>Lorem ipsum dolor sit amet</Text>
    </View>
  );

  const renderJobCard = (title: string, company: string, location: string, date: string, isActive: boolean = false) => (
    <View style={[styles.jobCard, isActive && styles.activeJobCard]}>
      <View style={styles.jobLogo}>
        <Text style={styles.jobLogoText}>🍎</Text>
      </View>
      <Text style={styles.jobTitle}>{title}</Text>
      <Text style={styles.jobCompany}>{company}</Text>
      <View style={styles.jobLocation}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.jobDate}>
        <Text style={styles.dateIcon}>📅</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );

  const renderEventCard = (title: string, organizer: string, location: string, date: string, isActive: boolean = false) => (
    <View style={[styles.eventCard, isActive && styles.activeEventCard]}>
      <Text style={styles.eventDate}>{date}</Text>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventOrganizer}>{organizer}</Text>
      <Text style={styles.eventLocation}>{location}</Text>
    </View>
  );

  const renderSocialMediaCard = (company: string, description: string, image: string) => (
    <View style={styles.socialCard}>
      <View style={styles.socialImage}>
        <Text style={styles.socialIcon}>{image}</Text>
      </View>
      <View style={styles.socialContent}>
        <Text style={styles.socialCompany}>{company}</Text>
        <Text style={styles.socialDescription}>{description}</Text>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>Devamı Görüntüle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView style={styles.homeContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            {renderHeader()}
            
            {/* Category Navigation */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
              contentContainerStyle={styles.categoryContent}
            >
              {categories.map(renderCategoryButton)}
            </ScrollView>

            {/* Featured News */}
            {renderFeaturedNews()}

            {/* Past News Section */}
            {renderSection('Geçmiş Haberler')}

            {/* Past News Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
              {renderNewsCard()}
              {renderNewsCard()}
              {renderNewsCard()}
            </ScrollView>

            {/* Companies Section */}
            {renderSection('Firmalar')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
              {renderCompanyCard('Baykar Teknoloji', 'B')}
              {renderCompanyCard('hepsiburada', 'H')}
            </ScrollView>

            {/* Products Section */}
            {renderSection('Ürünler')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
              {renderProductCard('Robotik Kol', 'Endüstriyel Robot', '🤖', true)}
              {renderProductCard('Plastik Boru', 'Plast', '🔧')}
            </ScrollView>

            {/* Job Postings Section */}
            {renderSection('İş İlanları')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
              {renderJobCard('Grafik Tasarımcı', 'Apple', 'Darıca / Kocaeli', '18.04.2025', true)}
            </ScrollView>

            {/* Events Section */}
            {renderSection('Yaklaşan Etkinlikler')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
              {renderEventCard(
                'II. Sağlıklı Gıdanın Başkenti Kumluca',
                'Ajans Asya Fuarcılık Organi..',
                'Van Expo Fuar ve Kongre Merkezi',
                '27 Ekim 2025',
                true
              )}
            </ScrollView>

            {/* Social Media Section */}
            <View style={styles.socialSection}>
              {renderSection('GosbIK Sosyal Medya', false)}
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Takip Edin</Text>
              </TouchableOpacity>
            </View>
            
                         <View style={styles.socialCard}>
               <View style={styles.gosbikLogo}>
                 <Image source={require('../assets/images/splash/splash logo.png')} style={styles.gosbikLogoImage} />
            </View>
               <Text style={styles.socialTitle}>GosbIK Sosyal Medya</Text>
               <Text style={styles.socialShares}>91 Paylaşım</Text>
          </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.socialNav}
              contentContainerStyle={styles.socialNavContent}
            >
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>Tüm Paylaşımlar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>Linkedin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>YouTube</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialNavItem}>
                <Text style={styles.socialNavText}>X</Text>
              </TouchableOpacity>
            </ScrollView>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
              {renderSocialMediaCard('Baykar Teknoloji', 'Türkiye\'nin mühendislik gücü...', '👥')}
              {renderSocialMediaCard('Toyotetsu', 'Turkey\'s engineering power...', '👥')}
            </ScrollView>
          </ScrollView>
        );
      case 'ik':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>İnsan Kaynakları</Text>
            <Text style={styles.subtitle}>İK modülü</Text>
          </View>
        );
      case 'search':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Arama</Text>
            <Text style={styles.subtitle}>Arama modülü</Text>
          </View>
        );
      case 'industry':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Sanayi</Text>
            <Text style={styles.subtitle}>Sanayi modülü</Text>
          </View>
        );
      case 'menu':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Menü</Text>
            <Text style={styles.subtitle}>Menü modülü</Text>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Ana Sayfa</Text>
            <Text style={styles.subtitle}>Hoş geldiniz!</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {renderContent()}
      <BottomTabNavigator 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  homeContent: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoHighlight: {
    backgroundColor: '#666666',
    color: '#FFBB01',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginLeft: 1,
  },
  profileContainer: {
    position: 'absolute',
    left: 16,
    top: 10,
    paddingBottom: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFBB01',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFBB01',
  },
  profileIcon: {
    fontSize: 20,
  },
  notificationContainer: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    minWidth: 90,
  },
  activeCategoryButton: {
    backgroundColor: '#FFBB01',
  },
  categoryIcon: {
    marginBottom: 6,
  },
  categoryIconText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
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
  featuredContainer: {
    marginBottom: 30,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  carouselContainer: {
    paddingVertical: 20,
  },
  featuredCard: {
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImageContainer: {
    width: '100%',
    height: 185,
    position: 'relative',
    overflow: 'hidden',
  },
  featuredImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryIconFallback: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  categoryBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryBadgeText: {
    color: '#191D20',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#191D20',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 6,
  },
  featuredTime: {
    color: '#191D20',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 16,
  },
  gradientOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 185,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ccc',
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  yellowLine: {
    width: 20,
    height: 3,
    backgroundColor: '#FFBB01',
    borderRadius: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#FFBB01',
    fontSize: 14,
    fontWeight: '500',
  },
  arrowIcon: {
    color: '#FFBB01',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionScroll: {
    marginBottom: 24,
  },
  sectionContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  newsCard: {
    width: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  newsImage: {
    width: 140,
    height: 140,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 24,
    overflow: 'hidden',
  },
  newsImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsIcon: {
    fontSize: 30,
  },
  newsContent: {
    flex: 1,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  yellowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFBB01',
  },
  newsCategory: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 22,
    marginBottom: 10,
  },
  newsTime: {
    fontSize: 12,
    color: '#999999',
  },
  companyCard: {
    width: 100,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191D20',
  },
  companyName: {
    fontSize: 12,
    color: '#191D20',
    textAlign: 'center',
    fontWeight: '500',
  },
  productCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeProductCard: {
    borderWidth: 2,
    borderColor: '#FFBB01',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productIcon: {
    fontSize: 40,
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFBB01',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  productBadgeText: {
    fontSize: 10,
    color: '#191D20',
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    padding: 12,
    paddingBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666666',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  jobCard: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeJobCard: {
    borderWidth: 2,
    borderColor: '#FFBB01',
  },
  jobLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobLogoText: {
    fontSize: 20,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
  jobDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateIcon: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
  },
  eventCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeEventCard: {
    borderWidth: 2,
    borderColor: '#FFBB01',
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFBB01',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 6,
    lineHeight: 18,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666666',
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  followButton: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followButtonText: {
    color: '#191D20',
    fontSize: 12,
    fontWeight: 'bold',
  },
  socialCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  gosbikLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gosbikLogoImage: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  gosbikLogoText: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gosbikLogoHighlight: {
    backgroundColor: '#666666',
    color: '#FFBB01',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginLeft: 1,
  },
  socialTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  socialShares: {
    fontSize: 12,
    color: '#666666',
  },
  socialNav: {
    marginBottom: 12,
  },
  socialNavContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  socialNavItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
  },
  socialNavText: {
    fontSize: 12,
    color: '#191D20',
    fontWeight: '500',
  },
  socialImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialIcon: {
    fontSize: 30,
  },
  socialContent: {
    flex: 1,
  },
  socialCompany: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  socialDescription: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 16,
  },
  viewMoreButton: {
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    color: '#FFBB01',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  categoryFilter: {
    marginBottom: 20,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryFilterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  categoryFilterDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  categoryFilterText: {
    fontSize: 14,
    color: '#191D20',
    fontWeight: '500',
  },
  categoryFilterDotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#191D20',
  },
});

export default MainScreen;
