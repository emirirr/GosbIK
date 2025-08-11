import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface FontSizeControlProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({
  fontSize,
  onFontSizeChange,
}) => {
  const fontSizes = [14, 16, 18, 20];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Font Boyutu</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onFontSizeChange(Math.max(12, fontSize - 2))}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <Path d="M5 12H19" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
        
        <View style={styles.sizeDisplay}>
          <Text style={styles.sizeText}>{fontSize}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => onFontSizeChange(Math.min(24, fontSize + 2))}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <Path d="M12 5V19M5 12H19" stroke="#191D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
      </View>
      
      <View style={styles.presets}>
        {fontSizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.presetButton,
              fontSize === size && styles.activePresetButton
            ]}
            onPress={() => onFontSizeChange(size)}
          >
            <Text style={[
              styles.presetText,
              fontSize === size && styles.activePresetText
            ]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sizeDisplay: {
    marginHorizontal: 20,
    minWidth: 40,
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  presets: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  presetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activePresetButton: {
    backgroundColor: '#FFBB01',
    borderColor: '#FFBB01',
  },
  presetText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  activePresetText: {
    color: '#191D20',
    fontWeight: '600',
  },
});

export default FontSizeControl;
