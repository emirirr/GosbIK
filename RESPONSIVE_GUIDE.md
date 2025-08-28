# Responsive Tasarım Kılavuzu

Bu kılavuz, GosbIK uygulamasında responsive tasarım uygulamak için kullanılan utility fonksiyonlarını ve best practice'leri açıklar.

## Kurulum

Responsive utility fonksiyonları `utils/responsive.ts` dosyasında tanımlanmıştır. Bu dosyayı kullanmak için:

```typescript
import { 
  scale, 
  verticalScale, 
  fontScale, 
  responsiveSpacing, 
  responsiveFontSize, 
  responsiveIconSize,
  responsiveSafeArea,
  isSmallDevice,
  isLargeDevice,
  isTablet,
  isPhone
} from '../utils/responsive';
```

## Temel Fonksiyonlar

### 1. Scale Fonksiyonları

- **`scale(size: number)`**: Genişlik bazlı ölçeklendirme
- **`verticalScale(size: number)`**: Yükseklik bazlı ölçeklendirme  
- **`fontScale(size: number)`**: Font boyutu ölçeklendirme
- **`moderateScale(size: number, factor = 0.5)`**: Orta seviye ölçeklendirme

### 2. Cihaz Tespiti

- **`isSmallDevice`**: 375px'den küçük ekranlar
- **`isMediumDevice`**: 375px-414px arası ekranlar
- **`isLargeDevice`**: 414px'den büyük ekranlar
- **`isTablet`**: 768px'den büyük ekranlar
- **`isPhone`**: 768px'den küçük ekranlar

### 3. Responsive Değerler

#### Spacing (Boşluklar)
```typescript
responsiveSpacing = {
  xs: scale(4),    // 4px
  sm: scale(8),    // 8px
  md: scale(12),   // 12px
  lg: scale(16),   // 16px
  xl: scale(20),   // 20px
  '2xl': scale(24), // 24px
  '3xl': scale(32), // 32px
  '4xl': scale(40), // 40px
}
```

#### Font Boyutları
```typescript
responsiveFontSize = {
  xs: fontScale(10),    // 10px
  sm: fontScale(12),    // 12px
  base: fontScale(14),  // 14px
  lg: fontScale(16),    // 16px
  xl: fontScale(18),    // 18px
  '2xl': fontScale(20), // 20px
  '3xl': fontScale(24), // 24px
  '4xl': fontScale(28), // 28px
}
```

#### İkon Boyutları
```typescript
responsiveIconSize = {
  xs: scale(12),    // 12px
  sm: scale(16),    // 16px
  md: scale(20),    // 20px
  lg: scale(24),    // 24px
  xl: scale(32),    // 32px
  '2xl': scale(40), // 40px
  '3xl': scale(48), // 48px
}
```

#### Safe Area
```typescript
responsiveSafeArea = {
  top: Platform.OS === 'ios' ? scale(44) : scale(24),
  bottom: Platform.OS === 'ios' ? scale(34) : scale(16),
  horizontal: scale(16),
}
```

## Kullanım Örnekleri

### 1. Container Stilleri
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: responsiveSafeArea.horizontal,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: responsiveSafeArea.top,
    paddingBottom: responsiveSafeArea.bottom,
  },
});
```

### 2. Text Stilleri
```typescript
const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize['3xl'],
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: responsiveSpacing.sm,
  },
  body: {
    fontSize: responsiveFontSize.base,
    lineHeight: responsiveFontSize.base * 1.4,
    color: '#191D20',
  },
});
```

### 3. Button Stilleri
```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFBB01',
    borderRadius: scale(12),
    paddingVertical: responsiveSpacing.lg,
    paddingHorizontal: responsiveSpacing.xl,
    alignItems: 'center',
    minHeight: scale(50),
  },
  buttonText: {
    fontSize: responsiveFontSize.lg,
    fontWeight: 'bold',
    color: '#191D20',
  },
});
```

### 4. Input Stilleri
```typescript
const styles = StyleSheet.create({
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: scale(12),
    paddingHorizontal: responsiveSpacing.lg,
    paddingVertical: responsiveSpacing.md,
    marginBottom: responsiveSpacing.md,
    minHeight: scale(50),
  },
  inputIcon: {
    width: responsiveIconSize.md,
    height: responsiveIconSize.md,
    marginRight: responsiveSpacing.md,
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize.lg,
    color: '#191D20',
  },
});
```

### 5. Card Stilleri
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: responsiveSpacing.lg,
    marginBottom: responsiveSpacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
});
```

### 6. İkon Kullanımı
```typescript
const IconComponent: React.FC = () => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24">
    {/* SVG path'leri */}
  </Svg>
);
```

## Cihaz Bazlı Koşullu Stiller

Farklı cihaz boyutları için koşullu stiller uygulayabilirsiniz:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? responsiveSpacing.md : responsiveSpacing.xl,
  },
  title: {
    fontSize: isTablet ? responsiveFontSize['4xl'] : responsiveFontSize['3xl'],
    textAlign: isSmallDevice ? 'center' : 'left',
  },
  grid: {
    flexDirection: isTablet ? 'row' : 'column',
    flexWrap: isTablet ? 'wrap' : 'nowrap',
  },
});
```

## Best Practices

### 1. Minimum Boyutlar
Tüm tıklanabilir elementler için minimum boyut belirleyin:
```typescript
minHeight: scale(44), // iOS için minimum dokunma alanı
minWidth: scale(44),
```

### 2. Safe Area Kullanımı
iOS ve Android'de farklı safe area değerleri kullanın:
```typescript
paddingTop: responsiveSafeArea.top,
paddingBottom: responsiveSafeArea.bottom,
```

### 3. Font Boyutları
Çok küçük font boyutlarından kaçının:
```typescript
// ✅ İyi
fontSize: responsiveFontSize.base, // 14px minimum

// ❌ Kötü
fontSize: responsiveFontSize.xs, // 10px çok küçük
```

### 4. Spacing Tutarlılığı
Tutarlı spacing değerleri kullanın:
```typescript
// ✅ İyi - Tutarlı
marginBottom: responsiveSpacing.md,
paddingHorizontal: responsiveSpacing.lg,

// ❌ Kötü - Karışık
marginBottom: scale(15),
paddingHorizontal: responsiveSpacing.md,
```

### 5. Responsive Grid
Tablet için grid layout kullanın:
```typescript
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    flexWrap: isTablet ? 'wrap' : 'nowrap',
  },
  gridItem: {
    flex: isTablet ? 1 : undefined,
    width: isTablet ? undefined : '100%',
  },
});
```

## Test Etme

Farklı cihaz boyutlarında test etmek için:

1. **iOS Simulator**: Farklı iPhone modelleri
2. **Android Emulator**: Farklı ekran boyutları
3. **Fiziksel Cihazlar**: Gerçek telefon ve tabletler

## Güncelleme Notları

- Base width: iPhone 12 Pro (390px)
- Base height: iPhone 12 Pro (844px)
- Tablet breakpoint: 768px
- Responsive değerler otomatik olarak hesaplanır

## Sorun Giderme

### 1. Çok Büyük/Küçük Elementler
```typescript
// Sorun: Element çok büyük
width: scale(1000), // Çok büyük değer

// Çözüm: Makul değerler kullanın
width: scale(200), // Daha makul
```

### 2. Font Boyutu Sorunları
```typescript
// Sorun: Çok küçük font
fontSize: fontScale(8), // Okunamaz

// Çözüm: Minimum font boyutu
fontSize: responsiveFontSize.sm, // 12px minimum
```

### 3. Spacing Tutarsızlığı
```typescript
// Sorun: Karışık spacing
margin: scale(5),
padding: responsiveSpacing.lg,

// Çözüm: Tutarlı spacing
margin: responsiveSpacing.sm,
padding: responsiveSpacing.lg,
```

Bu kılavuzu takip ederek tüm sayfaları responsive hale getirebilir ve farklı cihaz boyutlarında tutarlı bir deneyim sağlayabilirsiniz.
