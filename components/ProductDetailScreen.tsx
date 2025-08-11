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
  Dimensions,
  FlatList,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

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

const ShareIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <Path 
      d="M15 6.66667C16.3807 6.66667 17.5 5.54738 17.5 4.16667C17.5 2.78595 16.3807 1.66667 15 1.66667C13.6193 1.66667 12.5 2.78595 12.5 4.16667C12.5 4.60769 12.5953 5.03043 12.7689 5.41667L8.33333 7.91667C7.91667 7.33333 7.25 6.91667 6.5 6.91667C5.11929 6.91667 4 8.03595 4 9.41667C4 10.7974 5.11929 11.9167 6.5 11.9167C7.25 11.9167 7.91667 11.5 8.33333 10.9167L12.7689 13.4167C12.5953 13.8029 12.5 14.2256 12.5 14.6667C12.5 16.0474 13.6193 17.1667 15 17.1667C16.3807 17.1667 17.5 16.0474 17.5 14.6667C17.5 13.2859 16.3807 12.1667 15 12.1667C14.25 12.1667 13.5833 12.5833 13.1667 13.1667L8.73111 10.6667C8.90467 10.2804 9 9.85769 9 9.41667C9 8.97564 8.90467 8.5529 8.73111 8.16667L13.1667 5.66667C13.5833 6.25 14.25 6.66667 15 6.66667Z" 
      stroke="#191D20" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const BookmarkIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <Path 
      d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" 
      stroke="#191D20" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const StarIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path 
      d="M8 1.33333L10.06 5.50667L14.6667 6.17333L11.3333 9.42667L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42667L1.33333 6.17333L5.94 5.50667L8 1.33333Z" 
      fill="#FFBB01"
    />
  </Svg>
);

const ProductDetailScreen = ({ 
  onBack, 
  product 
}: { 
  onBack: () => void;
  product: any;
}) => {


  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <YonIcon color="#191D20" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Ürün Detayı</Text>
      <TouchableOpacity style={styles.notificationButton}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );

  const renderProductImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    ];

    return (
      <View style={styles.imageContainer}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: item }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <View style={styles.actionIcons}>
                  <TouchableOpacity style={styles.actionIconButton}>
                    <ShareIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionIconButton}>
                    <BookmarkIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot, 
                index === 3 && styles.paginationActive
              ]} 
            />
          ))}
        </View>
      </View>
    );
  };

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ürün Özellikleri</Text>
        <View style={styles.categoryIndicator}>
          <View style={styles.categoryDot} />
          <Text style={styles.categoryText}>Endüstriyel Robot</Text>
        </View>
      </View>
      
      <View style={styles.productDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ürün Adı:</Text>
          <Text style={styles.detailValue}>Lorem ipsum</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Firma Adı:</Text>
          <Text style={styles.detailValue}>Lorem ipsum</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ürün Sektörü:</Text>
          <Text style={styles.detailValue}>Lorem ipsum</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ürün Hakkında:</Text>
          <Text style={styles.detailValue}>Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis. Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.</Text>
        </View>
      </View>
      
      <View style={styles.catalogSection}>
        <Text style={styles.catalogText}>Ürün Kataloğu: <Text style={styles.downloadLink}>Kataloğu indir.</Text></Text>
      </View>
      
      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>Ürün Değerlendir:</Text>
        <View style={styles.stars}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </View>
      </View>
    </View>
  );

  const renderSpecifications = () => (
    <View style={styles.specificationsContainer}>
      <Text style={styles.sectionTitle}>Teknik Özellikler</Text>
      <View style={styles.specificationsList}>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Model:</Text>
          <Text style={styles.specificationValue}>IR-6X-2024</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Eksen Sayısı:</Text>
          <Text style={styles.specificationValue}>6 Eksen</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Taşıma Kapasitesi:</Text>
          <Text style={styles.specificationValue}>25 kg</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Çalışma Alanı:</Text>
          <Text style={styles.specificationValue}>1.8 m</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Hassasiyet:</Text>
          <Text style={styles.specificationValue}>±0.02 mm</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Güç Tüketimi:</Text>
          <Text style={styles.specificationValue}>3.2 kW</Text>
        </View>
        <View style={styles.specificationItem}>
          <Text style={styles.specificationLabel}>Garanti:</Text>
          <Text style={styles.specificationValue}>3 Yıl</Text>
        </View>
      </View>
    </View>
  );

  const renderContactButton = () => (
    <TouchableOpacity style={styles.contactButton}>
      <Text style={styles.contactButtonText}>İletişime Geç</Text>
    </TouchableOpacity>
  );

  const renderRecommendedProducts = () => (
    <View style={styles.recommendedContainer}>
      <View style={styles.recommendedHeader}>
        <Text style={styles.recommendedTitle}>Firmanın Önerilen Ürünleri</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Tümü</Text>
          <View style={styles.arrowButton}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path d="M9 18L15 12L9 6" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.recommendedProductCard}>
        <View style={styles.cardLeftBorder} />
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop" }}
          style={styles.recommendedProductImage}
          resizeMode="cover"
        />
        <View style={styles.recommendedProductContent}>
          <View style={styles.recommendedCategoryBadge}>
            <Text style={styles.recommendedCategoryText}>Endüstriyel Robot</Text>
          </View>
          <Text style={styles.recommendedProductTitle}>Robotik Kol</Text>
          <Text style={styles.recommendedProductDescription}>
            Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.
          </Text>
          <TouchableOpacity style={styles.recommendedBookmarkButton}>
            <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <Path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProductImage()}
        {renderProductInfo()}
        {renderRecommendedProducts()}
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
  content: {
    flex: 1,
  },
  imageContainer: {
    width: 370,
    height: 285,
    marginTop: 20,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: 370,
    height: 285,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFBB01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  actionIcons: {
    position: 'absolute',
    top: 20,
    right: 20,
    gap: 8,
  },
  actionIconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFBB01',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  paginationActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFBB01',
  },
  categoryBadgeText: {
    color: '#191D20',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFBB01',
  },
  categoryText: {
    fontSize: 14,
    color: '#191D20',
  },
  productDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  catalogSection: {
    marginBottom: 20,
  },
  catalogText: {
    fontSize: 14,
    color: '#191D20',
  },
  downloadLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#191D20',
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 20,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191D20',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  inStock: {
    color: '#4CAF50',
  },
  outOfStock: {
    color: '#F44336',
  },
  specificationsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 16,
  },
  specificationsList: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  specificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  specificationLabel: {
    fontSize: 14,
    color: '#666666',
  },
  specificationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  contactButton: {
    backgroundColor: '#FFBB01',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  recommendedContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendedTitle: {
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
    fontSize: 14,
    color: '#191D20',
  },
  arrowButton: {
    width: 24,
    height: 24,
    backgroundColor: '#FFBB01',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedProductCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  cardLeftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
  },
  recommendedProductImage: {
    width: 80,
    height: 80,
    margin: 16,
    borderRadius: 8,
  },
  recommendedProductContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
  },
  recommendedCategoryBadge: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  recommendedCategoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#191D20',
  },
  recommendedProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
  },
  recommendedProductDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  recommendedBookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
