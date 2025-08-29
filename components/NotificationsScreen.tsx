import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

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

const MenuIcon: React.FC = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"><Circle cx={12} cy={6} r={2} fill="#191D20"/><Circle cx={12} cy={12} r={2} fill="#191D20"/><Circle cx={12} cy={18} r={2} fill="#191D20"/></Svg>
);

const NotificationsScreen: React.FC<Props> = ({ onBack }) => {
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [items, setItems] = useState(Array.from({ length: 10 }).map((_, i) => ({ id: String(i+1), title: 'Lorem ipsum dolor sit amet consectetur.', unread: i < 3 })));
  const unreadCount = items.filter(i => i.unread).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <BellIcon />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Text style={{ color: '#191D20' }}>Bugün <Text style={{ fontWeight: '800' }}>{unreadCount} Bildiriminiz</Text> var.</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 24, gap: 10 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={[styles.dot, item.unread && styles.dotUnread]} />
              <View style={styles.avatar} />
              <Text numberOfLines={1} style={styles.cardText}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => setMenuFor(item.id)}>
              <MenuIcon />
            </TouchableOpacity>
            {menuFor === item.id && (
              <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => { setItems(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n)); setMenuFor(null); }}><Text>Okundu</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => { setItems(prev => prev.filter(n => n.id !== item.id)); setMenuFor(null); }}><Text>Sil</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => setMenuFor(null)}><Text>Bu...</Text></TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  headerBtn: { padding: 8 },
  headerTitle: { fontSize: 14, fontWeight: '700', color: '#191D20' },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F6F6F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 14, position: 'relative' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'transparent' },
  dotUnread: { backgroundColor: '#FFBB01' },
  avatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#E0E0E0' },
  cardText: { color: '#191D20', flex: 1 },
  menu: { position: 'absolute', right: 8, bottom: -98, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', overflow: 'hidden' },
  menuItem: { paddingHorizontal: 18, paddingVertical: 10 },
});

export default NotificationsScreen;


