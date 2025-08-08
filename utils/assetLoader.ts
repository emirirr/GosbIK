// Asset loader utility for GosbIK app
// This file helps manage and load logos, icons, and other assets

export interface AssetConfig {
  name: string;
  path: string;
  width?: number;
  height?: number;
}

// Logo configurations
export const LOGOS = {
  main: {
    name: 'main-logo',
    path: './assets/images/logos/main-logo.png',
    width: 200,
    height: 80,
  },
  white: {
    name: 'logo-white',
    path: './assets/images/logos/logo-white.png',
    width: 200,
    height: 80,
  },
  black: {
    name: 'logo-black',
    path: './assets/images/logos/logo-black.png',
    width: 200,
    height: 80,
  },
} as const;

// Icon configurations
export const ICONS = {
  home: {
    name: 'home-icon',
    path: './assets/images/icons/home.png',
    width: 24,
    height: 24,
  },
  profile: {
    name: 'profile-icon',
    path: './assets/images/icons/profile.png',
    width: 24,
    height: 24,
  },
  settings: {
    name: 'settings-icon',
    path: './assets/images/icons/settings.png',
    width: 24,
    height: 24,
  },
  menu: {
    name: 'menu-icon',
    path: './assets/images/icons/menu.png',
    width: 24,
    height: 24,
  },
} as const;

// Splash screen configurations
export const SPLASH_IMAGES = {
  main: {
    name: 'splash-main',
    path: './assets/images/splash/splash-main.png',
    width: 400,
    height: 800,
  },
  logo: {
    name: 'splash-logo',
    path: './assets/images/splash/splash-logo.png',
    width: 200,
    height: 100,
  },
} as const;

// Helper function to get asset path
export const getAssetPath = (asset: AssetConfig): string => {
  return asset.path;
};

// Helper function to validate asset exists
export const validateAsset = async (asset: AssetConfig): Promise<boolean> => {
  try {
    // In a real implementation, you would check if the file exists
    // For now, we'll return true as a placeholder
    return true;
  } catch (error) {
    console.error(`Asset validation failed for ${asset.name}:`, error);
    return false;
  }
};

// Export all asset configurations
export const ASSETS = {
  logos: LOGOS,
  icons: ICONS,
  splash: SPLASH_IMAGES,
} as const;
