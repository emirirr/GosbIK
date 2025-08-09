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
import BottomTabNavigator from './BottomTabNavigator';
import { GridIcon, TechnologyIcon, IndustryIcon, ScienceIcon, EducationIcon, CarIcon, OSBIcon, NotificationIcon, UserIcon } from './icons/SvgIcons';
import Svg, { Path } from 'react-native-svg';

const YonIcon: React.FC<{ color?: string }> = ({ color = "#191D20" }) => (
  <Svg width="8" height="14" viewBox="0 0 5 10" fill="none">
    <Path 
      d="M4.26654 3.58589L1.20654 0.525893C1.08163 0.401726 0.912659 0.332031 0.736535 0.332031C0.560411 0.332031 0.391443 0.401726 0.266535 0.525893C0.204049 0.587868 0.154453 0.661602 0.120607 0.742842C0.0867616 0.824081 0.0693359 0.911218 0.0693359 0.999226C0.0693359 1.08723 0.0867616 1.17437 0.120607 1.25561C0.154453 1.33685 0.204049 1.41058 0.266535 1.47256L3.3332 4.52589C3.39569 4.58787 3.44528 4.6616 3.47913 4.74284C3.51298 4.82408 3.5304 4.91122 3.5304 4.99923C3.5304 5.08723 3.51298 5.17437 3.47913 5.25561C3.44528 5.33685 3.39569 5.41059 3.3332 5.47256L0.266535 8.5259C0.140999 8.65055 0.0701225 8.81996 0.0694974 8.99687C0.0688723 9.17378 0.13855 9.34369 0.263202 9.46923C0.387854 9.59476 0.557269 9.66564 0.734178 9.66627C0.911087 9.66689 1.081 9.59721 1.20654 9.47256L4.26654 6.41256C4.64107 6.03756 4.85144 5.52923 4.85144 4.99923C4.85144 4.46923 4.64107 3.96089 4.26654 3.58589Z" 
      fill={color}
    />
  </Svg>
);

const BantIcon: React.FC = () => (
  <View style={styles.bantContainer}>
    <Svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <Path 
        d="M0 0H15C17.7614 0 20 2.23858 20 5C20 7.76142 17.7614 10 15 10H0V0Z" 
        fill="#FFBB01"
      />
    </Svg>
  </View>
);

const AppleIcon: React.FC<{ color?: string }> = ({ color = "black" }) => (
  <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
    <Path 
      d="M17.6222 16.3654C17.3108 17.0786 16.9261 17.7587 16.474 18.3951C15.8702 19.2425 15.3743 19.8281 14.9942 20.154C14.4038 20.6866 13.7696 20.9606 13.0915 20.976C12.6057 20.976 12.0187 20.8401 11.335 20.5639C10.6491 20.2888 10.0194 20.154 9.44249 20.154C8.83863 20.154 8.19092 20.2888 7.4971 20.5639C6.8044 20.8401 6.24439 20.9849 5.81596 20.9981C5.16711 21.0258 4.51827 20.7451 3.87168 20.154C3.45899 19.8005 2.94284 19.1928 2.32323 18.3332C1.65977 17.4172 1.11439 16.351 0.687074 15.139C0.2294 13.8275 0 12.5591 0 11.3305C0 9.92398 0.30924 8.70973 0.928844 7.69324C1.39748 6.89493 2.06746 6.22866 2.87424 5.75861C3.6698 5.28977 4.57797 5.03733 5.50559 5.02718C6.02287 5.02718 6.70094 5.18407 7.54095 5.49344C8.38096 5.8028 8.92072 5.95969 9.15574 5.95969C9.33342 5.95969 9.93053 5.77518 10.9471 5.40947C11.9063 5.07027 12.7159 4.92995 13.3794 4.98519C15.1786 5.12772 16.5291 5.82379 17.4276 7.07893C15.8196 8.03686 15.0246 9.37707 15.0403 11.0974C15.0538 12.4376 15.5497 13.5524 16.5213 14.4374C16.9508 14.8413 17.452 15.1644 18 15.3909C17.8808 15.7301 17.7549 16.0538 17.6222 16.3654ZM13.4986 0.420957C13.4986 1.47059 13.1073 2.45172 12.3302 3.35882C11.3901 4.43718 10.2544 5.06143 9.02305 4.9631C9.00695 4.83111 8.99906 4.69828 8.99944 4.56534C8.99944 3.55659 9.44474 2.47823 10.2398 1.59544C10.6356 1.14907 11.1394 0.776727 11.75 0.480621C12.3595 0.188934 12.9352 0.0276219 13.4772 0C13.4918 0.141424 13.4986 0.281743 13.4986 0.420957Z" 
      fill={color}
    />
  </Svg>
);

const MicrosoftIcon: React.FC = () => (
  <Svg width="21" height="21" viewBox="0 0 21 21">
    <Path fill="#f35325" d="M0 0h10v10H0z"/>
    <Path fill="#81bc06" d="M11 0h10v10H11z"/>
    <Path fill="#05a6f0" d="M0 11h10v10H0z"/>
    <Path fill="#ffba08" d="M11 11h10v10H11z"/>
  </Svg>
);

const BaykarIcon: React.FC = () => (
  <Svg width="24" height="28" viewBox="0 0 29 33">
    <Path fill="url(#pattern0_3916_2549)" d="M0 0h28.8v32.9375H0z"/>
  </Svg>
);

const HepsiburadaIcon: React.FC = () => (
  <Svg width="48" height="14" viewBox="0 0 72 21">
    <Path fill="url(#pattern0_3916_2532)" d="M0 0h72v20.16H0z"/>
  </Svg>
);

const MainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);

  const { width } = Dimensions.get('window');
  const slideWidth = 370; // Fixed width as specified
  const slideSpacing = 22; // Left spacing as specified

  // Mock haber verileri - kategorilere göre
  const allNews = [
    {
      id: 1,
      title: "Teknoloji tarihinde dev birleşme! Qualcomm Intel'i satın alıyor",
      category: "Teknoloji",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
      time: "2 saat önce"
    },
    {
      id: 2,
      title: "Yapay Zeka ile Üretimde Yeni Dönem Başladı",
      category: "Teknoloji", 
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      time: "4 saat önce"
    },
    {
      id: 3,
      title: "Sanayi 4.0 Dönüşümü Hızlanıyor",
      category: "Sanayi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      time: "6 saat önce"
    },
    {
      id: 4,
      title: "Yenilenebilir Enerji Yatırımları Artıyor",
      category: "Sanayi",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop",
      time: "1 gün önce"
    },
    {
      id: 5,
      title: "Bilimsel Araştırmalarda Yeni Keşifler",
      category: "Bilim",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
      time: "2 gün önce"
    },
    {
      id: 6,
      title: "Uzaktan Eğitimde Teknolojik İnovasyonlar",
      category: "Eğitim",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      time: "3 gün önce"
    },
    {
      id: 7,
      title: "Elektrikli Araçlarda Batarya Teknolojisi Gelişimi",
      category: "Otomativ",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop",
      time: "4 gün önce"
    },
    {
      id: 8,
      title: "OSB'lerde Dijital Dönüşüm Süreci",
      category: "OSB",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
      time: "5 gün önce"
    }
  ];

  // Geçmiş haberler için ayrı data
  const pastNews = [
    {
      id: 101,
      title: "158 projeye 394 milyar liralık kaynak... Doğu Karadeniz Projesi Eylem Planı açıklandı!",
      category: "Otomotiv",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      time: "Pazar 16 dk Önce"
    },
    {
      id: 102,
      title: "Teknoloji sektöründe yeni iş birliği anlaşmaları imzalandı",
      category: "Teknoloji",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      time: "Pazartesi 2 saat önce"
    },
    {
      id: 103,
      title: "Sanayi kuruluşlarında dijital dönüşüm hızlanıyor",
      category: "Sanayi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      time: "Salı 4 saat önce"
    },
    {
      id: 104,
      title: "Eğitim teknolojilerinde yeni dönem başlıyor",
      category: "Eğitim",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      time: "Çarşamba 1 gün önce"
    }
  ];

  // Firmalar data
  const companies = [
    {
      id: 1,
      name: "Baykar Teknoloji",
      logo: "baykar",
      logoText: "B"
    },
    {
      id: 2,
      name: "Hepsiburada",
      logo: "hepsiburada",
      logoText: "H"
    },
    {
      id: 3,
      name: "Baykar Teknoloji",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      logoText: "B"
    },
    {
      id: 4,
      name: "Hepsiburada",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
      logoText: "H"
    }
  ];

  // Ürünler data
  const products = [
    {
      id: 1,
      title: "Robotik Kol",
      category: "Endüstriyel Robot",
      description: "Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Plastik Boru",
      category: "Plastik",
      description: "Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    }
  ];

  // İş İlanları data
  const jobPostings = [
    {
      id: 1,
      title: "Grafik Tasarımcı",
      company: "Apple",
      location: "Darıca / Kocaeli",
      date: "18.04.2025",
      logo: "apple"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "İstanbul / Türkiye",
      date: "20.04.2025",
      logo: "microsoft"
    }
  ];

  // Yaklaşan Etkinlikler data
  const upcomingEvents = [
    {
      id: 1,
      title: "II. Sağlıklı Gıdanın Başkenti Kumluca",
      organizer: "Ajans Asya Fuarcılık Organi..",
      location: "Van Expo Fuar ve Kongre Merkezi",
      date: "27 Ekim",
      year: "2025"
    },
    {
      id: 2,
      title: "Teknoloji ve İnovasyon Zirvesi",
      organizer: "TechWorld Events",
      location: "İstanbul Kongre Merkezi",
      date: "15 Kasım",
      year: "2025"
    }
  ];

  // Kategori değiştiğinde haberleri filtrele
  useEffect(() => {
    if (activeCategory === 'Tümü') {
      setFilteredNews(allNews);
    } else {
      const filtered = allNews.filter(news => news.category === activeCategory);
      setFilteredNews(filtered);
    }
    setCurrentSlide(0); // Slider'ı başa sar
  }, [activeCategory]);

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

  const renderSectionHeader = (title: string, showViewAll: boolean = true) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <BantIcon />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {showViewAll && (
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Tümü</Text>
          <View style={styles.arrowContainer}>
            <YonIcon color="#191D20" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPastNewsCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.pastNewsCard}>
      <View style={styles.yellowStripe} />
      <View style={styles.pastNewsImage}>
        <Image 
          source={{ uri: item.image }}
          style={styles.pastNewsImageStyle}
          onError={() => {
            console.log('Past news image failed to load:', item.image);
          }}
        />
      </View>
      <View style={styles.pastNewsContentArea}>
        <View style={styles.pastNewsMeta}>
          <View style={styles.categoryDot} />
          <Text style={styles.pastNewsCategory}>{item.category}</Text>
        </View>
        <Text style={styles.pastNewsTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.pastNewsTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCompanyCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.companyCard}>
      <View style={styles.companyYellowStripe} />
      <View style={styles.companyLogo}>
        {item.logo === "baykar" ? (
          <BaykarIcon />
        ) : item.logo === "hepsiburada" ? (
          <HepsiburadaIcon />
        ) : (
          <Text style={styles.companyLogoText}>{item.logoText}</Text>
        )}
      </View>
      <Text style={styles.companyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.productCard}>
      <View style={styles.productYellowStripe} />
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image }}
          style={styles.productImage}
          onError={() => {
            console.log('Product image failed to load:', item.image);
          }}
        />
      </View>
      <View style={styles.productContent}>
        <View style={styles.productBadge}>
          <Text style={styles.productBadgeText}>{item.category}</Text>
        </View>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderJobCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.jobCard}>
      <View style={styles.jobYellowStripe} />
      <View style={styles.jobLogoContainer}>
        {item.logo === "apple" ? (
          <AppleIcon color="#191D20" />
        ) : item.logo === "microsoft" ? (
          <MicrosoftIcon />
        ) : (
          <Text style={styles.jobLogo}>{item.logo}</Text>
        )}
      </View>
      <View style={styles.jobContent}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobCompany}>{item.company}</Text>
        <View style={styles.jobDetails}>
          <View style={styles.jobLocation}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.jobDate}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.eventCard}>
      <View style={styles.eventYellowStripe} />
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventYear}>{item.year}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetail}>
          <Text style={styles.organizerIcon}>🎤</Text>
          <Text style={styles.eventOrganizer}>{item.organizer}</Text>
        </View>
        <View style={styles.eventDetail}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNewsSlider = () => {
    if (filteredNews.length === 0) {
      return (
        <View style={styles.emptyNewsContainer}>
          <Text style={styles.emptyNewsText}>Bu kategoride henüz haber bulunmuyor.</Text>
        </View>
      );
    }

    return (
      <View style={styles.newsSliderContainer}>
        <FlatList
          data={filteredNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={slideWidth + 16}
          decelerationRate={0.8}
          contentContainerStyle={{ paddingLeft: slideSpacing, paddingRight: slideSpacing }}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (slideWidth + 16));
            setCurrentSlide(index);
          }}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.newsSlide, { width: slideWidth }]}>
              <View style={styles.newsImageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.newsSlideImage}
                  onError={() => {
                    console.log('News image failed to load:', item.image);
                  }}
                />
                
                {/* Gradient overlay */}
                <View style={styles.newsGradientOverlay} />
                
                {/* Category badge */}
                <View style={styles.newsCategoryBadge}>
                  <Text style={styles.newsCategoryBadgeText}>{item.category}</Text>
                </View>
                
                {/* Content overlay */}
                <View style={styles.newsContentOverlay}>
                  <Text style={styles.newsSlideTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.newsSlideTime}>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        
        {/* Dots indicator */}
        {filteredNews.length > 1 && (
          <View style={styles.newsDotsContainer}>
            {filteredNews.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.newsDot,
                  index === currentSlide && styles.activeNewsDot
                ]}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

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

            {/* News Slider */}
            {renderNewsSlider()}

            {/* Past News Section */}
            {renderSectionHeader('Geçmiş Haberler')}
            
            {/* Past News Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.pastNewsScroll}
              contentContainerStyle={styles.pastNewsScrollContent}
            >
              {pastNews.map(renderPastNewsCard)}
            </ScrollView>

            {/* Companies Section */}
            {renderSectionHeader('Firmalar')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.companiesScroll}
              contentContainerStyle={styles.companiesScrollContent}
            >
              {companies.map(renderCompanyCard)}
            </ScrollView>

            {/* Products Section */}
            {renderSectionHeader('Ürünler')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.productsScroll}
              contentContainerStyle={styles.productsScrollContent}
            >
              {products.map(renderProductCard)}
            </ScrollView>

            {/* Job Postings Section */}
            {renderSectionHeader('İş İlanları')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.jobsScroll}
              contentContainerStyle={styles.jobsScrollContent}
            >
              {jobPostings.map(renderJobCard)}
            </ScrollView>

            {/* Upcoming Events Section */}
            {renderSectionHeader('Yaklaşan Etkinlikler')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.eventsScroll}
              contentContainerStyle={styles.eventsScrollContent}
            >
              {upcomingEvents.map(renderEventCard)}
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
  // News Slider Styles
  newsSliderContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  emptyNewsContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  emptyNewsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  newsSlide: {
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  newsImageContainer: {
    width: '100%',
    height: 185,
    position: 'relative',
  },
  newsSlideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  newsCategoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  newsCategoryBadgeText: {
    color: '#191D20',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newsContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  },
  newsSlideTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 8,
  },
  newsSlideTime: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  newsDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  newsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeNewsDot: {
    backgroundColor: '#FFBB01',
    width: 24,
  },
  // Section Header Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 22,
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bantContainer: {
    width: 20,
    height: 10,
    opacity: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAllText: {
    color: '#FFBB01',
    fontSize: 14,
    fontWeight: '500',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFBB01',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Past News Styles
  pastNewsScroll: {
    marginBottom: 24,
  },
  pastNewsScrollContent: {
    paddingHorizontal: 22,
    gap: 16,
  },
  pastNewsCard: {
    width: 370,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    position: 'relative',
  },
  yellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  pastNewsImage: {
    width: 88,
    height: 88,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
  },
  pastNewsImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pastNewsContentArea: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  pastNewsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFBB01',
  },
  pastNewsCategory: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  pastNewsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 18,
    marginBottom: 4,
    flex: 1,
  },
  pastNewsTime: {
    fontSize: 12,
    color: '#999999',
  },
  // Companies Styles
  companiesScroll: {
    marginBottom: 24,
  },
  companiesScrollContent: {
    paddingLeft: 124,
    paddingRight: 22,
    gap: 16,
  },
  companyCard: {
    width: 100,
    height: 70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  companyYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  companyLogo: {
    width: 60,
    height: 35,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  companyLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
  },
  companyName: {
    fontSize: 10,
    color: '#191D20',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 12,
  },
  // Products Styles
  productsScroll: {
    marginBottom: 24,
  },
  productsScrollContent: {
    paddingLeft: 5,
    paddingRight: 22,
    gap: 16,
  },
  productCard: {
    width: 220,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    flexDirection: 'row',
    opacity: 1,
  },
  productYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 1,
  },
  productImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productBadge: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  productBadgeText: {
    fontSize: 10,
    color: '#191D20',
    fontWeight: 'bold',
  },
  productContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
    flex: 1,
  },
  productDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  // Job Postings Styles
  jobsScroll: {
    marginBottom: 24,
  },
  jobsScrollContent: {
    paddingHorizontal: 22,
    gap: 16,
  },
  jobCard: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  jobYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  jobLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobLogo: {
    fontSize: 24,
  },
  jobContent: {
    flex: 1,
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
    marginBottom: 12,
  },
  jobDetails: {
    gap: 8,
  },
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jobDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
  dateIcon: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
  },
  // Events Styles
  eventsScroll: {
    marginBottom: 24,
  },
  eventsScrollContent: {
    paddingHorizontal: 22,
    gap: 16,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    flexDirection: 'row',
  },
  eventYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  eventDateContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'center',
  },
  eventYear: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
    lineHeight: 18,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  organizerIcon: {
    fontSize: 12,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },

});

export default MainScreen;
