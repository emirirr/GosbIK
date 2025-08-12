import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar, Linking, ScrollView, Modal } from 'react-native';
import { PhoneIcon, MobileIcon, GlobeIcon, MailIcon, MapPinIcon, BuildingIcon, InstagramIcon, LinkedInIcon, YouTubeIcon, FacebookIcon, WhatsAppIcon, XIcon } from './icons/SvgIcons';
import Svg, { Path } from 'react-native-svg';

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
  </Svg>
);

const NotificationIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="#191D20" />
  </Svg>
);

const MoreIcon: React.FC = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M12 5C12.8284 5 13.5 4.32843 13.5 3.5C13.5 2.67157 12.8284 2 12 2C11.1716 2 10.5 2.67157 10.5 3.5C10.5 4.32843 11.1716 5 12 5Z" fill="#191D20"/>
    <Path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="#191D20"/>
    <Path d="M12 23C12.8284 23 13.5 22.3284 13.5 21.5C13.5 20.6716 12.8284 20 12 20C11.1716 20 10.5 20.6716 10.5 21.5C10.5 22.3284 11.1716 23 12 23Z" fill="#191D20"/>
  </Svg>
);

const PlayIcon: React.FC = () => (
  <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <Path d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z" fill="rgba(0,0,0,0.55)"/>
    <Path d="M22 18V38L39 28L22 18Z" fill="#FFFFFF"/>
  </Svg>
);

const BookmarkIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M17 3H7C5.895 3 5 3.895 5 5V21L12 17L19 21V5C19 3.895 18.105 3 17 3Z" stroke={color} strokeWidth="2" fill="none"/>
  </Svg>
);

const SocialIconsRow: React.FC = () => (
  <View style={styles.socialIconsRow}>
    <InstagramIcon />
    <LinkedInIcon />
    <YouTubeIcon />
    <FacebookIcon />
    <WhatsAppIcon />
    <XIcon />
  </View>
);

type Company = {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  followers?: number;
  reviews?: number;
  sector?: string;
  employeeCount?: string;
  foundedYear?: string | number;
  websiteUrl?: string;
  address?: string;
};

const CompanyDetailScreen = ({ onBack, company }: { onBack: () => void; company: Company }) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const followers = company.followers ?? company.reviews ?? 7360;
  const [activeTab, setActiveTab] = useState<'ik' | 'hakkinda' | 'ilanlar' | 'urunler' | 'duyurular' | 'fotograflar' | 'videolar'>('ik');
  const aboutText =
    company.description ||
    `1986'dan bu yana Türkiye'nin teknolojik olarak bağımsızlaşması amacıyla yerli ve milli üretimden yana çalışan Baykar, geçtiğimiz yıllar içinde Türkiye'de savunma ve havacılık alanında dönüşüm yaratacak bir ivmenin öncüsü haline geldi. Bugün Baykar olarak, otomotiv endüstrisi için adım attığımız mühendislik girişimimizi yeni kuşak mühendislerimizle gökyüzüne taşıyarak dünyanın sayılı insansız hava aracı üreticilerinden biri olmanın gururunu taşıyoruz. Türkiye'nin ilk yerli ve milli İnsansız Hava Araçlarını üreten en önemli motivasyonumuz her zaman kendi mühendislerimize ve beyin gücümüze güvenmek oldu.

Baykar'ın Türk Silahlı Kuvvetleri'nin envanterine giren ve yurt dışına ihraç edilen savunma teknolojilerinin başarısında da sürekli üretim ve geliştirme kültürü öncü rol oynuyor. Sanayi ve Teknoloji Bakanlığı'ndan tescilli Baykar Ar-Ge yapılanması ile savunma ve havacılık alanında milli teknolojiler geliştirmeye devam ediyoruz.`;

  // Mock content for tabs
  const jobPosts = [
    { id: 1, title: 'Grafik Tasarımcı', company: company.name, description: 'Lorem ipsum dolor sit amet consectetur. Quisque eros mauris pellentesque nunc nulla in.' },
    { id: 2, title: 'Frontend Developer', company: company.name, description: 'React Native deneyimi tercih sebebidir.' },
  ];
  const products = [
    { id: 1, category: 'Teknoloji', title: 'Bayraktar Kızılelma', description: 'Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.', image: 'https://images.unsplash.com/photo-1514517220031-65a46a1c663f?w=300&h=200&fit=crop' },
    { id: 2, category: 'Teknoloji', title: 'TB2', description: 'Dayanıklı ve esnek platform.', image: 'https://images.unsplash.com/photo-1533113350448-1b1c4c7d2df1?w=300&h=200&fit=crop' },
  ];
  const announcements = [
    { id: 1, title: '27 Ekim Expo 2025', text: 'Lorem ipsum dolor sit amet consectetur. dolor sit amet consectetur.', time: '25 Dakika Önce' },
  ];
  const photos = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576435728678-68b37a4df2d2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&h=600&fit=crop',
  ];
  const videos = [
    { id: 1, title: '100. Sorti', thumbnail: 'https://images.unsplash.com/photo-1504198266285-165a1b20f9fc?w=800&h=450&fit=crop', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 2, title: 'Tam Otomatik Kalkış-İniş', thumbnail: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=450&fit=crop', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ];

  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string } | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Firma Detayı</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&h=600&fit=crop' }}
            style={styles.bannerImage}
          />
          <View style={styles.cardFooter}>
            <View style={styles.logoOverlay}>
              <Image source={{ uri: company.logo }} style={styles.logoImage} />
            </View>
            <View style={styles.footerTexts}>
              <Text style={styles.companyTitle}>{company.name}</Text>
              <Text style={styles.followersText}>{followers} takipçi</Text>
            </View>
            <View style={styles.footerActions}>
              <TouchableOpacity
                style={[styles.followButton, isFollowing ? styles.followingButton : styles.followButton]}
                onPress={() => setIsFollowing((prev) => !prev)}
              >
                <Text style={styles.followButtonText}>{isFollowing ? 'Takip Ediliyor' : 'Takip Et'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreButton}>
                <MoreIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Sektör:</Text>
                <Text style={styles.infoValue}>{company.sector ?? 'Teknoloji'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Çalışan Sayısı:</Text>
                <Text style={styles.infoValue}>{company.employeeCount ?? '5000+'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Kuruluş Yılı:</Text>
                <Text style={styles.infoValue}>{company.foundedYear ?? '1986'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Web Ziyaret:</Text>
                <TouchableOpacity onPress={() => Linking.openURL(company.websiteUrl ?? 'https://example.com')}>
                  <Text style={styles.linkText}>Ziyaret Et</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRight}>
              <Text style={styles.infoLabel}>Adres:</Text>
              <Text style={styles.infoAddress}>
                {company.address ?? 'Baykar Milli S/İHA\nSistemleri Ar-Ge ve\nÜretim Tesisi'}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {[
            { id: 'ik', label: 'İK Bilgileri' },
            { id: 'hakkinda', label: 'Hakkında' },
            { id: 'ilanlar', label: 'İş İlanları' },
            { id: 'urunler', label: 'Ürünleri' },
            { id: 'duyurular', label: 'Duyurular' },
            { id: 'fotograflar', label: 'Fotoğrafları' },
            { id: 'videolar', label: 'Videolar' },
          ].map((tab: any) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabItem, activeTab === tab.id && styles.activeTabItem]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === 'ik' && (
          <View style={styles.kvCard}>
            <View style={styles.kvRow}>
              <View style={styles.kvLeft}><BuildingIcon color="#FFBB01" /><Text style={styles.kvLabel}>Yetkili Kişi</Text></View>
              <View style={styles.kvRight}><Text style={styles.kvValue}>Mustafa Koçak</Text></View>
            </View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><PhoneIcon color="#FFBB01" /><Text style={styles.kvLabel}>Telefon</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>+123 456 78 90</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><MobileIcon color="#FFBB01" /><Text style={styles.kvLabel}>Cep No</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>+123 456 78 90</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><GlobeIcon color="#FFBB01" /><Text style={styles.kvLabel}>Web Sitesi</Text></View><View style={styles.kvRight}><Text style={styles.linkText} onPress={() => Linking.openURL(company.websiteUrl ?? 'https://www.mustafa.com')}>www.mustafa.com</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><MailIcon color="#FFBB01" /><Text style={styles.kvLabel}>E-mail</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>mustafa@mustafa.com</Text></View></View>
            <View style={styles.kvRow}>
              <View style={styles.kvLeft}><Text style={styles.kvLabel}>Sosyal Medya</Text></View>
              <View style={styles.kvRight}><SocialIconsRow /></View>
            </View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><Text style={styles.kvLabel}>Şirket Türü</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>Yazılım</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><Text style={styles.kvLabel}>OSB Bölgesi</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>Gebze</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><Text style={styles.kvLabel}>Teknopark</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>Gebze</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><Text style={styles.kvLabel}>Şirket Şubeler</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>---</Text></View></View>
            <View style={styles.kvRow}><View style={styles.kvLeft}><Text style={styles.kvLabel}>İhracat</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>---</Text></View></View>
            <View style={[styles.kvRow, styles.kvRowLast]}><View style={styles.kvLeft}><Text style={styles.kvLabel}>Bulunduğu İl</Text></View><View style={styles.kvRight}><Text style={styles.kvValue}>Kocaeli</Text></View></View>
          </View>
        )}

        {activeTab === 'hakkinda' && (
          <View style={styles.aboutSection}>
            <Text style={styles.sectionHeading}>Hakkında</Text>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutText}>{aboutText}</Text>
            </View>
          </View>
        )}

        {activeTab === 'ilanlar' && (
          <View style={styles.cardList}>
            {jobPosts.map((item) => (
              <View key={item.id} style={styles.listCard}>
                <View style={styles.leftStripe} />
                <View style={styles.listCardLeftImage}>
                  <Image
                    source={{ uri: company.logo }}
                    style={{ width: 54, height: 54, borderRadius: 8 }}
                  />
                </View>
                <View style={styles.listCardContent}>
                  <Text style={styles.listCardTitle}>{company.name}</Text>
                  <Text style={styles.listCardText}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.moreButtonSmall}>
                  <MoreIcon />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'urunler' && (
          <View style={styles.cardList}>
            {products.map((p) => (
              <View key={p.id} style={styles.productRow}>
                <View style={styles.leftStripe} />
                <Image source={{ uri: p.image }} style={styles.productThumb} />
                <View style={{ flex: 1 }}>
                  <View style={styles.badge}><Text style={styles.badgeText}>{p.category}</Text></View>
                  <Text style={styles.productTitle}>{p.title}</Text>
                  <Text style={styles.productDesc}>{p.description}</Text>
                </View>
                <BookmarkIcon />
              </View>
            ))}
          </View>
        )}

        {activeTab === 'duyurular' && (
          <View style={styles.cardList}>
            {announcements.map((a) => (
              <View key={a.id} style={styles.announcementCard}>
                <View style={styles.leftStripe} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.announcementTitle}>{a.title}</Text>
                  <Text style={styles.announcementText}>{a.text}</Text>
                  <Text style={styles.announcementTime}>{a.time}</Text>
                </View>
                <TouchableOpacity style={styles.moreButtonSmall}>
                  <MoreIcon />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'fotograflar' && (
          <View style={styles.photoGrid}>
            {photos.map((url, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setSelectedPhoto(url);
                  setPhotoModalVisible(true);
                }}
                style={styles.photoItem}
              >
                <Image source={{ uri: url }} style={styles.photoImage} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'videolar' && (
          <View style={styles.videoList}>
            {videos.map((v) => (
              <TouchableOpacity key={v.id} style={styles.videoThumbWrapper} onPress={() => { setSelectedVideo({ title: v.title, url: v.url }); setVideoModalVisible(true); }}>
                <Image source={{ uri: v.thumbnail }} style={styles.videoThumb} />
                <View style={styles.playOverlay}><PlayIcon /></View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Photo Modal */}
      <Modal visible={photoModalVisible} transparent animationType="fade" onRequestClose={() => setPhotoModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setPhotoModalVisible(false)}>
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>×</Text>
          </TouchableOpacity>
          {selectedPhoto && (
            <Image source={{ uri: selectedPhoto }} style={styles.modalImage} resizeMode="contain" />
          )}
        </View>
      </Modal>

      {/* Video Modal */}
      <Modal visible={videoModalVisible} transparent animationType="fade" onRequestClose={() => setVideoModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setVideoModalVisible(false)}>
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>×</Text>
          </TouchableOpacity>
          {selectedVideo && (
            <View style={styles.videoModalContent}>
              <Text style={styles.videoModalTitle}>{selectedVideo.title}</Text>
              <TouchableOpacity style={styles.watchButton} onPress={() => Linking.openURL(selectedVideo.url)}>
                <Text style={styles.watchButtonText}>Videoyu İzle</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
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
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  notificationButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  content: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 24 },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  bannerImage: { width: '100%', height: 200 },
  cardFooter: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingLeft: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  logoOverlay: {
    position: 'absolute',
    left: 12,
    top: -28,
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  logoImage: { width: 56, height: 48, resizeMode: 'contain' },
  footerTexts: { flex: 1, paddingRight: 12 },
  companyTitle: { fontSize: 16, fontWeight: 'bold', color: '#191D20' },
  followersText: { fontSize: 12, color: '#666666', marginTop: 2 },
  footerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  followingButton: {
    backgroundColor: '#FFFFFF',
  },
  followButtonText: { fontSize: 12, fontWeight: '600', color: '#191D20' },
  moreButton: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },

  sectionHeading: { fontSize: 14, fontWeight: 'bold', color: '#191D20', marginBottom: 8 },
  description: { fontSize: 14, color: '#666666', lineHeight: 20 },
  aboutSection: { marginTop: 8 },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
  },
  aboutText: { fontSize: 12, color: '#191D20', lineHeight: 18 },
  cardList: { gap: 10 },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    position: 'relative',
  },
  leftStripe: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: '#FFBB01', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  listCardLeftImage: { width: 60, height: 60, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  listCardContent: { flex: 1 },
  listCardTitle: { fontSize: 13, fontWeight: '700', color: '#191D20', marginBottom: 4 },
  listCardText: { fontSize: 12, color: '#666666' },
  moreButtonSmall: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    position: 'relative',
    gap: 12,
  },
  productThumb: { width: 64, height: 64, borderRadius: 10 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#FFBB01', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 4 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#191D20' },
  productTitle: { fontSize: 14, fontWeight: '700', color: '#191D20', marginBottom: 2 },
  productDesc: { fontSize: 12, color: '#666666' },
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    position: 'relative',
    gap: 12,
  },
  announcementTitle: { fontSize: 14, fontWeight: '700', color: '#191D20', marginBottom: 6 },
  announcementText: { fontSize: 12, color: '#666666', marginBottom: 8, lineHeight: 18 },
  announcementTime: { fontSize: 11, color: '#999999' },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  photoImage: { width: '100%', height: '100%' },
  videoList: { gap: 12 },
  videoThumbWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  videoThumb: { width: '100%', height: 180 },
  playOverlay: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -28 }, { translateY: -28 }], justifyContent: 'center', alignItems: 'center' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalClose: { position: 'absolute', top: 40, right: 20, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  modalImage: { width: '90%', height: '70%' },
  videoModalContent: { width: '80%', padding: 16, backgroundColor: '#1F1F1F', borderRadius: 12, alignItems: 'center' },
  videoModalTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  watchButton: { backgroundColor: '#FFBB01', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  watchButtonText: { color: '#191D20', fontWeight: '700' },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginTop: 8,
    marginBottom: 12,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTabItem: {
    backgroundColor: '#FFBB01',
    borderColor: '#FFBB01',
  },
  tabText: { fontSize: 12, color: '#191D20' },
  activeTabText: { fontWeight: '600' },

  kvCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  kvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  kvRowLast: { borderBottomWidth: 0 },
  kvLeft: { width: 140, flexDirection: 'row', alignItems: 'center', gap: 8 },
  kvLabel: { fontSize: 12, color: '#191D20', fontWeight: '600' },
  kvRight: { flex: 1 },
  kvValue: { fontSize: 12, color: '#666666' },
  socialIconsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  placeholderBox: { padding: 16, borderRadius: 10, backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E0E0E0' },
  placeholderText: { fontSize: 12, color: '#666666' },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  infoLeft: {
    flex: 1,
    paddingRight: 12,
  },
  infoRight: {
    flex: 1,
    paddingLeft: 12,
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#E9ECEF',
  },
  infoItem: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#191D20',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  linkText: {
    fontSize: 12,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  infoAddress: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
    lineHeight: 18,
  },
});

export default CompanyDetailScreen;


