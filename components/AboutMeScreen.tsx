import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
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
          <TouchableOpacity activeOpacity={0.8} style={styles.countryCode} onPress={() => setShowCountryPicker(true)}> 
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
          <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.phoneInput} placeholder="Telefon" placeholderTextColor="#9AA0A6" />
        </View>

        <Text style={styles.label}>Adres</Text>
        <TextInput value={address} onChangeText={setAddress} style={styles.input} placeholder="Adres" placeholderTextColor="#9AA0A6" />

        <View style={styles.row2}>
          <TouchableOpacity activeOpacity={0.8} style={styles.selectBox} onPress={() => setShowLicensePicker(true)}> 
            <Text style={styles.selectText}>{licenseType}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.selectBox} onPress={() => setShowDocPicker(true)}> 
            <Text style={styles.selectText}>{docType}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Hakkımda</Text>
        <TextInput value={about} onChangeText={setAbout} style={styles.textArea} multiline numberOfLines={5} />

        <TouchableOpacity style={styles.saveButton}>
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
      <PickerModal
        visible={showCountryPicker}
        title="Ülke Kodu"
        options={countryOptions}
        onClose={() => setShowCountryPicker(false)}
        onSelect={(opt) => { setCountryCode(opt); setShowCountryPicker(false); }}
      />

      {/* License Picker */}
      <PickerModal
        visible={showLicensePicker}
        title="Ehliyet Türü"
        options={licenseOptions}
        onClose={() => setShowLicensePicker(false)}
        onSelect={(opt) => { setLicenseType(opt); setShowLicensePicker(false); }}
      />

      {/* Document Picker */}
      <PickerModal
        visible={showDocPicker}
        title="Belge Türü"
        options={docOptions}
        onClose={() => setShowDocPicker(false)}
        onSelect={(opt) => { setDocType(opt); setShowDocPicker(false); }}
      />
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
  phoneRow: { flexDirection: 'row', gap: responsiveSpacing.sm },
  countryCode: {
    minWidth: scale(80),
    backgroundColor: '#F1F1F1',
    borderRadius: scale(12),
    paddingHorizontal: responsiveSpacing.md,
    paddingVertical: responsiveSpacing.md,
    justifyContent: 'center',
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
});

// Lightweight month calendar to match provided screenshot style without heavy deps
const CalendarLikeMonth: React.FC<{ onSelect: (label: string) => void; onClose: () => void }> = ({ onSelect, onClose }) => {
  const monthsTR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const weekTR = ['PZT','SAL','ÇAR','PER','CUM','CTS','PAZ'];
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0: Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (firstDay + 6) % 7; // convert to Mon-first
  const cells = Array.from({ length: leading + daysInMonth }, (_, i) => (i < leading ? null : i - leading + 1));
  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <View style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setCursor(new Date(year, month - 1, 1))}><Text style={{ fontSize: 18 }}>‹</Text></TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>{monthsTR[month]} {year}</Text>
        <TouchableOpacity onPress={() => setCursor(new Date(year, month + 1, 1))}><Text style={{ fontSize: 18 }}>›</Text></TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        {weekTR.map(w => (<Text key={w} style={{ width: 32, textAlign: 'center', color: '#9AA0A6', fontWeight: '700' }}>{w}</Text>))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' }}>
        {cells.map((d, idx) => (
          <TouchableOpacity key={idx} disabled={!d} onPress={() => onSelect(`${d} ${monthsTR[month]} ${year}`)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: d && isToday(d) ? '#FFBB01' : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#191D20', fontWeight: '700' }}>{d ? d : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', marginTop: 16 }}>
        <Text style={{ color: '#191D20', fontWeight: '600' }}>Kapat</Text>
      </TouchableOpacity>
    </View>
  );
};

const PickerModal: React.FC<{ visible: boolean; title: string; options: string[]; onSelect: (opt: string) => void; onClose: () => void }> = ({ visible, title, options, onSelect, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16 }}>
          <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 12, color: '#191D20' }}>{title}</Text>
          {options.map(opt => (
            <TouchableOpacity key={opt} onPress={() => onSelect(opt)} style={{ paddingVertical: 12 }}>
              <Text style={{ color: '#191D20', fontSize: 14 }}>{opt}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', marginTop: 8 }}>
            <Text style={{ color: '#191D20', fontWeight: '600' }}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AboutMeScreen;


