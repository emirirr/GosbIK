import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, Modal, ScrollView } from 'react-native';
import JobsFilterScreen from './JobsFilterScreen';
import JobDetailScreen from './JobDetailScreen';
import CvUploadScreen from './CvUploadScreen';
import Svg, { Path } from 'react-native-svg';

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
  </Svg>
);

const LocationIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 16 16">
    <Path d="M7.9997 0.0273438C6.23566 0.0292845 4.54442 0.730861 3.29699 1.97816C2.04957 3.22547 1.34782 4.91664 1.3457 6.68068C1.3457 8.39401 2.67237 11.0753 5.28904 14.65C5.60054 15.0768 6.00841 15.4239 6.47944 15.6633C6.95047 15.9026 7.47135 16.0274 7.9997 16.0274C8.52805 16.0274 9.04894 15.9026 9.51997 15.6633C9.991 15.4239 10.3989 15.0768 10.7104 14.65C13.327 11.0753 14.6537 8.39401 14.6537 6.68068C14.6516 4.91664 13.9498 3.22547 12.7024 1.97816C11.455 0.730861 9.76374 0.0292845 7.9997 0.0273438ZM7.9997 9.33268C7.47229 9.33268 6.95671 9.17628 6.51818 8.88326C6.07965 8.59025 5.73786 8.17377 5.53602 7.6865C5.33419 7.19923 5.28138 6.66305 5.38428 6.14577C5.48717 5.62849 5.74115 5.15333 6.11409 4.78039C6.48703 4.40745 6.96218 4.15348 7.47946 4.05058C7.99675 3.94769 8.53292 4.0005 9.02019 4.20233C9.50746 4.40417 9.92394 4.74596 10.217 5.18449C10.51 5.62302 10.6664 6.13859 10.6664 6.66601C10.6664 7.37326 10.3854 8.05153 9.88532 8.55163C9.38522 9.05173 8.70695 9.33268 7.9997 9.33268Z" fill="#666666"/>
  </Svg>
);

const CalendarIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 16 16">
    <Path d="M12.3333 1.33333H12V1C12 0.734784 11.8946 0.48043 11.7071 0.292893C11.5196 0.105357 11.2652 0 11 0V0C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V1.33333H6V1C6 0.734784 5.89464 0.48043 5.70711 0.292893C5.51957 0.105357 5.26522 0 5 0V0C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1V1.33333H3.66667C2.69421 1.33333 1.76158 1.71964 1.07394 2.40728C0.386308 3.09491 0 4.02754 0 5L0 12.3333C0 13.3058 0.386308 14.2384 1.07394 14.9261C1.76158 15.6137 2.69421 16 3.66667 16H12.3333C13.3058 16 14.2384 15.6137 14.9261 14.9261C15.6137 14.2384 16 13.3058 16 12.3333V5C16 4.02754 15.6137 3.09491 14.9261 2.40728C14.2384 1.71964 13.3058 1.33333 12.3333 1.33333ZM12.3333 14H3.66667C3.22464 14 2.80072 13.8244 2.48816 13.5118C2.17559 13.1993 2 12.7754 2 12.3333V6.66667H14V12.3333C14 12.7754 13.8244 13.1993 13.5118 13.5118C13.1993 13.8244 12.7754 14 12.3333 14Z" fill="#666666"/>
  </Svg>
);

type Props = { onBack: () => void };

const JobsScreen: React.FC<Props> = ({ onBack }) => {
  const initialJobs = [
    { id: 1, title: 'Grafik Tasarımcı', company: 'Apple', location: 'Darıca / Kocaeli', date: '18.04.2025', workType: 'Tam Zamanlı', category: 'Tasarım', subcategory: 'Grafik', logo: 'https://images.unsplash.com/photo-1521123845560-14093637aa7a?w=80&h=80&fit=crop' },
    { id: 2, title: 'Frontend Developer', company: 'Microsoft', location: 'İstanbul / Türkiye', date: '15.04.2025', workType: 'Yarı Zamanlı', category: 'Yazılım', subcategory: 'Frontend', logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop' },
    { id: 3, title: 'UI/UX Designer', company: 'Baykar Teknoloji', location: 'Ankara / Türkiye', date: '16.04.2025', workType: 'Uzaktan', category: 'Tasarım', subcategory: 'UI/UX', logo: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=80&h=80&fit=crop' },
  ];
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortOption, setSortOption] = useState<'newest' | 'oldest'>('newest');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedWorkType, setSelectedWorkType] = useState<string | null>(null);
  const [workTypeOpen, setWorkTypeOpen] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [activeJob, setActiveJob] = useState<any | null>(null);
  const [showCvUpload, setShowCvUpload] = useState(false);

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('.').map((s) => parseInt(s, 10));
    return new Date(year, month - 1, day).getTime();
  };

  // Show filter as a dedicated screen (full-page)
  if (showFilterScreen) {
    return (
      <JobsFilterScreen
        onBack={() => setShowFilterScreen(false)}
        onApply={(values) => {
          setSelectedCategory(values.category);
          setSelectedSubcategory(values.subcategory);
          setSelectedLocation(values.location);
          setSelectedWorkType(values.workType);
          const next = initialJobs.filter((j) => {
            if (values.workType && j.workType !== values.workType) return false;
            if (values.category && j.category !== values.category) return false;
            if (values.subcategory && j.subcategory !== values.subcategory) return false;
            if (values.location && !j.location.includes(values.location)) return false;
            return true;
          });
          setFilteredJobs(next);
          setShowFilterScreen(false);
        }}
        initial={{ category: selectedCategory, subcategory: selectedSubcategory, location: selectedLocation, workType: selectedWorkType }}
      />
    );
  }

  if (showCvUpload) {
    return <CvUploadScreen onBack={() => setShowCvUpload(false)} job={activeJob || undefined} />;
  }

  if (showJobDetail && activeJob) {
    return <JobDetailScreen onBack={() => setShowJobDetail(false)} onApply={() => setShowCvUpload(true)} job={activeJob} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İş İlanları</Text>
        <View style={styles.rightSpace} />
      </View>

      {/* Actions Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.pillButton, styles.pillPrimary]}
          onPress={() => {
            setSelectedLocation(null);
            setFilteredJobs(initialJobs);
          }}
        >
          <Text style={[styles.pillText, styles.pillTextPrimary]}>Tümünü Listele</Text>
        </TouchableOpacity>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity style={styles.pillButton} onPress={() => setShowFilterScreen(true)}>
            <Text style={styles.pillText}>Filtrele</Text>
          </TouchableOpacity>
        </View>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity style={styles.pillButton} onPress={() => setShowSortModal(true)}>
            <Text style={styles.pillText}>Sıralama Ölçütü</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => { setActiveJob(item); setShowJobDetail(true); }}>
            <View style={styles.stripe} />
            <View style={styles.cardHeader}>
              <View style={styles.logoCircle}>
                <Image source={{ uri: item.logo }} style={{ width: 48, height: 48, borderRadius: 24 }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.companyName}>{item.company}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}><LocationIcon /><Text style={styles.detailText}>{item.location}</Text></View>
              <View style={styles.detailItem}><CalendarIcon /><Text style={styles.detailText}>{item.date}</Text></View>
            </View>
            
          </TouchableOpacity>
        )}
      />

      

      {/* Sort Modal */}
      <Modal transparent visible={showSortModal} animationType="fade" onRequestClose={() => setShowSortModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <TouchableOpacity onPress={() => setShowSortModal(false)} style={styles.backSmallBtn}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Sıralama Ölçütü</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={{ marginTop: 8 }}>
              <TouchableOpacity style={styles.radioRow} onPress={() => setSortOption('newest')}>
                <View style={styles.radioOuter}>{sortOption === 'newest' && <View style={styles.radioInner} />}</View>
                <Text style={styles.radioLabel}>En Yeni Tarihi Göre Sırala</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioRow} onPress={() => setSortOption('oldest')}>
                <View style={styles.radioOuter}>{sortOption === 'oldest' && <View style={styles.radioInner} />}</View>
                <Text style={styles.radioLabel}>En Eski Tarihi Göre Sırala</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.applyWideButton}
              onPress={() => {
                if (sortOption === 'newest') {
                  setFilteredJobs([...filteredJobs].sort((a, b) => parseDate(b.date) - parseDate(a.date)));
                } else {
                  setFilteredJobs([...filteredJobs].sort((a, b) => parseDate(a.date) - parseDate(b.date)));
                }
                setShowSortModal(false);
              }}
            >
              <Text style={styles.applyWideButtonText}>Uygula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  rightSpace: { width: 40, height: 40 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  pillButton: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' },
  pillPrimary: { backgroundColor: '#FFE4a6', borderColor: '#FFE4a6' },
  pillText: { fontSize: 12, color: '#191D20', fontWeight: '600' },
  pillTextPrimary: { color: '#191D20' },
  
  listContent: { padding: 16, paddingBottom: 24, gap: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    position: 'relative',
  },
  stripe: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: '#FFBB01', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  logoCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#191D20' },
  companyName: { fontSize: 14, color: '#191D20' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 12, color: '#666666' },
  
  
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '90%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#191D20', marginBottom: 12 },
  modalHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backSmallBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  formLabel: { fontSize: 12, color: '#191D20', fontWeight: '600', marginTop: 6, marginBottom: 6 },
  inputBox: { height: 44, backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, justifyContent: 'center', borderWidth: 1, borderColor: '#EEEEEE' },
  inputText: { fontSize: 13, color: '#191D20' },
  placeholderText: { color: '#9AA0A6' },
  dropdownIcon: { fontSize: 14, color: '#666666' },
  dropdownList: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, marginTop: 6, overflow: 'hidden' },
  dropdownItem: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dropdownItemText: { fontSize: 12, color: '#666666' },
  applyWideButton: { marginTop: 20, backgroundColor: '#FFBB01', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  applyWideButtonText: { color: '#191D20', fontWeight: '700', fontSize: 15 },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 4 },
  radioOuter: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#CFCFCF', justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#191D20' },
  radioLabel: { color: '#191D20', fontSize: 14 },
});

export default JobsScreen;


