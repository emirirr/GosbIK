import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
  </Svg>
);

type FilterValues = {
  category: string | null;
  subcategory: string | null;
  location: string | null;
  workType: string | null;
};

type Props = {
  initial?: FilterValues;
  onBack: () => void;
  onApply: (values: FilterValues) => void;
};

const JobsFilterScreen: React.FC<Props> = ({ onBack, onApply, initial }) => {
  const [category, setCategory] = useState<string | null>(initial?.category ?? null);
  const [subcategory, setSubcategory] = useState<string | null>(initial?.subcategory ?? null);
  const [location, setLocation] = useState<string | null>(initial?.location ?? null);
  const [workType, setWorkType] = useState<string | null>(initial?.workType ?? null);
  const [workTypeOpen, setWorkTypeOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtrele</Text>
        <View style={styles.rightSpace} />
      </View>

      <View style={styles.content}>
        <Text style={styles.formLabel}>Kategori</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setCategory('Yazılım')}>
          <Text style={[styles.inputText, !category && styles.placeholderText]}>
            {category || 'Kategori Seç...'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.formLabel}>Alt Kategori</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setSubcategory('Frontend')}>
          <Text style={[styles.inputText, !subcategory && styles.placeholderText]}>
            {subcategory || 'Alt Kategori Seç...'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.formLabel}>Konum</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => setLocation('İstanbul / Türkiye')}>
          <Text style={[styles.inputText, !location && styles.placeholderText]}>
            {location || 'Konum Seç...'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.formLabel}>Çalışma Şekli</Text>
        <View>
          <TouchableOpacity
            style={[styles.inputBox, styles.row]}
            onPress={() => setWorkTypeOpen((v) => !v)}
          >
            <Text style={[styles.inputText, !workType && styles.placeholderText]}>
              {workType || 'Çalışma Şekli Seç...'}
            </Text>
            <Text style={styles.dropdownIcon}>▾</Text>
          </TouchableOpacity>
          {workTypeOpen && (
            <View style={styles.dropdownList}>
              {['Tam Zamanlı', 'Yarı Zamanlı', 'Uzaktan'].map((opt) => (
                <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => { setWorkType(opt); setWorkTypeOpen(false); }}>
                  <Text style={styles.dropdownItemText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.applyWideButton}
          onPress={() => onApply({ category, subcategory, location, workType })}
        >
          <Text style={styles.applyWideButtonText}>Uygula</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  rightSpace: { width: 40, height: 40 },
  content: { padding: 16 },
  formLabel: { fontSize: 12, color: '#191D20', fontWeight: '600', marginTop: 6, marginBottom: 6 },
  inputBox: { height: 44, backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, justifyContent: 'center', borderWidth: 1, borderColor: '#EEEEEE' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  inputText: { fontSize: 13, color: '#191D20' },
  placeholderText: { color: '#9AA0A6' },
  dropdownIcon: { fontSize: 14, color: '#666666' },
  dropdownList: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, marginTop: 6, overflow: 'hidden' },
  dropdownItem: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dropdownItemText: { fontSize: 12, color: '#666666' },
  applyWideButton: { marginTop: 20, backgroundColor: '#FFBB01', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  applyWideButtonText: { color: '#191D20', fontWeight: '700', fontSize: 15 },
});

export default JobsFilterScreen;


