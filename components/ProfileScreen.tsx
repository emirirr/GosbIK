import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Svg, { Path, Circle, Rect, Defs, LinearGradient, Stop, ClipPath, G } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { scale, verticalScale, fontScale, responsiveSpacing, responsiveFontSize, responsiveIconSize, responsiveSafeArea, isSmallDevice, isLargeDevice } from '../utils/responsive';

type Props = { onBack: () => void; onLogout?: () => void; onNavigate?: (route: 'account') => void };

const BackIcon: React.FC<{ color?: string }> = ({ color = '#191D20' }) => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M6.8 13.001l2.9 2.9c.183.183.275.417.275.7s-.092.517-.275.7c-.183.183-.416.275-.7.275s-.517-.092-.7-.275L3.7 12.701a.97.97 0 01-.212-.625c0-.133.021-.258.063-.375.042-.116.113-.225.213-.325L8.3 6.701c.183-.183.416-.275.7-.275.283 0 .517.092.7.275.183.183.275.417.275.7 0 .283-.092.517-.275.7l-2.9 2.9H20c.283 0 .52.096.712.288.192.192.288.43.288.713 0 .283-.096.521-.288.713-.192.192-.429.288-.712.288H6.8z" fill={color} />
  </Svg>
);

const PencilIcon: React.FC = () => (
  <Svg width={responsiveIconSize.md} height={responsiveIconSize.md} viewBox="0 0 24 24" fill="none">
    <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#191D20" />
  </Svg>
);

const UserCircleIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-8 1.34-8 4v2h16v-2c0-2.66-4.67-4-8-4z" fill="#191D20" />
  </Svg>
);

// Person Icon (person.svg)
const PersonIcon: React.FC = () => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" fill="#191D20"/>
  </Svg>
);

// Support Agent Icon (support_agent.svg)
const SupportAgentIcon: React.FC = () => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20C11 19.7167 11.0958 19.4792 11.2875 19.2875C11.4792 19.0958 11.7167 19 12 19H19V11.9C19 9.95 18.3208 8.29583 16.9625 6.9375C15.6042 5.57917 13.95 4.9 12 4.9C10.05 4.9 8.39583 5.57917 7.0375 6.9375C5.67917 8.29583 5 9.95 5 11.9V17C5 17.2833 4.90417 17.5208 4.7125 17.7125C4.52083 17.9042 4.28333 18 4 18C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V14C2 13.65 2.0875 13.3208 2.2625 13.0125C2.4375 12.7042 2.68333 12.4583 3 12.275L3.075 10.95C3.20833 9.81667 3.5375 8.76667 4.0625 7.8C4.5875 6.83333 5.24583 5.99167 6.0375 5.275C6.82917 4.55833 7.7375 4 8.7625 3.6C9.7875 3.2 10.8667 3 12 3C13.1333 3 14.2083 3.2 15.225 3.6C16.2417 4 17.15 4.55417 17.95 5.2625C18.75 5.97083 19.4083 6.80833 19.925 7.775C20.4417 8.74167 20.775 9.79167 20.925 10.925L21 12.225C21.3167 12.375 21.5625 12.6 21.7375 12.9C21.9125 13.2 22 13.5167 22 13.85V16.15C22 16.4833 21.9125 16.8 21.7375 17.1C21.5625 17.4 21.3167 17.625 21 17.775V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H12ZM9 14C8.71667 14 8.47917 13.9042 8.2875 13.7125C8.09583 13.5208 8 13.2833 8 13C8 12.7167 8.09583 12.4792 8.2875 12.2875C8.47917 12.0958 8.71667 12 9 12C9.28333 12 9.52083 12.0958 9.7125 12.2875C9.90417 12.4792 10 12.7167 10 13C10 13.2833 9.90417 13.5208 9.7125 13.7125C9.52083 13.9042 9.28333 14 9 14ZM15 14C14.7167 14 14.4792 13.9042 14.2875 13.7125C14.0958 13.5208 14 13.2833 14 13C14 12.7167 14.0958 12.4792 14.2875 12.2875C14.4792 12.0958 14.7167 12 15 12C15.2833 12 15.5208 12.0958 15.7125 12.2875C15.9042 12.4792 16 12.7167 16 13C16 13.2833 15.9042 13.5208 15.7125 13.7125C15.5208 13.9042 15.2833 14 15 14ZM6.025 12.45C5.90833 10.6833 6.44167 9.16667 7.625 7.9C8.80833 6.63333 10.2833 6 12.05 6C13.5333 6 14.8375 6.47083 15.9625 7.4125C17.0875 8.35417 17.7667 9.55833 18 11.025C16.4833 11.0083 15.0875 10.6 13.8125 9.8C12.5375 9 11.5583 7.91667 10.875 6.55C10.6083 7.88333 10.0458 9.07083 9.1875 10.1125C8.32917 11.1542 7.275 11.9333 6.025 12.45Z" fill="#191D20"/>
  </Svg>
);

// Settings Icon (settings.svg)
const SettingsIcon: React.FC = () => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8C11.2089 8 10.4355 8.2346 9.77772 8.67412C9.11993 9.11365 8.60723 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61216 14.269 9.17157 14.8284C9.73098 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z" fill="#191D20"/>
    <Path d="M21.2943 13.9L20.8503 13.644C21.0502 12.5564 21.0502 11.4416 20.8503 10.354L21.2943 10.098C21.6357 9.90102 21.935 9.63871 22.1751 9.32606C22.4151 9.01341 22.5913 8.65654 22.6934 8.27582C22.7956 7.8951 22.8217 7.49799 22.7704 7.10716C22.7191 6.71633 22.5913 6.33944 22.3943 5.998C22.1973 5.65656 21.935 5.35727 21.6223 5.1172C21.3097 4.87714 20.9528 4.70101 20.5721 4.59886C20.1914 4.49672 19.7943 4.47056 19.4034 4.52189C19.0126 4.57321 18.6357 4.70102 18.2943 4.898L17.8493 5.155C17.0088 4.43692 16.043 3.88025 15.0003 3.513V3C15.0003 2.20435 14.6842 1.44129 14.1216 0.87868C13.559 0.31607 12.7959 0 12.0003 0C11.2046 0 10.4416 0.31607 9.87897 0.87868C9.31636 1.44129 9.00029 2.20435 9.00029 3V3.513C7.95767 3.88157 6.99214 4.4396 6.15229 5.159L5.70529 4.9C5.01572 4.50218 4.19637 4.39457 3.42747 4.60086C2.65857 4.80715 2.00311 5.31044 1.60529 6C1.20746 6.68956 1.09986 7.50892 1.30615 8.27782C1.51244 9.04672 2.01572 9.70218 2.70529 10.1L3.14929 10.356C2.9494 11.4436 2.9494 12.5584 3.14929 13.646L2.70529 13.902C2.01572 14.2998 1.51244 14.9553 1.30615 15.7242C1.09986 16.4931 1.20746 17.3124 1.60529 18.002C2.00311 18.6916 2.65857 19.1948 3.42747 19.4011C4.19637 19.6074 5.01572 19.4998 5.70529 19.102L6.15029 18.845C6.99105 19.5632 7.95727 20.1199 9.00029 20.487V21C9.00029 21.7956 9.31636 22.5587 9.87897 23.1213C10.4416 23.6839 11.2046 24 12.0003 24C12.7959 24 13.559 23.6839 14.1216 23.1213C14.6842 22.5587 15.0003 21.7956 15.0003 21V20.487C16.0429 20.1184 17.0084 19.5604 17.8483 18.841L18.2953 19.099C18.9849 19.4968 19.8042 19.6044 20.5731 19.3981C21.342 19.1918 21.9975 18.6886 22.3953 17.999C22.7931 17.3094 22.9007 16.4901 22.6944 15.7212C22.4881 14.9523 21.9849 14.2968 21.2953 13.899L21.2943 13.9ZM18.7463 10.124C19.0849 11.3511 19.0849 12.6469 18.7463 13.874C18.6872 14.0876 18.7006 14.3147 18.7846 14.5198C18.8686 14.7249 19.0183 14.8963 19.2103 15.007L20.2943 15.633C20.5241 15.7656 20.6918 15.9841 20.7605 16.2403C20.8293 16.4966 20.7934 16.7697 20.6608 16.9995C20.5282 17.2293 20.3097 17.397 20.0534 17.4658C19.7972 17.5345 19.5241 17.4986 19.2943 17.366L18.2083 16.738C18.0162 16.6267 17.7925 16.5826 17.5725 16.6124C17.3526 16.6423 17.1488 16.7445 16.9933 16.903C16.1032 17.8117 14.9819 18.46 13.7503 18.778C13.5353 18.8333 13.3448 18.9585 13.2089 19.1339C13.0729 19.3094 12.9992 19.525 12.9993 19.747V21C12.9993 21.2652 12.8939 21.5196 12.7064 21.7071C12.5189 21.8946 12.2645 22 11.9993 22C11.7341 22 11.4797 21.8946 11.2922 21.7071C11.1046 21.5196 10.9993 21.2652 10.9993 21V19.748C10.9994 19.526 10.9257 19.3104 10.7897 19.1349C10.6537 18.9595 10.4633 18.8343 10.2483 18.779C9.01663 18.4597 7.89562 17.81 7.00629 16.9C6.85081 16.7415 6.64702 16.6393 6.42704 16.6094C6.20706 16.5796 5.98339 16.6237 5.79129 16.735L4.70729 17.362C4.59352 17.4287 4.46768 17.4722 4.33701 17.4901C4.20635 17.508 4.07344 17.4998 3.94594 17.4661C3.81844 17.4324 3.69887 17.3738 3.59411 17.2937C3.48935 17.2136 3.40146 17.1135 3.33552 16.9993C3.26958 16.8851 3.22688 16.759 3.20988 16.6282C3.19289 16.4974 3.20192 16.3646 3.23648 16.2373C3.27103 16.11 3.33042 15.9909 3.41122 15.8866C3.49202 15.7824 3.59264 15.6952 3.70729 15.63L4.79129 15.004C4.98324 14.8933 5.13296 14.7219 5.21695 14.5168C5.30093 14.3117 5.31442 14.0846 5.25529 13.871C4.91664 12.6439 4.91664 11.3481 5.25529 10.121C5.31335 9.90788 5.29922 9.68153 5.2151 9.47729C5.13098 9.27305 4.9816 9.10241 4.79029 8.992L3.70629 8.366C3.47648 8.23339 3.30876 8.01492 3.24003 7.75865C3.17129 7.50239 3.20718 7.22931 3.33979 6.9995C3.4724 6.76969 3.69086 6.60197 3.94713 6.53324C4.2034 6.46451 4.47648 6.50039 4.70629 6.633L5.79229 7.261C5.98387 7.37251 6.20707 7.41721 6.42681 7.38807C6.64656 7.35893 6.8504 7.25759 7.00629 7.1C7.89637 6.19134 9.01771 5.54302 10.2493 5.225C10.4649 5.16956 10.6559 5.04375 10.7919 4.8675C10.928 4.69125 11.0013 4.47464 11.0003 4.252V3C11.0003 2.73478 11.1056 2.48043 11.2932 2.29289C11.4807 2.10536 11.7351 2 12.0003 2C12.2655 2 12.5199 2.10536 12.7074 2.29289C12.8949 2.48043 13.0003 2.73478 13.0003 3V4.252C13.0002 4.47396 13.0739 4.68964 13.2099 4.86508C13.3458 5.04052 13.5363 5.16573 13.7513 5.221C14.9833 5.54015 16.1047 6.18988 16.9943 7.1C17.1498 7.25847 17.3535 7.36069 17.5735 7.39057C17.7935 7.42044 18.0172 7.37626 18.2093 7.265L19.2933 6.638C19.4071 6.5713 19.5329 6.52777 19.6636 6.5099C19.7942 6.49204 19.9271 6.50019 20.0546 6.5339C20.1821 6.56761 20.3017 6.6262 20.4065 6.70631C20.5112 6.78642 20.5991 6.88646 20.6651 7.00067C20.731 7.11488 20.7737 7.24101 20.7907 7.37179C20.8077 7.50257 20.7987 7.63542 20.7641 7.76269C20.7295 7.88997 20.6702 8.00915 20.5894 8.11337C20.5086 8.2176 20.4079 8.30482 20.2933 8.37L19.2093 8.996C19.0183 9.10671 18.8694 9.27748 18.7856 9.48169C18.7019 9.68591 18.688 9.9121 18.7463 10.125V10.124Z" fill="#191D20"/>
  </Svg>
);

// Bookmark Icon (bookmark.svg)
const BookmarkIcon: React.FC = () => (
  <Svg width={scale(14)} height={scale(17)} viewBox="0 0 14 17" fill="none">
    <Path d="M7 15L2.8 16.8C2.13333 17.0833 1.5 17.0292 0.9 16.6375C0.3 16.2458 0 15.6917 0 14.975V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V14.975C14 15.6917 13.7 16.2458 13.1 16.6375C12.5 17.0292 11.8667 17.0833 11.2 16.8L7 15ZM7 12.8L12 14.95V2H2V14.95L7 12.8Z" fill="#191D20"/>
  </Svg>
);

// Illustration for confirmation modal based on assets/images/icons/emin misin.svg
const ConfirmIllustration: React.FC = () => (
  <Svg width={scale(132)} height={scale(132)} viewBox="0 0 132 132" fill="none">
    <Defs>
      <LinearGradient id="g1" x1="66" y1="14" x2="66" y2="56">
        <Stop stopColor="#E79F35" />
        <Stop offset="1" stopColor="#FFC977" stopOpacity="0.1" />
      </LinearGradient>
      <LinearGradient id="g2" x1="66" y1="20.5264" x2="66" y2="49.4737">
        <Stop stopColor="#E79F35" />
        <Stop offset="1" stopColor="#FFC977" />
      </LinearGradient>
      <ClipPath id="clip">
        <Rect width="132" height="132" rx="66" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip)">
      <Circle cx="66" cy="71" r="66" fill="#E6FDFD" />
      <Rect x="18" y="35" width="95" height="63" rx="12" fill="#FAFFFF" />
      <Rect x="-9" y="107" width="95" height="63" rx="12" fill="#FAFFFF" />
      <Rect x="95" y="107" width="49" height="63" rx="12" fill="#FAFFFF" />
      <Circle opacity="0.2" cx="66" cy="35" r="21" fill="url(#g1)" />
      <Circle cx="66.0001" cy="35.0001" r="14.4737" fill="url(#g2)" />
      <Path d="M66.6487 22.2501L73.7934 34.6252C74.0005 34.9839 73.8776 35.4426 73.5189 35.6496C73.4049 35.7155 73.2756 35.7502 73.1439 35.7502H58.8545C58.4403 35.7502 58.1045 35.4144 58.1045 35.0002C58.1045 34.8685 58.1391 34.7392 58.205 34.6252L65.3497 22.2501C65.5568 21.8914 66.0154 21.7685 66.3742 21.9756C66.4882 22.0414 66.5829 22.1361 66.6487 22.2501ZM60.1535 34.2502H71.8449L65.9992 24.1251L60.1535 34.2502ZM65.2492 32.0002H66.7492V33.5002H65.2492V32.0002ZM65.2492 26.7501H66.7492V30.5002H65.2492V26.7501Z" fill="white" />
      <Rect x="33" y="63" width="65" height="6" rx="3" fill="#9CF8F7" />
      <Rect x="48" y="78" width="35" height="6" rx="3" fill="#9CF8F7" />
      <Rect x="21" y="120" width="35" height="6" rx="3" fill="#9CF8F7" />
    </G>
  </Svg>
);

const LogoutIcon: React.FC = () => (
  <Svg width={responsiveIconSize.lg} height={responsiveIconSize.lg} viewBox="0 0 24 24" fill="none">
    <Path d="M20.15 13H9C8.71667 13 8.47917 12.9042 8.2875 12.7125C8.09583 12.5208 8 12.2833 8 12C8 11.7167 8.09583 11.4792 8.2875 11.2875C8.47917 11.0958 8.71667 11 9 11H20.15L19.3 10.15C19.1 9.95 19.0042 9.71667 19.0125 9.45C19.0208 9.18333 19.1167 8.95 19.3 8.75C19.5 8.55 19.7375 8.44583 20.0125 8.4375C20.2875 8.42917 20.525 8.525 20.725 8.725L23.3 11.3C23.5 11.5 23.6 11.7333 23.6 12C23.6 12.2667 23.5 12.5 23.3 12.7L20.725 15.275C20.525 15.475 20.2875 15.5708 20.0125 15.5625C19.7375 15.5542 19.5 15.45 19.3 15.25C19.1167 15.05 19.0208 14.8167 19.0125 14.55C19.0042 14.2833 19.1 14.05 19.3 13.85L20.15 13ZM15 8V5H5V19H15V16C15 15.7167 15.0958 15.4792 15.2875 15.2875C15.4792 15.0958 15.7167 15 16 15C16.2833 15 16.5208 15.0958 16.7125 15.2875C16.9042 15.4792 17 15.7167 17 16V19C17 19.55 16.8042 20.0208 16.4125 20.4125C16.0208 20.8042 15.55 21 15 21H5C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H15C15.55 3 16.0208 3.19583 16.4125 3.5875C16.8042 3.97917 17 4.45 17 5V8C17 8.28333 16.9042 8.52083 16.7125 8.7125C16.5208 8.90417 16.2833 9 16 9C15.7167 9 15.4792 8.90417 15.2875 8.7125C15.0958 8.52083 15 8.28333 15 8Z" fill="#FFBB01"/>
  </Svg>
);

const ChevronRight: React.FC = () => (
  <Svg width={responsiveIconSize.md} height={responsiveIconSize.md} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke="#191D20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ProfileScreen: React.FC<Props> = ({ onBack, onLogout, onNavigate }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFBB01" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBanner}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <BackIcon color="#191D20" />
          </TouchableOpacity>
          <View style={styles.avatarOuter}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328d13da?w=256&h=256&fit=crop' }}
              style={styles.avatar}
            />
            <View style={styles.editBadge}>
              <View style={styles.editBadgeInner}>
                <PencilIcon />
              </View>
            </View>
          </View>
          <Text style={styles.name}>İsmail Emir Tiryaki</Text>
          <Text style={styles.title}>Full Stack Developer</Text>
        </View>

        <View style={styles.menuList}>
          <MenuItem icon={<PersonIcon />} label="Hesabım" onPress={() => onNavigate && onNavigate('account')} />
          <MenuItem icon={<SupportAgentIcon />} label="Gosbik İletişim" />
          <MenuItem icon={<SettingsIcon />} label="Ayarlar" />
          <MenuItem icon={<BookmarkIcon />} label="Kaydedilenler" />
          <MenuItem icon={<LogoutIcon />} label="Çıkış Yap" onPress={() => setShowLogoutModal(true)} />
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <BlurView intensity={10} tint="dark" style={styles.absoluteFill} />
          <View style={[styles.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <View style={styles.modalIllustration}>
              <ConfirmIllustration />
            </View>
            <Text style={styles.modalTitle}>Emin misin</Text>
            <Text style={styles.modalDesc}>
              Bu hesaptan çıkış yapmak istediğinizden emin misiniz? Kolayca tekrar giriş yapabilirsiniz.
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cancelButton}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.cancelButtonText}>İptal Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logoutButton}
              onPress={() => {
                setShowLogoutModal(false);
                onLogout && onLogout();
              }}
            >
              <Text style={styles.logoutButtonText}>Oturumu Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; onPress?: () => void }> = ({ icon, label, onPress }) => {
  const isLogout = label === "Çıkış Yap";
  return (
    <TouchableOpacity style={[styles.menuItem, isLogout && styles.logoutMenuItem]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconWrap, isLogout && styles.logoutIconWrap]}>{icon}</View>
        <Text style={[styles.menuLabel, isLogout && styles.logoutLabel]}>{label}</Text>
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F6F6F6',
    paddingHorizontal: responsiveSafeArea.horizontal,
  },
  scroll: { 
    paddingBottom: responsiveSpacing['2xl'],
  },
  topBanner: {
    backgroundColor: '#FFBB01',
    paddingTop: responsiveSafeArea.top,
    paddingBottom: responsiveSpacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    marginHorizontal: -responsiveSafeArea.horizontal,
  },
  backBtn: { 
    position: 'absolute', 
    left: responsiveSpacing.md, 
    top: responsiveSafeArea.top, 
    padding: responsiveSpacing.sm,
  },
  avatarOuter: {
    width: scale(128),
    height: scale(128),
    borderRadius: scale(64),
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveSpacing.md,
  },
  avatar: { 
    width: scale(120), 
    height: scale(120), 
    borderRadius: scale(60),
  },
  editBadge: {
    position: 'absolute',
    bottom: -scale(2),
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  editBadgeInner: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { 
    marginTop: responsiveSpacing.lg, 
    fontSize: responsiveFontSize.xl, 
    fontWeight: '800', 
    color: '#191D20',
    textAlign: 'center',
  },
  title: { 
    marginTop: responsiveSpacing.xs, 
    fontSize: responsiveFontSize.sm, 
    color: '#191D20',
    textAlign: 'center',
  },

  menuList: { 
    paddingHorizontal: responsiveSpacing.md, 
    marginTop: responsiveSpacing.md, 
    gap: responsiveSpacing.md,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    paddingVertical: responsiveSpacing.md,
    paddingHorizontal: responsiveSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.06,
    shadowRadius: scale(4),
    elevation: 1,
    minHeight: scale(60),
  },
  menuItemLeft: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  menuIconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFBB01',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveSpacing.md,
  },
  menuLabel: { 
    fontSize: responsiveFontSize.base, 
    color: '#191D20', 
    fontWeight: '600',
    flex: 1,
  },
  logoutMenuItem: {
    backgroundColor: '#191D20',
  },
  logoutIconWrap: {
    backgroundColor: '#191D20',
  },
  logoutLabel: {
    color: '#FFFFFF',
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: responsiveSpacing.lg,
    paddingTop: responsiveSpacing.lg,
    paddingBottom: responsiveSpacing.xl,
  },
  modalHandle: {
    width: scale(120),
    height: scale(6),
    borderRadius: scale(3),
    alignSelf: 'center',
    backgroundColor: '#CFCFCF',
    marginBottom: responsiveSpacing.lg,
  },
  modalIllustration: {
    alignSelf: 'center',
    backgroundColor: '#F3F7FF',
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveSpacing.md,
  },
  modalTitle: {
    fontSize: responsiveFontSize.lg,
    fontWeight: '800',
    color: '#191D20',
    textAlign: 'center',
    marginBottom: responsiveSpacing.sm,
  },
  modalDesc: {
    fontSize: responsiveFontSize.sm,
    color: '#666666',
    textAlign: 'center',
    marginHorizontal: responsiveSpacing.md,
    marginBottom: responsiveSpacing.lg,
  },
  cancelButton: {
    backgroundColor: '#FFBB01',
    borderRadius: scale(12),
    paddingVertical: responsiveSpacing.md,
    alignItems: 'center',
    marginBottom: responsiveSpacing.md,
  },
  cancelButtonText: {
    color: '#191D20',
    fontWeight: '700',
    fontSize: responsiveFontSize.base,
  },
  logoutButton: {
    backgroundColor: '#E9E9EB',
    borderRadius: scale(12),
    paddingVertical: responsiveSpacing.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#191D20',
    fontWeight: '700',
    fontSize: responsiveFontSize.base,
  },
});

export default ProfileScreen;



