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

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onRegister,
  onForgotPassword,
}) => {
  const [userType, setUserType] = useState<'individual' | 'corporate'>('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    onLogin(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>GİRİŞ YAP</Text>
          <Text style={styles.welcomeText}>Tekrar tanıştığıma memnun oldum!</Text>
        </View>

        {/* User Type Selection */}
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeTab,
              userType === 'individual' && styles.activeTab
            ]}
            onPress={() => setUserType('individual')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'individual' && styles.activeTabText
            ]}>
              Bireysel Üye
            </Text>
            {userType === 'individual' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.userTypeTab,
              userType === 'corporate' && styles.activeTab
            ]}
            onPress={() => setUserType('corporate')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'corporate' && styles.activeTabText
            ]}>
              Kurumsal Üye
            </Text>
            {userType === 'corporate' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
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
            <TouchableOpacity style={styles.inputAction}>
              <Image 
                source={require('../assets/images/icons/fi-rr-eye.png')} 
                style={styles.passwordActionIcon}
              />
            </TouchableOpacity>
          </View>

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

        {/* Remember Me and Forgot Password */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberMeText}>Beni Hatırla</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu? </Text>
          <TouchableOpacity onPress={onRegister}>
            <Text style={styles.registerLink}>Kaydol</Text>
          </TouchableOpacity>
        </View>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Ya da devam edin</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={require('../assets/images/icons/Google.png')} 
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Gmail</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={require('../assets/images/icons/facebook.png')} 
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#191D20',
    textAlign: 'center',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  userTypeTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  userTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
  },
  activeTabText: {
    color: '#191D20',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: '#FFBB01',
    borderRadius: 2,
  },
  inputContainer: {
    marginBottom: 20,
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
  inputActionIcon: {
    fontSize: 18,
    color: '#999999',
  },
  passwordActionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
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
  rememberMeText: {
    fontSize: 14,
    color: '#191D20',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#191D20',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FFBB01',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerText: {
    fontSize: 14,
    color: '#191D20',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    fontSize: 14,
    color: '#999999',
    marginHorizontal: 16,
  },
  socialContainer: {
    marginBottom: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  socialText: {
    fontSize: 16,
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

export default LoginScreen;
