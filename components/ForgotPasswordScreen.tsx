import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

interface ForgotPasswordScreenProps {
  onSendPassword: (email: string) => void;
  onBackToLogin: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSendPassword,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');

  const handleSendPassword = () => {
    onSendPassword(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ŞİFRE SIFIRLAMA</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Şifre Almak için</Text>
          <Text style={styles.instructionsText}>E-mail Adresinizi Girin</Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <Image 
              source={require('../assets/images/icons/mail.png')} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Send Password Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendPassword}>
          <Text style={styles.sendButtonText}>Şifre Gönder</Text>
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/splash/splash logo.png')} 
            style={styles.logoImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'center',
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#191D20',
  },
  sendButton: {
    backgroundColor: '#FFBB01',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
  },
  logoText2Container: {
    backgroundColor: '#191D20',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 2,
  },
  logoImage: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
});

export default ForgotPasswordScreen;
