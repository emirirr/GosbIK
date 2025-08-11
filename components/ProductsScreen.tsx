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
import { LinearGradient } from 'expo-linear-gradient';

import { NotificationIcon, UserIcon } from './icons/SvgIcons';
import Svg, { Path } from 'react-native-svg';
import ProductDetailScreen from './ProductDetailScreen';
import CategorySelector from './CategorySelector';

const YonIcon: React.FC<{ color?: string }> = ({ color = "#191D20" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" 
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

const SearchIcon: React.FC = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path 
      d="M19 19L13 13M15 8A7 7 0 1 1 1 8A7 7 0 0 1 15 8Z" 
      stroke="#666666" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const FilterIcon: React.FC = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path 
      d="M3 4H17L13 9V16L7 16V9L3 4Z" 
      stroke="#666666" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const BookmarkIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path 
      d="M13.4251 16C13.1784 15.9993 12.9344 15.9498 12.707 15.8542C12.4797 15.7587 12.2735 15.619 12.1004 15.4433L8.00041 11.3673L3.90041 15.446C3.63709 15.7132 3.2994 15.8948 2.93135 15.9672C2.5633 16.0396 2.18197 15.9995 1.83707 15.852C1.48875 15.7119 1.19077 15.47 0.982047 15.1579C0.773322 14.8459 0.663553 14.4781 0.667074 14.1027V3.33333C0.667074 2.44928 1.01826 1.60143 1.64339 0.976311C2.26851 0.351189 3.11635 0 4.00041 0L12.0004 0C12.4381 0 12.8716 0.0862192 13.276 0.253735C13.6804 0.421251 14.0479 0.666782 14.3574 0.976311C14.667 1.28584 14.9125 1.6533 15.08 2.05772C15.2475 2.46214 15.3337 2.89559 15.3337 3.33333V14.1027C15.3375 14.4778 15.2281 14.8453 15.0199 15.1574C14.8116 15.4694 14.5142 15.7115 14.1664 15.852C13.9316 15.9502 13.6796 16.0005 13.4251 16ZM4.00041 1.33333C3.46997 1.33333 2.96127 1.54405 2.58619 1.91912C2.21112 2.29419 2.00041 2.8029 2.00041 3.33333V14.1027C2.00017 14.2138 2.03285 14.3224 2.09434 14.4149C2.15583 14.5075 2.24336 14.5797 2.34587 14.6225C2.44838 14.6653 2.56128 14.6768 2.6703 14.6554C2.77932 14.6341 2.87958 14.5809 2.95841 14.5027L7.53374 9.95533C7.65865 9.83117 7.82762 9.76147 8.00374 9.76147C8.17986 9.76147 8.34883 9.83117 8.47374 9.95533L13.0437 14.5013C13.1226 14.5796 13.2228 14.6328 13.3318 14.6541C13.4409 14.6754 13.5538 14.664 13.6563 14.6212C13.7588 14.5784 13.8463 14.5061 13.9078 14.4136C13.9693 14.3211 14.002 14.2124 14.0017 14.1013V3.33333C14.0017 2.8029 13.791 2.29419 13.416 1.91912C13.0409 1.54405 12.5322 1.33333 12.0017 1.33333H4.00041Z" 
      fill="#191D20"
    />
  </Svg>
);

const ProductsScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Mock ürün verileri
  const allProducts = [
    {
      id: 1,
      title: "Robotik Kol",
      category: "Endüstriyel Robot",
      description: "Yüksek hassasiyetli endüstriyel robotik kol sistemi",
      price: "₺125.000",
      company: "Baykar Teknoloji",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 24,
      inStock: true
    },
    {
      id: 2,
      title: "Plastik Boru Sistemi",
      category: "Plastik",
      description: "Endüstriyel plastik boru üretim sistemi",
      price: "₺85.000",
      company: "Hepsiburada",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 18,
      inStock: true
    },
    {
      id: 3,
      title: "CNC Makine",
      category: "Makine",
      description: "5 eksenli CNC işleme merkezi",
      price: "₺450.000",
      company: "Baykar Savunma",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 32,
      inStock: false
    },
    {
      id: 4,
      title: "Elektrikli Motor",
      category: "Elektrik",
      description: "Yüksek verimli elektrik motoru",
      price: "₺65.000",
      company: "Hepsiburada Market",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 15,
      inStock: true
    },
    {
      id: 5,
      title: "Sensör Sistemi",
      category: "Teknoloji",
      description: "IoT sensör ağı sistemi",
      price: "₺35.000",
      company: "Baykar Teknoloji",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 28,
      inStock: true
    },
    {
      id: 6,
      title: "Hidrolik Pompa",
      category: "Hidrolik",
      description: "Endüstriyel hidrolik pompa sistemi",
      price: "₺95.000",
      company: "Baykar Savunma",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 12,
      inStock: true
    }
  ];



  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = activeCategory === 'Tümü' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <YonIcon color="#191D20" />
      </TouchableOpacity>
      <Text style={styles.logoText}>Ürünler</Text>
      <TouchableOpacity style={styles.notificationButton}>
        <NotificationIcon width={24} height={24} color="#191D20" />
      </TouchableOpacity>
    </View>
  );





  const renderProductCard = (item: any) => (
    <TouchableOpacity 
      style={styles.productCardInner}
      onPress={() => {
        setSelectedProduct(item);
        setShowProductDetail(true);
      }}
    >
      <View style={styles.productYellowStripe} />
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image }}
          style={styles.productImage}
        />
        {!item.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Stokta Yok</Text>
          </View>
        )}
      </View>
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>{item.category}</Text>
          </View>
          <TouchableOpacity style={styles.bookmarkButton}>
            <BookmarkIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProductList = () => (
    <View style={styles.productsContainer}>
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ürün bulunamadı</Text>
          <Text style={styles.emptySubtext}>Arama kriterlerinizi değiştirmeyi deneyin</Text>
        </View>
      ) : (
        <View style={styles.productsGrid}>
          {filteredProducts.map((item) => (
            <View key={item.id} style={styles.productCard}>
              {renderProductCard(item)}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderContent = () => {
    if (showProductDetail) {
      return <ProductDetailScreen 
        onBack={() => setShowProductDetail(false)} 
        product={selectedProduct}
      />;
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        {renderHeader()}
        
        {/* Category Navigation */}
        <CategorySelector 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products */}
        {renderProductList()}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderContent()}

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },


  productsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  productsGrid: {
    paddingBottom: 20,
  },
  productCard: {
    width: 365,
    height: 120,
    marginBottom: 16,
  },
  productCardInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  productYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    zIndex: 1,
  },
  productImageContainer: {
    width: 78,
    height: 78,
    position: 'relative',
    marginLeft: 21,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productBadge: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bookmarkButton: {
    padding: 4,
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
    marginBottom: 4,
    lineHeight: 18,
  },
  productDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
    marginBottom: 8,
  },
  productCompany: {
    marginBottom: 8,
  },
  productCompanyText: {
    fontSize: 11,
    color: '#191D20',
    fontWeight: '500',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFBB01',
    fontWeight: 'bold',
  },
  reviewsText: {
    fontSize: 10,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
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
  bantContainer: {
    width: 20,
    height: 10,
    opacity: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  pageTitleContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ProductsScreen;
