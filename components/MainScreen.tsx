import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTabNavigator from './BottomTabNavigator';
import EventsScreen from './EventsScreen';
import SearchScreen from './SearchScreen';
import NewsScreen from './NewsScreen';
import NewsDetailScreen from './NewsDetailScreen';
import JobsScreen from './JobsScreen';
import JobDetailScreen from './JobDetailScreen';
import CvUploadScreen from './CvUploadScreen';
import ProductsScreen from './ProductsScreen';
import CompaniesScreen from './CompaniesScreen';
import CompanyDetailScreen from './CompanyDetailScreen';
import { NotificationIcon, UserIcon } from './icons/SvgIcons';
import Svg, { Path, Rect, Defs, Pattern, Image as SvgImage, Text as SvgText } from 'react-native-svg';
import CategorySelector from './CategorySelector';
import ProfileScreen from './ProfileScreen';

const YonIcon: React.FC<{ color?: string }> = ({ color = "#191D20" }) => (
  <Svg width="8" height="14" viewBox="0 0 5 10" fill="none">
    <Path 
      d="M4.26654 3.58589L1.20654 0.525893C1.08163 0.401726 0.912659 0.332031 0.736535 0.332031C0.560411 0.332031 0.391443 0.401726 0.266535 0.525893C0.204049 0.587868 0.154453 0.661602 0.120607 0.742842C0.0867616 0.824081 0.0693359 0.911218 0.0693359 0.999226C0.0693359 1.08723 0.0867616 1.17437 0.120607 1.25561C0.154453 1.33685 0.204049 1.41058 0.266535 1.47256L3.3332 4.52589C3.39569 4.58787 3.44528 4.6616 3.47913 4.74284C3.51298 4.82408 3.5304 4.91122 3.5304 4.99923C3.5304 5.08723 3.51298 5.17437 3.47913 5.25561C3.44528 5.33685 3.39569 5.41059 3.3332 5.47256L0.266535 8.5259C0.140999 8.65055 0.0701225 8.81996 0.0694974 8.99687C0.0688723 9.17378 0.13855 9.34369 0.263202 9.46923C0.387854 9.59476 0.557269 9.66564 0.734178 9.66627C0.911087 9.66689 1.081 9.59721 1.20654 9.47256L4.26654 6.41256C4.64107 6.03756 4.85144 5.52923 4.85144 4.99923C4.85144 4.46923 4.64107 3.96089 4.26654 3.58589Z" 
      fill={color}
    />
  </Svg>
);

const BantIcon: React.FC = () => (
  <View style={styles.bantContainer}>
    <Svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <Path 
        d="M0 0H15C17.7614 0 20 2.23858 20 5C20 7.76142 17.7614 10 15 10H0V0Z" 
        fill="#FFBB01"
      />
    </Svg>
  </View>
);



const MicrosoftIcon: React.FC = () => (
  <Svg width="21" height="21" viewBox="0 0 21 21">
    <Path fill="#f35325" d="M0 0h10v10H0z"/>
    <Path fill="#81bc06" d="M11 0h10v10H11z"/>
    <Path fill="#05a6f0" d="M0 11h10v10H0z"/>
    <Path fill="#ffba08" d="M11 11h10v10H11z"/>
  </Svg>
);

const BaykarIcon: React.FC = () => (
  <Image 
    source={require('../assets/images/icons/baykar.png')} 
    style={{ width: 24, height: 28 }}
    resizeMode="contain"
  />
);

const HepsiburadaIcon: React.FC = () => (
  <Image 
    source={require('../assets/images/icons/hepsiburada.png')} 
    style={{ width: 72, height: 20 }}
    resizeMode="contain"
  />
);

const MegaphoneIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path d="M11.5 8C11.4226 7.99999 11.3463 7.98202 11.277 7.9475L10.277 7.4475C10.1583 7.38822 10.068 7.28423 10.026 7.15839C9.98403 7.03256 9.99373 6.89518 10.053 6.7765C10.1123 6.65782 10.2163 6.56754 10.3421 6.52553C10.4679 6.48352 10.6053 6.49322 10.724 6.5525L11.724 7.0525C11.8249 7.1028 11.9059 7.18575 11.9537 7.28787C12.0016 7.38999 12.0135 7.50529 11.9876 7.61504C11.9616 7.72478 11.8993 7.82254 11.8108 7.89242C11.7223 7.96231 11.6128 8.00022 11.5 8ZM10.7235 3.45L11.7235 2.95C11.8422 2.89072 11.9325 2.78673 11.9745 2.66089C12.0165 2.53506 12.0068 2.39768 11.9475 2.279C11.8882 2.16032 11.7842 2.07004 11.6584 2.02803C11.5326 1.98602 11.3952 1.99572 11.2765 2.055L10.2765 2.555C10.1578 2.61428 10.0675 2.71827 10.0255 2.84411C9.98353 2.96994 9.99323 3.10732 10.0525 3.226C10.1118 3.34468 10.2158 3.43496 10.3416 3.47697C10.4674 3.51898 10.6048 3.50928 10.7235 3.45ZM12 5C12 4.86739 11.9473 4.74021 11.8536 4.64645C11.7598 4.55268 11.6326 4.5 11.5 4.5H10.5C10.3674 4.5 10.2402 4.55268 10.1464 4.64645C10.0527 4.74021 10 4.86739 10 5C10 5.13261 10.0527 5.25979 10.1464 5.35355C10.2402 5.44732 10.3674 5.5 10.5 5.5H11.5C11.6326 5.5 11.7598 5.44732 11.8536 5.35355C11.9473 5.25979 12 5.13261 12 5ZM9 9.5V0.5C9 0.367392 8.94732 0.240215 8.85355 0.146447C8.75979 0.0526784 8.63261 0 8.5 0C8.36739 0 8.24022 0.0526784 8.14645 0.146447C8.05268 0.240215 8 0.367392 8 0.5C8 1.9745 6.7085 2.5 5.5 2.5H2C1.46957 2.5 0.960859 2.71071 0.585787 3.08579C0.210714 3.46086 0 3.96957 0 4.5L0 5.5C0 6.03043 0.210714 6.53914 0.585787 6.91421C0.960859 7.28929 1.46957 7.5 2 7.5H5.5C6.7085 7.5 8 8.0255 8 9.5C8 9.63261 8.05268 9.75979 8.14645 9.85355C8.24022 9.94732 8.36739 10 8.5 10C8.63261 10 8.75979 9.94732 8.85355 9.85355C8.94732 9.75979 9 9.63261 9 9.5ZM4.093 8.5H2C1.76721 8.49907 1.53531 8.47105 1.309 8.4165L2.559 11.2075C2.66398 11.4434 2.83509 11.6438 3.05162 11.7845C3.26814 11.9251 3.5208 12 3.779 12C3.98443 11.9997 4.18652 11.948 4.36686 11.8497C4.5472 11.7513 4.70005 11.6094 4.81149 11.4368C4.92292 11.2642 4.9894 11.0665 5.00486 10.8616C5.02032 10.6568 4.98427 10.4513 4.9 10.264L4.093 8.5Z" fill="#191D20"/>
  </Svg>
);

// Social Media Icons
const InstagramIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 8 8">
    <Path d="M6.75 0H1.25C0.559644 0 0 0.559644 0 1.25V6.75C0 7.44036 0.559644 8 1.25 8H6.75C7.44036 8 8 7.44036 8 6.75V1.25C8 0.559644 7.44036 0 6.75 0Z" fill="#F00073"/>
    <Path d="M3.9998 1.80078C4.5498 1.80078 4.6248 1.80078 4.8498 1.80078C5.0498 1.80078 5.1498 1.85078 5.2248 1.87578C5.3248 1.92578 5.3998 1.95078 5.4748 2.02578C5.5498 2.10078 5.5998 2.17578 5.6248 2.27578C5.6498 2.35078 5.6748 2.45078 5.6998 2.65078C5.6998 2.87578 5.6998 2.92578 5.6998 3.50078C5.6998 4.07578 5.6998 4.12578 5.6998 4.35078C5.6998 4.55078 5.6498 4.65078 5.6248 4.72578C5.5748 4.82578 5.5498 4.90078 5.4748 4.97578C5.3998 5.05078 5.3248 5.10078 5.2248 5.12578C5.1498 5.15078 5.0498 5.17578 4.8498 5.20078C4.6248 5.20078 4.5748 5.20078 3.9998 5.20078C3.4248 5.20078 3.3748 5.20078 3.1498 5.20078C2.9498 5.20078 2.8498 5.15078 2.7748 5.12578C2.6748 5.07578 2.5998 5.05078 2.5248 4.97578C2.4498 4.90078 2.3998 4.82578 2.3748 4.72578C2.3498 4.65078 2.3248 4.55078 2.2998 4.35078C2.2998 4.12578 2.2998 4.07578 2.2998 3.50078C2.2998 2.92578 2.2998 2.87578 2.2998 2.65078C2.2998 2.45078 2.3498 2.35078 2.3748 2.27578C2.4248 2.17578 2.4498 2.10078 2.5248 2.02578C2.5998 1.95078 2.6748 1.90078 2.7748 1.87578C2.8498 1.85078 2.9498 1.82578 3.1498 1.80078C3.3748 1.80078 3.4498 1.80078 3.9998 1.80078ZM3.9998 1.42578C3.4248 1.42578 3.3748 1.42578 3.1498 1.42578C2.9248 1.42578 2.7748 1.47578 2.6498 1.52578C2.5248 1.57578 2.3998 1.65078 2.2748 1.77578C2.1498 1.90078 2.0998 2.00078 2.0248 2.15078C1.9748 2.27578 1.9498 2.42578 1.9248 2.65078C1.9248 2.87578 1.9248 2.95078 1.9248 3.50078C1.9248 4.07578 1.9248 4.12578 1.9248 4.35078C1.9248 4.57578 1.9748 4.72578 2.0248 4.85078C2.0748 4.97578 2.1498 5.10078 2.2748 5.22578C2.3998 5.35078 2.4998 5.40078 2.6498 5.47578C2.7748 5.52578 2.9248 5.55078 3.1498 5.57578C3.3748 5.57578 3.4498 5.57578 3.9998 5.57578C4.5498 5.57578 4.6248 5.57578 4.8498 5.57578C5.0748 5.57578 5.2248 5.52578 5.3498 5.47578C5.4748 5.42578 5.5998 5.35078 5.7248 5.22578C5.8498 5.10078 5.8998 5.00078 5.9748 4.85078C6.02481 4.72578 6.0498 4.57578 6.0748 4.35078C6.0748 4.12578 6.0748 4.05078 6.0748 3.50078C6.0748 2.95078 6.0748 2.87578 6.0748 2.65078C6.0748 2.42578 6.02481 2.27578 5.9748 2.15078C5.9248 2.02578 5.8498 1.90078 5.7248 1.77578C5.5998 1.65078 5.4998 1.60078 5.3498 1.52578C5.2248 1.47578 5.0748 1.45078 4.8498 1.42578C4.6248 1.42578 4.5748 1.42578 3.9998 1.42578Z" fill="white"/>
    <Path d="M3.9998 2.42578C3.3998 2.42578 2.9248 2.90078 2.9248 3.50078C2.9248 4.10078 3.3998 4.57578 3.9998 4.57578C4.5998 4.57578 5.0748 4.10078 5.0748 3.50078C5.0748 2.90078 4.5998 2.42578 3.9998 2.42578ZM3.9998 4.20078C3.6248 4.20078 3.2998 3.90078 3.2998 3.50078C3.2998 3.12578 3.5998 2.80078 3.9998 2.80078C4.3748 2.80078 4.6998 3.10078 4.6998 3.50078C4.6998 3.87578 4.3748 4.20078 3.9998 4.20078Z" fill="white"/>
    <Path d="M5.0998 2.65078C5.23788 2.65078 5.3498 2.53885 5.3498 2.40078C5.3498 2.26271 5.23788 2.15078 5.0998 2.15078C4.96173 2.15078 4.8498 2.26271 4.8498 2.40078C4.8498 2.53885 4.96173 2.65078 5.0998 2.65078Z" fill="white"/>
  </Svg>
);

const LinkedInIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 8 8">
    <Path d="M6.75 0H1.25C0.559644 0 0 0.559644 0 1.25V6.75C0 7.44036 0.559644 8 1.25 8H6.75C7.44036 8 8 7.44036 8 6.75V1.25C8 0.559644 7.44036 0 6.75 0Z" fill="#2867B2"/>
    <Path d="M2.9 6H2.05V3.325H2.9V6ZM2.475 2.95C2.2 2.95 2 2.75 2 2.475C2 2.2 2.225 2 2.475 2C2.75 2 2.95 2.2 2.95 2.475C2.95 2.75 2.75 2.95 2.475 2.95ZM6 6H5.15V4.55C5.15 4.125 4.975 4 4.725 4C4.475 4 4.225 4.2 4.225 4.575V6H3.375V3.325H4.175V3.7C4.25 3.525 4.55 3.25 4.975 3.25C5.45 3.25 5.95 3.525 5.95 4.35V6H6Z" fill="white"/>
  </Svg>
);

const YouTubeIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 8 8">
    <Path d="M6.75 0H1.25C0.559644 0 0 0.559644 0 1.25V6.75C0 7.44036 0.559644 8 1.25 8H6.75C7.44036 8 8 7.44036 8 6.75V1.25C8 0.559644 7.44036 0 6.75 0Z" fill="#FF0000"/>
    <Path d="M5.9 3.02461C5.85 2.84961 5.725 2.72461 5.55 2.67461C5.25 2.59961 3.975 2.59961 3.975 2.59961C3.975 2.59961 2.725 2.59961 2.4 2.67461C2.225 2.72461 2.1 2.84961 2.05 3.02461C2 3.34961 2 3.99961 2 3.99961C2 3.99961 2 4.64961 2.075 4.97461C2.125 5.14961 2.25 5.27461 2.425 5.32461C2.725 5.39961 4 5.39961 4 5.39961C4 5.39961 5.25 5.39961 5.575 5.32461C5.75 5.27461 5.875 5.14961 5.925 4.97461C6 4.64961 6 3.99961 6 3.99961C6 3.99961 6 3.34961 5.9 3.02461ZM3.6 4.59961V3.39961L4.65 3.99961L3.6 4.59961Z" fill="white"/>
  </Svg>
);

const FacebookIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 8 8">
    <Path d="M6.75 0H1.25C0.559644 0 0 0.559644 0 1.25V6.75C0 7.44036 0.559644 8 1.25 8H6.75C7.44036 8 8 7.44036 8 6.75V1.25C8 0.559644 7.44036 0 6.75 0Z" fill="#1877F2"/>
    <Path d="M6 4C6 2.9 5.1 2 4 2C2.9 2 2 2.9 2 4C2 5 2.725 5.825 3.675 5.975V4.575H3.175V4H3.675V3.55C3.675 3.05 3.975 2.775 4.425 2.775C4.65 2.775 4.875 2.825 4.875 2.825V3.325H4.625C4.375 3.325 4.3 3.475 4.3 3.625V4H4.85L4.75 4.575H4.275V6C5.275 5.85 6 5 6 4Z" fill="white"/>
  </Svg>
);

const WhatsAppIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 8 8">
    <Path d="M6.75 0H1.25C0.559644 0 0 0.559644 0 1.25V6.75C0 7.44036 0.559644 8 1.25 8H6.75C7.44036 8 8 7.44036 8 6.75V1.25C8 0.559644 7.44036 0 6.75 0Z" fill="#25D366"/>
    <Path fillRule="evenodd" clipRule="evenodd" d="M5.4 2.575C5.025 2.2 4.525 2 4 2C2.9 2 2 2.9 2 4C2 4.35 2.1 4.7 2.275 5L2 6L3.05 5.725C3.35 5.875 3.675 5.975 4 5.975C5.1 5.975 6 5.075 6 3.975C6 3.45 5.775 2.95 5.4 2.575ZM4 5.65C3.7 5.65 3.4 5.575 3.15 5.425L3.1 5.4L2.475 5.575L2.65 4.975L2.6 4.9C2.425 4.625 2.35 4.325 2.35 4.025C2.35 3.125 3.1 2.375 4 2.375C4.45 2.375 4.85 2.55 5.175 2.85C5.5 3.175 5.65 3.575 5.65 4.025C5.65 4.9 4.925 5.65 4 5.65ZM4.9 4.4C4.85 4.375 4.6 4.25 4.55 4.25C4.5 4.225 4.475 4.225 4.45 4.275C4.425 4.325 4.325 4.425 4.3 4.475C4.275 4.5 4.25 4.5 4.2 4.5C4.15 4.475 4 4.425 3.8 4.25C3.65 4.125 3.55 3.95 3.525 3.9C3.5 3.85 3.525 3.825 3.55 3.8C3.575 3.775 3.6 3.75 3.625 3.725C3.65 3.7 3.65 3.675 3.675 3.65C3.7 3.625 3.675 3.6 3.675 3.575C3.675 3.55 3.575 3.3 3.525 3.2C3.5 3.125 3.45 3.125 3.425 3.125C3.4 3.125 3.375 3.125 3.325 3.125C3.3 3.125 3.25 3.125 3.2 3.175C3.15 3.225 3.025 3.35 3.025 3.6C3.025 3.85 3.2 4.075 3.225 4.125C3.25 4.15 3.575 4.675 4.075 4.875C4.5 5.05 4.575 5 4.675 5C4.775 5 4.975 4.875 5 4.775C5.05 4.65 5.05 4.55 5.025 4.55C5 4.425 4.95 4.425 4.9 4.4Z" fill="white"/>
  </Svg>
);

const XIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 8 8">
    <Path d="M0 1.25C0 0.559644 0.559644 0 1.25 0H6.75C7.44036 0 8 0.559644 8 1.25V6.75C8 7.44036 7.44036 8 6.75 8H1.25C0.559644 8 0 7.44036 0 6.75V1.25Z" fill="black"/>
    <Path d="M4.38054 3.19373L5.86963 1.5H5.51677L4.22379 2.97064L3.19109 1.5H2L3.56164 3.72387L2 5.5H2.35289L3.7183 3.94695L4.80891 5.5H6L4.38046 3.19373H4.38054ZM3.89722 3.74346L3.73899 3.52201L2.48004 1.75994H3.02205L4.03804 3.18199L4.19627 3.40344L5.51693 5.25189H4.97492L3.89722 3.74354V3.74346Z" fill="white"/>
  </Svg>
);

// Job Icons
const LocationIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 16 16">
    <Path d="M7.9997 0.0273438C6.23566 0.0292845 4.54442 0.730861 3.29699 1.97816C2.04957 3.22547 1.34782 4.91664 1.3457 6.68068C1.3457 8.39401 2.67237 11.0753 5.28904 14.65C5.60054 15.0768 6.00841 15.4239 6.47944 15.6633C6.95047 15.9026 7.47135 16.0274 7.9997 16.0274C8.52805 16.0274 9.04894 15.9026 9.51997 15.6633C9.991 15.4239 10.3989 15.0768 10.7104 14.65C13.327 11.0753 14.6537 8.39401 14.6537 6.68068C14.6516 4.91664 13.9498 3.22547 12.7024 1.97816C11.455 0.730861 9.76374 0.0292845 7.9997 0.0273438ZM7.9997 9.33268C7.47229 9.33268 6.95671 9.17628 6.51818 8.88326C6.07965 8.59025 5.73786 8.17377 5.53602 7.6865C5.33419 7.19923 5.28138 6.66305 5.38428 6.14577C5.48717 5.62849 5.74115 5.15333 6.11409 4.78039C6.48703 4.40745 6.96218 4.15348 7.47946 4.05058C7.99675 3.94769 8.53292 4.0005 9.02019 4.20233C9.50746 4.40417 9.92394 4.74596 10.217 5.18449C10.51 5.62302 10.6664 6.13859 10.6664 6.66601C10.6664 7.37326 10.3854 8.05153 9.88532 8.55163C9.38522 9.05173 8.70695 9.33268 7.9997 9.33268Z" fill="#666666"/>
  </Svg>
);

const CalendarIcon: React.FC = () => (
  <Svg width="12" height="12" viewBox="0 0 16 16">
    <Path d="M12.3333 1.33333H12V1C12 0.734784 11.8946 0.48043 11.7071 0.292893C11.5196 0.105357 11.2652 0 11 0V0C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V1.33333H6V1C6 0.734784 5.89464 0.48043 5.70711 0.292893C5.51957 0.105357 5.26522 0 5 0V0C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1V1.33333H3.66667C2.69421 1.33333 1.76158 1.71964 1.07394 2.40728C0.386308 3.09491 0 4.02754 0 5L0 12.3333C0 13.3058 0.386308 14.2384 1.07394 14.9261C1.76158 15.6137 2.69421 16 3.66667 16H12.3333C13.3058 16 14.2384 15.6137 14.9261 14.9261C15.6137 14.2384 16 13.3058 16 12.3333V5C16 4.02754 15.6137 3.09491 14.9261 2.40728C14.2384 1.71964 13.3058 1.33333 12.3333 1.33333ZM12.3333 14H3.66667C3.22464 14 2.80072 13.8244 2.48816 13.5118C2.17559 13.1993 2 12.7754 2 12.3333V6.66667H14V12.3333C14 12.7754 13.8244 13.1993 13.5118 13.5118C13.1993 13.8244 12.7754 14 12.3333 14Z" fill="#666666"/>
  </Svg>
);

const AppleIcon: React.FC = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#000000"/>
  </Svg>
);

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNewsScreen, setShowNewsScreen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNewsDetail, setShowNewsDetail] = useState(false);
  const [showProductsScreen, setShowProductsScreen] = useState(false);
  const [showCompaniesScreen, setShowCompaniesScreen] = useState(false);
  const [showEventsScreen, setShowEventsScreen] = useState(false);
  const [showJobsScreen, setShowJobsScreen] = useState(false);
  const [showCompanyDetail, setShowCompanyDetail] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [showCvUpload, setShowCvUpload] = useState(false);

  const { width } = Dimensions.get('window');
  const slideWidth = 370; // Fixed width as specified
  const slideSpacing = 22; // Left spacing as specified

  // Mock haber verileri - kategorilere göre
  const allNews = [
        {
          id: 1,
      title: "Teknoloji tarihinde dev birleşme! Qualcomm Intel'i satın alıyor",
          category: "Teknoloji",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
      time: "2 saat önce"
        },
        {
          id: 2,
      title: "Yapay Zeka ile Üretimde Yeni Dönem Başladı",
      category: "Teknoloji", 
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      time: "4 saat önce"
        },
        {
          id: 3,
      title: "Sanayi 4.0 Dönüşümü Hızlanıyor",
      category: "Sanayi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      time: "6 saat önce"
        },
        {
          id: 4,
      title: "Yenilenebilir Enerji Yatırımları Artıyor",
      category: "Sanayi",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop",
      time: "1 gün önce"
    },
    {
      id: 5,
      title: "Bilimsel Araştırmalarda Yeni Keşifler",
      category: "Bilim",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
      time: "2 gün önce"
    },
    {
      id: 6,
      title: "Uzaktan Eğitimde Teknolojik İnovasyonlar",
      category: "Eğitim",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      time: "3 gün önce"
    },
    {
      id: 7,
      title: "Elektrikli Araçlarda Batarya Teknolojisi Gelişimi",
      category: "Otomativ",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop",
      time: "4 gün önce"
    },
    {
      id: 8,
      title: "OSB'lerde Dijital Dönüşüm Süreci",
      category: "OSB",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
      time: "5 gün önce"
    }
  ];

  // Geçmiş haberler için ayrı data
  const pastNews = [
    {
      id: 101,
      title: "158 projeye 394 milyar liralık kaynak... Doğu Karadeniz Projesi Eylem Planı açıklandı!",
          category: "Otomotiv",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      time: "Pazar 16 dk Önce"
    },
    {
      id: 102,
      title: "Teknoloji sektöründe yeni iş birliği anlaşmaları imzalandı",
      category: "Teknoloji",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      time: "Pazartesi 2 saat önce"
    },
    {
      id: 103,
      title: "Sanayi kuruluşlarında dijital dönüşüm hızlanıyor",
      category: "Sanayi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      time: "Salı 4 saat önce"
    },
    {
      id: 104,
      title: "Eğitim teknolojilerinde yeni dönem başlıyor",
      category: "Eğitim",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      time: "Çarşamba 1 gün önce"
    }
  ];

  // Firmalar data
  const companies = [
        {
          id: 1,
      name: "Baykar Teknoloji",
      logo: "baykar",
      logoText: "B"
        },
        {
          id: 2,
      name: "Hepsiburada",
      logo: "hepsiburada",
      logoText: "H"
        },
        {
          id: 3,
      name: "Baykar Savunma",
      logo: "baykar",
      logoText: "B"
        },
        {
          id: 4,
      name: "Hepsiburada Market",
      logo: "hepsiburada",
      logoText: "H"
    }
  ];

  // Ürünler data
  const products = [
    {
      id: 1,
      title: "Robotik Kol",
      category: "Endüstriyel Robot",
      description: "Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Plastik Boru",
      category: "Plastik",
      description: "Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    }
  ];

  // İş İlanları data
  const jobPostings = [
    {
      id: 1,
      title: "Grafik Tasarımcı",
      company: "Apple",
      location: "Darıca / Kocaeli",
      date: "18.04.2025",
      logo: "apple"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "İstanbul / Türkiye",
      date: "15.04.2025",
      logo: "microsoft"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Baykar Teknoloji",
      location: "Ankara / Türkiye",
      date: "16.04.2025",
      logo: "baykar"
    }
  ];



  // Yaklaşan Etkinlikler data
  const upcomingEvents = [
    {
      id: 1,
      title: "II. Sağlıklı Gıdanın Başkenti Kumluca",
      organizer: "Ajans Asya Fuarcılık Organi..",
      location: "Van Expo Fuar ve Kongre Merkezi",
      date: "27 Ekim",
      year: "2025"
    },
    {
      id: 2,
      title: "Teknoloji ve İnovasyon Zirvesi",
      organizer: "TechWorld Events",
      location: "İstanbul Kongre Merkezi",
      date: "15 Kasım",
      year: "2025"
    }
  ];



  // Kategori değiştiğinde haberleri filtrele
  useEffect(() => {
    if (activeCategory === 'Tümü') {
      setFilteredNews(allNews);
    } else {
      const filtered = allNews.filter(news => news.category === activeCategory);
      setFilteredNews(filtered);
    }
    setCurrentSlide(0); // Slider'ı başa sar
  }, [activeCategory]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };



  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.profileContainer} onPress={() => setShowProfile(true)}>
        <View style={styles.profilePic}>
          <UserIcon width={24} height={24} color="#191D20" />
        </View>
      </TouchableOpacity>
             <View style={styles.logoContainer}>
         <View style={styles.logo}>
           <Image source={require('../assets/images/splash/splash-logo.png')} style={styles.logoImage} />
         </View>
       </View>
      <View style={styles.notificationContainer}>
        <TouchableOpacity style={styles.notificationButton} onPress={() => setShowProfile(true)}>
          <NotificationIcon width={24} height={24} color="#191D20" />
        </TouchableOpacity>
      </View>
    </View>
  );





  const renderSectionHeader = (title: string, showViewAll: boolean = true) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <BantIcon />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {showViewAll && (
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => {
            if (title === 'Geçmiş Haberler') {
              setShowNewsScreen(true);
            } else if (title === 'Ürünler') {
              setShowProductsScreen(true);
            } else if (title === 'Firmalar') {
              setShowCompaniesScreen(true);
            } else if (title === 'İş İlanları') {
              setShowJobsScreen(true);
            } else if (title === 'Yaklaşan Etkinlikler') {
              setShowEventsScreen(true);
            }
          }}
        >
          <Text style={styles.viewAllText}>Tümü</Text>
          <View style={styles.arrowContainer}>
            <YonIcon color="#191D20" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPastNewsCard = (item: any) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.pastNewsCard}
      onPress={() => {
        setSelectedNews(item);
        setShowNewsDetail(true);
      }}
    >
      <View style={styles.yellowStripe} />
      <View style={styles.pastNewsImage}>
        <Image
          source={{ uri: item.image }}
          style={styles.pastNewsImageStyle}
          onError={() => {
            console.log('Past news image failed to load:', item.image);
          }}
        />
      </View>
      <View style={styles.pastNewsContentArea}>
        <View style={styles.pastNewsMeta}>
          <View style={styles.categoryDot} />
          <Text style={styles.pastNewsCategory}>{item.category}</Text>
        </View>
        <Text style={styles.pastNewsTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.pastNewsTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCompanyCard = (item: any) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.companyCard}
      onPress={() => {
        setSelectedCompany({
          id: item.id,
          name: item.name,
          category: 'Teknoloji',
          description: 'Lorem ipsum dolor sit amet consectetur. Orci et euismod morbi quis.',
          logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
          followers: 7360,
          sector: 'Teknoloji',
          employeeCount: '5000+',
          foundedYear: '1986',
          websiteUrl: 'https://www.mustafa.com',
          address: 'Baykar Milli S/İHA\nSistemleri Ar-Ge ve\nÜretim Tesisi',
        });
        setShowCompanyDetail(true);
      }}
    >
      <View style={styles.companyYellowStripe} />
      <View style={styles.companyLogo}>
        {item.logo === "baykar" ? (
          <BaykarIcon />
        ) : item.logo === "hepsiburada" ? (
          <HepsiburadaIcon />
        ) : (
          <Text style={styles.companyLogoText}>{item.logoText}</Text>
      )}
    </View>
      <Text style={styles.companyName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.productCard}>
      <View style={styles.productYellowStripe} />
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image }}
          style={styles.productImage}
          onError={() => {
            console.log('Product image failed to load:', item.image);
          }}
        />
      </View>
      <View style={styles.productContent}>
      <View style={styles.productBadge}>
          <Text style={styles.productBadgeText}>{item.category}</Text>
        </View>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderJobCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.jobCard}
      onPress={() => {
        const logoUrl =
          item.logo === 'apple'
            ? 'https://images.unsplash.com/photo-1521123845560-14093637aa7a?w=80&h=80&fit=crop'
            : item.logo === 'microsoft'
            ? 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop'
            : 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=80&h=80&fit=crop';
        setSelectedJob({
          id: item.id,
          title: item.title,
          company: item.company,
          location: item.location,
          date: item.date,
          logo: logoUrl,
        });
        setShowJobDetail(true);
      }}
    >
      <View style={styles.jobYellowStripe} />
      <View style={styles.jobCardContent}>
        <View style={styles.jobCardHeader}>
          <View style={styles.jobCompanyLogoCircle}>
            {item.logo === "apple" ? (
              <AppleIcon />
            ) : item.logo === "microsoft" ? (
              <MicrosoftIcon />
            ) : (
              <Text style={styles.jobCompanyLogoText}>B</Text>
            )}
          </View>
          <View style={styles.jobCardInfo}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
          </View>
        </View>
        
        <View style={styles.jobDetails}>
          <View style={styles.jobDetailRow}>
            <LocationIcon />
            <Text style={styles.jobDetailText}>{item.location}</Text>
          </View>
          <View style={styles.jobDetailRow}>
            <CalendarIcon />
            <Text style={styles.jobDetailText}>{item.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );



  const renderEventCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.eventCard}>
      <View style={styles.eventYellowStripe} />
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventYear}>{item.year}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetail}>
          <View style={{ marginRight: 6 }}>
            <MegaphoneIcon />
      </View>
          <Text style={styles.eventOrganizer}>{item.organizer}</Text>
      </View>
        <View style={styles.eventDetail}>
          <Image 
            source={require('../assets/images/icons/location.png')} 
            style={{ width: 12, height: 12, marginRight: 6 }}
            resizeMode="contain"
          />
          <Text style={styles.eventLocation}>{item.location}</Text>
    </View>
      </View>
    </TouchableOpacity>
  );

  const renderNewsSlider = () => {
    if (filteredNews.length === 0) {
      return (
        <View style={styles.emptyNewsContainer}>
          <Text style={styles.emptyNewsText}>Bu kategoride henüz haber bulunmuyor.</Text>
    </View>
  );
    }

    return (
      <View style={styles.newsSliderContainer}>
        <FlatList
          data={filteredNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={slideWidth + 16}
          decelerationRate={0.8}
          contentContainerStyle={{ paddingLeft: slideSpacing, paddingRight: slideSpacing }}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (slideWidth + 16));
            setCurrentSlide(index);
          }}
                    renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.newsSlide, { width: slideWidth }]}
              onPress={() => {
                setSelectedNews(item);
                setShowNewsDetail(true);
              }}
            >
              <View style={styles.newsImageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.newsSlideImage}
                  onError={() => {
                    console.log('News image failed to load:', item.image);
                  }}
                />
                
                                {/* Category badge */}
                <View style={styles.newsCategoryBadge}>
                  <Text style={styles.newsCategoryBadgeText}>{item.category}</Text>
                </View>
                
                {/* Title and time */}
                <View style={styles.newsTitleContainer}>
                  <Text style={styles.newsSlideTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.newsSlideTime}>{item.time}</Text>
                </View>
              </View>
        </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        
        {/* Dots indicator */}
        {filteredNews.length > 1 && (
          <View style={styles.newsDotsContainer}>
            {filteredNews.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.newsDot,
                  index === currentSlide && styles.activeNewsDot
                ]}
              />
            ))}
      </View>
        )}
    </View>
  );
  };

  const renderContent = () => {
    if (showNewsDetail) {
      return <NewsDetailScreen 
        onBack={() => setShowNewsDetail(false)} 
        newsItem={selectedNews}
      />;
    }
    
    if (showNewsScreen) {
      return <NewsScreen 
        onBack={() => setShowNewsScreen(false)} 
        onNewsPress={(newsItem) => {
          setSelectedNews(newsItem);
          setShowNewsDetail(true);
        }}
      />;
    }

      if (showProductsScreen) {
    return <ProductsScreen
      onBack={() => setShowProductsScreen(false)}
    />;
  }

  if (showCompaniesScreen) {
    return <CompaniesScreen
      onBack={() => setShowCompaniesScreen(false)}
    />;
  }

  if (showProfile) {
    return <ProfileScreen onBack={() => setShowProfile(false)} />;
  }

  if (showEventsScreen) {
    return <EventsScreen onBack={() => setShowEventsScreen(false)} events={upcomingEvents} />;
  }

  if (showJobsScreen) {
    return <JobsScreen onBack={() => setShowJobsScreen(false)} />;
  }

  if (showCompanyDetail && selectedCompany) {
    return <CompanyDetailScreen onBack={() => setShowCompanyDetail(false)} company={selectedCompany} />;
  }

  // Show CV Upload screen with higher priority so it can open from JobDetail screen
  if (showCvUpload) {
    return <CvUploadScreen onBack={() => setShowCvUpload(false)} job={selectedJob || undefined} />;
  }

  if (showJobDetail && selectedJob) {
    return <JobDetailScreen onBack={() => setShowJobDetail(false)} onApply={() => setShowCvUpload(true)} job={selectedJob} />;
  }

    switch (activeTab) {
      case 'home':
        return (
          <ScrollView style={styles.homeContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            {renderHeader()}
            
            {/* Category Navigation */}
            <CategorySelector 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* News Slider */}
            {renderNewsSlider()}

            {/* Past News Section */}
            {renderSectionHeader('Geçmiş Haberler')}

            {/* Past News Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.pastNewsScroll}
              contentContainerStyle={styles.pastNewsScrollContent}
            >
              {pastNews.map(renderPastNewsCard)}
            </ScrollView>

            {/* Companies Section */}
            {renderSectionHeader('Firmalar')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.companiesScroll}
              contentContainerStyle={styles.companiesScrollContent}
            >
              {companies.map(renderCompanyCard)}
            </ScrollView>

            {/* Products Section */}
            {renderSectionHeader('Ürünler')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.productsScroll}
              contentContainerStyle={styles.productsScrollContent}
            >
              {products.map(renderProductCard)}
            </ScrollView>

            {/* Job Postings Section */}
            {renderSectionHeader('İş İlanları')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.jobsScroll}
              contentContainerStyle={styles.jobsScrollContent}
            >
              {jobPostings.map(renderJobCard)}
            </ScrollView>



            {/* Upcoming Events Section */}
            {renderSectionHeader('Yaklaşan Etkinlikler')}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.eventsScroll}
              contentContainerStyle={styles.eventsScrollContent}
            >
              {upcomingEvents.map(renderEventCard)}
            </ScrollView>

            {/* Social Media Section */}
            <View style={styles.socialMediaSection}>
              {/* Header */}
              <View style={styles.socialMediaHeader}>
                <View style={styles.gosbikLogoOuter}>
                  <View style={styles.gosbikLogoMiddle}>
                    <View style={styles.gosbikLogoInner}>
                      <Image 
                        source={require('../assets/images/splash/splash-logo.png')}
                        style={styles.socialMediaLogoImage}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.socialMediaTitleContainer}>
                  <View style={styles.titleWithButton}>
                    <Text style={styles.socialMediaTitle}>Gosbik Sosyal Medya</Text>
                    <TouchableOpacity style={styles.followButton}>
                      <Text style={styles.followButtonText}>Takip Edin</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.socialMediaSubtitle}>81 Paylaşım</Text>
                </View>
              </View>

              {/* Platform Tabs */}
              <View style={styles.platformTabs}>  
                <TouchableOpacity style={[styles.platformTab, styles.activePlatformTab]}>
                  <Text style={[styles.platformTabText, styles.activePlatformTabText]}>Tüm Paylaşımlar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.platformTabIcon}>
                  <InstagramIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.platformTabIcon}>
                  <LinkedInIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.platformTabIcon}>
                  <YouTubeIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.platformTabIcon}>
                  <FacebookIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.platformTabIcon}>
                  <WhatsAppIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.platformTabIcon}>
                  <XIcon />
                </TouchableOpacity>
              </View>

              {/* Social Media Cards */}
              <View style={styles.socialCardsContainer}>
                {/* Baykar Card */}
                <View style={styles.socialCard}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop' }}
                    style={styles.socialCardImage}
                  />
                  <View style={styles.socialCardContent}>
                    <View style={styles.socialCardHeader}>
                      <View style={styles.socialCardCompanyInfo}>
                        <View style={styles.socialCardCompanyLogo}>
                          <Text style={styles.socialCardCompanyLogoText}>B</Text>
                        </View>
                        <View style={styles.socialCardCompanyDetails}>
                          <Text style={styles.socialCardCompanyName}>Baykar Teknoloji</Text>
                          <Text style={styles.socialCardTime}>1 Saat Önce</Text>
                        </View>
                      </View>
                      <View style={styles.socialCardPlatformIcon}>
                        <InstagramIcon />
                      </View>
                    </View>
                    <Text style={styles.socialCardText}>TÜ Rektörü Prof. Dr. Hasan Mandal'ı ve dünyanın...</Text>
                    <TouchableOpacity style={styles.socialCardButton}>
                      <Text style={styles.socialCardButtonText}>Devamı Görüntüle</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Toyotetsu Card */}
                <View style={styles.socialCard}>
                  <View style={styles.toyotetsuCardImage}>
                    <Image 
                      source={{ uri: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop' }}
                      style={styles.socialCardImage}
                    />
                    <View style={styles.toyotetsuOverlayNew}>
                      <View style={styles.toyotetsuHeaderNew}>
                        <View style={styles.toyotetsuDotsNew}>
                          <View style={styles.redDotSmall} />
                          <View style={styles.redDotLargeNew} />
                        </View>
                        <Text style={styles.toyotetsuTitleNew}>TOYOTETSU</Text>
                        <Text style={styles.toyotetsuSubtitleNew}>TÜRKİYE'nin</Text>
                        <Text style={styles.toyotetsuDescNew}>Mühendislik Gücünü Bir Kez Daha Kanıtlayan</Text>
                        <Text style={styles.toyotetsuHighlightNew}>Bir İlki</Text>
                        <Text style={styles.toyotetsuEndNew}>Hayata Geçirdik</Text>
                      </View>
                      <View style={styles.toyotetsuBottomNew}>
                        <Text style={styles.toyotetsuBrandNew}>TOYOTETSU</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.socialCardContent}>
                    <View style={styles.socialCardHeader}>
                      <View style={styles.socialCardCompanyInfo}>
                        <View style={styles.toyotetsuCardLogo}>
                          <Text style={styles.toyotetsuCardLogoText}>T</Text>
                        </View>
                        <View style={styles.socialCardCompanyDetails}>
                          <Text style={styles.socialCardCompanyName}>Toyotetsu</Text>
                          <Text style={styles.socialCardTime}>1 Saat Önce</Text>
                        </View>
                      </View>
                      <View style={styles.socialCardPlatformIcon}>
                        <LinkedInIcon />
                      </View>
                    </View>
                    <Text style={styles.socialCardText}>Toyotetsu Türkiye'nin mühendislik gücünü bir kez daha...</Text>
                    <TouchableOpacity style={styles.socialCardButton}>
                      <Text style={styles.socialCardButtonText}>Devamı Görüntüle</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            

            
            
          </ScrollView>
        );
      case 'ik':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>İnsan Kaynakları</Text>
            <Text style={styles.subtitle}>İK modülü</Text>
          </View>
        );
      case 'search':
        return <SearchScreen onBack={() => setActiveTab('home')} />;
      case 'industry':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Sanayi</Text>
            <Text style={styles.subtitle}>Sanayi modülü</Text>
          </View>
        );
      case 'menu':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Menü</Text>
            <Text style={styles.subtitle}>Menü modülü</Text>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Ana Sayfa</Text>
            <Text style={styles.subtitle}>Hoş geldiniz!</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {renderContent()}
      <BottomTabNavigator 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  homeContent: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoHighlight: {
    backgroundColor: '#666666',
    color: '#FFBB01',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginLeft: 1,
  },
  profileContainer: {
    position: 'absolute',
    left: 16,
    top: 10,
    paddingBottom: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFBB01',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFBB01',
  },
  profileIcon: {
    fontSize: 20,
  },
  notificationContainer: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
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
  featuredContainer: {
    marginBottom: 30,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  carouselContainer: {
    paddingVertical: 20,
  },
  featuredCard: {
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImageContainer: {
    width: '100%',
    height: 185,
    position: 'relative',
    overflow: 'hidden',
  },
  featuredImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryIconFallback: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  categoryBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryBadgeText: {
    color: '#191D20',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#191D20',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 6,
  },
  featuredTime: {
    color: '#191D20',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 16,
  },
  gradientOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 185,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ccc',
    width: 24,
    height: 8,
    borderRadius: 4,
  },

  arrowIcon: {
    color: '#FFBB01',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionScroll: {
    marginBottom: 24,
  },
  sectionContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  newsCard: {
    width: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  newsImage: {
    width: 140,
    height: 140,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 24,
    overflow: 'hidden',
  },
  newsImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsIcon: {
    fontSize: 30,
  },
  newsContent: {
    flex: 1,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  yellowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFBB01',
  },
  newsCategory: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 22,
    marginBottom: 10,
  },
  newsTime: {
    fontSize: 12,
    color: '#999999',
  },



  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
  jobDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateIcon: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
  },



  gosbikLogoHighlight: {
    backgroundColor: '#666666',
    color: '#FFBB01',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginLeft: 1,
  },
  socialTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  socialShares: {
    fontSize: 12,
    color: '#666666',
  },
  socialNav: {
    marginBottom: 12,
  },
  socialNavContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  socialNavItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
  },
  socialNavText: {
    fontSize: 12,
    color: '#191D20',
    fontWeight: '500',
  },
  socialImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialIcon: {
    fontSize: 30,
  },
  socialContent: {
    flex: 1,
  },
  socialCompany: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  socialDescription: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 16,
  },
  viewMoreButton: {
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    color: '#FFBB01',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  categoryFilter: {
    marginBottom: 20,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryFilterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  categoryFilterDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  categoryFilterText: {
    fontSize: 14,
    color: '#191D20',
    fontWeight: '500',
  },
  categoryFilterDotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#191D20',
  },
  // News Slider Styles
  newsSliderContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  emptyNewsContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  emptyNewsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  newsSlide: {
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  newsImageContainer: {
    width: '100%',
    height: 185,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  newsSlideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  newsCategoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  newsCategoryBadgeText: {
    color: '#191D20',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newsContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  newsSlideTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 8,
  },
  newsSlideTime: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  newsTitleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  newsDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  newsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeNewsDot: {
    backgroundColor: '#FFBB01',
    width: 24,
  },
  // Section Header Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 22,
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bantContainer: {
    width: 20,
    height: 10,
    opacity: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAllText: {
    color: '#FFBB01',
    fontSize: 14,
    fontWeight: '500',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFBB01',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Past News Styles
  pastNewsScroll: {
    marginBottom: 24,
  },
  pastNewsScrollContent: {
    paddingHorizontal: 22,
    gap: 16,
  },
  pastNewsCard: {
    width: 370,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    position: 'relative',
  },
  yellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  pastNewsImage: {
    width: 88,
    height: 88,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
  },
  pastNewsImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pastNewsContentArea: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  pastNewsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFBB01',
  },
  pastNewsCategory: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  pastNewsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    lineHeight: 18,
    marginBottom: 4,
    flex: 1,
  },
  pastNewsTime: {
    fontSize: 12,
    color: '#999999',
  },
  // Companies Styles
  companiesScroll: {
    marginBottom: 24,
  },
  companiesScrollContent: {
    paddingLeft: 22,
    paddingRight: 22,
    gap: 16,
  },
  companyCard: {
    width: 100,
    height: 70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  companyYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  companyLogo: {
    width: 72,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  companyLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191D20',
  },

  // Products Styles
  productsScroll: {
    marginBottom: 24,
  },
  productsScrollContent: {
    paddingLeft: 5,
    paddingRight: 22,
    gap: 16,
  },
  productCard: {
    width: 220,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    flexDirection: 'row',
    opacity: 1,
  },
  productYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 1,
  },
  productImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productBadge: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  productBadgeText: {
    fontSize: 10,
    color: '#191D20',
    fontWeight: 'bold',
  },
  productContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
    flex: 1,
  },
  productDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },

  // Job Postings Styles
  jobsScroll: {
    marginBottom: 24,
  },
  jobsScrollContent: {
    paddingLeft: 22,
    paddingRight: 22,
    gap: 16,
  },
  jobCard: {
    width: 285,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    marginRight: 16,
    opacity: 1,
  },
  jobYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  jobCardContent: {
    flex: 1,
    padding: 16,
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobCompanyLogoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  jobCompanyLogoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  jobCardInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#191D20',
    marginBottom: 0,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jobDetailText: {
    fontSize: 12,
    color: '#666666',
  },

  // Events Styles
  eventsScroll: {
    marginBottom: 24,
  },
  eventsScrollContent: {
    paddingHorizontal: 22,
    gap: 16,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    flexDirection: 'row',
  },
  eventYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  eventDateContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
    textAlign: 'center',
  },
  eventYear: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    marginBottom: 8,
    lineHeight: 18,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  organizerIcon: {
    fontSize: 12,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
  // Social Media Styles
  socialPlatformsContainer: {
    marginBottom: 20,
    paddingHorizontal: 22,
  },
  platformsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 12,
  },
  platformsScroll: {
    marginBottom: 10,
  },
  platformItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  platformIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  platformName: {
    fontSize: 11,
    color: '#191D20',
    textAlign: 'center',
  },
  socialMediaCards: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    gap: 16,
    marginBottom: 24,
  },

  socialMediaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  socialMediaCompanyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialMediaLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  socialMediaCompanyDetails: {
    flex: 1,
  },
  socialMediaCompanyName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 1,
  },
  socialMediaTime: {
    fontSize: 10,
    color: '#666',
  },
  socialMediaPlatform: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instagramIcon: {
    backgroundColor: '#E4405F',
    borderRadius: 6,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkedinIcon: {
    backgroundColor: '#0077B5',
    borderRadius: 6,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialMediaImage: {
    width: 165,
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialMediaContent: {
    padding: 12,
    paddingTop: 8,
  },
  socialMediaText: {
    fontSize: 12,
    color: '#191D20',
    lineHeight: 16,
    marginBottom: 10,
  },
  socialMediaButton: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  socialMediaButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#191D20',
  },

  // Social Media Section Styles
  socialMediaSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 12,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialMediaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 2,
  },
  gosbikLogoOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFBB01',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  gosbikLogoMiddle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gosbikLogoInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaLogoImage: {
    width: 40,
    height: 40,
  },
  socialMediaTitleContainer: {
    flex: 1,
    marginLeft: 20,
  },
  socialMediaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191D20',
    
        
    marginBottom: 2,
  },
  socialMediaSubtitle: {
    fontSize: 10,
    color: '#666666',
  },
  followButton: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#191D20',
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191D20',
  },
  platformTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  platformTab: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activePlatformTab: {
    borderBottomColor: '#191D20',
  },
  platformTabText: {
    fontSize: 14,
    color: '#666666',
  },
  activePlatformTabText: {
    color: '#191D20',
    fontWeight: '600',
  },
  platformTabIcon: {
    padding: 4,
  },
  socialCardsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  socialCard: {
    width: 150,
    height: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    opacity: 1,
  },
  socialCardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  socialCardContent: {
    padding: 12,
  },
  socialCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialCardCompanyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  socialCardCompanyLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  socialCardCompanyLogoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  toyotetsuCardLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E31E24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  toyotetsuCardLogoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  socialCardCompanyDetails: {
    flex: 1,
  },
  socialCardCompanyName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 2,
  },
  socialCardTime: {
    fontSize: 10,
    color: '#666666',
  },
  socialCardPlatformIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialCardText: {
    fontSize: 12,
    color: '#191D20',
    lineHeight: 16,
    marginBottom: 8,
  },
  socialCardButton: {
    alignSelf: 'flex-start',
  },
  socialCardButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFBB01',
  },
  toyotetsuCardImage: {
    position: 'relative',
  },
  toyotetsuOverlayNew: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'space-between',
    padding: 8,
  },
  toyotetsuHeaderNew: {
    alignItems: 'center',
  },
  toyotetsuDotsNew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  redDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E31E24',
    marginRight: 4,
  },
  redDotLargeNew: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E31E24',
  },
  toyotetsuTitleNew: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 2,
  },
  toyotetsuSubtitleNew: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  toyotetsuDescNew: {
    fontSize: 8,
    color: '#191D20',
    textAlign: 'center',
    marginBottom: 2,
  },
  toyotetsuHighlightNew: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 2,
  },
  toyotetsuEndNew: {
    fontSize: 8,
    color: '#191D20',
  },
  toyotetsuBottomNew: {
    alignItems: 'center',
    backgroundColor: '#E31E24',
    paddingVertical: 4,
    marginHorizontal: -8,
    marginBottom: -8,
  },
  toyotetsuBrandNew: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  socialMediaYellowStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FFBB01',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  jobListingsHeader: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  jobListingsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  gosbikLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gosbikLogoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  gosbikLogoImage: {
    width: 36,
    height: 36,
  },
  jobListingsTitleContainer: {
    flex: 1,
    marginLeft: 66,
    marginTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobListingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191D20',
  },
  jobListingsSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  jobListingsViewAll: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFBB01',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#191D20',
    maxWidth: 70,
    marginLeft: 20,
  },
  jobListingsViewAllText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#191D20',
    textAlign: 'center',
  },
  socialPlatforms: {
    marginTop: 12,
  },
  platformsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 8,
  },
  platformsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    width: 36,
    height: 36,
    marginHorizontal: 2,
  },
  smallIcon: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.6 }],
  },
  platformText: {
    fontSize: 7,
    color: '#191D20',
    marginLeft: 2,
    fontWeight: '500',
    textAlign: 'center',
  },
  socialMediaPosts: {
    marginTop: 16,
  },
  postsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  socialMediaCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  postImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  toyotetsuLogo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E31E24',
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#191D20',
    marginBottom: 1,
  },
  postTime: {
    fontSize: 9,
    color: '#666666',
  },
  socialPlatformIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    padding: 8,
    paddingTop: 4,
  },
  postText: {
    fontSize: 10,
    color: '#191D20',
    lineHeight: 14,
    marginBottom: 8,
  },
  continueButton: {
    alignSelf: 'flex-start',
  },
  continueText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFBB01',
  },
  toyotetsuImageContainer: {
    position: 'relative',
  },
  toyotetsuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'space-between',
    padding: 12,
  },
  toyotetsuHeader: {
    alignItems: 'center',
  },
  toyotetsuDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E31E24',
    marginRight: 4,
  },
  redDotLarge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E31E24',
  },
  toyotetsuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 2,
  },
  toyotetsuSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  toyotetsuDescription: {
    fontSize: 10,
    color: '#191D20',
    textAlign: 'center',
    marginBottom: 2,
  },
  toyotetsuHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 2,
  },
  toyotetsuEnd: {
    fontSize: 10,
    color: '#191D20',
  },
  toyotetsuBottom: {
    alignItems: 'center',
    backgroundColor: '#E31E24',
    paddingVertical: 4,
    marginHorizontal: -12,
    marginBottom: -12,
  },
  toyotetsuBrand: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  toyotetsuLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E31E24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  toyotetsuLogoText: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  jobListingsContent: {
    flex: 1,
  },
  jobCardContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 12,
  },
  jobCardStripe: {
    width: 4,
    backgroundColor: '#FFBB01',
    borderRadius: 2,
    marginRight: 8,
  },

  jobLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobLocation: {
    fontSize: 11,
    color: '#999999',
  },
  jobSalary: {
    alignItems: 'flex-end',
  },
  jobSalaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  jobSalaryPeriod: {
    fontSize: 10,
    color: '#666666',
  },
  jobSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  skillTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  skillTagText: {
    fontSize: 10,
    color: '#1976D2',
    fontWeight: '500',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobPostedTime: {
    fontSize: 10,
    color: '#999999',
  },
  jobApplyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  jobApplyButtonText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFFFFF',
  },

});

export default MainScreen;
