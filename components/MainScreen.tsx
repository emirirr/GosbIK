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
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect, Circle } from 'react-native-svg';
import Navbar from './Navbar';
import BottomTabNavigator from './BottomTabNavigator';
import { GridIcon, TechnologyIcon, IndustryIcon, ScienceIcon, EducationIcon, CarIcon, NotificationIcon, UserIcon } from './icons/SvgIcons';

const MainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tümü');

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
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <Text style={styles.profileIcon}>👤</Text>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Gosb</Text>
          <Text style={styles.logoHighlight}>ik</Text>
        </View>
      </View>
      <View style={styles.notificationContainer}>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
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
            width={20} 
            height={20} 
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

  const renderFeaturedNews = () => (
    <View style={styles.featuredContainer}>
      <View style={styles.featuredCard}>
        <View style={styles.featuredImage}>
          <View style={styles.techBadge}>
            <Text style={styles.techBadgeText}>Teknoloji</Text>
          </View>
        </View>
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>
            Teknoloji tarihinde dev birleşme! Qualcomm intel'i satın alıyor
          </Text>
        </View>
      </View>
      <View style={styles.carouselDots}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
    </View>
  );

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
        <Text style={styles.newsIcon}>👥</Text>
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
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.sectionScroll}
              contentContainerStyle={styles.sectionContent}
            >
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
                <Text style={styles.gosbikLogoText}>Gosb</Text>
                <Text style={styles.gosbikLogoHighlight}>ik</Text>
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
  logoText: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoHighlight: {
    backgroundColor: '#666666',
    color: '#FFBB01',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 2,
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
    minWidth: 80,
  },
  activeCategoryButton: {
    backgroundColor: '#FFBB01',
  },
  categoryIcon: {
    marginBottom: 4,
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#191D20',
    fontWeight: 'bold',
  },
  featuredContainer: {
    marginBottom: 30,
  },
  featuredCard: {
    marginHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  featuredImage: {
    height: 200,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  techBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFBB01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  techBadgeText: {
    color: '#191D20',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 22,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    backgroundColor: '#FFBB01',
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
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 18,
    marginBottom: 6,
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
});

export default MainScreen;
