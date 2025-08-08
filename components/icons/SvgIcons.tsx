import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_3730_4282)">
      <Path d="M12 14.9922C10.3432 14.9922 9 16.3353 9 17.9922V23.9922H15V17.9922C15 16.3353 13.6568 14.9922 12 14.9922Z" fill={color}/>
      <Path d="M17 17.9929V23.9929H21C22.6568 23.9929 24 22.6497 24 20.9929V11.8719C24.0002 11.3524 23.7983 10.8532 23.437 10.4799L14.939 1.29285C13.4396 -0.329491 10.9089 -0.4291 9.28655 1.07034C9.20949 1.14159 9.13523 1.21579 9.06403 1.29285L0.581016 10.4769C0.208734 10.8517 -0.000140554 11.3586 7.09607e-08 11.8869V20.9929C7.09607e-08 22.6497 1.34316 23.9929 3 23.9929H6.99998V17.9929C7.01869 15.2661 9.22027 13.0393 11.8784 12.9752C14.6255 12.9089 16.9791 15.1736 17 17.9929Z" fill={color}/>
      <Path d="M12 14.9922C10.3432 14.9922 9 16.3353 9 17.9922V23.9922H15V17.9922C15 16.3353 13.6568 14.9922 12 14.9922Z" fill={color}/>
    </G>
    <Defs>
      <ClipPath id="clip0_3730_4282">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_3730_4028)">
      <Path d="M23.561 21.4452L18.9159 16.7981C22.3916 12.1533 21.4439 5.57034 16.7991 2.09462C12.1543 -1.3811 5.57131 -0.433388 2.09559 4.21139C-1.38013 8.85616 -0.432411 15.4392 4.21236 18.9149C7.94343 21.7069 13.068 21.7069 16.7991 18.9149L21.4462 23.562C22.0302 24.146 22.977 24.146 23.561 23.562C24.1449 22.978 24.1449 22.0312 23.561 21.4472L23.561 21.4452ZM10.5445 18.0179C6.4164 18.0179 3.06998 14.6715 3.06998 10.5435C3.06998 6.41542 6.4164 3.06901 10.5445 3.06901C14.6725 3.06901 18.0189 6.41542 18.0189 10.5435C18.0145 14.6697 14.6707 18.0136 10.5445 18.0179Z" fill={color}/>
    </G>
    <Defs>
      <ClipPath id="clip0_3730_4028">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export const IndustryIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
    <G clipPath="url(#clip0_3730_4732)">
      <Path d="M23.818 7.12C23.398 6.92 22.911 6.974 22.505 7.301L19.5 11V8.203C19.501 7.737 19.241 7.321 18.82 7.119C18.4 6.919 17.913 6.973 17.507 7.3L14.501 11.001V8.204C14.502 7.738 14.242 7.322 13.821 7.12C13.401 6.92 12.914 6.974 12.508 7.301L8.785 11.012L6.836 1.577C6.639 0.663 5.816 0 4.882 0H2.5C1.395 0 0.5 0.895 0.5 2V19C0.5 21.761 2.739 24 5.5 24H19.5C22.261 24 24.5 21.761 24.5 19V8.204C24.5 7.738 24.239 7.322 23.818 7.12ZM10.5 18C10.5 18.552 10.052 19 9.5 19H8.5C7.948 19 7.5 18.552 7.5 18V17C7.5 16.448 7.948 16 8.5 16H9.5C10.052 16 10.5 16.448 10.5 17V18ZM15.5 18C15.5 18.552 15.052 19 14.5 19H13.5C12.948 19 12.5 18.552 12.5 18V17C12.5 16.448 12.948 16 13.5 16H14.5C15.052 16 15.5 16.448 15.5 17V18ZM20.5 18C20.5 18.552 20.052 19 19.5 19H18.5C17.948 19 17.5 18.552 17.5 18V17C17.5 16.448 17.948 16 18.5 16H19.5C20.052 16 20.5 16.448 20.5 17V18Z" fill={color}/>
    </G>
    <Defs>
      <ClipPath id="clip0_3730_4732">
        <Rect width="24" height="24" fill="white" transform="translate(0.5)"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export const BurgerIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M22.5 10.5H1.5C0.671578 10.5 0 11.1716 0 12C0 12.8284 0.671578 13.5 1.5 13.5H22.5C23.3284 13.5 24 12.8284 24 12C24 11.1716 23.3284 10.5 22.5 10.5Z" fill={color}/>
    <Path d="M1.5 6.50001H22.5C23.3284 6.50001 24 5.82843 24 5C24 4.17158 23.3284 3.5 22.5 3.5H1.5C0.671578 3.5 0 4.17158 0 5C0 5.82843 0.671578 6.50001 1.5 6.50001Z" fill={color}/>
    <Path d="M22.5 17.5H1.5C0.671578 17.5 0 18.1716 0 19C0 19.8284 0.671578 20.5 1.5 20.5H22.5C23.3284 20.5 24 19.8284 24 19C24 18.1716 23.3284 17.5 22.5 17.5Z" fill={color}/>
  </Svg>
);

// İK ikonu için Group.svg kullanıyoruz
export const IKIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 25 22" fill="none">
    <Path d="M0.5 0.724609H5.69961V4.77506H0.5V0.724609ZM0.5 6.46723H5.69961V21.2768H0.5V6.46723Z" fill={color}/>
    <Path d="M24.4999 21.2768H18.2743L14.2617 16.2477C14.1607 16.1214 14.0092 16.0488 13.8482 16.0488H13.3178V21.2768H8.11816V0.724609H13.3178V11.2122H13.8829C14.0407 11.2122 14.1923 11.1396 14.2933 11.0196L18.0344 6.46723H24.26L18.1543 13.6305L24.4999 21.2768Z" fill={color}/>
  </Svg>
);

// Kategori ikonları
export const GridIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3H10V10H3V3Z" fill={color}/>
    <Path d="M14 3H21V10H14V3Z" fill={color}/>
    <Path d="M3 14H10V21H3V14Z" fill={color}/>
    <Path d="M14 14H21V21H14V14Z" fill={color}/>
  </Svg>
);

export const TechnologyIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L2 7V10C2 16.075 6.925 21 13 21C19.075 21 24 16.075 24 10V7L14 2L12 2Z" fill={color}/>
    <Path d="M12 6L6 9V10C6 13.314 8.686 16 12 16C15.314 16 18 13.314 18 10V9L12 6Z" fill={color}/>
  </Svg>
);

export const ScienceIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H21ZM21 11H3V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V11Z" fill={color}/>
  </Svg>
);

export const EducationIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill={color}/>
  </Svg>
);

export const CarIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill={color}/>
  </Svg>
);

// Bildirim ikonu
export const NotificationIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M5 21.3508C4.71667 21.3508 4.47917 21.2473 4.2875 21.0404C4.09583 20.8335 4 20.5772 4 20.2713C4 19.9655 4.09583 19.7091 4.2875 19.5022C4.47917 19.2953 4.71667 19.1919 5 19.1919H6V11.6357C6 10.1424 6.41667 8.81558 7.25 7.65516C8.08333 6.49474 9.16667 5.73463 10.5 5.37481V4.61919C10.5 4.16941 10.6458 3.7871 10.9375 3.47226C11.2292 3.15742 11.5833 3 12 3C12.4167 3 12.7708 3.15742 13.0625 3.47226C13.3542 3.7871 13.5 4.16941 13.5 4.61919V5.37481C14.8333 5.73463 15.9167 6.49474 16.75 7.65516C17.5833 8.81558 18 10.1424 18 11.6357V19.1919H19C19.2833 19.1919 19.5208 19.2953 19.7125 19.5022C19.9042 19.7091 20 19.9655 20 20.2713C20 20.5772 19.9042 20.8335 19.7125 21.0404C19.5208 21.2473 19.2833 21.3508 19 21.3508H5ZM12 24.5891C11.45 24.5891 10.9792 24.3778 10.5875 23.955C10.1958 23.5322 10 23.0239 10 22.4302H14C14 23.0239 13.8042 23.5322 13.4125 23.955C13.0208 24.3778 12.55 24.5891 12 24.5891ZM8 19.1919H16V11.6357C16 10.4483 15.6083 9.43177 14.825 8.58619C14.0417 7.74062 13.1 7.31783 12 7.31783C10.9 7.31783 9.95833 7.74062 9.175 8.58619C8.39167 9.43177 8 10.4483 8 11.6357V19.1919Z" fill={color}/>
  </Svg>
);

// Kullanıcı ikonu
export const UserIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#191D20' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color}/>
  </Svg>
);
