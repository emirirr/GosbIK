import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { NotificationIcon } from './icons/SvgIcons';

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
  </Svg>
);

type Job = {
  title?: string;
  company?: string;
  location?: string;
  date?: string;
  logo?: string;
};

type Props = { onBack: () => void; job?: Job };

const TrashIcon: React.FC<{ color?: string }> = ({ color = '#FF4D4F' }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M3 6H5H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke={color} strokeWidth="2" />
    <Path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" stroke={color} strokeWidth="2" />
    <Path d="M10 11V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M14 11V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const PdfBadge: React.FC = () => (
  <View style={styles.pdfBadge}><Text style={styles.pdfBadgeText}>PDF</Text></View>
);

const SuccessIllustration: React.FC = () => (
  <Svg width={153} height={152} viewBox="0 0 153 152" fill="none">
    <Path
      opacity={0.3}
      d="M143.158 38.9409C140.317 46.1321 135.801 26.8956 128.609 24.0549C121.418 21.2142 103.447 22.4288 106.288 15.2375C109.128 8.04625 130.087 7.43533 137.278 10.276C144.469 13.1167 145.998 31.7496 143.158 38.9409Z"
      fill="#03A9F4"
    />
    <Circle opacity={0.1} cx={130} cy={146} r={6} fill="#03A9F4" />
    <Circle opacity={0.1} cx={120} cy={37} r={6} fill="#03A9F4" />
    <Circle opacity={0.1} cx={6} cy={75} r={6} fill="#03A9F4" />
    <Rect x={84.7422} y={39.5938} width={64.5508} height={86.0678} rx={18} transform="rotate(30 84.7422 39.5938)" fill="#FFEBCC" />
    <Circle opacity={0.1} cx={42} cy={130} r={11} fill="#03A9F4" />
    <Rect x={39} y={44.9995} width={72} height={96} rx={18} fill="#FFB237" />
    <Circle opacity={0.1} cx={97.5} cy={60.4995} r={17.5} fill="#301008" />
    <Circle cx={101.5} cy={55.4995} r={17.5} fill="#FFF6F4" />
    <Path d="M107.916 52.4838L100.326 60.0743L95.7894 55.5378" stroke="#39B070" strokeWidth={2} strokeLinecap="round" />
    <Rect x={50} y={59.9995} width={19} height={19} rx={5} fill="white" />
    <Path d="M52 93.9995H99.5" stroke="white" strokeWidth={5} />
    <Path d="M52 107H99.5" stroke="white" strokeWidth={5} />
    <Path d="M52 120L78 120" stroke="white" strokeWidth={5} />
    <Path d="M120.161 77.7526C121.627 77.2803 123.054 78.5715 122.73 80.0767L122.184 82.6167C121.86 84.1218 120.028 84.7122 118.887 83.6792L116.96 81.9362C115.818 80.9032 116.223 79.0218 117.688 78.5495L120.161 77.7526Z" fill="#FBCBCB" />
    <Path d="M26.4535 138.818C27.1862 138.582 27.8997 139.228 27.7379 139.98L27.2248 142.366C27.063 143.119 26.1471 143.414 25.5762 142.897L23.7667 141.26C23.1959 140.744 23.3982 139.803 24.1309 139.567L26.4535 138.818Z" fill="#FBCBCB" />
    <Path d="M45.4535 33.8183C46.1862 33.5822 46.8997 34.2278 46.7379 34.9804L46.2248 37.3661C46.063 38.1187 45.1471 38.4139 44.5762 37.8974L42.7667 36.2602C42.1959 35.7437 42.3982 34.803 43.1309 34.5669L45.4535 33.8183Z" fill="#FBCBCB" />
  </Svg>
);

const CvUploadScreen: React.FC<Props> = ({ onBack, job }) => {
  const [cvFile, setCvFile] = useState<{ name: string; size: string; date: string; uri?: string } | null>({
    name: `${job?.company || 'Şirket'} - CV - ${job?.title || 'Pozisyon'}`,
    size: '867 Kb',
    date: '14 Feb 2022 at 11:30',
  });
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formatBytes = (bytes?: number): string => {
    if (!bytes || bytes <= 0) return '—';
    const sizes = ['B', 'Kb', 'Mb', 'Gb'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(value < 10 && i > 0 ? 1 : 0)} ${sizes[i]}`;
  };
  const getRelativeTime = (dateStr?: string): string => {
    if (!dateStr) return '';
    try {
      const [d, m, y] = dateStr.split('.').map((s) => parseInt(s, 10));
      const then = new Date(y, (m || 1) - 1, d || 1).getTime();
      const now = Date.now();
      const days = Math.max(0, Math.floor((now - then) / (1000 * 60 * 60 * 24)));
      if (days <= 0) return 'bugün';
      if (days === 1) return '1 gün önce';
      if (days < 7) return `${days} gün önce`;
      const weeks = Math.floor(days / 7);
      return weeks === 1 ? '1 hafta önce' : `${weeks} hafta önce`;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CV Ekle</Text>
        <View style={styles.rightSpace}>
          <NotificationIcon width={24} height={24} color="#191D20" />
        </View>
      </View>

      {/* Top hero like job detail */}
      {job && (
        <View style={styles.topHero}> 
          <View style={styles.logoBadge}>
            <Image source={{ uri: job.logo || '' }} style={styles.logoImage} resizeMode="contain" />
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.heroTitle}>{job.title}</Text>
            <View style={styles.metaRow}>
              {!!job.company && <Text style={styles.metaText}>{job.company}</Text>}
              {!!job.location && (
                <>
                  <View style={styles.metaDot} />
                  <Text style={styles.metaText}>{job.location}</Text>
                </>
              )}
              {!!job.date && (
                <>
                  <View style={styles.metaDot} />
                  <Text style={styles.metaText}>{getRelativeTime(job.date)}</Text>
                </>
              )}
            </View>
          </View>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.sectionHeader}>CV Yükle</Text>
        <Text style={styles.infoText}>Bir işe başvurmak için CV’nizi / Özgeçmişinizi ekleyin</Text>

        {cvFile ? (
          <View style={styles.fileCard}>
            <PdfBadge />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.fileName}>{cvFile.name}</Text>
              <Text style={styles.fileMeta}>{cvFile.size} • {cvFile.date}</Text>
            </View>
            <TouchableOpacity style={styles.removeRow} onPress={() => setCvFile(null)}>
              <TrashIcon />
              <Text style={styles.removeText}>Dosyayı kaldır</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={async () => {
              try {
                const result = await DocumentPicker.getDocumentAsync({
                  multiple: false,
                  type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                  copyToCacheDirectory: true,
                });
                // Support both new and legacy result shapes
                // New: { canceled: boolean, assets: [{ name, size, mimeType, uri }] }
                // Legacy: { type: 'success'|'cancel', name, size, uri }
                // @ts-ignore
                if ((result.canceled === true) || result.type === 'cancel') return;
                // @ts-ignore
                const asset = (result.assets && result.assets[0]) || result;
                const pickedName = asset.name || 'CV.pdf';
                const pickedSize = formatBytes(asset.size);
                const pickedDate = new Date().toLocaleString('tr-TR');
                setCvFile({ name: pickedName, size: pickedSize, date: pickedDate, uri: asset.uri });
              } catch (e) {
                // no-op
              }
            }}
          >
            <Text style={styles.uploadBoxText}>CV dosyası seç</Text>
          </TouchableOpacity>
        )}

        {!submitted ? (
          <>
            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>Açıklama</Text>
            <View style={styles.textarea}>
              <TextInput
                style={styles.textareaInput}
                multiline
                placeholder="Bu iş için neden doğru kişi olduğunuzu açıklayın"
                placeholderTextColor="#9AA0A6"
                value={note}
                onChangeText={setNote}
              />
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={() => setSubmitted(true)}>
              <Text style={styles.applyButtonText}>BAŞVUR</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successBlock}>
            <SuccessIllustration />
            <Text style={styles.successTitle}>Yükleme Başarılı</Text>
            <Text style={styles.successSubtitle}>Tebrikler, başvurunuz gönderildi</Text>
            <TouchableOpacity style={styles.similarButton} onPress={() => { setSubmitted(false); onBack(); }}>
              <Text style={styles.similarButtonText}>BENZER BİR İŞ BUL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButton} onPress={onBack}>
              <Text style={styles.homeButtonText}>ANASAYFAYA GERİ DÖN</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 14, fontWeight: '600', color: '#191D20' },
  rightSpace: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  topHero: { alignItems: 'center', paddingVertical: 8 },
  logoBadge: { width: 78, height: 78, borderRadius: 39, backgroundColor: '#D8F0FF', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  logoImage: { width: 56, height: 56 },
  metaCard: { backgroundColor: '#F6F6F6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 12, marginTop: 8, width: '95%' },
  heroTitle: { fontSize: 16, fontWeight: '700', color: '#191D20', textAlign: 'center', marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  metaText: { fontSize: 12, color: '#191D20' },
  metaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#191D20' },
  content: { padding: 16 },
  sectionHeader: { fontSize: 14, fontWeight: '700', color: '#191D20', marginBottom: 6 },
  infoText: { fontSize: 12, color: '#666666', marginBottom: 12 },
  uploadBox: { height: 80, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
  uploadBoxText: { color: '#191D20', fontWeight: '600' },
  fileCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#F5F3FF', borderRadius: 12, padding: 12 },
  pdfBadge: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#FF5757', justifyContent: 'center', alignItems: 'center' },
  pdfBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  fileName: { color: '#191D20', fontWeight: '600', marginBottom: 4 },
  fileMeta: { color: '#9AA0A6', fontSize: 11 },
  removeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  removeText: { color: '#FF4D4F', fontSize: 12 },
  textarea: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, backgroundColor: '#FAFAFA', minHeight: 140, padding: 12 },
  textareaInput: { color: '#191D20', fontSize: 12, textAlignVertical: 'top' },
  applyButton: { marginTop: 16, backgroundColor: '#FFBB01', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  applyButtonText: { color: '#191D20', fontWeight: '800', letterSpacing: 1 },
  successBlock: { alignItems: 'center', marginTop: 20 },
  successTitle: { marginTop: 12, color: '#191D20', fontWeight: '700' },
  successSubtitle: { marginTop: 4, color: '#666666', fontSize: 12, marginBottom: 12 },
  similarButton: { backgroundColor: '#FFDD75', paddingVertical: 14, borderRadius: 24, alignItems: 'center', width: '100%', marginTop: 6, marginBottom: 10 },
  similarButtonText: { color: '#191D20', fontWeight: '700' },
  homeButton: { backgroundColor: '#FFBB01', paddingVertical: 14, borderRadius: 24, alignItems: 'center', width: '100%' },
  homeButtonText: { color: '#191D20', fontWeight: '800' },
});

export default CvUploadScreen;


