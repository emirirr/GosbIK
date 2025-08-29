import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, UIManager, findNodeHandle, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { scale, responsiveSpacing, responsiveFontSize, responsiveIconSize } from '../utils/responsive';

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

const ArrowDownIcon: React.FC = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M7 10l5 5 5-5" stroke="#191D20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AboutMeScreen: React.FC<Props> = ({ onBack }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [name, setName] = useState('Mustafa Koçak');
  const [dob, setDob] = useState('27 Ekim 1985');
  const [email, setEmail] = useState('emir@gosbik.com');
  const [phone, setPhone] = useState('123 456 78 90');
  const [address, setAddress] = useState('New York Mh. Wall Street Cd. Gebze / Kocaeli');
  const [licenseType, setLicenseType] = useState('Ehliyet Türünü Seç');
  const [docType, setDocType] = useState('Belge Türünü Seç');
  const [about, setAbout] = useState('Bana kendinden bahset');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showLicensePicker, setShowLicensePicker] = useState(false);
  const [showDocPicker, setShowDocPicker] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countryAnchor, setCountryAnchor] = useState<{x:number;y:number;width:number;height:number}|null>(null);
  const [licenseAnchor, setLicenseAnchor] = useState<{x:number;y:number;width:number;height:number}|null>(null);
  const [docAnchor, setDocAnchor] = useState<{x:number;y:number;width:number;height:number}|null>(null);
  const countryRef = useRef<View>(null);
  const licenseRef = useRef<View>(null);
  const docRef = useRef<View>(null);
  const [countryCode, setCountryCode] = useState('+90');

  const countryOptions = ['+90', '+1', '+44', '+49', '+33', '+7'];
  const licenseOptions = ['A', 'A2', 'B', 'BE', 'C', 'CE', 'D'];
  const docOptions = ['Sürücü Belgesi', 'Kimlik Kartı', 'Pasaport'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hakkımda</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Adı Soyadı</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Ad Soyad" placeholderTextColor="#9AA0A6" />

        <Text style={styles.label}>Doğum Tarihi</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowCalendar(true)}>
          <View style={styles.inputWithIcon}>
            <TextInput value={dob} editable={false} style={styles.inputFlex} placeholder="GG AA YYYY" placeholderTextColor="#9AA0A6" />
            <CalendarIcon />
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>Cinsiyet</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity style={styles.genderItem} onPress={() => setGender('male')}>
            <View style={[styles.radioOuter, gender === 'male' && styles.radioOuterActive]}
            >
              {gender === 'male' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Erkek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genderItem} onPress={() => setGender('female')}>
            <View style={[styles.radioOuter, gender === 'female' && styles.radioOuterActive]}>
              {gender === 'female' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Kadın</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Email Adres</Text>
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} placeholder="mail@ornek.com" placeholderTextColor="#9AA0A6" />

        <Text style={styles.label}>Telefon</Text>
        <View style={styles.phoneRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.countryCode}
            onPress={() => {
              const node = findNodeHandle(countryRef.current);
              if (node) {
                UIManager.measureInWindow(node, (x, y, width, height) => {
                  setCountryAnchor({ x, y, width, height });
                  setShowCountryPicker(true);
                });
              } else {
                setShowCountryPicker(true);
              }
            }}
            ref={countryRef}
          > 
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
          <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.phoneInput} placeholder="Telefon" placeholderTextColor="#9AA0A6" />
        </View>

        <Text style={styles.label}>Adres</Text>
        <TextInput value={address} onChangeText={setAddress} style={styles.input} placeholder="Adres" placeholderTextColor="#9AA0A6" />

        <View style={styles.row2}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.selectBox}
            onPress={() => {
              const node = findNodeHandle(licenseRef.current);
              if (node) {
                UIManager.measureInWindow(node, (x, y, width, height) => {
                  setLicenseAnchor({ x, y, width, height });
                  setShowLicensePicker(true);
                });
              } else {
                setShowLicensePicker(true);
              }
            }}
            ref={licenseRef}
          > 
            <Text style={styles.selectText}>{licenseType}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.selectBox}
            onPress={() => {
              const node = findNodeHandle(docRef.current);
              if (node) {
                UIManager.measureInWindow(node, (x, y, width, height) => {
                  setDocAnchor({ x, y, width, height });
                  setShowDocPicker(true);
                });
              } else {
                setShowDocPicker(true);
              }
            }}
            ref={docRef}
          > 
            <Text style={styles.selectText}>{docType}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Hakkımda</Text>
        <TextInput value={about} onChangeText={setAbout} style={styles.textArea} multiline numberOfLines={5} />

        <TouchableOpacity style={styles.saveButton} onPress={() => setShowConfirm(true)}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="fade" onRequestClose={() => setShowCalendar(false)}>
        <View style={styles.calendarBackdrop}>
          <View style={styles.calendarCard}>
            <CalendarLikeMonth onClose={() => setShowCalendar(false)} onSelect={(label) => { setDob(label); setShowCalendar(false); }} />
          </View>
        </View>
      </Modal>

      {/* Country Code Picker */}
      <AnchoredDropdown
        visible={showCountryPicker}
        anchor={countryAnchor}
        options={countryOptions}
        selected={countryCode}
        onClose={() => setShowCountryPicker(false)}
        onSelect={(opt) => { setCountryCode(opt); setShowCountryPicker(false); }}
      />

      {/* License Picker */}
      <AnchoredDropdown
        visible={showLicensePicker}
        anchor={licenseAnchor}
        options={licenseOptions}
        selected={licenseType}
        onClose={() => setShowLicensePicker(false)}
        onSelect={(opt) => { setLicenseType(opt); setShowLicensePicker(false); }}
      />

      {/* Document Picker */}
      <AnchoredDropdown
        visible={showDocPicker}
        anchor={docAnchor}
        options={docOptions}
        selected={docType}
        onClose={() => setShowDocPicker(false)}
        onSelect={(opt) => { setDocType(opt); setShowDocPicker(false); }}
      />

      {/* Confirm Save Modal */}
      <Modal visible={showConfirm} transparent animationType="fade" onRequestClose={() => setShowConfirm(false)}>
        <View style={styles.confirmBackdrop}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject as any} />
          <View style={styles.confirmCard}>
            <View style={styles.confirmHandle} />
            <Text style={styles.confirmTitle}>Emin misin</Text>
            <Text style={styles.confirmDesc}>Bilgileri değiştirmek istediğinizden emin misiniz?</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    height: scale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerBtn: { padding: responsiveSpacing.sm },
  headerTitle: { fontSize: responsiveFontSize.base, fontWeight: '700', color: '#191D20' },
  content: { padding: responsiveSpacing.md, gap: responsiveSpacing.sm, paddingBottom: responsiveSpacing['2xl'] },
  label: { fontSize: responsiveFontSize.sm, color: '#191D20', marginTop: responsiveSpacing.sm },
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: scale(12),
    paddingHorizontal: responsiveSpacing.md,
    paddingVertical: responsiveSpacing.md,
    color: '#191D20',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    borderRadius: scale(12),
    paddingHorizontal: responsiveSpacing.md,
    paddingVertical: responsiveSpacing.md,
  },
  inputFlex: { flex: 1, marginRight: responsiveSpacing.sm, color: '#191D20' },
  genderRow: { flexDirection: 'row', gap: responsiveSpacing.md },
  genderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: scale(12),
    paddingHorizontal: responsiveSpacing.lg,
    paddingVertical: responsiveSpacing.md,
    flex: 1,
  },
  radioOuter: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    borderWidth: 2,
    borderColor: '#C9CDD2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveSpacing.sm,
  },
  radioOuterActive: { borderColor: '#191D20' },
  radioInner: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: '#FFBB01',
  },
  genderText: { color: '#191D20', fontSize: responsiveFontSize.base },
  phoneRow: { flexDirection: 'row', gap: responsiveSpacing.sm, alignItems: 'center' },
  countryCode: {
    minWidth: scale(100),
    backgroundColor: '#F1F1F1',
    borderRadius: scale(12),
    paddingHorizontal: responsiveSpacing.md,
    paddingVertical: responsiveSpacing.md,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeText: { color: '#191D20', fontSize: responsiveFontSize.base },
  phoneInput: { flex: 1, backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, color: '#191D20', fontSize: responsiveFontSize.base },
  row2: { flexDirection: 'row', gap: responsiveSpacing.sm },
  selectBox: { flex: 1, backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md },
  selectText: { color: '#9AA0A6', flex: 1 },
  textArea: { backgroundColor: '#F1F1F1', borderRadius: scale(12), paddingHorizontal: responsiveSpacing.md, paddingVertical: responsiveSpacing.md, textAlignVertical: 'top', color: '#191D20', height: scale(140) },
  saveButton: { backgroundColor: '#FFBB01', borderRadius: scale(14), paddingVertical: responsiveSpacing.md, alignItems: 'center', marginTop: responsiveSpacing.lg },
  saveButtonText: { color: '#191D20', fontWeight: '700', fontSize: responsiveFontSize.base },
  calendarBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 },
  calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden' },
  confirmBackdrop: { flex: 1, justifyContent: 'flex-end' },
  confirmCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 },
  confirmHandle: { width: 140, height: 6, borderRadius: 3, backgroundColor: '#D8D8D8', alignSelf: 'center', marginBottom: 16 },
  confirmTitle: { fontSize: 20, fontWeight: '800', color: '#191D20', textAlign: 'center', marginBottom: 6 },
  confirmDesc: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 16 },
  confirmPrimary: { backgroundColor: '#FFBB01', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  confirmPrimaryText: { color: '#191D20', fontWeight: '700', fontSize: 16 },
  confirmSecondary: { backgroundColor: '#E9E9EB', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  confirmSecondaryText: { color: '#191D20', fontWeight: '700', fontSize: 16 },
});

// Lightweight calendar with Day / Week / Month / Year tabs
const CalendarLikeMonth: React.FC<{ onSelect: (label: string) => void; onClose: () => void }> = ({ onSelect, onClose }) => {
  const monthsTR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const weekTR = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(today);
  const [activeTab, setActiveTab] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekdaySun0 = new Date(year, month, 1).getDay(); // 0: Sun
  const daysInPrev = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (firstWeekdaySun0 + 6) % 7; // Monday-first index
  const totalCells = 42; // 6 weeks
  const cells: { day: number; inMonth: boolean }[] = [];
  // leading prev days
  for (let i = leading; i > 0; i--) cells.push({ day: daysInPrev - i + 1, inMonth: false });
  // current month days
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true });
  // trailing next days
  while (cells.length < totalCells) cells.push({ day: cells.length - (leading + daysInMonth) + 1, inMonth: false });

  const isSelected = (d: number) => selected && selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;

  // Helpers
  const toLabel = (d: Date) => `${d.getDate()} ${monthsTR[d.getMonth()]} ${d.getFullYear()}`;
  const startOfWeekMon = (d: Date) => {
    const x = new Date(d);
    const day = (x.getDay() + 6) % 7; // 0..6 Mon-first
    x.setDate(x.getDate() - day);
    x.setHours(0,0,0,0);
    return x;
  };
  const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        {(['Day','Week','Month','Year'] as const).map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <View style={{ backgroundColor: activeTab === tab ? '#FFBB01' : '#F5F5F5', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18 }}>
              <Text style={{ color: '#191D20', fontWeight: '700', opacity: activeTab === tab ? 1 : 0.7 }}>{tab}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Month Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => {
          if (activeTab === 'Year') setCursor(new Date(year - 1, month, 1));
          else if (activeTab === 'Month') setCursor(new Date(year, month - 1, 1));
          else if (activeTab === 'Week') setCursor(addDays(cursor, -7));
          else setSelected(prev => { const base = prev || today; const next = addDays(base, -1); setCursor(new Date(next.getFullYear(), next.getMonth(), 1)); return next; });
        }}><Text style={{ fontSize: 18 }}>‹</Text></TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800' }}>
          {activeTab === 'Year' ? year : `${monthsTR[month]} ${year}`}
        </Text>
        <TouchableOpacity onPress={() => {
          if (activeTab === 'Year') setCursor(new Date(year + 1, month, 1));
          else if (activeTab === 'Month') setCursor(new Date(year, month + 1, 1));
          else if (activeTab === 'Week') setCursor(addDays(cursor, 7));
          else setSelected(prev => { const base = prev || today; const next = addDays(base, 1); setCursor(new Date(next.getFullYear(), next.getMonth(), 1)); return next; });
        }}><Text style={{ fontSize: 18 }}>›</Text></TouchableOpacity>
      </View>

      {/* Views */}
      {activeTab !== 'Year' && (
        <View>
          {/* Week labels */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            {weekTR.map(w => (<Text key={w} style={{ width: 36, textAlign: 'center', color: '#9AA0A6', fontWeight: '700' }}>{w}</Text>))}
          </View>
          {activeTab === 'Month' && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {cells.map((c, idx) => {
                const baseStyle: any = { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 10 };
                const textStyle: any = { fontWeight: '700', color: c.inMonth ? '#191D20' : '#C6C6C6' };
                const selectedStyle = c.inMonth && isSelected(c.day) ? { backgroundColor: '#FFBB01' } : {};
                return (
                  <TouchableOpacity
                    key={idx}
                    disabled={!c.inMonth}
                    onPress={() => { const d = new Date(year, month, c.day); setSelected(d); onSelect(toLabel(d)); }}
                    style={[baseStyle, selectedStyle]}
                  >
                    <Text style={textStyle}>{c.day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          {activeTab === 'Week' && (() => {
            const start = startOfWeekMon(new Date(year, month, (selected && selected.getMonth() === month && selected.getFullYear() === year) ? selected.getDate() : 1));
            const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {days.map((d, idx) => {
                  const sel = selected && d.toDateString() === selected.toDateString();
                  return (
                    <TouchableOpacity key={idx} onPress={() => { setSelected(d); onSelect(toLabel(d)); }} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: sel ? '#FFBB01' : 'transparent' }}>
                      <Text style={{ fontWeight: '700' }}>{d.getDate()}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })()}
          {activeTab === 'Day' && selected && (
            <View style={{ alignItems: 'center', paddingVertical: 8 }}>
              <Text style={{ fontSize: 32, fontWeight: '800' }}>{selected.getDate()}</Text>
              <Text style={{ color: '#6B7280' }}>{monthsTR[selected.getMonth()]} {selected.getFullYear()}</Text>
            </View>
          )}
        </View>
      )}

      {activeTab === 'Year' && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {monthsTR.map((m, idx) => (
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

const AnchoredDropdown: React.FC<{ visible: boolean; anchor: {x:number;y:number;width:number;height:number}|null; options: string[]; selected?: string; onSelect: (opt: string) => void; onClose: () => void }> = ({ visible, anchor, options, selected, onSelect, onClose }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const dropdownWidth = 220;
  const left = anchor ? Math.max(8, Math.min(anchor.x, screenWidth - dropdownWidth - 8)) : 16;
  const top = anchor ? anchor.y + (anchor.height || 0) + 6 : 120;
  if (!visible) return null;
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={onClose}>
        <View style={{ position: 'absolute', top, left, width: dropdownWidth, backgroundColor: '#EFEFEF', borderRadius: 14, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10 }}>
          {options.map((opt, idx) => (
            <TouchableOpacity key={opt} onPress={() => onSelect(opt)} style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
              <Text style={{ color: selected === opt ? '#191D20' : '#9AA0A6', fontSize: 14 }}>{opt}</Text>
              {idx < options.length - 1 && <View style={{ height: 1, backgroundColor: '#E2E2E2', marginTop: 10 }} />}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AboutMeScreen;


