import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = { onBack: () => void };

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M6.8 13.001l2.9 2.9c.183.183.275.417.275.7s-.092.517-.275.7c-.183.183-.416.275-.7.275s-.517-.092-.7-.275L3.7 12.701a.97.97 0 01-.212-.625c0-.133.021-.258.063-.375.042-.116.113-.225.213-.325L8.3 6.701c.183-.183.416-.275.7-.275.283 0 .517.092.7.275.183.183.275.417.275.7 0 .283-.092.517-.275.7l-2.9 2.9H20c.283 0 .52.096.712.288.192.192.288.43.288.713 0 .283-.096.521-.288.713-.192.192-.429.288-.712.288H6.8z" fill={color} />
  </Svg>
);

const BellIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#191D20"/>
  </Svg>
);

const ContactScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gosbik İletişim</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>GosbİK Genel Merkez</Text>
        <Text style={styles.body}>Gebze OSB, İhsan Dede Cd. Gosb Teknopark,
41700 Gebze/Kocaeli</Text>

        <Text style={styles.subtitle}>Çalışma Saatleri:</Text>
        <Text style={styles.body}>Hafta içi 08:45-17:45</Text>

        <Text style={styles.subtitle}>Telefon:</Text>
        <Text style={styles.body}>+90 216 468 76 00</Text>

        <Text style={styles.subtitle}>Faks:</Text>
        <Text style={styles.body}>+90 212 326 91 75</Text>

        <Text style={styles.subtitle}>E-posta:</Text>
        <Text style={styles.body}>gosbik@gosbik.com</Text>

        <View style={styles.mapCard}>
          <Image
            source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Gebze%20OSB&zoom=13&size=600x300&maptype=roadmap&markers=color:orange%7C41.032,29.376' }}
            style={styles.mapImage}
          />
          <View style={styles.cornerStripe} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  headerBtn: { padding: 8 },
  headerTitle: { fontSize: 14, fontWeight: '700', color: '#191D20' },
  content: { padding: 16 },
  title: { fontSize: 18, fontWeight: '800', color: '#191D20', marginBottom: 8 },
  subtitle: { marginTop: 12, fontWeight: '700', color: '#191D20' },
  body: { color: '#191D20', marginTop: 4 },
  mapCard: { marginTop: 16, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#E0E0E0', position: 'relative' },
  mapImage: { width: '100%', height: 220, resizeMode: 'cover' },
  cornerStripe: { position: 'absolute', left: 0, top: 0, width: 4, height: '100%', backgroundColor: '#FFBB01' },
});

export default ContactScreen;


