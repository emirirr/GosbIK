import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { scale, responsiveSpacing, responsiveFontSize, responsiveIconSize } from '../utils/responsive';
import { BlurView } from 'expo-blur';

type Props = { onBack: () => void };

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M6.8 13.001l2.9 2.9c.183.183.275.417.275.7s-.092.517-.275.7c-.183.183-.416.275-.7.275s-.517-.092-.7-.275L3.7 12.701a.97.97 0 01-.212-.625c0-.133.021-.258.063-.375.042-.116.113-.225.213-.325L8.3 6.701c.183-.183.416-.275.7-.275.283 0 .517.092.7.275.183.183.275.417.275.7 0 .283-.092.517-.275.7l-2.9 2.9H20c.283 0 .52.096.712.288.192.192.288.43.288.713 0 .283-.096.521-.288.713-.192.192-.429.288-.712.288H6.8z" fill={color} />
  </Svg>
);

const BellIcon: React.FC = () => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#191D20"/>
  </Svg>
);

const PlusIcon: React.FC = () => (
  <Svg width={responsiveIconSize.md} height={responsiveIconSize.md} viewBox="0 0 24 24" fill="none">
    <Path d="M11 11V6a1 1 0 112 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H6a1 1 0 110-2h5z" fill="#191D20" />
  </Svg>
);

// Render of assets/images/icons/delete.svg
const DeleteIcon: React.FC = () => (
  <Svg width={responsiveIconSize.md} height={responsiveIconSize.md} viewBox="0 0 24 24" fill="none">
    <Path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z" fill="#FC4646" />
  </Svg>
);

type LanguageItem = {
  id: string;
  name: string;
  flag?: string; // remote or local image url
  speak: string;
  write: string;
  primary?: boolean;
};

const LanguagesScreen: React.FC<Props> = ({ onBack }) => {
  const [languages, setLanguages] = useState<LanguageItem[]>([
    { id: '1', name: 'Arabic (Birinci Dil)', flag: 'https://flagcdn.com/w40/sa.png', speak: 'Seviye 10', write: 'Seviye 10', primary: true },
    { id: '2', name: 'English', flag: 'https://flagcdn.com/w40/gb.png', speak: 'İyi', write: 'İyi' },
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ code: string; name: string; flag: string } | null>(null);
  const [primary, setPrimary] = useState(false);
  const [speakLevel, setSpeakLevel] = useState<'Temel' | 'Orta' | 'İyi'>('Orta');
  const [writeLevel, setWriteLevel] = useState<'Temel' | 'Orta' | 'İyi'>('Temel');
  const [levelModalOpen, setLevelModalOpen] = useState(false);
  const [levelTarget, setLevelTarget] = useState<'speak' | 'write'>('speak');
  const [tempLevel, setTempLevel] = useState<'Temel' | 'Orta' | 'İyi'>('Orta');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<LanguageItem | null>(null);

  const allOptions: { code: string; name: string; flag: string }[] = [
    { code: 'ar', name: 'Arabic', flag: 'https://flagcdn.com/w40/sa.png' },
    { code: 'id', name: 'Indonesian', flag: 'https://flagcdn.com/w40/id.png' },
    { code: 'ms', name: 'Malaysian', flag: 'https://flagcdn.com/w40/my.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'fr', name: 'French', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'de', name: 'German', flag: 'https://flagcdn.com/w40/de.png' },
    { code: 'hi', name: 'Hindi', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'it', name: 'Italian', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'ja', name: 'Japanese', flag: 'https://flagcdn.com/w40/jp.png' },
    { code: 'ko', name: 'Korean', flag: 'https://flagcdn.com/w40/kr.png' },
  ];

  const saveLanguage = () => {
    if (!selectedOption) return;
    const exists = languages.some(l => l.name.toLowerCase() === selectedOption.name.toLowerCase());
    if (exists) {
      setLanguages(prev => prev.map(l => l.name.toLowerCase() === selectedOption.name.toLowerCase() ? { ...l, speak: speakLevel, write: writeLevel, primary } : l));
    } else {
      setLanguages(prev => [{ id: String(Date.now()), name: selectedOption.name, flag: selectedOption.flag, speak: speakLevel, write: writeLevel, primary }, ...prev]);
    }
    // reset picker state
    setPickerOpen(false);
    setSearch('');
    setShowForm(false);
    setSelectedOption(null);
    setPrimary(false);
    setSpeakLevel('Orta');
    setWriteLevel('Temel');
  };

  const removeLanguage = (id: string) => {
    setLanguages(prev => prev.filter(l => l.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diller</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.topRow}>
        <Text style={styles.sectionLabel}>Konuştuğum Diller</Text>
        <TouchableOpacity style={styles.addSmall} onPress={() => setPickerOpen(true)}>
          <Text style={styles.addSmallText}>Dil Ekle</Text>
          <View style={styles.addSmallDot} />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.flagCircle}>
                {item.flag ? (
                  <Image source={{ uri: item.flag }} style={{ width: 28, height: 20, borderRadius: 3 }} />
                ) : (
                  <View style={{ width: 28, height: 20, backgroundColor: '#E0E0E0', borderRadius: 3 }} />
                )}
              </View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <TouchableOpacity onPress={() => { setDeleteTarget(item); setConfirmOpen(true); }}>
                <DeleteIcon />
              </TouchableOpacity>
            </View>
            <Text style={styles.meta}>Konuşma : {item.speak}</Text>
            <Text style={styles.meta}>Yazma : {item.write}</Text>
          </View>
        )}
      />

      <Modal visible={pickerOpen} animationType="slide" onRequestClose={() => (showForm ? setShowForm(false) : setPickerOpen(false))}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => (showForm ? setShowForm(false) : setPickerOpen(false))}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Dil Ekle</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <BellIcon />
            </TouchableOpacity>
          </View>
          {!showForm && (
            <>
              <View style={styles.searchBar}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"><Path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></Svg>
                <TextInput
                  placeholder="Dil Ara"
                  placeholderTextColor="#9AA0A6"
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"><Path d="M6 6l12 12M18 6L6 18" stroke="#6B7280" strokeWidth={2} strokeLinecap="round"/></Svg>
                  </TouchableOpacity>
                )}
              </View>
              <FlatList
                contentContainerStyle={{ padding: responsiveSpacing.md, paddingBottom: responsiveSpacing['2xl'], gap: responsiveSpacing.sm }}
                data={allOptions.filter(o => o.name.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => {
                  const already = languages.some(l => l.name.toLowerCase() === item.name.toLowerCase());
                  return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setSelectedOption(item); setShowForm(true); setPrimary(false); setSpeakLevel('Orta'); setWriteLevel('Temel'); }}>
                      <View style={[styles.optionRow, already && styles.optionSelected] }>
                        <View style={styles.flagCircle}>
                          <Image source={{ uri: item.flag }} style={{ width: 28, height: 20, borderRadius: 3 }} />
                        </View>
                        <Text style={styles.optionText}>{item.name}</Text>
                        {already && (
                          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"><Path d="M20 6L9 17l-5-5" stroke="#191D20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></Svg>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}

          {showForm && selectedOption && (
            <>
              <View style={{ padding: responsiveSpacing.md, gap: responsiveSpacing.md }}>
                <View style={styles.detailCard}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.flagCircle}>
                        <Image source={{ uri: selectedOption.flag }} style={{ width: 28, height: 20, borderRadius: 3 }} />
                      </View>
                      <Text style={{ fontWeight: '700', color: '#191D20' }}>{selectedOption.name}</Text>
                    </View>
                  </View>
                  <View style={styles.separator} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '700', color: '#191D20' }}>Birinci Dil Ekle</Text>
                    <TouchableOpacity onPress={() => setPrimary(!primary)}>
                      <View style={[styles.radioOuter, primary && styles.radioOuterActive]}>
                        {primary && <View style={styles.radioInner} />}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.detailCard}>
                  <Text style={{ fontWeight: '700', color: '#191D20' }}>Konuşma</Text>
                  <TouchableOpacity onPress={() => { setLevelTarget('speak'); setTempLevel(speakLevel); setLevelModalOpen(true); }}>
                    <Text style={styles.fieldValue}>{speakLevel}</Text>
                  </TouchableOpacity>
                  <View style={styles.thinLine} />
                  <Text style={{ fontWeight: '700', color: '#191D20', marginTop: responsiveSpacing.sm }}>Yazma</Text>
                  <TouchableOpacity onPress={() => { setLevelTarget('write'); setTempLevel(writeLevel); setLevelModalOpen(true); }}>
                    <Text style={styles.fieldValue}>{writeLevel}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ padding: responsiveSpacing.md }}>
                <TouchableOpacity style={styles.saveButton} onPress={saveLanguage}>
                  <Text style={styles.saveButtonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>
      </Modal>

      {/* Level picker modal */}
      <Modal visible={levelModalOpen} transparent animationType="fade" onRequestClose={() => setLevelModalOpen(false)}>
        <View style={styles.levelBackdrop}>
          <BlurView intensity={12} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.levelCard}>
            <View style={styles.levelHandle} />
            {(['Temel','Orta','İyi'] as const).map(lvl => (
              <TouchableOpacity key={lvl} style={styles.levelRow} onPress={() => setTempLevel(lvl)}>
                <Text style={styles.levelText}>{lvl}</Text>
                <View style={[styles.radioOuter, tempLevel === lvl && styles.radioOuterActive]}>
                  {tempLevel === lvl && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.levelSaveButton} onPress={() => { levelTarget === 'speak' ? setSpeakLevel(tempLevel) : setWriteLevel(tempLevel); setLevelModalOpen(false); }}>
              <Text style={styles.levelSaveText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={confirmOpen} transparent animationType="fade" onRequestClose={() => setConfirmOpen(false)}>
        <View style={styles.modalBackdrop}>
          <BlurView intensity={12} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.modalCard}>
            <View style={styles.sheetHandle} />
            <Text style={styles.confirmTitle}>Emin misin</Text>
            <Text style={styles.confirmDesc}>{deleteTarget ? `${deleteTarget.name} dilini silmek istediğinizden emin misiniz?` : ''}</Text>
            <TouchableOpacity style={styles.confirmPrimary} onPress={() => { if (deleteTarget) removeLanguage(deleteTarget.id); setConfirmOpen(false); setDeleteTarget(null); }}>
              <Text style={styles.confirmPrimaryText}>Sil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmSecondary} onPress={() => { setConfirmOpen(false); setDeleteTarget(null); }}>
              <Text style={styles.confirmSecondaryText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: scale(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsiveSpacing.md, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  headerBtn: { padding: responsiveSpacing.sm },
  headerTitle: { fontSize: responsiveFontSize.base, fontWeight: '700', color: '#191D20' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveSpacing.md, paddingTop: responsiveSpacing.md },
  sectionLabel: { color: '#191D20', fontWeight: '600' },
  addSmall: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addSmallText: { color: '#191D20', fontWeight: '600' },
  addSmallDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFBB01', borderWidth: 1, borderColor: '#191D20' },
  list: { paddingHorizontal: responsiveSpacing.md, paddingTop: responsiveSpacing.md, paddingBottom: responsiveSpacing['2xl'], gap: responsiveSpacing.md },
  card: { backgroundColor: '#FFFFFF', borderRadius: scale(12), padding: responsiveSpacing.md, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1, borderWidth: 1, borderColor: '#F0F0F0', marginBottom: responsiveSpacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  flagCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  cardTitle: { flex: 1, color: '#191D20', fontWeight: '700', marginLeft: 8 },
  meta: { color: '#6B7280', marginTop: 6 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  modalTitle: { fontSize: responsiveFontSize.base, fontWeight: '800', color: '#191D20', textAlign: 'center', marginBottom: responsiveSpacing.sm },
  input: { backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, color: '#191D20', marginBottom: responsiveSpacing.sm },
  modalActions: { flexDirection: 'row', gap: responsiveSpacing.md, marginTop: responsiveSpacing.sm },
  modalPrimaryButton: { flex: 1, backgroundColor: '#FFBB01', borderRadius: scale(18), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  modalPrimaryText: { color: '#191D20', fontWeight: '800' },
  modalSecondaryButton: { flex: 1, backgroundColor: '#E9E9EB', borderRadius: scale(18), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  modalSecondaryText: { color: '#191D20', fontWeight: '700' },
  sheetHandle: { width: 120, height: 6, borderRadius: 3, backgroundColor: '#D8D8D8', alignSelf: 'center', marginBottom: responsiveSpacing.sm },
  confirmTitle: { fontSize: responsiveFontSize.lg, fontWeight: '800', color: '#191D20', textAlign: 'center', marginBottom: responsiveSpacing.xs },
  confirmDesc: { fontSize: responsiveFontSize.sm, color: '#6B7280', textAlign: 'center', marginBottom: responsiveSpacing.md },
  confirmPrimary: { backgroundColor: '#FFBB01', borderRadius: scale(18), paddingVertical: responsiveSpacing.md, alignItems: 'center', marginBottom: responsiveSpacing.sm },
  confirmPrimaryText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
  confirmSecondary: { backgroundColor: '#E9E9EB', borderRadius: scale(18), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  confirmSecondaryText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F1F1F1', marginHorizontal: responsiveSpacing.md, marginTop: responsiveSpacing.md, borderRadius: 10, paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.sm },
  searchInput: { flex: 1, color: '#191D20' },
  optionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0', paddingVertical: responsiveSpacing.md, paddingHorizontal: responsiveSpacing.sm, marginBottom: responsiveSpacing.sm },
  optionSelected: { backgroundColor: '#FFBB01' },
  optionText: { flex: 1, color: '#191D20', marginLeft: 8, fontWeight: '600' },
  detailCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: responsiveSpacing.md, borderWidth: 1, borderColor: '#F0F0F0' },
  separator: { height: 1, backgroundColor: '#EEEEEE', marginVertical: responsiveSpacing.sm },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#FFBB01', alignItems: 'center', justifyContent: 'center' },
  radioOuterActive: { borderColor: '#FFBB01' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFBB01' },
  fieldValue: { color: '#6B7280', marginTop: 4 },
  thinLine: { height: 1, backgroundColor: '#EDEDED', marginTop: responsiveSpacing.sm },
  saveButton: { backgroundColor: '#FFBB01', borderRadius: scale(14), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  saveButtonText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
  levelBackdrop: { flex: 1, justifyContent: 'center', padding: responsiveSpacing.md },
  levelCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: responsiveSpacing.md },
  levelHandle: { width: 60, height: 6, borderRadius: 3, backgroundColor: '#2E2E2E1A', alignSelf: 'center', marginBottom: responsiveSpacing.md },
  levelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: responsiveSpacing.sm },
  levelText: { color: '#191D20' },
  levelSaveButton: { backgroundColor: '#FFBB01', borderRadius: 18, paddingVertical: responsiveSpacing.md, alignItems: 'center', marginTop: responsiveSpacing.md },
  levelSaveText: { color: '#191D20', fontWeight: '700' },
});

export default LanguagesScreen;


