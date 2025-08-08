import React, { useState, useRef } from 'react';
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

interface VerificationScreenProps {
  onVerify: (code: string) => void;
  onBackToLogin: () => void;
  email?: string;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  onVerify,
  onBackToLogin,
  email = 'kullanıcı@gmail.com',
}) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    onVerify(verificationCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>KOD DOĞRULAMA</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>4 Haneli Doğrulama Kodunu Girin</Text>
          <Text style={styles.instructionsText}>{email} mail adresinize kod gönderildi!</Text>
        </View>

        {/* Verification Code Input */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Doğrula</Text>
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
    marginBottom: 40,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 12,
  },
  codeInput: {
    width: 60,
    height: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#FFBB01',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  verifyButtonText: {
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

export default VerificationScreen;
