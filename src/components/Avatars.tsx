import React from 'react';

export const AvatarIcon = ({ type = 'dog', className = '' }: { type?: string, className?: string }) => {
  const cn = `w-full h-full drop-shadow-md ${className}`;
  switch(type) {
    case 'fox':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn}>
          <circle cx="50" cy="50" r="50" fill="#FFE0B2"/>
          <path d="M25 40L20 15L45 25Z" fill="#F4511E"/>
          <path d="M75 40L80 15L55 25Z" fill="#F4511E"/>
          <path d="M28 35L24 18L40 25Z" fill="#212121"/>
          <path d="M72 35L76 18L60 25Z" fill="#212121"/>
          <circle cx="50" cy="45" r="26" fill="#FF8A65"/>
          <path d="M24 45C24 60 50 65 50 65C50 65 76 60 76 45C76 50 50 55 24 45Z" fill="#FFF3E0"/>
          <circle cx="50" cy="65" r="15" fill="#FFF3E0"/>
          <circle cx="40" cy="42" r="3.5" fill="#212121"/>
          <circle cx="60" cy="42" r="3.5" fill="#212121"/>
          <circle cx="41" cy="41" r="1.5" fill="white"/>
          <circle cx="61" cy="41" r="1.5" fill="white"/>
          <ellipse cx="50" cy="58" rx="4" ry="2" fill="#212121"/>
          <path d="M47 62Q50 65 53 62" stroke="#212121" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M80 85C80 70 65 60 50 60C35 60 20 70 20 85C20 88 22 90 25 90H75C78 90 80 88 80 85Z" fill="#FF8A65"/>
          <circle cx="50" cy="72" r="8" fill="#FFF3E0"/>
        </svg>
      );
    case 'panda':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn}>
          <circle cx="50" cy="50" r="50" fill="#C8E6C9"/>
          <circle cx="28" cy="28" r="12" fill="#212121"/>
          <circle cx="72" cy="28" r="12" fill="#212121"/>
          <ellipse cx="50" cy="45" rx="28" ry="24" fill="#FFFFFF"/>
          <path d="M35 35C42 35 45 42 45 48C45 54 40 50 35 50C28 50 25 45 25 42C25 38 28 35 35 35Z" fill="#212121" transform="rotate(-15 35 42)"/>
          <path d="M65 35C58 35 55 42 55 48C55 54 60 50 65 50C72 50 75 45 75 42C75 38 72 35 65 35Z" fill="#212121" transform="rotate(15 65 42)"/>
          <circle cx="37" cy="43" r="3" fill="#FFFFFF"/>
          <circle cx="63" cy="43" r="3" fill="#FFFFFF"/>
          <ellipse cx="50" cy="53" rx="4" ry="2.5" fill="#212121"/>
          <path d="M47 57Q50 60 53 57" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M80 85C80 70 65 65 50 65C35 65 20 70 20 85C20 88 22 90 25 90H75C78 90 80 88 80 85Z" fill="#212121"/>
          <path d="M70 85C70 70 60 62 50 62C40 62 30 70 30 85" fill="#FFFFFF"/>
        </svg>
      );
    case 'rabbit':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn}>
          <circle cx="50" cy="50" r="50" fill="#FCE4EC"/>
          <path d="M40 30C40 10 35 5 30 5C25 5 20 10 30 30Z" fill="#E0E0E0"/>
          <path d="M60 30C60 10 65 5 70 5C75 5 80 10 70 30Z" fill="#E0E0E0"/>
          <path d="M38 25C38 10 34 8 30 8C26 8 22 10 32 25Z" fill="#F8BBD0"/>
          <path d="M62 25C62 10 66 8 70 8C74 8 78 10 68 25Z" fill="#F8BBD0"/>
          <ellipse cx="50" cy="50" rx="26" ry="22" fill="#F5F5F5"/>
          <circle cx="40" cy="45" r="3.5" fill="#3E2723"/>
          <circle cx="60" cy="45" r="3.5" fill="#3E2723"/>
          <circle cx="41" cy="44" r="1.5" fill="white"/>
          <circle cx="61" cy="44" r="1.5" fill="white"/>
          <ellipse cx="50" cy="54" rx="4" ry="2.5" fill="#F48FB1"/>
          <path d="M50 56V59 M47 59Q50 62 53 59" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M25 50L35 52M25 55L35 55" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M75 50L65 52M75 55L65 55" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M72 85C72 72 62 65 50 65C38 65 28 72 28 85C28 88 30 90 33 90H67C70 90 72 88 72 85Z" fill="#E0E0E0"/>
          <ellipse cx="50" cy="78" rx="12" ry="14" fill="#F5F5F5"/>
        </svg>
      );
    case 'dog':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn}>
          <circle cx="50" cy="50" r="50" fill="#FFF3E0"/>
          <path d="M25 40C20 30 25 15 35 15C40 15 45 25 45 35C45 40 30 45 25 40Z" fill="#D7CCC8"/>
          <path d="M75 40C80 30 75 15 65 15C60 15 55 25 55 35C55 40 70 45 75 40Z" fill="#8D6E63"/>
          <circle cx="50" cy="45" r="25" fill="#A1887F"/>
          <circle cx="50" cy="55" r="18" fill="#EFEBE9"/>
          <circle cx="42" cy="40" r="4" fill="#3E2723"/>
          <circle cx="58" cy="40" r="4" fill="#3E2723"/>
          <circle cx="43" cy="39" r="1.5" fill="white"/>
          <circle cx="59" cy="39" r="1.5" fill="white"/>
          <path d="M47 52H53L50 56L47 52Z" fill="#3E2723"/>
          <path d="M45 58Q50 62 50 58Q50 62 55 58" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M70 85C70 70 60 60 50 60C40 60 30 70 30 85C30 88 32 90 35 90H65C68 90 70 88 70 85Z" fill="#8D6E63"/>
          <path d="M35 63Q50 70 65 63L62 67Q50 72 38 67L35 63Z" fill="#E53935"/>
          <circle cx="50" cy="68" r="4" fill="#FFD54F"/>
        </svg>
      );
    case 'cat':
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn}>
           <circle cx="50" cy="50" r="50" fill="#E3F2FD"/>
           <path d="M25 25L35 40L45 20L25 25Z" fill="#B0BEC5"/>
           <path d="M75 25L65 40L55 20L75 25Z" fill="#B0BEC5"/>
           <path d="M30 28L36 38L41 26L30 28Z" fill="#F8BBD0"/>
           <path d="M70 28L64 38L59 26L70 28Z" fill="#F8BBD0"/>
           <circle cx="50" cy="45" r="24" fill="#CFD8DC"/>
           <path d="M45 25V30M50 23V32M55 25V30" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round"/>
           <path d="M40 40Q43 38 46 40Q43 42 40 40Z" fill="#FFF59D"/>
           <path d="M60 40Q57 38 54 40Q57 42 60 40Z" fill="#FFF59D"/>
           <path d="M43 39V41" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
           <path d="M57 39V41" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
           <path d="M48 48H52L50 51L48 48Z" fill="#F48FB1"/>
           <path d="M46 53Q50 56 50 53Q50 56 54 53" stroke="#546E7A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
           <path d="M25 45L35 48M25 50L35 50M25 55L35 52" stroke="#ECEFF1" strokeWidth="1.5" strokeLinecap="round"/>
           <path d="M75 45L65 48M75 50L65 50M75 55L65 52" stroke="#ECEFF1" strokeWidth="1.5" strokeLinecap="round"/>
           <path d="M72 85C72 65 60 55 50 55C40 55 28 65 28 85C28 88 30 90 33 90H67C70 90 72 88 72 85Z" fill="#B0BEC5"/>
        </svg>
      );
    case 'bear':
    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn}>
          <circle cx="50" cy="50" r="50" fill="#E8F5E9"/>
          <circle cx="30" cy="25" r="10" fill="#795548"/>
          <circle cx="70" cy="25" r="10" fill="#795548"/>
          <circle cx="30" cy="25" r="6" fill="#D7CCC8"/>
          <circle cx="70" cy="25" r="6" fill="#D7CCC8"/>
          <ellipse cx="50" cy="45" rx="28" ry="26" fill="#8D6E63"/>
          <ellipse cx="50" cy="52" rx="14" ry="12" fill="#D7CCC8"/>
          <circle cx="40" cy="40" r="3" fill="#212121"/>
          <circle cx="60" cy="40" r="3" fill="#212121"/>
          <ellipse cx="50" cy="48" rx="5" ry="3" fill="#3E2723"/>
          <path d="M50 51V55 M46 55Q50 58 54 55" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M78 85C78 68 62 60 50 60C38 60 22 68 22 85C22 88 25 90 28 90H72C75 90 78 88 78 85Z" fill="#795548"/>
          <path d="M60 85C60 70 54 65 50 65C46 65 40 70 40 85" fill="#A1887F"/>
        </svg>
      );
  }
};
