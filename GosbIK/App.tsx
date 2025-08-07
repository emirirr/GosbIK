import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'main'>('splash');

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      setShowSplash(false);
      setCurrentScreen('login');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // Here you would typically handle authentication
    setCurrentScreen('main');
  };

  const handleRegister = () => {
    console.log('Navigate to register screen');
    // Navigate to register screen
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password screen');
    // Navigate to forgot password screen
  };

  if (showSplash) {
    return <SplashScreen visible={true} />;
  }

  if (currentScreen === 'login') {
    return (
      <View style={styles.container}>
        <LoginScreen
          onLogin={handleLogin}
          onRegister={handleRegister}
          onForgotPassword={handleForgotPassword}
        />
        <StatusBar style="dark" />
      </View>
    );
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
    backgroundColor: '#FFFFFF', // White background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Black text
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    opacity: 0.8,
  },
});
