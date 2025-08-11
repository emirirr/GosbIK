import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Share,
  Alert,
  Dimensions,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import Svg, { Path, SvgUri } from 'react-native-svg';
import { Asset } from 'expo-asset';
// NewsStats kaldırıldı

interface NewsDetailScreenProps {
  onBack?: () => void;
  newsItem?: any;
}

const { width } = Dimensions.get('window');

const NewsDetailScreen: React.FC<NewsDetailScreenProps> = ({ onBack, newsItem }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
  const [commentCount, setCommentCount] = useState(89);

  // Örnek haber verisi (eğer newsItem prop'u gelmezse)
  const defaultNews = {
    id: 1,
    title: 'Yapay Zeka ile Üretimde Yeni Dönem Başladı',
    category: 'Teknoloji',
    time: '4 saat önce',
    author: 'Ahmet Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    publishDate: '26.09.2024',
    editor: 'Yasin AK',
    source: 'Haber Merkezi',
    content: `Türkiye'de yapay zeka teknolojilerinin üretim süreçlerine entegrasyonu ile yeni bir dönem başladı. 
    
    Organize Sanayi Bölgelerinde faaliyet gösteren firmalar, yapay zeka destekli üretim sistemlerini kullanmaya başladı. Bu gelişme, üretim verimliliğini %40'a kadar artırırken, maliyetleri de önemli ölçüde düşürüyor.
    
    Uzmanlar, yapay zeka teknolojilerinin önümüzdeki 5 yıl içinde Türk sanayisinde daha da yaygınlaşacağını öngörüyor. Özellikle otomotiv, tekstil ve gıda sektörlerinde bu teknolojilerin kullanımının hızla artacağı belirtiliyor.
    
    "Yapay zeka, üretim süreçlerimizi tamamen değiştiriyor. Daha akıllı, daha verimli ve daha sürdürülebilir bir üretim modeli oluşturuyoruz," diyor Teknoloji Uzmanı Dr. Mehmet Kaya.
    
    Bu gelişmeler, Türkiye'nin dijital dönüşüm sürecinde önemli bir adım olarak değerlendiriliyor.`,
    tags: ['Yapay Zeka', 'Üretim', 'Teknoloji', 'OSB'],
    relatedNews: [
      {
        id: 2,
        title: 'Sanayi 4.0 Dönüşümü Hızlanıyor',
        category: 'Sanayi',
        time: '2 gün önce',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=120&fit=crop'
      },
      {
        id: 3,
        title: 'Elektrikli Araç Üretiminde Rekor',
        category: 'Otomotiv',
        time: '3 gün önce',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=120&fit=crop'
      }
    ]
  };

  // newsItem kısmi gelebileceği için güvenli birleştirme yap
  const news: any = { ...defaultNews, ...(newsItem || {}) };

  // Üstte gösterilecek kısa özet (ilk paragraf)
  const summaryText = (news.summary && typeof news.summary === 'string')
    ? news.summary
    : ((news.content || '')
        .split('\n')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)[0] || '');

  const handleShare = async () => {
    try {
      const preview = (news.content || '').substring(0, 100);
      await Share.share({
        message: `${news.title}\n\n${preview}${preview ? '...' : ''}\n\nGosbİK Mobil Uygulamasından paylaşıldı.`,
        title: news.title || 'Haber',
      });
    } catch (error) {
      Alert.alert('Hata', 'Paylaşım sırasında bir hata oluştu.');
    }
  };
  const [shareVisible, setShareVisible] = useState(false);
  const openShareSheet = () => setShareVisible(true);
  const closeShareSheet = () => setShareVisible(false);

  const encodedShareText = encodeURIComponent(`${news.title} - ${news.source || ''}`);
  const tryOpen = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      return Linking.openURL(url);
    }
    return handleShare();
  };
  const shareToWhatsApp = () => tryOpen(`whatsapp://send?text=${encodedShareText}`);
  const shareToFacebook = () => handleShare();
  const shareToInstagram = () => handleShare();
  const shareToLinkedIn = () => handleShare();
  const shareToYouTube = () => handleShare();
  const shareToX = () => handleShare();
  const shareByMail = () => Linking.openURL(`mailto:?subject=${encodeURIComponent(news.title)}&body=${encodeURIComponent(news.content || '')}`).catch(() => handleShare());
  const copyLink = async () => {
    try {
      const Clipboard = await import('expo-clipboard');
      await Clipboard.setStringAsync(news.title || 'Haber');
      Alert.alert('Kopyalandı', 'Bağlantı panoya kopyalandı.');
    } catch (e) {
      Alert.alert('Bilgi', 'Kopyalama için expo-clipboard gerekli, paylaşıma yönlendiriliyor.');
      handleShare();
    }
  };

  const shareOptions = [
    { key: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: require('../assets/images/icons/GosbİK Mobil/whatsapp.svg'), onPress: shareToWhatsApp },
    { key: 'instagram', label: 'Instagram', color: '#E1306C', icon: require('../assets/images/icons/GosbİK Mobil/instagram.svg'), onPress: shareToInstagram },
    { key: 'linkedin', label: 'LinkedIn', color: '#0A66C2', icon: require('../assets/images/icons/GosbİK Mobil/linkedin.svg'), onPress: shareToLinkedIn },
    { key: 'facebook', label: 'Facebook', color: '#1877F2', icon: require('../assets/images/icons/GosbİK Mobil/facebook.svg'), onPress: shareToFacebook },
    { key: 'youtube', label: 'YouTube', color: '#FF0000', icon: require('../assets/images/icons/GosbİK Mobil/youtube.svg'), onPress: shareToYouTube },
    { key: 'x', label: 'X', color: '#000000', icon: require('../assets/images/icons/GosbİK Mobil/x.svg'), onPress: shareToX },
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? 'Yer İmi Kaldırıldı' : 'Yer İmi Eklendi',
      isBookmarked ? 'Haber yer imlerinizden kaldırıldı.' : 'Haber yer imlerinize eklendi.'
    );
  };

  // Yorumlar kaldırıldı – sadece sayısal gösterim korunuyor

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // İçeriği başlıklar ve paragraflara böl
  const splitContentIntoBlocks = (raw: string): Array<{ type: 'paragraph' | 'heading'; text: string }> => {
    if (!raw || typeof raw !== 'string') return [];
    const chunks = raw
      .split(/\n\n+/)
      .map((c) => c.replace(/\s+/g, ' ').trim())
      .filter((c) => c.length > 0);

    const isLikelyHeading = (t: string) => {
      const withoutPunct = t.replace(/[^\p{L}\p{N}\s']/gu, '');
      const upper = withoutPunct.toUpperCase();
      const ratioUpper = upper.length > 0 ? upper.split('').filter((ch, i) => upper[i] === t[i]?.toUpperCase()).length / upper.length : 0;
      return (t.length <= 80 && ratioUpper > 0.9) || (/^[A-ZÇĞİÖŞÜ0-9\s'’]+$/.test(upper) && t.length <= 80);
    };

    return chunks.map((c) => (isLikelyHeading(c) ? { type: 'heading', text: c } : { type: 'paragraph', text: c }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M15 18L9 12L15 6" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Haber</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M5 21.3508C4.71667 21.3508 4.47917 21.2473 4.2875 21.0404C4.09583 20.8335 4 20.5772 4 20.2713C4 19.9655 4.09583 19.7091 4.2875 19.5022C4.47917 19.2953 4.71667 19.1919 5 19.1919H6V11.6357C6 10.1424 6.41667 8.81558 7.25 7.65516C8.08333 6.49474 9.16667 5.73463 10.5 5.37481V4.61919C10.5 4.16941 10.6458 3.7871 10.9375 3.47226C11.2292 3.15742 11.5833 3 12 3C12.4167 3 12.7708 3.15742 13.0625 3.47226C13.3542 3.7871 13.5 4.16941 13.5 4.61919V5.37481C14.8333 5.73463 15.9167 6.49474 16.75 7.65516C17.5833 8.81558 18 10.1424 18 11.6357V19.1919H19C19.2833 19.1919 19.5208 19.2953 19.7125 19.5022C19.9042 19.7091 20 19.9655 20 20.2713C20 20.5772 19.9042 20.8335 19.7125 21.0404C19.5208 21.2473 19.2833 21.3508 19 21.3508H5ZM12 24.5891C11.45 24.5891 10.9792 24.3778 10.5875 23.955C10.1958 23.5322 10 23.0239 10 22.4302H14C14 23.0239 13.8042 23.5322 13.4125 23.955C13.0208 24.3778 12.55 24.5891 12 24.5891ZM8 19.1919H16V11.6357C16 10.4483 15.6083 9.43177 14.825 8.58619C14.0417 7.74062 13.1 7.31783 12 7.31783C10.9 7.31783 9.95833 7.74062 9.175 8.58619C8.39167 9.43177 8 10.4483 8 11.6357V19.1919Z" fill="#191D20"/>
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top textual section (title, summary, meta) */}
        <View style={styles.topSection}>
          <Text style={styles.title}>{news.title}</Text>
          {summaryText ? (
            <Text style={styles.summaryText}>{summaryText}</Text>
          ) : null}

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoLabel}>Eklenme Tarihi:</Text>
              <Text style={styles.infoValue}>{news.publishDate || ''}</Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoLabel}>Editör:</Text>
              <Text style={styles.infoValue}>{news.editor || ''}</Text>
            </View>
            <View style={styles.categoryPill}>
              <View style={styles.categoryDotSmall} />
              <Text style={styles.categoryPillText}>{news.category}</Text>
            </View>
          </View>
        </View>

        {/* News Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: news.image }}
            style={styles.newsImage}
            resizeMode="cover"
          />
        </View>

        {/* News Content (rich blocks) */}
        <View style={styles.newsContent}>
          {splitContentIntoBlocks(news.content || defaultNews.content).map((block, idx) => (
            block.type === 'heading' ? (
              <Text key={`h-${idx}`} style={styles.contentHeading}>
                {block.text}
              </Text>
            ) : (
              <Text key={`p-${idx}`} style={styles.contentText}>
                {block.text}
              </Text>
            )
          ))}

          {/* News Stats removed */}

          {/* Bottom Meta Section */}
          <View style={styles.bottomMetaSection}>
            <View style={styles.bottomMetaHeader}>
              <View style={styles.sourceRow}>
                <Text style={styles.metaLead}>Kaynak: </Text>
                <Text style={styles.metaValue}>{news.source || ''}</Text>
              </View>
              <TouchableOpacity onPress={openShareSheet} style={styles.shareCircleButton}>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#191D20"/>
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.relatedTopicsRow}>
              <Text style={styles.metaLead}>İlgili Konular: </Text>
              <View style={styles.tagsInline}>
                {(Array.isArray(news.tags) ? news.tags : defaultNews.tags).map((tag: string, index: number) => (
                  <Text key={index} style={styles.inlineTagText}>#{tag}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Social Actions removed */}

          {/* Related News */}
          {Array.isArray(news.relatedNews) && news.relatedNews.length > 0 && (
            <View style={styles.relatedNewsContainer}>
              <Text style={styles.relatedNewsTitle}>İlgili Haberler</Text>
              {news.relatedNews.map((relatedNews: any) => (
                <TouchableOpacity key={relatedNews.id} style={styles.relatedNewsCard}>
                  <View style={styles.relatedYellowStripe} />
                  <Image 
                    source={{ uri: relatedNews.image || defaultNews.image }}
                    style={styles.relatedNewsImage}
                  />
                  <View style={styles.relatedNewsContent}>
                    <Text style={styles.relatedNewsCardTitle} numberOfLines={2}>
                      {relatedNews.title || 'Haber'}
                    </Text>
                    <View style={styles.relatedNewsMeta}>
                      <Text style={styles.relatedNewsCategory}>{relatedNews.category || ''}</Text>
                      <Text style={styles.relatedNewsTime}>{relatedNews.time || ''}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Share Bottom Sheet */}
      <Modal transparent visible={shareVisible} animationType="slide" onRequestClose={closeShareSheet}>
        <Pressable style={styles.shareBackdrop} onPress={closeShareSheet} />
        <View style={styles.shareSheet}>
          <View style={styles.shareHeader}>
            <Text style={styles.shareTitle}>Haberi Paylaş</Text>
          </View>
          <View style={styles.shareList}>
            {shareOptions.map((opt) => (
              <TouchableOpacity key={opt.key} style={styles.shareRow} onPress={opt.onPress}>
                <View style={[styles.shareIconBox, { backgroundColor: opt.color + '1A' }]}> 
                  <SvgUri width={20} height={20} uri={Asset.fromModule(opt.icon).uri} />
                </View>
                <Text style={styles.shareText}>{opt.label}</Text>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={styles.shareChevron}><Path d="M9 18L15 12L9 6" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></Svg>
              </TouchableOpacity>
            ))}
            <View style={styles.shareDivider} />
            <TouchableOpacity style={styles.shareRow} onPress={shareByMail}>
              <View style={[styles.shareIconBox, { backgroundColor: '#FFE082' }]}> 
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#191D20"/></Svg>
              </View>
              <Text style={styles.shareText}>Mail</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={styles.shareChevron}><Path d="M9 18L15 12L9 6" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareRow} onPress={copyLink}>
              <View style={[styles.shareIconBox, { backgroundColor: '#E3F2FD' }]}> 
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13Z" fill="#191D20"/><Path d="M4 8C4 5.79086 5.79086 4 8 4H14C16.2091 4 18 5.79086 18 8V16C18 18.2091 16.2091 20 14 20H8C5.79086 20 4 18.2091 4 16V8Z" stroke="#191D20" strokeWidth="2"/><Path d="M16 8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H12C10.8954 20 10 19.1046 10 18V16" stroke="#191D20" strokeWidth="2"/></Svg>
              </View>
              <Text style={styles.shareText}>Bağlantıyı Kopyala</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={styles.shareChevron}><Path d="M9 18L15 12L9 6" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareCancel} onPress={closeShareSheet}>
              <Text style={styles.shareCancelText}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  topSection: {
    padding: 20,
    paddingBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  infoCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#888888',
    marginRight: 4,
  },
  infoValue: {
    fontSize: 11,
    color: '#191D20',
    fontWeight: '500',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  categoryDotSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFBB01',
    marginRight: 6,
  },
  categoryPillText: {
    fontSize: 12,
    color: '#666666',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  newsImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
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
  newsContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 32,
    marginBottom: 16,
  },
  metaInfo: {
    marginBottom: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
  contentText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
  },
  contentHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191D20',
    marginTop: 6,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  tagsContainer: {
    marginBottom: 24,
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
  bottomMetaSection: {
    marginTop: -4,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  bottomMetaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  metaLead: {
    fontSize: 12,
    color: '#191D20',
    fontWeight: '700',
  },
  metaValue: {
    fontSize: 12,
    color: '#191D20',
  },
  shareCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  shareSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 24,
  },
  shareHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191D20',
  },
  shareList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  shareIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shareText: {
    fontSize: 14,
    color: '#191D20',
  },
  shareChevron: {
    marginLeft: 'auto',
  },
  shareDivider: {
    height: 1,
    backgroundColor: '#EDEDED',
    marginVertical: 8,
  },
  shareCancel: {
    marginTop: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  shareCancelText: {
    fontSize: 14,
    color: '#191D20',
    fontWeight: '600',
  },
  relatedTopicsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagsInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inlineTagText: {
    fontSize: 12,
    color: '#191D20',
    marginRight: 8,
  },
  
  relatedNewsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 24,
  },
  relatedNewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 16,
  },
  relatedNewsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: 370,
    height: 120,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  relatedYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  relatedNewsImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
    marginRight: 12,
  },
  relatedNewsContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  relatedNewsCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
    lineHeight: 18,
  },
  relatedNewsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relatedNewsCategory: {
    fontSize: 12,
    color: '#FFBB01',
    fontWeight: '500',
  },
  relatedNewsTime: {
    fontSize: 12,
    color: '#666666',
  },
});

export default NewsDetailScreen;
