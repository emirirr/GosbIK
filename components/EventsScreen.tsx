import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Image, ScrollView, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NotificationIcon, MapPinIcon } from './icons/SvgIcons';

type EventItem = {
  id: number;
  title: string;
  organizer: string;
  location: string;
  date: string; // e.g. "27 Ekim"
  year: string; // e.g. "2025"
};

type Props = {
  onBack: () => void;
  events: EventItem[];
};

const YonIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6.7998 13.0008L9.6998 15.9008C9.88314 16.0841 9.9748 16.3174 9.9748 16.6008C9.9748 16.8841 9.88314 17.1174 9.6998 17.3008C9.51647 17.4841 9.28314 17.5758 8.9998 17.5758C8.71647 17.5758 8.48314 17.4841 8.2998 17.3008L3.6998 12.7008C3.5998 12.6008 3.52897 12.4924 3.4873 12.3758C3.44564 12.2591 3.4248 12.1341 3.4248 12.0008C3.4248 11.8674 3.44564 11.7424 3.4873 11.6258C3.52897 11.5091 3.5998 11.4008 3.6998 11.3008L8.2998 6.70078C8.48314 6.51745 8.71647 6.42578 8.9998 6.42578C9.28314 6.42578 9.51647 6.51745 9.6998 6.70078C9.88314 6.88411 9.9748 7.11745 9.9748 7.40078C9.9748 7.68411 9.88314 7.91745 9.6998 8.10078L6.7998 11.0008H19.9998C20.2831 11.0008 20.5206 11.0966 20.7123 11.2883C20.904 11.4799 20.9998 11.7174 20.9998 12.0008C20.9998 12.2841 20.904 12.5216 20.7123 12.7133C20.5206 12.9049 20.2831 13.0008 19.9998 13.0008H6.7998Z" fill={color} />
  </Svg>
);

const MegaphoneIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path d="M11.5 8C11.42 8 11.346 7.982 11.277 7.948L10.277 7.448C10.158 7.388 10.068 7.284 10.026 7.158C9.984 7.033 9.994 6.895 10.053 6.777C10.112 6.658 10.216 6.568 10.342 6.526C10.468 6.484 10.605 6.493 10.724 6.553L11.724 7.053C11.906 7.144 12.012 7.334 11.987 7.527C11.962 7.721 11.808 7.878 11.618 7.938C11.579 7.953 11.539 7.961 11.5 7.961V8ZM10.724 3.45L11.724 2.95C11.842 2.891 11.933 2.787 11.975 2.661C12.017 2.535 12.007 2.398 11.948 2.279C11.888 2.16 11.784 2.07 11.658 2.028C11.533 1.986 11.395 1.996 11.276 2.055L10.276 2.555C10.158 2.614 10.067 2.718 10.025 2.844C9.984 2.97 9.993 3.107 10.053 3.226C10.112 3.345 10.216 3.435 10.342 3.477C10.468 3.519 10.605 3.509 10.724 3.45ZM12 5C12 4.867 11.947 4.74 11.854 4.646C11.76 4.553 11.633 4.5 11.5 4.5H10.5C10.367 4.5 10.24 4.553 10.146 4.646C10.053 4.74 10 4.867 10 5C10 5.133 10.053 5.26 10.146 5.354C10.24 5.447 10.367 5.5 10.5 5.5H11.5C11.633 5.5 11.76 5.447 11.854 5.354C11.947 5.26 12 5.133 12 5ZM4.093 8.5H2C1.767 8.499 1.535 8.471 1.309 8.417L2.559 11.208C2.664 11.443 2.835 11.644 3.052 11.785C3.268 11.925 3.521 12 3.779 12C3.984 11.999 4.187 11.948 4.367 11.85C4.547 11.751 4.7 11.609 4.811 11.437C4.923 11.264 4.989 11.066 5.005 10.862C5.02 10.657 4.984 10.451 4.9 10.264L4.093 8.5Z" fill="#191D20"/>
  </Svg>
);

const FilterIcon: React.FC = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M4 7H20" stroke="#191D20" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M7 12H17" stroke="#191D20" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M10 17H14" stroke="#191D20" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

const EventsScreen: React.FC<Props> = ({ onBack, events }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [cursor, setCursor] = useState<Date>(new Date());

  const startOfWeek = useMemo(() => {
    const d = new Date();
    const day = d.getDay(); // 0=Sun
    const diff = (day === 0 ? -6 : 1) - day; // to Monday
    const monday = new Date(d);
    monday.setDate(d.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }, []);

  const weekDays: Date[] = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const dt = new Date(startOfWeek);
      dt.setDate(startOfWeek.getDate() + i);
      return dt;
    });
  }, [startOfWeek]);

  const longDateTr = useMemo(
    () => selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    [selectedDate]
  );

  const startEndOfWeekText = useMemo(() => {
    const end = new Date(startOfWeek);
    end.setDate(startOfWeek.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\s/g, '');
    return `${fmt(startOfWeek)} - ${fmt(end)}`;
  }, [startOfWeek]);

  // Month matrix (Mon-first) for calendar
  const monthMatrix = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    // Monday index: 1..7; convert JS 0..6
    const jsDow = first.getDay();
    const mondayIndex = (jsDow + 6) % 7; // 0 for Mon, ... 6 for Sun
    const daysInPrevMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 0).getDate();
    const daysInMonth = last.getDate();
    const cells: { day: number; inMonth: boolean; date: Date }[] = [];
    // leading days
    for (let i = mondayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const d = new Date(cursor.getFullYear(), cursor.getMonth() - 1, day);
      cells.push({ day, inMonth: false, date: d });
    }
    // month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, inMonth: true, date: new Date(cursor.getFullYear(), cursor.getMonth(), d) });
    }
    // trailing to 42 cells
    let nextDay = 1;
    while (cells.length % 7 !== 0 || cells.length < 42) {
      const d = new Date(cursor.getFullYear(), cursor.getMonth() + 1, nextDay);
      cells.push({ day: nextDay, inMonth: false, date: d });
      nextDay++;
    }
    // split rows of 7
    const rows: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [cursor]);

  const renderEvent = ({ item }: { item: EventItem }) => (
    <View style={styles.eventCardWrapper}>
      <View style={styles.stripeBehind} />
      <View style={styles.eventCardAlt}>
        <View style={styles.leftYellowStrip} />
        <View style={styles.cardInner}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardLabel}>Düzenleyici:</Text>
          <View style={styles.row}>
            <View style={styles.iconWrap}><MegaphoneIcon /></View>
            <Text style={styles.cardText}>{item.organizer}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.iconWrap}><MapPinIcon width={12} height={12} color="#191D20" /></View>
            <Text style={styles.cardText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <YonIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yaklaşan Etkinlikler</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon width={24} height={24} color="#191D20" />
        </TouchableOpacity>
      </View>

      {/* Filter/date bar */}
      <View style={styles.controlsContainer}>
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton}>
            <FilterIcon />
          </TouchableOpacity>
          <View style={styles.dateTextContainer}>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Text style={styles.dateText}>{longDateTr}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
          {weekDays.map((d) => {
            const isActive = d.toDateString() === selectedDate.toDateString();
            const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = d.getDate();
            return (
              <TouchableOpacity
                key={d.toISOString()}
                style={[styles.dayChip, isActive && styles.dayChipActive]}
                onPress={() => setSelectedDate(d)}
              >
                <Text style={[styles.dayChipWeek, isActive && styles.dayChipWeekActive]}>{weekday}</Text>
                <Text style={[styles.dayChipNum, isActive && styles.dayChipNumActive]}>{dayNum}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Date range header */}
      <View style={styles.rangeHeader}>
        <Text style={styles.rangeText}>{startEndOfWeekText}</Text>
        <Text style={styles.rangeHint}>Tarihleri Arasında</Text>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="fade" onRequestClose={() => setShowCalendar(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.tabsRow}>
              {(['day','week','month','year'] as const).map((m) => (
                <TouchableOpacity key={m} style={[styles.tab, calendarMode===m && styles.tabActive]} onPress={() => setCalendarMode(m)}>
                  <Text style={[styles.tabText, calendarMode===m && styles.tabTextActive]}>
                    {m==='day'?'Day':m==='week'?'Week':m==='month'?'Month':'Year'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {calendarMode === 'month' && (
              <>
                <View style={styles.monthHeader}>
                  <TouchableOpacity onPress={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()-1, 1))} style={styles.arrowBtn}>
                    <Svg width={18} height={18} viewBox="0 0 24 24"><Path d="M15 18L9 12L15 6" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></Svg>
                  </TouchableOpacity>
                  <Text style={styles.monthTitle}>
                    {cursor.toLocaleDateString('en-US', { month: 'long' })} {cursor.getFullYear()}
                  </Text>
                  <TouchableOpacity onPress={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()+1, 1))} style={styles.arrowBtn}>
                    <Svg width={18} height={18} viewBox="0 0 24 24"><Path d="M9 6L15 12L9 18" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></Svg>
                  </TouchableOpacity>
                </View>

                <View style={styles.weekdaysRow}>
                  {['MON','TUE','WED','THU','FRI','SAT','SUN'].map((wd) => (
                    <Text key={wd} style={styles.weekdayCell}>{wd}</Text>
                  ))}
                </View>
                {monthMatrix.map((row, idx) => (
                  <View key={idx} style={styles.monthRow}>
                    {row.map((cell, cidx) => {
                      const isSelected = selectedDate.toDateString() === cell.date.toDateString();
                      return (
                        <TouchableOpacity
                          key={cidx}
                          style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                          onPress={() => { setSelectedDate(cell.date); setCursor(new Date(cell.date)); setShowCalendar(false); }}
                        >
                          <Text style={[styles.dayCellText, !cell.inMonth && styles.dayCellTextMuted, isSelected && styles.dayCellTextSelected]}>
                            {cell.day}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191D20' },
  notificationButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  controlsContainer: { paddingHorizontal: 16, paddingTop: 8 },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    height: 44,
    overflow: 'hidden',
  },
  filterButton: {
    width: 68,
    height: '100%',
    backgroundColor: '#FFBB01',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTextContainer: { flex: 1, alignItems: 'flex-end', paddingRight: 12 },
  dateText: { color: '#191D20', fontWeight: '600' },
  daysRow: { paddingVertical: 12, gap: 10 },
  dayChip: {
    width: 64,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayChipActive: { backgroundColor: '#FFBB01' },
  dayChipWeek: { color: '#666666', fontWeight: '700', marginBottom: 6 },
  dayChipWeekActive: { color: '#191D20' },
  dayChipNum: { color: '#191D20', fontWeight: '800', fontSize: 20 },
  dayChipNumActive: { color: '#191D20' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  rangeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 },
  rangeText: { fontWeight: '800', color: '#191D20' },
  rangeHint: { color: '#191D20', opacity: 0.7 },

  eventCardWrapper: {
    width: 360,
    height: 170,
    alignSelf: 'center',
    marginLeft: 0,
    marginBottom: 16,
  },
  stripeBehind: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 360,
    height: 170,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  eventCardAlt: {
    width: 360,
    height: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    position: 'relative',
    opacity: 1,
    overflow: 'hidden',
  },
  stripeOverlay: {},
  leftYellowStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    opacity: 1,
  },
  cardLeftRail: {
    position: 'absolute',
    left: 10,
    top: 10,
    bottom: 10,
    width: 6,
    backgroundColor: '#FFBB01',
    borderRadius: 3,
  },
  cardInner: { paddingLeft: 24, paddingRight: 8 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#191D20', marginBottom: 12 },
  cardLabel: { fontSize: 13, fontWeight: '700', color: '#191D20', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconWrap: { width: 20, alignItems: 'center', marginRight: 6 },
  cardText: { color: '#666666', fontSize: 13, flex: 1 },

  // Calendar modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  tabsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 12 },
  tab: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#F3F3F3' },
  tabActive: { backgroundColor: '#FFBB01' },
  tabText: { color: '#191D20', fontWeight: '600' },
  tabTextActive: { color: '#191D20', fontWeight: '800' },
  monthHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  arrowBtn: { padding: 6 },
  monthTitle: { fontWeight: '800', color: '#191D20' },
  weekdaysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  weekdayCell: { width: 36, textAlign: 'center', color: '#999999', fontSize: 11, fontWeight: '700' },
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  dayCell: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  dayCellSelected: { backgroundColor: '#FFBB01' },
  dayCellText: { color: '#191D20', fontWeight: '700' },
  dayCellTextMuted: { color: '#C4C4C4' },
  dayCellTextSelected: { color: '#191D20' },
});

export default EventsScreen;


