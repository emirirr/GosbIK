import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

type Props = { onBack: () => void };

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M6.8 13.001l2.9 2.9c.183.183.275.417.275.7s-.092.517-.275.7c-.183.183-.416.275-.7.275s-.517-.092-.7-.275L3.7 12.701a.97.97 0 01-.212-.625c0-.133.021-.258.063-.375.042-.116.113-.225.213-.325L8.3 6.701c.183-.183.416-.275.7-.275.283 0 .517.092.7.275.183.183.275.417.275.7 0 .283-.092.517-.275.7l-2.9 2.9H20c.283 0 .52.096.712.288.192.192.288.43.288.713 0 .283-.096.521-.288.713-.192.192-.429.288-.712.288H6.8z" fill={color} />
  </Svg>
);

const PencilIcon: React.FC = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#191D20" />
  </Svg>
);

const UserCircleIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-8 1.34-8 4v2h16v-2c0-2.66-4.67-4-8-4z" fill="#191D20" />
  </Svg>
);

const PhoneIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18 19.5 19.5 0 0 1 5.19 12 19.8 19.8 0 0 1 2 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8.54 9.29a16 16 0 0 0 6.17 6.17l.84-.84a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z" fill="#191D20" />
  </Svg>
);

const SettingsIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.65l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.026 7.026 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.93 1h-3.86a.5.5 0 0 0-.49.41l-.36 2.54c-.58.23-1.12.54-1.63.94l-2.39-.96a.5.5 0 0 0-.61.22L.87 7.88a.5.5 0 0 0 .12.65l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L.99 13.57a.5.5 0 0 0-.12.65l1.92 3.32c.13.23.41.32.65.22l2.39-.96c.51.39 1.06.71 1.63.94l.36 2.54c.04.24.25.41.49.41h3.86c.24 0 .45-.17.49-.41l.36-2.54c.58-.23 1.12-.54 1.63-.94l2.39.96c.24.1.52.01.65-.22l1.92-3.32a.5.5 0 0 0-.12-.65l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z" fill="#191D20" />
  </Svg>
);

const BookmarkIcon: React.FC = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" fill="#191D20" />
  </Svg>
);

const LogoutIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M16 17l1.41-1.41L13.83 12l3.58-3.59L16 7l-5 5 5 5z" fill="#191D20"/>
    <Path d="M20 19H10a1 1 0 0 1-1-1v-3h2v2h8V7h-8v2H9V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1z" fill="#191D20"/>
  </Svg>
);

const ChevronRight: React.FC = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke="#191D20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ProfileScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFBB01" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBanner}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <BackIcon color="#191D20" />
          </TouchableOpacity>
          <View style={styles.avatarOuter}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328d13da?w=256&h=256&fit=crop' }}
              style={styles.avatar}
            />
            <View style={styles.editBadge}>
              <View style={styles.editBadgeInner}>
                <PencilIcon />
              </View>
            </View>
          </View>
          <Text style={styles.name}>Mustafa KOÇAK</Text>
          <Text style={styles.title}>Grafik Tasarımcı</Text>
        </View>

        <View style={styles.menuList}>
          <MenuItem icon={<UserCircleIcon />} label="Hesabım" />
          <MenuItem icon={<PhoneIcon />} label="Gosbik İletişim" />
          <MenuItem icon={<SettingsIcon />} label="Ayarlar" />
          <MenuItem icon={<BookmarkIcon />} label="Kaydedilenler" />
          <MenuItem icon={<LogoutIcon />} label="Oturumu Kapat" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconWrap}>{icon}</View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  scroll: { paddingBottom: 24 },
  topBanner: {
    backgroundColor: '#FFBB01',
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backBtn: { position: 'absolute', left: 12, top: 10, padding: 6 },
  avatarOuter: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  editBadgeInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { marginTop: 16, fontSize: 18, fontWeight: '800', color: '#191D20' },
  title: { marginTop: 4, fontSize: 13, color: '#191D20' },

  menuList: { paddingHorizontal: 12, marginTop: 14, gap: 12 },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFBB01',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: { fontSize: 14, color: '#191D20', fontWeight: '600' },
});

export default ProfileScreen;



