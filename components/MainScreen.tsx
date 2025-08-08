import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Navbar from './Navbar';
import BottomTabNavigator from './BottomTabNavigator';

const MainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Ana Sayfa</Text>
            <Text style={styles.subtitle}>Hoş geldiniz!</Text>
          </View>
        );
      case 'ik':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>İnsan Kaynakları</Text>
            <Text style={styles.subtitle}>İK modülü</Text>
          </View>
        );
      case 'search':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Arama</Text>
            <Text style={styles.subtitle}>Arama modülü</Text>
          </View>
        );
      case 'industry':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Sanayi</Text>
            <Text style={styles.subtitle}>Sanayi modülü</Text>
          </View>
        );
      case 'menu':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Menü</Text>
            <Text style={styles.subtitle}>Menü modülü</Text>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Ana Sayfa</Text>
            <Text style={styles.subtitle}>Hoş geldiniz!</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <Navbar 
        showBack={false}
        showMenu={true}
        onMenu={() => console.log('Menu pressed')}
      />
      
      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {renderContent()}
      </ScrollView>
      
      {/* Bottom Tab Navigator */}
      <BottomTabNavigator 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});

export default MainScreen;
