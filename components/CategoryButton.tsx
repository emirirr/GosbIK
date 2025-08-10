import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface CategoryButtonProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
  showCloseButton?: boolean;
  onClosePress?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'compact';
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  title,
  isActive = false,
  onPress,
  showCloseButton = false,
  onClosePress,
  icon,
  variant = 'default',
}) => {

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: isActive ? '#FFBB01' : '#F5F5F5',
          minWidth: 90,
        }}
        onPress={onPress}
      >
        {icon && (
          <View style={{ marginBottom: 6 }}>
            {icon}
          </View>
        )}
        <Text style={{
          fontSize: 12,
          color: isActive ? '#191D20' : '#666666',
          marginTop: 4,
          textAlign: 'center',
          fontWeight: isActive ? 'bold' : 'normal',
        }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Default variant - more compact for search screen
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? '#FFBB01' : '#F8F9FA',
        width: 95,
        height: 36,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: isActive ? '#FFBB01' : '#E9ECEF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={{
        fontSize: 11,
        fontWeight: '500',
        color: '#191D20',
        marginRight: showCloseButton ? 3 : 0,
        textAlign: 'center',
      }} numberOfLines={1}>
        {title}
      </Text>
      {showCloseButton && (
        <TouchableOpacity onPress={onClosePress} style={{ padding: 1 }}>
          <Text style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#191D20',
          }}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Default variant (for search screen)
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 44,
  },
  categoryButtonActive: {
    backgroundColor: '#FFBB01',
    borderColor: '#FFBB01',
  },
  categoryButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#191D20',
    marginRight: 8,
  },
  closeButton: {
    padding: 2,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  
  // Compact variant (for main screen)
  categoryButtonCompact: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    minWidth: 90,
  },
  activeCategoryButton: {
    backgroundColor: '#FFBB01',
  },
  categoryIcon: {
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: '#191D20',
    fontWeight: 'bold',
  },
});

export default CategoryButton;
