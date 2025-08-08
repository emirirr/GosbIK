import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import { ThemeProvider } from './contexts/ThemeContext';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import VerificationScreen from './components/VerificationScreen';
import CreatePasswordScreen from './components/CreatePasswordScreen';
import MainScreen from './components/MainScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'register' | 'forgotPassword' | 'verification' | 'createPassword' | 'main'>('splash');

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
    setCurrentScreen('register');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password screen');
    setCurrentScreen('forgotPassword');
  };

  if (showSplash) {
    return <SplashScreen visible={true} />;
  }

  if (currentScreen === 'login') {
    return (
      <View style={styles.loginContainer}>
        <LoginScreen
          onLogin={handleLogin}
          onRegister={handleRegister}
          onForgotPassword={handleForgotPassword}
        />
        <StatusBar style="dark" />
      </View>
    );
  }

  if (currentScreen === 'register') {
    return (
      <View style={styles.loginContainer}>
        <RegisterScreen
          onRegister={(name, surname, email, password) => {
            console.log('Register attempt:', { name, surname, email, password });
            setCurrentScreen('main');
          }}
          onBackToLogin={() => setCurrentScreen('login')}
        />
        <StatusBar style="dark" />
      </View>
    );
  }

  if (currentScreen === 'forgotPassword') {
    return (
      <View style={styles.loginContainer}>
        <ForgotPasswordScreen
          onSendPassword={(email) => {
            console.log('Send password attempt:', { email });
            setCurrentScreen('verification');
          }}
          onBackToLogin={() => setCurrentScreen('login')}
        />
        <StatusBar style="dark" />
      </View>
    );
  }

  if (currentScreen === 'verification') {
    return (
      <View style={styles.loginContainer}>
        <VerificationScreen
          onVerify={(code) => {
            console.log('Verification attempt:', { code });
            setCurrentScreen('createPassword');
          }}
          onBackToLogin={() => setCurrentScreen('login')}
          email="kullanıcı@gmail.com"
        />
        <StatusBar style="dark" />
      </View>
    );
  }

  if (currentScreen === 'createPassword') {
    return (
      <View style={styles.loginContainer}>
        <CreatePasswordScreen
          onCreatePassword={(password, confirmPassword) => {
            console.log('Create password attempt:', { password, confirmPassword });
            setCurrentScreen('main');
          }}
          onBackToLogin={() => setCurrentScreen('login')}
        />
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <MainScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
