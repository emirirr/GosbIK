import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar, Linking, ScrollView } from 'react-native';
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
  const [activeTab, setActiveTab] = useState<'ik' | 'hakkinda' | 'ilanlar' | 'urunler' | 'duyurular'>('ik');

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
          <View>
            <Text style={styles.sectionHeading}>Hakkında</Text>
            <Text style={styles.description}>{company.description}</Text>
          </View>
        )}

        {activeTab !== 'ik' && activeTab !== 'hakkinda' && (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>Bu sekme yakında.</Text>
          </View>
        )}
      </ScrollView>
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


