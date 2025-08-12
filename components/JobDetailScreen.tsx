import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
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
};

type Props = {
  onBack: () => void;
  job: Job;
};

const JobDetailScreen: React.FC<Props> = ({ onBack, job }) => {
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
  const benefits = job.benefits || [
    'Esnek çalışma',
    'Yemek kartı ve özel sağlık sigortası',
    'Eğitim bütçesi',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İş İlanı</Text>
        <View style={styles.rightSpace} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.logoCircle}>
            <Image source={{ uri: job.logo }} style={{ width: 48, height: 48, borderRadius: 24 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
            <Text style={styles.meta}>{job.location} • {job.date}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.leftStripe} />
          <Text style={styles.sectionTitle}>İş Tanımı</Text>
          <Text style={styles.paragraph}>{description}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.leftStripe} />
          <Text style={styles.sectionTitle}>Sorumluluklar</Text>
          {responsibilities.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.leftStripe} />
          <Text style={styles.sectionTitle}>Nitelikler</Text>
          {qualifications.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.leftStripe} />
          <Text style={styles.sectionTitle}>Sunduklarımız</Text>
          {benefits.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  rightSpace: { width: 40, height: 40 },
  scrollContent: { padding: 16, gap: 14 },
  heroCard: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 12 },
  logoCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  company: { fontSize: 14, color: '#191D20', marginTop: 2 },
  meta: { fontSize: 12, color: '#666666', marginTop: 4 },
  section: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 12, position: 'relative' },
  leftStripe: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: '#FFBB01', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#191D20', marginBottom: 8, paddingLeft: 2 },
  paragraph: { fontSize: 13, color: '#191D20', lineHeight: 18 },
  listItem: { fontSize: 12, color: '#666666', marginBottom: 6 },
});

export default JobDetailScreen;


