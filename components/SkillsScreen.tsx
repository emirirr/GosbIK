import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal } from 'react-native';
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

const EditIcon: React.FC = () => (
  <Svg width={responsiveIconSize.md} height={responsiveIconSize.md} viewBox="0 0 24 24" fill="none">
    <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#191D20" />
  </Svg>
);

const SkillsScreen: React.FC<Props> = ({ onBack }) => {
  const [skills, setSkills] = useState<string[]>([
    'Graphic Design',
    'Graphic Thinking',
    'Ui/UX Design',
    'Adobe Indesign',
    'Web Design',
    'Canva Design',
    'User Interface Design',
    'Product Design',
  ]);
  const [editMode, setEditMode] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    setSkills(prev => [trimmed, ...prev]);
    setNewSkill('');
    setAddOpen(false);
  };

  const removeSkill = (idx: number) => {
    setSkills(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yetenekler</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.primaryAction} onPress={() => setAddOpen(true)}>
          <Text style={styles.primaryActionText}>Yetenek Ekle</Text>
          <PlusIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} onPress={() => setEditMode(!editMode)}>
          <Text style={styles.secondaryActionText}>Düzenle</Text>
          <EditIcon />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={skills}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.skillItem}>
            <Text style={styles.skillText}>{item}</Text>
            {editMode && (
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeSkill(index)}>
                <Text style={styles.removeBtnText}>Sil</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      <Modal visible={addOpen} transparent animationType="fade" onRequestClose={() => setAddOpen(false)}>
        <View style={styles.modalBackdrop}>
          <BlurView intensity={15} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Yeni Yetenek Ekle</Text>
            <TextInput
              autoFocus
              placeholder="Yetenek adı yazın"
              placeholderTextColor="#9AA0A6"
              value={newSkill}
              onChangeText={setNewSkill}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalPrimaryButton} onPress={addSkill}>
                <Text style={styles.modalPrimaryText}>Ekle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSecondaryButton} onPress={() => setAddOpen(false)}>
                <Text style={styles.modalSecondaryText}>Vazgeç</Text>
              </TouchableOpacity>
            </View>
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
  actionsRow: { flexDirection: 'row', gap: responsiveSpacing.sm, paddingHorizontal: responsiveSpacing.md, paddingTop: responsiveSpacing.md },
  primaryAction: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFBB01', borderRadius: scale(10), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.sm, borderWidth: 1, borderColor: '#191D20' },
  primaryActionText: { color: '#191D20', fontWeight: '800' },
  secondaryAction: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: scale(10), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.sm, borderWidth: 1, borderColor: '#E0E0E0' },
  secondaryActionText: { color: '#191D20', fontWeight: '700' },
  list: { paddingHorizontal: responsiveSpacing.md, paddingTop: responsiveSpacing.md, paddingBottom: responsiveSpacing['2xl'], gap: responsiveSpacing.sm },
  skillItem: { backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  skillText: { color: '#191D20' },
  removeBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#E9E9EB', borderRadius: 8 },
  removeBtnText: { color: '#191D20', fontWeight: '700' },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  modalTitle: { fontSize: responsiveFontSize.base, fontWeight: '800', color: '#191D20', marginBottom: responsiveSpacing.sm, textAlign: 'center' },
  input: { backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, color: '#191D20' },
  modalActions: { flexDirection: 'row', gap: responsiveSpacing.md, marginTop: responsiveSpacing.md },
  modalPrimaryButton: { flex: 1, backgroundColor: '#FFBB01', borderRadius: scale(18), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  modalPrimaryText: { color: '#191D20', fontWeight: '800' },
  modalSecondaryButton: { flex: 1, backgroundColor: '#E9E9EB', borderRadius: scale(18), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  modalSecondaryText: { color: '#191D20', fontWeight: '700' },
});

export default SkillsScreen;


