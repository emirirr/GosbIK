import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen visible={true} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GosbIK</Text>
      <Text style={styles.subtitle}>Hoş Geldiniz!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    opacity: 0.8,
  },
});
