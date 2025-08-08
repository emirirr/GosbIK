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

interface RegisterScreenProps {
  onRegister: (name: string, surname: string, email: string, password: string) => void;
  onBackToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onBackToLogin,
}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleRegister = () => {
    onRegister(name, surname, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>HESAP OLUŞTUR</Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Gosbik'e Hoşgeldin!</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Name Input */}
          <View style={styles.inputField}>
            <Image 
              source={require('../assets/images/icons/fi-rr-user.png')} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="İsim"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Surname Input */}
          <View style={styles.inputField}>
            <Image 
              source={require('../assets/images/icons/fi-rr-user.png')} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Soyisim"
              placeholderTextColor="#999"
              value={surname}
              onChangeText={setSurname}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
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

          {/* Password Input */}
          <View style={styles.inputField}>
            <Image 
              source={require('../assets/images/icons/password.png')} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Şifre"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.inputAction}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image 
                source={showPassword 
                  ? require('../assets/images/icons/fi-rr-eye-crossed.png')
                  : require('../assets/images/icons/fi-rr-eye.png')
                } 
                style={styles.passwordActionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Kaydol</Text>
        </TouchableOpacity>

        {/* Terms Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={styles.termsCheckboxContainer}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
              {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>Kullanım şartlarını kabul ediyorum</Text>
          </TouchableOpacity>
        </View>

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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'left',
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
  inputAction: {
    padding: 4,
  },
  passwordActionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  registerButton: {
    backgroundColor: '#FFBB01',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  termsContainer: {
    marginBottom: 30,
  },
  termsCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#191D20',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#191D20',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#191D20',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoImage: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
});

export default RegisterScreen;
