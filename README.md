# GosbIK Mobile Application

Bu proje, GosbIK markası için geliştirilmiş native mobil uygulamasıdır.

## Proje Yapısı

```
GosbIK/
├── assets/
│   ├── images/
│   │   ├── logos/          # Logo dosyaları
│   │   ├── icons/          # İkon dosyaları
│   │   └── splash/         # Splash screen görselleri
│   ├── icon.png            # Uygulama ikonu
│   ├── adaptive-icon.png   # Android adaptive icon
│   ├── splash-icon.png     # Splash screen ikonu
│   └── favicon.png         # Web favicon
├── App.tsx                 # Ana uygulama bileşeni
├── app.json               # Expo konfigürasyonu
└── package.json           # Bağımlılıklar
```

## Asset Yapısı

### Logolar (`assets/images/logos/`)
- Ana marka logoları
- Farklı boyutlarda logo versiyonları
- Beyaz/şeffaf arka plan versiyonları

### İkonlar (`assets/images/icons/`)
- Uygulama içi navigasyon ikonları
- Fonksiyon ikonları
- Menü ikonları

### Splash Screen (`assets/images/splash/`)
- Splash screen görselleri
- Farklı ekran boyutları için optimizasyon

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# iOS için çalıştır
npm run ios

# Android için çalıştır
npm run android

# Web için çalıştır
npm run web
```

## Asset Yükleme

Logolar ve ikonları ilgili klasörlere yükleyebilirsiniz:

1. **Logolar için**: `assets/images/logos/` klasörüne yükleyin
2. **İkonlar için**: `assets/images/icons/` klasörüne yükleyin
3. **Splash screen için**: `assets/images/splash/` klasörüne yükleyin

## Teknolojiler

- React Native
- Expo
- TypeScript
- React Navigation (planlanıyor)

## Marka Kimliği

GosbIK markası sarı arka plan üzerinde siyah "Gosb" yazısı ve siyah kutu içinde "ik" yazısından oluşmaktadır.
