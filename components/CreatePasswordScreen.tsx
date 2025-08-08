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

interface CreatePasswordScreenProps {
  onCreatePassword: (password: string, confirmPassword: string) => void;
  onBackToLogin: () => void;
}

const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = ({
  onCreatePassword,
  onBackToLogin,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreatePassword = () => {
    onCreatePassword(password, confirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ŞİFRE OLUŞTURMA</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Hesabınız İçin Yeni Bir</Text>
          <Text style={styles.instructionsText}>Şifre Oluşturun</Text>
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <Image 
              source={require('../assets/images/icons/password.png')} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Yeni Şifre"
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

          {/* Confirm Password Input */}
          <View style={styles.inputField}>
            <Image 
              source={require('../assets/images/icons/password.png')} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Yeni Şifre Tekrar"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.inputAction}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image 
                source={showConfirmPassword 
                  ? require('../assets/images/icons/fi-rr-eye-crossed.png')
                  : require('../assets/images/icons/fi-rr-eye.png')
                } 
                style={styles.passwordActionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleCreatePassword}>
          <Text style={styles.confirmButtonText}>Onayla</Text>
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
  instructionsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'center',
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 40,
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
  confirmButton: {
    backgroundColor: '#FFBB01',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default CreatePasswordScreen;
