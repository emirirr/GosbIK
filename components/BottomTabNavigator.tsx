import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { HomeIcon, SearchIcon, IndustryIcon, BurgerIcon, IKIcon } from './icons/SvgIcons';

interface TabItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  activeIcon?: React.ComponentType<any>;
}

interface BottomTabNavigatorProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs: TabItem[] = [
    {
      id: 'home',
      title: 'Ana Sayfa',
      icon: HomeIcon,
      activeIcon: HomeIcon,
    },
    {
      id: 'ik',
      title: 'ik',
      icon: IKIcon,
      activeIcon: IKIcon,
    },
    {
      id: 'search',
      title: 'Arama',
      icon: SearchIcon,
      activeIcon: SearchIcon,
    },
    {
      id: 'industry',
      title: 'Sanayi',
      icon: IndustryIcon,
      activeIcon: IndustryIcon,
    },
    {
      id: 'menu',
      title: 'Menü',
      icon: BurgerIcon,
      activeIcon: BurgerIcon,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;
        const iconColor = isActive ? '#FFBB01' : '#191D20';
        
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.id)}
          >
            <IconComponent 
              width={24}
              height={24}
              color={iconColor}
            />
            <Text style={[
              styles.tabText,
              isActive && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 20,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  activeTabIcon: {
    // Active icon styling if needed
  },
  tabText: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFBB01',
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
