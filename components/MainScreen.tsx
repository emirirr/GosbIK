import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
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
            <View style={styles.homeIconContainer}>
              <Svg width={120} height={120} viewBox="0 0 24 24" fill="none">
                <G clipPath="url(#clip0_3730_4282)">
                  <Path d="M12 14.9922C10.3432 14.9922 9 16.3353 9 17.9922V23.9922H15V17.9922C15 16.3353 13.6568 14.9922 12 14.9922Z" fill="#FFBB01"/>
                  <Path d="M17 17.9929V23.9929H21C22.6568 23.9929 24 22.6497 24 20.9929V11.8719C24.0002 11.3524 23.7983 10.8532 23.437 10.4799L14.939 1.29285C13.4396 -0.329491 10.9089 -0.4291 9.28655 1.07034C9.20949 1.14159 9.13523 1.21579 9.06403 1.29285L0.581016 10.4769C0.208734 10.8517 -0.000140554 11.3586 7.09607e-08 11.8869V20.9929C7.09607e-08 22.6497 1.34316 23.9929 3 23.9929H6.99998V17.9929C7.01869 15.2661 9.22027 13.0393 11.8784 12.9752C14.6255 12.9089 16.9791 15.1736 17 17.9929Z" fill="#FFBB01"/>
                  <Path d="M12 14.9922C10.3432 14.9922 9 16.3353 9 17.9922V23.9922H15V17.9922C15 16.3353 13.6568 14.9922 12 14.9922Z" fill="#FFBB01"/>
                </G>
                <Defs>
                  <ClipPath id="clip0_3730_4282">
                    <Rect width="24" height="24" fill="white"/>
                  </ClipPath>
                </Defs>
              </Svg>
            </View>
            <Text style={styles.homeTitle}>Ana Sayfa</Text>
            <Text style={styles.homeSubtitle}>Hoş geldiniz!</Text>
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
  homeIconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 10,
    textAlign: 'center',
  },
  homeSubtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
});

export default MainScreen;
