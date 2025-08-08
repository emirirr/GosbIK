import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

interface NavbarProps {
  onBack?: () => void;
  onMenu?: () => void;
  showBack?: boolean;
  showMenu?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onBack,
  onMenu,
  showBack = false,
  showMenu = true,
}) => {
  return (
    <View style={styles.navbar}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image 
              source={require('../assets/images/icons/fi-br-menu-burger.png')} 
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section - Empty */}
      <View style={styles.centerSection}>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {showMenu && (
          <TouchableOpacity style={styles.menuButton} onPress={onMenu}>
            <Image 
              source={require('../assets/images/icons/fi-br-menu-burger.png')} 
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Navbar;
