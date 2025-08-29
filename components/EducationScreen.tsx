import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
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

const CalendarIcon: React.FC = () => (
  <Svg width={responsiveIconSize.md} height={responsiveIconSize.md} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4h-1V3a1 1 0 10-2 0v1H8V3a1 1 0 10-2 0v1H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H5V10h14v8zm0-10H5V6h14v2z" fill="#191D20" />
  </Svg>
);

const monthsTR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

const EducationScreen: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'Üniversite'|'Lise'|'Ortaokul'|'İlkokul'>('Üniversite');
  const [school, setSchool] = useState('İstanbul Üniversitesi');
  const [faculty, setFaculty] = useState('Güzel Sanatlar');
  const [department, setDepartment] = useState('Grafik Tasarım');
  const [startDate, setStartDate] = useState('01 Mart 2014');
  const [endDate, setEndDate] = useState('17 Eylül 2017');
  const [current, setCurrent] = useState(false);
  const [desc, setDesc] = useState('Ek bilgileri buraya yazın');
  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eğitim Ekle</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tabsRow}>
          {(['Üniversite','Lise','Ortaokul','İlkokul'] as const).map(t => (
            <TouchableOpacity key={t} onPress={() => setActiveTab(t)}>
              <View style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]}>
                <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Okul Adı</Text>
        <TextInput value={school} onChangeText={setSchool} style={styles.input} />

        <Text style={styles.label}>Fakülte</Text>
        <TextInput value={faculty} onChangeText={setFaculty} style={styles.input} />

        <Text style={styles.label}>Bölüm</Text>
        <TextInput value={department} onChangeText={setDepartment} style={styles.input} />

        <View style={{ flexDirection: 'row', gap: responsiveSpacing.md }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Başlangıç Tarihi</Text>
            <TouchableOpacity onPress={() => setShowStartCal(true)} activeOpacity={0.8}>
              <View style={styles.inputWithIcon}>
                <Text style={styles.inputText}>{startDate}</Text>
                <CalendarIcon />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Bitiş Tarihi</Text>
            <TouchableOpacity onPress={() => !current && setShowEndCal(true)} activeOpacity={0.8}>
              <View style={[styles.inputWithIcon, current && { opacity: 0.5 }] }>
                <Text style={styles.inputText}>{endDate}</Text>
                <CalendarIcon />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => setCurrent(!current)}>
          <View style={[styles.checkbox, current && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Şuanda Burada Okuyorum</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Açıklama</Text>
        <TextInput value={desc} onChangeText={setDesc} style={styles.textArea} multiline />

        <TouchableOpacity style={styles.saveButton} onPress={() => setShowConfirm(true)}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showStartCal} transparent animationType="fade" onRequestClose={() => setShowStartCal(false)}>
        <View style={styles.modalBackdrop}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.modalCard}>
            <CalendarLikeMonth onSelect={(label) => { setStartDate(label); setShowStartCal(false); }} onClose={() => setShowStartCal(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={showEndCal} transparent animationType="fade" onRequestClose={() => setShowEndCal(false)}>
        <View style={styles.modalBackdrop}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.modalCard}>
            <CalendarLikeMonth onSelect={(label) => { setEndDate(label); setShowEndCal(false); }} onClose={() => setShowEndCal(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={showConfirm} transparent animationType="fade" onRequestClose={() => setShowConfirm(false)}>
        <View style={styles.confirmBackdrop}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.confirmCard}>
            <View style={styles.confirmHandle} />
            <Text style={styles.confirmTitle}>Emin misin</Text>
            <Text style={styles.confirmDesc}>Bilgileri kaydetmek istediğinizden emin misiniz?</Text>
            <TouchableOpacity style={styles.confirmPrimary} onPress={() => setShowConfirm(false)}>
              <Text style={styles.confirmPrimaryText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmSecondary} onPress={() => setShowConfirm(false)}>
              <Text style={styles.confirmSecondaryText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const CalendarLikeMonth: React.FC<{ onSelect: (label: string) => void; onClose: () => void }> = ({ onSelect, onClose }) => {
  const months = monthsTR;
  const weekTR = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(today);
  const [activeTab, setActiveTab] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekdaySun0 = new Date(year, month, 1).getDay();
  const daysInPrev = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (firstWeekdaySun0 + 6) % 7;
  const totalCells = 42;
  const cells: { day: number; inMonth: boolean }[] = [];
  for (let i = leading; i > 0; i--) cells.push({ day: daysInPrev - i + 1, inMonth: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true });
  while (cells.length < totalCells) cells.push({ day: cells.length - (leading + daysInMonth) + 1, inMonth: false });

  const toLabel = (d: Date) => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  const startOfWeekMon = (d: Date) => { const x = new Date(d); const day = (x.getDay()+6)%7; x.setDate(x.getDate()-day); x.setHours(0,0,0,0); return x; };
  const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate()+n);
  const isSelected = (d: number) => selected && selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;

  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        {(['Day','Week','Month','Year'] as const).map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <View style={{ backgroundColor: activeTab === tab ? '#FFBB01' : '#F5F5F5', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18 }}>
              <Text style={{ color: '#191D20', fontWeight: '700', opacity: activeTab === tab ? 1 : 0.7 }}>{tab}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => {
          if (activeTab === 'Year') setCursor(new Date(year - 1, month, 1));
          else if (activeTab === 'Month') setCursor(new Date(year, month - 1, 1));
          else if (activeTab === 'Week') setCursor(addDays(cursor, -7));
          else setSelected(prev => { const base = prev || today; const next = addDays(base, -1); setCursor(new Date(next.getFullYear(), next.getMonth(), 1)); return next; });
        }}><Text style={{ fontSize: 18 }}>‹</Text></TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800' }}>{activeTab === 'Year' ? year : `${months[month]} ${year}`}</Text>
        <TouchableOpacity onPress={() => {
          if (activeTab === 'Year') setCursor(new Date(year + 1, month, 1));
          else if (activeTab === 'Month') setCursor(new Date(year, month + 1, 1));
          else if (activeTab === 'Week') setCursor(addDays(cursor, 7));
          else setSelected(prev => { const base = prev || today; const next = addDays(base, 1); setCursor(new Date(next.getFullYear(), next.getMonth(), 1)); return next; });
        }}><Text style={{ fontSize: 18 }}>›</Text></TouchableOpacity>
      </View>

      {activeTab !== 'Year' && (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            {weekTR.map(w => (<Text key={w} style={{ width: 36, textAlign: 'center', color: '#9AA0A6', fontWeight: '700' }}>{w}</Text>))}
          </View>
          {activeTab === 'Month' && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {cells.map((c, idx) => (
                <TouchableOpacity key={idx} disabled={!c.inMonth} onPress={() => { const d = new Date(year, month, c.day); setSelected(d); onSelect(toLabel(d)); }} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: c.inMonth && isSelected(c.day) ? '#FFBB01' : 'transparent' }}>
                  <Text style={{ fontWeight: '700', color: c.inMonth ? '#191D20' : '#C6C6C6' }}>{c.day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {activeTab === 'Week' && (() => {
            const start = startOfWeekMon(selected || new Date(year, month, 1));
            const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {days.map((d, idx) => (
                  <TouchableOpacity key={idx} onPress={() => { setSelected(d); onSelect(toLabel(d)); }} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: selected && d.toDateString() === selected.toDateString() ? '#FFBB01' : 'transparent' }}>
                    <Text style={{ fontWeight: '700' }}>{d.getDate()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })()}
          {activeTab === 'Day' && selected && (
            <View style={{ alignItems: 'center', paddingVertical: 8 }}>
              <Text style={{ fontSize: 32, fontWeight: '800' }}>{selected.getDate()}</Text>
              <Text style={{ color: '#6B7280' }}>{months[selected.getMonth()]} {selected.getFullYear()}</Text>
            </View>
          )}
        </View>
      )}

      {activeTab === 'Year' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {months.map((m, idx) => (
            <TouchableOpacity key={m} onPress={() => setCursor(new Date(year, idx, 1))} style={{ width: '30%', marginBottom: 12, backgroundColor: idx === month ? '#FFBB01' : '#F5F5F5', borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontWeight: '700', color: '#191D20' }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', marginTop: 4 }}>
        <Text style={{ color: '#191D20', fontWeight: '600' }}>Kapat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: scale(56), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsiveSpacing.md, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  headerBtn: { padding: responsiveSpacing.sm },
  headerTitle: { fontSize: responsiveFontSize.base, fontWeight: '700', color: '#191D20' },
  content: { padding: responsiveSpacing.md, gap: responsiveSpacing.sm, paddingBottom: responsiveSpacing['2xl'] },
  tabsRow: { flexDirection: 'row', gap: responsiveSpacing.sm, marginBottom: responsiveSpacing.xs },
  tabBtn: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.xs, backgroundColor: '#FFFFFF' },
  tabBtnActive: { backgroundColor: '#FFE08D', borderColor: '#FFE08D' },
  tabText: { color: '#191D20', fontWeight: '600' },
  tabTextActive: { color: '#191D20' },
  label: { fontSize: responsiveFontSize.sm, color: '#191D20', marginTop: responsiveSpacing.sm },
  input: { backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, color: '#191D20' },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md },
  inputText: { color: '#191D20' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: responsiveSpacing.sm, marginTop: responsiveSpacing.sm },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#C9CDD2' },
  checkboxChecked: { backgroundColor: '#FFBB01', borderColor: '#FFBB01' },
  checkboxLabel: { color: '#191D20', fontSize: responsiveFontSize.base },
  textArea: { backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, textAlignVertical: 'top', color: '#191D20', height: scale(220), marginTop: responsiveSpacing.sm },
  saveButton: { backgroundColor: '#FFBB01', borderRadius: scale(14), paddingVertical: responsiveSpacing.md, alignItems: 'center', marginTop: responsiveSpacing.lg },
  saveButtonText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
  modalBackdrop: { flex: 1, justifyContent: 'center', padding: 16 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden' },
  confirmBackdrop: { flex: 1, justifyContent: 'flex-end' },
  confirmCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 },
  confirmHandle: { width: 140, height: 6, borderRadius: 3, backgroundColor: '#D8D8D8', alignSelf: 'center', marginBottom: 16 },
  confirmTitle: { fontSize: 20, fontWeight: '800', color: '#191D20', textAlign: 'center', marginBottom: 6 },
  confirmDesc: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 16 },
  confirmPrimary: { backgroundColor: '#FFBB01', borderRadius: scale(14), paddingVertical: responsiveSpacing.md, alignItems: 'center', marginBottom: 10 },
  confirmPrimaryText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
  confirmSecondary: { backgroundColor: '#E9E9EB', borderRadius: scale(14), paddingVertical: responsiveSpacing.md, alignItems: 'center' },
  confirmSecondaryText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
});

export default EducationScreen;


