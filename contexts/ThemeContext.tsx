import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    inputBackground: string;
    border: string;
    success: string;
    error: string;
  };
  icons: {
    success: any;
    error: any;
  };
}

const lightTheme: Theme = {
  colors: {
    primary: '#FFBB01',
    secondary: '#191D20',
    background: '#FFFFFF',
    text: '#191D20',
    textSecondary: '#666',
    inputBackground: '#F5F5F5',
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#F44336',
  },
  icons: {
    success: require('../assets/images/icons/ikon sarı.png'),
    error: require('../assets/images/icons/ikon siyah.png'),
  },
};

const darkTheme: Theme = {
  colors: {
    primary: '#FFBB01',
    secondary: '#FFFFFF',
    background: '#191D20',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBackground: '#2A2A2A',
    border: '#404040',
    success: '#4CAF50',
    error: '#F44336',
  },
  icons: {
    success: require('../assets/images/icons/ikon siyah.png'),
    error: require('../assets/images/icons/ikon sarı.png'),
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
