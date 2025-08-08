import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  visible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Logo container */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/splash/splash logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBB01', // Brand yellow background
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 250,
    height: 120,
  },
});

export default SplashScreen;
