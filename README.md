# GosbIK Mobile

GOSB (Gebze Organize Sanayi Bölgesi) için geliştirilmiş, haber ve kurumsal içerik sunan native mobil uygulama.

## Özellikler

- Splash, giriş, kayıt, şifremi unuttum ve doğrulama akışı
- Ana ekran ve arama
- Haber listesi ve haber detay ekranları — PHP tabanlı bir API üzerinden MySQL'den çekilir
- Marka kimliği: sarı zemin üzerinde siyah "Gosb" yazısı ve siyah kutu içinde "ik"

## Proje Yapısı

```
GosbIK/
├── api/
│   ├── news.php            # Haber API endpoint'i (MySQL)
│   └── config.example.php  # DB bağlantı ayarları şablonu
├── assets/
│   ├── images/
│   │   ├── logos/          # Logo dosyaları
│   │   ├── icons/          # İkon dosyaları
│   │   └── splash/         # Splash screen görselleri
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── splash-icon.png
│   └── favicon.png
├── components/              # Ekranlar (SplashScreen, LoginScreen, NewsScreen, ...)
├── contexts/                 # ThemeContext
├── App.tsx                   # Ana uygulama bileşeni, ekran yönlendirmesi burada
├── app.json                  # Expo konfigürasyonu
└── package.json
```

## Kurulum

### Mobil uygulama
```bash
npm install

npm run ios      # iOS
npm run android  # Android
npm run web      # Web
```

### Haber API'si (api/news.php)
API, `api/config.php` dosyasından veritabanı bilgilerini okur — bu dosya repoya dahil değildir.

```bash
cp api/config.example.php api/config.php
# api/config.php içindeki db_host / db_user / db_pass / db_name alanlarını doldurun
```
`api/config.php` `.gitignore`'da — gerçek veritabanı bilgilerini asla commit etmeyin.

## Teknolojiler

- React Native + Expo (TypeScript)
- expo-font, expo-linear-gradient, expo-blur ve ilgili Expo modülleri
- Ekranlar arası geçiş `App.tsx` içinde state ile yönetiliyor (ayrı bir navigasyon kütüphanesi kullanılmıyor)
- Backend: PHP + MySQL (`api/news.php`)

## Asset Yükleme

- **Logolar**: `assets/images/logos/`
- **İkonlar**: `assets/images/icons/`
- **Splash screen**: `assets/images/splash/`
