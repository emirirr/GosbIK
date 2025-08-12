import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import Svg, { Rect, Path as SvgPath, Line, Circle } from 'react-native-svg';
import { NotificationIcon } from './icons/SvgIcons';

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <SvgPath d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
  </Svg>
);

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  logo: string;
  description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  locationDetail?: string;
  workType?: string;
  category?: string;
  companyAbout?: string;
  website?: string;
  industry?: string;
  employees?: string;
  headquarters?: string;
  companyType?: string;
  founded?: string;
  expertise?: string;
  gallery?: string[];
};

type Props = {
  onBack: () => void;
  onApply?: () => void;
  job: Job;
};

const JobDetailScreen: React.FC<Props> = ({ onBack, onApply, job }) => {
  const description = job.description ||
    'Pozisyon kapsamında kullanıcı odaklı arayüzler geliştirmekten, mevcut bileşenleri iyileştirmekten ve ekiplerle koordineli çalışmaktan sorumlu olacaksınız.';
  const responsibilities = job.responsibilities || [
    'React Native ile yüksek kaliteli mobil arayüzler geliştirmek',
    'Tasarım ekibiyle birlikte bileşenleri hayata geçirmek',
    'Performans ve erişilebilirlik optimizasyonları yapmak',
  ];
  const qualifications = job.qualifications || [
    '2+ yıl mobil veya web deneyimi',
    'TypeScript/JavaScript bilgisi',
    'REST/JSON API entegrasyon tecrübesi',
  ];
  // Removed "Sunduklarımız" section per design
  const address = job.locationDetail || 'Turgut Reis Mh. Esenler, İstanbul';
  const [showFullDesc, setShowFullDesc] = useState(false);
  const companyAbout = job.companyAbout ||
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.\n\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.';

  const MapPlaceholder: React.FC = () => (
    <View style={styles.mapCard}>
      <Svg width="100%" height="100%" viewBox="0 0 300 160">
        <Rect x="0" y="0" width="300" height="160" fill="#F2F3F5" rx="16" />
        {/* River stripe */}
        <SvgPath d="M0 0 L55 0 L30 45 L20 75 L0 115 Z" fill="#84C8EA" />
        {/* Roads grid */}
        {
          Array.from({ length: 16 }).map((_, i) => (
            <Line key={`v-${i}`} x1={20 + i * 18} y1={0} x2={-40 + i * 18} y2={160} stroke="#FFFFFF" strokeWidth="3" opacity="0.7" />
          ))
        }
        {/* Pin */}
        <Circle cx="150" cy="75" r="8" fill="#FF1F1F" />
        <SvgPath d="M150 90c8 0 14-2 14-4 0-2-6-4-14-4s-14 2-14 4c0 2 6 4 14 4Z" fill="none" stroke="#FF1F1F" strokeWidth="3" />
      </Svg>
    </View>
  );

  const [activeTab, setActiveTab] = useState<'detail' | 'company'>('detail');

  const getRelativeTime = (dateStr: string): string => {
    // Expect formats like DD.MM.YYYY; fallback to raw string
    try {
      const [d, m, y] = dateStr.split('.').map((s) => parseInt(s, 10));
      const then = new Date(y, (m || 1) - 1, d || 1).getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - then);
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (days <= 0) return 'bugün';
      if (days === 1) return '1 gün önce';
      if (days < 7) return `${days} gün önce`;
      const weeks = Math.floor(days / 7);
      if (weeks === 1) return '1 hafta önce';
      return `${weeks} hafta önce`;
    } catch (e) {
      return dateStr;
    }
  };

  const BookmarkIcon: React.FC<{ color?: string; filled?: boolean }> = ({ color = '#191D20', filled = false }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <SvgPath
        d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : 2}
        fill={filled ? '#191D20' : 'none'}
      />
    </Svg>
  );

  const companyGallery = job.gallery || [
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  ];

  const [isSaved, setIsSaved] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İlan Detay</Text>
        <TouchableOpacity style={styles.rightSpace}>
          <NotificationIcon width={24} height={24} color="#191D20" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top hero section */}
        <View style={styles.topHero}>
          <View style={styles.logoBadge}>
            <Image source={{ uri: job.logo }} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.heroTitle}>{job.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{job.company}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{job.location}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{getRelativeTime(job.date)}</Text>
          </View>
          <View style={styles.heroButtonsRow}>
            <TouchableOpacity
              style={[
                styles.heroButton,
                activeTab === 'detail' ? styles.heroButtonActive : styles.heroButtonInactive,
              ]}
              onPress={() => setActiveTab('detail')}
            >
              <Text style={styles.heroButtonText}>İlan Detayı</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.heroButton,
                activeTab === 'company' ? styles.heroButtonActive : styles.heroButtonInactive,
              ]}
              onPress={() => setActiveTab('company')}
            >
              <Text style={styles.heroButtonText}>Firma Hakkında</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content by tab */}
        {activeTab === 'company' ? (
          <>
            <View style={styles.sectionNoFrame}>
              <Text style={styles.sectionTitle}>Firma Hakkında</Text>
              {companyAbout.split('\n\n').map((p, idx) => (
                <Text key={idx} style={styles.paragraph}>{p}</Text>
              ))}
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoHeader}>Bilgiler</Text>
              {[{
                label: 'Website', value: job.website || 'https://www.google.com', isLink: true,
              }, {
                label: 'Endüstri', value: job.industry || 'Internet product',
              }, {
                label: 'Çalışan sayısı', value: job.employees || '132,121 Employees',
              }, {
                label: 'Merkez ofis', value: job.headquarters || 'Osmangazi Mh. Darıca. Kocaeli',
              }, {
                label: 'Type', value: job.companyType || 'Çok uluslu şirket',
              }, {
                label: 'Tarih', value: job.founded || '2023',
              }, {
                label: 'Uzman olduğu alan', value: job.expertise || 'Arama teknolojisi, Web bilişim, Yazılım ve Çevrimiçi reklamcılık',
              }].map((row, idx) => (
                <View key={idx} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{row.label}</Text>
                  <Text style={[styles.infoValue, row.isLink && styles.link]}>{row.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionNoFrame}>
              <Text style={styles.sectionTitle}>Şirket Galerisi</Text>
              <View style={styles.galleryRow}>
                {companyGallery.slice(0, 2).map((src, idx) => (
                  <View key={idx} style={styles.galleryItem}>
                    <Image source={{ uri: src }} style={styles.galleryImage} />
                    {idx === 1 && (
                      <View style={styles.galleryOverlay}>
                        <Text style={styles.galleryOverlayText}>+5 pictures</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Job Description - no frame */}
            <View style={styles.sectionNoFrame}>
              <Text style={styles.sectionTitle}>İş Tanımı</Text>
              <Text numberOfLines={showFullDesc ? undefined : 4} style={styles.paragraph}>{description}</Text>
              {!showFullDesc && (
                <TouchableOpacity style={styles.readMoreButton} onPress={() => setShowFullDesc(true)}>
                  <Text style={styles.readMoreText}>Devamını oku</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.sectionNoFrame}>
              <Text style={styles.sectionTitle}>Gereksinimler</Text>
              {responsibilities.map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionNoFrame}>
              <Text style={styles.sectionTitle}>Konum</Text>
              <Text style={styles.paragraph}>{address}</Text>
              <MapPlaceholder />
            </View>

            {/* Info list under map */}
            <View style={styles.infoBlock}>
              <Text style={styles.infoHeader}>Bilgiler</Text>
              {[
                { label: 'Pozisyon', value: job.title || 'Senior Designer' },
                { label: 'Mezuniyet', value: 'Bachelor\'s Degree' },
                { label: 'Deneyim', value: '3 Yıl' },
                { label: 'İş Türü', value: job.workType || 'Tam Zamanlı' },
                { label: 'Uzmanlık Alanı', value: job.category || 'Tasarım' },
              ].map((row, idx) => (
                <View key={idx} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{row.label}</Text>
                  <Text style={styles.infoValue}>{row.value}</Text>
                </View>
              ))}
            </View>

            {/* Activity list and apply CTA */}
            <View style={styles.sectionNoFrame}>
              <Text style={styles.sectionTitle}>Faaliyet Gösterdiği Alanlar</Text>
              {(job.benefits || [
                'Medical',
                'Dental',
                'Technical Certification',
                'Meal Allowance',
                'Transport Allowance',
                'Regular Hours',
                'Mondays–Fridays',
              ]).map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.applyCta} onPress={onApply}>
                <Text style={styles.applyCtaText}>BAŞVUR</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Sunduklarımız bölümü kaldırıldı */}
      </ScrollView>

      {activeTab === 'company' && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.bottomIcon, isSaved && styles.bottomIconActive]}
            onPress={() => setIsSaved((v) => !v)}
            activeOpacity={0.8}
          >
            <BookmarkIcon filled={isSaved} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomApplyButton} onPress={onApply}>
            <Text style={styles.bottomApplyText}>BAŞVUR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 14, fontWeight: '600', color: '#191D20' },
  rightSpace: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 16, gap: 14, paddingBottom: 140 },
  topHero: { alignItems: 'center', backgroundColor: '#FFFFFF' },
  logoBadge: { width: 78, height: 78, borderRadius: 39, backgroundColor: '#D8F0FF', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 4, marginBottom: 8 },
  logoImage: { width: 56, height: 56 },
  heroTitle: { fontSize: 16, fontWeight: '700', color: '#191D20', textAlign: 'center', marginTop: 2, marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 },
  metaText: { fontSize: 12, color: '#191D20' },
  metaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#191D20' },
  heroButtonsRow: { flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%', marginTop: 2 },
  heroButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  heroButtonActive: { backgroundColor: '#FFBB01' },
  heroButtonInactive: { backgroundColor: '#FFD766' },
  heroButtonText: { fontSize: 13, fontWeight: '700', color: '#191D20' },
  section: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 12, position: 'relative' },
  leftStripe: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: '#FFBB01', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  sectionNoFrame: { padding: 12, paddingLeft: 0, backgroundColor: 'transparent' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#191D20', marginBottom: 8, paddingLeft: 2 },
  paragraph: { fontSize: 13, color: '#191D20', lineHeight: 18 },
  listItem: { fontSize: 12, color: '#666666', marginBottom: 6 },
  readMoreButton: { alignSelf: 'flex-start', backgroundColor: '#FFF1C2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginTop: 8 },
  readMoreText: { color: '#191D20', fontSize: 12, fontWeight: '600' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#191D20', marginTop: 6 },
  bulletText: { flex: 1, fontSize: 12, color: '#191D20', lineHeight: 18 },
  mapCard: { width: '100%', height: 160, borderRadius: 16, overflow: 'hidden', marginTop: 10 },
  infoBlock: { marginTop: 12, backgroundColor: 'transparent' },
  infoHeader: { fontSize: 14, fontWeight: '700', color: '#191D20', marginBottom: 10 },
  infoRow: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  infoLabel: { fontSize: 12, color: '#191D20', fontWeight: '600', marginBottom: 4 },
  infoValue: { fontSize: 12, color: '#666666' },
  applyCta: { marginTop: 12, backgroundColor: '#FFBB01', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  applyCtaText: { color: '#191D20', fontWeight: '800', letterSpacing: 1 },
  link: { color: '#4C6EF5' },
  galleryRow: { flexDirection: 'row', gap: 16 },
  galleryItem: { flex: 1, height: 110, borderRadius: 10, overflow: 'hidden' },
  galleryImage: { width: '100%', height: '100%' },
  galleryOverlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  galleryOverlayText: { color: '#FFFFFF', fontWeight: '600' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, paddingBottom: 16, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', gap: 12 },
  bottomIcon: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  bottomIconActive: { backgroundColor: '#FFBB01', borderColor: '#FFBB01' },
  bottomApplyButton: { flex: 1, backgroundColor: '#FFBB01', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  bottomApplyText: { color: '#191D20', fontWeight: '800', letterSpacing: 1 },
});

export default JobDetailScreen;


