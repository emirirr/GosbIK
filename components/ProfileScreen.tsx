import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NotificationIcon } from './icons/SvgIcons';

type Props = { onBack: () => void };

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M6.8 13.001l2.9 2.9c.183.183.275.417.275.7s-.092.517-.275.7c-.183.183-.416.275-.7.275s-.517-.092-.7-.275L3.7 12.701a.97.97 0 01-.212-.625c0-.133.021-.258.063-.375.042-.116.113-.225.213-.325L8.3 6.701c.183-.183.416-.275.7-.275.283 0 .517.092.7.275.183.183.275.417.275.7 0 .283-.092.517-.275.7l-2.9 2.9H20c.283 0 .52.096.712.288.192.192.288.43.288.713 0 .283-.096.521-.288.713-.192.192-.429.288-.712.288H6.8z" fill={color} />
  </Svg>
);

const ProfileScreen: React.FC<Props> = ({ onBack }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon width={24} height={24} color="#191D20" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../assets/images/splash/splash-logo.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Kullanıcı Adı</Text>
            <Text style={styles.userEmail}>user@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Text style={styles.editAvatarText}>Düzenle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hesap</Text>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Ad Soyad</Text>
            <Text style={styles.rowValue}>Kullanıcı Adı</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>E-posta</Text>
            <Text style={styles.rowValue}>user@example.com</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Telefon</Text>
            <Text style={styles.rowValue}>+90 5xx xxx xx xx</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Bilgileri Düzenle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bildirimler</Text>
          <View style={styles.rowSwitch}>
            <Text style={styles.rowLabel}>Push Bildirimleri</Text>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} thumbColor="#FFBB01" />
          </View>
          <View style={styles.rowSwitch}>
            <Text style={styles.rowLabel}>E-posta Bildirimleri</Text>
            <Switch value={emailEnabled} onValueChange={setEmailEnabled} thumbColor="#FFBB01" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Güvenlik</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Şifreyi Değiştir</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  notificationButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16, paddingBottom: 24 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#F3F3F3', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  avatarImage: { width: 52, height: 52 },
  userInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 16, fontWeight: '800', color: '#191D20' },
  userEmail: { fontSize: 12, color: '#666666', marginTop: 2 },
  editAvatarBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#FFBB01', borderRadius: 6, borderWidth: 1, borderColor: '#191D20' },
  editAvatarText: { color: '#191D20', fontWeight: '700', fontSize: 12 },

  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0', padding: 12, marginBottom: 16 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#191D20', marginBottom: 10 },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  rowLabel: { color: '#191D20', fontWeight: '600' },
  rowValue: { color: '#666666' },
  rowSwitch: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },

  primaryButton: { marginTop: 12, backgroundColor: '#FFBB01', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: '#191D20', fontWeight: '800' },
  secondaryButton: { marginTop: 4, backgroundColor: '#F3F3F3', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  secondaryButtonText: { color: '#191D20', fontWeight: '700' },
  logoutButton: { marginTop: 8, backgroundColor: '#FFE8A3', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#FFBB01' },
  logoutText: { color: '#191D20', fontWeight: '800' },
});

export default ProfileScreen;



