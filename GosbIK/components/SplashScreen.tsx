import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  visible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Top black bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Splash Ekran</Text>
      </View>
      
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Logo container */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.gosbText}>Gosb</Text>
            <Text style={styles.ikContainer}>
              <Text style={styles.ikText}>ik</Text>
            </Text>
          </Text>
        </View>
      </View>
      
      {/* Bottom border */}
      <View style={styles.bottomBorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Yellow background
  },
  topBar: {
    backgroundColor: '#000000',
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  topBarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gosbText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  ikContainer: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 4,
  },
  ikText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomBorder: {
    height: 2,
    backgroundColor: '#000000',
  },
});

export default SplashScreen;
