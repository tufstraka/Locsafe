import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// Logo Mark
const LogoMark = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 22V10h2v10h6v2H10z" fill="currentColor"/>
  </svg>
);

LogoMark.propTypes = {
  className: PropTypes.string
};

const NetworkIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1565C0" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#1565C0" stopOpacity="0"/>
      </radialGradient>
      
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1565C0" stopOpacity="0.5"/>
        <stop offset="50%" stopColor="#1565C0" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#1565C0" stopOpacity="0.5"/>
      </linearGradient>
      
      <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1565C0" floodOpacity="0.2"/>
      </filter>
      
      <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <clipPath id="flowClip">
        <rect x="0" y="0" width="400" height="300"/>
      </clipPath>
    </defs>
    
    <circle cx="200" cy="150" r="120" fill="url(#centerGlow)"/>
    
    <ellipse cx="200" cy="150" rx="140" ry="100" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="4 8"/>
    <ellipse cx="200" cy="150" rx="110" ry="78" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1"/>
    <ellipse cx="200" cy="150" rx="80" ry="56" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.12"/>
    <ellipse cx="200" cy="150" rx="50" ry="35" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="2 4"/>
    
    <path d="M60 100 Q130 60 200 75 T340 100" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" fill="none"/>
    <path d="M60 200 Q130 240 200 225 T340 200" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" fill="none"/>
    
    <line x1="200" y1="150" x2="95" y2="85" stroke="url(#lineGradient)" strokeWidth="1.5"/>
    <line x1="200" y1="150" x2="305" y2="85" stroke="url(#lineGradient)" strokeWidth="1.5"/>
    <line x1="200" y1="150" x2="65" y2="165" stroke="url(#lineGradient)" strokeWidth="1"/>
    <line x1="200" y1="150" x2="335" y2="165" stroke="url(#lineGradient)" strokeWidth="1"/>
    <line x1="200" y1="150" x2="120" y2="235" stroke="url(#lineGradient)" strokeWidth="1.5"/>
    <line x1="200" y1="150" x2="280" y2="235" stroke="url(#lineGradient)" strokeWidth="1.5"/>
    
    <line x1="95" y1="85" x2="65" y2="165" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.15"/>
    <line x1="305" y1="85" x2="335" y2="165" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.15"/>
    <line x1="120" y1="235" x2="280" y2="235" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.12"/>
    <line x1="65" y1="165" x2="120" y2="235" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1"/>
    <line x1="335" y1="165" x2="280" y2="235" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1"/>
    <line x1="95" y1="85" x2="305" y2="85" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    
    <line x1="95" y1="85" x2="48" y2="70" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    <line x1="305" y1="85" x2="352" y2="70" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    <line x1="65" y1="165" x2="35" y2="130" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    <line x1="335" y1="165" x2="365" y2="130" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    <line x1="120" y1="235" x2="85" y2="260" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    <line x1="280" y1="235" x2="315" y2="260" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    
    <circle r="2" fill="#1565C0" fillOpacity="0.6">
      <animateMotion dur="4s" repeatCount="indefinite" path="M200,150 L95,85"/>
    </circle>
    <circle r="2" fill="#1565C0" fillOpacity="0.6">
      <animateMotion dur="3.5s" repeatCount="indefinite" path="M200,150 L305,85"/>
    </circle>
    <circle r="1.5" fill="#1565C0" fillOpacity="0.5">
      <animateMotion dur="5s" repeatCount="indefinite" path="M200,150 L120,235"/>
    </circle>
    <circle r="1.5" fill="#1565C0" fillOpacity="0.5">
      <animateMotion dur="4.5s" repeatCount="indefinite" path="M200,150 L280,235"/>
    </circle>
    
    <circle cx="200" cy="150" r="28" fill="#FAFAFA" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3"/>
    <circle cx="200" cy="150" r="20" fill="white" stroke="#1565C0" strokeWidth="1.5" strokeOpacity="0.5"/>
    <circle cx="200" cy="150" r="12" fill="#1565C0" fillOpacity="0.1" stroke="#1565C0" strokeWidth="1"/>
    <circle cx="200" cy="150" r="5" fill="#1565C0"/>
    
    <line x1="195" y1="150" x2="205" y2="150" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="200" y1="145" x2="200" y2="155" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    
    <g filter="url(#nodeShadow)">
      <circle cx="95" cy="85" r="14" fill="white" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="95" cy="85" r="9" fill="#1565C0" fillOpacity="0.08"/>
      <circle cx="95" cy="85" r="4" fill="#1565C0"/>
    </g>
    
    <g filter="url(#nodeShadow)">
      <circle cx="305" cy="85" r="14" fill="white" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="305" cy="85" r="9" fill="#1565C0" fillOpacity="0.08"/>
      <circle cx="305" cy="85" r="4" fill="#1565C0"/>
    </g>
    
    <g filter="url(#nodeShadow)">
      <circle cx="65" cy="165" r="11" fill="white" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="65" cy="165" r="7" fill="#1565C0" fillOpacity="0.08"/>
      <circle cx="65" cy="165" r="3" fill="#1565C0" fillOpacity="0.8"/>
    </g>
    
    <g filter="url(#nodeShadow)">
      <circle cx="335" cy="165" r="11" fill="white" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="335" cy="165" r="7" fill="#1565C0" fillOpacity="0.08"/>
      <circle cx="335" cy="165" r="3" fill="#1565C0" fillOpacity="0.8"/>
    </g>
    
    <g filter="url(#nodeShadow)">
      <circle cx="120" cy="235" r="12" fill="white" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="120" cy="235" r="8" fill="#1565C0" fillOpacity="0.08"/>
      <circle cx="120" cy="235" r="3.5" fill="#1565C0" fillOpacity="0.85"/>
    </g>
    
    <g filter="url(#nodeShadow)">
      <circle cx="280" cy="235" r="12" fill="white" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="280" cy="235" r="8" fill="#1565C0" fillOpacity="0.08"/>
      <circle cx="280" cy="235" r="3.5" fill="#1565C0" fillOpacity="0.85"/>
    </g>
    
    <circle cx="48" cy="70" r="4" fill="white" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.5"/>
    <circle cx="48" cy="70" r="1.5" fill="#1565C0" fillOpacity="0.5"/>
    
    <circle cx="352" cy="70" r="4" fill="white" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.5"/>
    <circle cx="352" cy="70" r="1.5" fill="#1565C0" fillOpacity="0.5"/>
    
    <circle cx="35" cy="130" r="3.5" fill="white" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.4"/>
    <circle cx="35" cy="130" r="1.25" fill="#1565C0" fillOpacity="0.4"/>
    
    <circle cx="365" cy="130" r="3.5" fill="white" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.4"/>
    <circle cx="365" cy="130" r="1.25" fill="#1565C0" fillOpacity="0.4"/>
    
    <circle cx="85" cy="260" r="3" fill="white" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.3"/>
    <circle cx="85" cy="260" r="1" fill="#1565C0" fillOpacity="0.35"/>
    
    <circle cx="315" cy="260" r="3" fill="white" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.3"/>
    <circle cx="315" cy="260" r="1" fill="#1565C0" fillOpacity="0.35"/>
    
    <circle cx="150" cy="60" r="2" fill="#1565C0" fillOpacity="0.2"/>
    <circle cx="250" cy="60" r="1.5" fill="#1565C0" fillOpacity="0.15"/>
    <circle cx="170" cy="250" r="2" fill="#1565C0" fillOpacity="0.2"/>
    <circle cx="230" cy="250" r="1.5" fill="#1565C0" fillOpacity="0.15"/>
    <circle cx="40" cy="200" r="1.5" fill="#1565C0" fillOpacity="0.12"/>
    <circle cx="360" cy="200" r="1.5" fill="#1565C0" fillOpacity="0.12"/>
    
    <circle cx="200" cy="150" r="20" fill="none" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3">
      <animate attributeName="r" values="20;35;20" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const BlockchainIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blockFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF"/>
        <stop offset="100%" stopColor="#F5F7FA"/>
      </linearGradient>
      <linearGradient id="blockSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E8EEF5"/>
        <stop offset="100%" stopColor="#DCE4ED"/>
      </linearGradient>
      <linearGradient id="blockTop" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#F0F4F8"/>
        <stop offset="100%" stopColor="#FAFBFC"/>
      </linearGradient>
      <linearGradient id="chainLink" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1565C0" stopOpacity="0.6"/>
        <stop offset="50%" stopColor="#1565C0" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#1565C0" stopOpacity="0.6"/>
      </linearGradient>
      <filter id="blockShadow" x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#1565C0" floodOpacity="0.08"/>
      </filter>
    </defs>
    
    <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1565C0" strokeWidth="0.2" strokeOpacity="0.05"/>
    </pattern>
    <rect x="0" y="0" width="200" height="150" fill="url(#gridPattern)"/>
    
    <g className="chain-connections">
      <path d="M48 75 C55 75 55 75 62 75" stroke="url(#chainLink)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="55" cy="75" r="3" fill="white" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.4"/>
      <circle cx="55" cy="75" r="1.5" fill="#1565C0" fillOpacity="0.5">
        <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      <path d="M138 75 C145 75 145 75 152 75" stroke="url(#chainLink)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="145" cy="75" r="3" fill="white" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.4"/>
      <circle cx="145" cy="75" r="1.5" fill="#1565C0" fillOpacity="0.5">
        <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
    </g>
    
    <g filter="url(#blockShadow)" transform="translate(8, 45)">
      <ellipse cx="20" cy="62" rx="16" ry="4" fill="#1565C0" fillOpacity="0.06"/>
      <path d="M36 8 L40 12 L40 52 L36 56 L36 8Z" fill="url(#blockSide)"/>
      <path d="M4 4 L8 0 L44 0 L40 4 L4 4Z" fill="url(#blockTop)" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1"/>
      <rect x="4" y="4" width="36" height="52" rx="3" fill="url(#blockFace)" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.25"/>
      <rect x="8" y="10" width="12" height="2" rx="1" fill="#1565C0" fillOpacity="0.5"/>
      <rect x="8" y="15" width="24" height="2" rx="1" fill="#1565C0" fillOpacity="0.2"/>
      <rect x="8" y="20" width="20" height="2" rx="1" fill="#1565C0" fillOpacity="0.15"/>
      <line x1="8" y1="26" x2="32" y2="26" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15"/>
      <rect x="8" y="30" width="6" height="6" rx="1" fill="#1565C0" fillOpacity="0.08" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.2"/>
      <rect x="16" y="30" width="6" height="6" rx="1" fill="#1565C0" fillOpacity="0.12" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.2"/>
      <rect x="24" y="30" width="6" height="6" rx="1" fill="#1565C0" fillOpacity="0.06" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.2"/>
      <rect x="8" y="40" width="18" height="2" rx="1" fill="#1565C0" fillOpacity="0.25"/>
      <rect x="8" y="45" width="10" height="2" rx="1" fill="#1565C0" fillOpacity="0.15"/>
      <text x="32" y="50" fontSize="7" fill="#1565C0" fillOpacity="0.3" fontFamily="monospace" textAnchor="end">#1</text>
    </g>
    
    <g filter="url(#blockShadow)" transform="translate(68, 40)">
      <ellipse cx="22" cy="67" rx="18" ry="5" fill="#1565C0" fillOpacity="0.08"/>
      <rect x="2" y="2" width="44" height="60" rx="4" fill="none" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.15">
        <animate attributeName="stroke-opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite"/>
      </rect>
      <path d="M42 8 L48 14 L48 58 L42 64 L42 8Z" fill="url(#blockSide)"/>
      <path d="M6 4 L12 -2 L54 -2 L48 4 L6 4Z" fill="url(#blockTop)" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15"/>
      <rect x="6" y="4" width="40" height="58" rx="3" fill="url(#blockFace)" stroke="#1565C0" strokeWidth="1.5" strokeOpacity="0.35"/>
      <rect x="10" y="10" width="14" height="2.5" rx="1" fill="#1565C0" fillOpacity="0.6"/>
      <rect x="10" y="16" width="28" height="2" rx="1" fill="#1565C0" fillOpacity="0.25"/>
      <rect x="10" y="22" width="22" height="2" rx="1" fill="#1565C0" fillOpacity="0.2"/>
      <line x1="10" y1="28" x2="38" y2="28" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.2"/>
      <rect x="10" y="32" width="7" height="7" rx="1.5" fill="#1565C0" fillOpacity="0.12" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.3"/>
      <rect x="19" y="32" width="7" height="7" rx="1.5" fill="#1565C0" fillOpacity="0.18" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.3"/>
      <rect x="28" y="32" width="7" height="7" rx="1.5" fill="#1565C0" fillOpacity="0.1" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.3"/>
      <circle cx="40" cy="10" r="2.5" fill="#1565C0" fillOpacity="0.8">
        <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <rect x="10" y="44" width="20" height="2.5" rx="1" fill="#1565C0" fillOpacity="0.3"/>
      <rect x="10" y="50" width="12" height="2" rx="1" fill="#1565C0" fillOpacity="0.2"/>
      <text x="38" y="56" fontSize="8" fill="#1565C0" fillOpacity="0.4" fontFamily="monospace" textAnchor="end">#2</text>
    </g>
    
    <g filter="url(#blockShadow)" transform="translate(158, 48)">
      <ellipse cx="18" cy="58" rx="14" ry="3.5" fill="#1565C0" fillOpacity="0.05"/>
      <path d="M32 6 L36 10 L36 46 L32 50 L32 6Z" fill="url(#blockSide)" fillOpacity="0.7"/>
      <path d="M2 2 L6 -2 L38 -2 L34 2 L2 2Z" fill="url(#blockTop)" fillOpacity="0.7" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
      <rect x="2" y="2" width="32" height="46" rx="3" fill="url(#blockFace)" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 2"/>
      <rect x="6" y="8" width="10" height="2" rx="1" fill="#1565C0" fillOpacity="0.3"/>
      <rect x="6" y="13" width="20" height="2" rx="1" fill="#1565C0" fillOpacity="0.15"/>
      <rect x="6" y="18" width="16" height="2" rx="1" fill="#1565C0" fillOpacity="0.1"/>
      <line x1="6" y1="24" x2="28" y2="24" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="2 2"/>
      <rect x="6" y="28" width="5" height="5" rx="1" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 1"/>
      <rect x="13" y="28" width="5" height="5" rx="1" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 1"/>
      <rect x="20" y="28" width="5" height="5" rx="1" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 1"/>
      <rect x="6" y="38" width="14" height="2" rx="1" fill="#1565C0" fillOpacity="0.15"/>
      <text x="28" y="44" fontSize="6" fill="#1565C0" fillOpacity="0.25" fontFamily="monospace" textAnchor="end">#3</text>
    </g>
    
    <g opacity="0.6">
      <text x="22" y="130" fontSize="6" fill="#1565C0" fillOpacity="0.35" fontFamily="monospace" fontWeight="500">0xa3f...</text>
      <path d="M32 125 L32 118 L55 100" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.2" fill="none" strokeDasharray="2 2"/>
      <text x="85" y="135" fontSize="7" fill="#1565C0" fillOpacity="0.5" fontFamily="monospace" fontWeight="600">0x7b2e4f...</text>
      <path d="M100 130 L100 115" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.25" fill="none"/>
      <text x="160" y="130" fontSize="5" fill="#1565C0" fillOpacity="0.25" fontFamily="monospace">pending...</text>
    </g>
    
    <path d="M5 5 L5 15 M5 5 L15 5" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M195 5 L195 15 M195 5 L185 5" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M5 145 L5 135 M5 145 L15 145" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M195 145 L195 135 M195 145 L185 145" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1" strokeLinecap="round"/>
  </svg>
);

const CodeIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="windowGlass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF"/>
        <stop offset="100%" stopColor="#F8FAFC"/>
      </linearGradient>
      <linearGradient id="titleBar" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F1F5F9"/>
        <stop offset="100%" stopColor="#E2E8F0"/>
      </linearGradient>
      <linearGradient id="sidebarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F8FAFC"/>
        <stop offset="100%" stopColor="#FFFFFF"/>
      </linearGradient>
      <filter id="windowShadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1565C0" floodOpacity="0.1"/>
      </filter>
    </defs>
    
    <g filter="url(#windowShadow)">
      <rect x="12" y="10" width="176" height="130" rx="8" fill="url(#windowGlass)" stroke="#E2E8F0" strokeWidth="1"/>
      <rect x="12" y="10" width="176" height="28" rx="8" fill="url(#titleBar)"/>
      <rect x="12" y="30" width="176" height="8" fill="url(#titleBar)"/>
      
      <g transform="translate(24, 24)">
        <circle cx="0" cy="0" r="5" fill="#FF5F57" stroke="#E14942" strokeWidth="0.5"/>
        <circle cx="16" cy="0" r="5" fill="#FFBD2E" stroke="#DEA123" strokeWidth="0.5"/>
        <circle cx="32" cy="0" r="5" fill="#28C840" stroke="#1AAB29" strokeWidth="0.5"/>
      </g>
      
      <text x="100" y="28" fontSize="9" fill="#64748B" fontFamily="system-ui, sans-serif" textAnchor="middle" fontWeight="500">main.ts</text>
      
      <rect x="12" y="38" width="36" height="102" fill="url(#sidebarGrad)"/>
      <line x1="48" y1="38" x2="48" y2="140" stroke="#E2E8F0" strokeWidth="1"/>
      
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="12" height="9" rx="1" fill="#1565C0" fillOpacity="0.15"/>
        <rect x="0" y="-2" width="6" height="3" rx="0.5" fill="#1565C0" fillOpacity="0.2"/>
        <rect x="2" y="14" width="10" height="12" rx="1" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.3"/>
        <path d="M7 14 L12 19 L12 14 Z" fill="#1565C0" fillOpacity="0.1"/>
        <rect x="2" y="30" width="10" height="12" rx="1" fill="#1565C0" fillOpacity="0.08" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.4"/>
        <path d="M7 30 L12 35 L12 30 Z" fill="#1565C0" fillOpacity="0.15"/>
        <rect x="2" y="46" width="10" height="12" rx="1" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.25"/>
        <path d="M7 46 L12 51 L12 46 Z" fill="#1565C0" fillOpacity="0.08"/>
        <rect x="2" y="62" width="10" height="12" rx="1" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.2"/>
        <path d="M7 62 L12 67 L12 62 Z" fill="#1565C0" fillOpacity="0.05"/>
      </g>
      
      <rect x="48" y="38" width="140" height="102" fill="white"/>
      <rect x="48" y="38" width="20" height="102" fill="#FAFBFC"/>
      <line x1="68" y1="38" x2="68" y2="140" stroke="#F1F5F9" strokeWidth="1"/>
      
      <text x="58" y="52" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">1</text>
      <text x="58" y="62" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">2</text>
      <text x="58" y="72" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">3</text>
      <text x="58" y="82" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">4</text>
      <text x="58" y="92" fontSize="7" fill="#1565C0" fontFamily="monospace" textAnchor="middle" fontWeight="600">5</text>
      <text x="58" y="102" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">6</text>
      <text x="58" y="112" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">7</text>
      <text x="58" y="122" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">8</text>
      <text x="58" y="132" fontSize="7" fill="#94A3B8" fontFamily="monospace" textAnchor="middle">9</text>
      
      <rect x="68" y="86" width="118" height="10" fill="#1565C0" fillOpacity="0.04"/>
      
      <g transform="translate(72, 48)">
        <rect x="0" y="0" width="24" height="3" rx="1" fill="#C586C0"/>
        <rect x="28" y="0" width="32" height="3" rx="1" fill="#4EC9B0"/>
        <rect x="64" y="0" width="8" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="6" y="10" width="22" height="3" rx="1" fill="#569CD6"/>
        <rect x="32" y="10" width="18" height="3" rx="1" fill="#9CDCFE"/>
        <rect x="54" y="10" width="4" height="3" rx="1" fill="#D4D4D4"/>
        <rect x="62" y="10" width="28" height="3" rx="1" fill="#CE9178"/>
        <rect x="94" y="10" width="4" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="6" y="20" width="22" height="3" rx="1" fill="#569CD6"/>
        <rect x="32" y="20" width="14" height="3" rx="1" fill="#9CDCFE"/>
        <rect x="50" y="20" width="4" height="3" rx="1" fill="#D4D4D4"/>
        <rect x="58" y="20" width="18" height="3" rx="1" fill="#B5CEA8"/>
        <rect x="80" y="20" width="4" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="6" y="30" width="22" height="3" rx="1" fill="#569CD6"/>
        <rect x="32" y="30" width="22" height="3" rx="1" fill="#9CDCFE"/>
        <rect x="58" y="30" width="4" height="3" rx="1" fill="#D4D4D4"/>
        <rect x="66" y="30" width="26" height="3" rx="1" fill="#DCDCAA"/>
        <rect x="96" y="30" width="8" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="0" y="40" width="8" height="3" rx="1" fill="#D4D4D4"/>
        <rect x="12" y="40" width="6" height="3" rx="1" fill="#C586C0"/>
        <rect x="22" y="40" width="16" height="3" rx="1" fill="#569CD6"/>
        <rect x="42" y="40" width="4" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="0" y="50" width="8" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="0" y="60" width="24" height="3" rx="1" fill="#C586C0"/>
        <rect x="28" y="60" width="28" height="3" rx="1" fill="#4EC9B0"/>
        <rect x="60" y="60" width="4" height="3" rx="1" fill="#D4D4D4"/>
        
        <rect x="0" y="70" width="24" height="3" rx="1" fill="#6A9955"/>
        <rect x="28" y="70" width="50" height="3" rx="1" fill="#6A9955" fillOpacity="0.7"/>
        
        <rect x="0" y="80" width="4" height="3" rx="1" fill="#D4D4D4"/>
        <rect x="8" y="78" width="2" height="8" fill="#1565C0">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
        </rect>
      </g>
      
      <rect x="12" y="130" width="176" height="10" rx="0 0 8 8" fill="#F8FAFC"/>
      <line x1="12" y1="130" x2="188" y2="130" stroke="#E2E8F0" strokeWidth="0.5"/>
      <circle cx="22" cy="135" r="2" fill="#28C840"/>
      <text x="28" y="137" fontSize="5" fill="#64748B" fontFamily="monospace">UTF-8</text>
      <text x="170" y="137" fontSize="5" fill="#64748B" fontFamily="monospace">TypeScript</text>
    </g>
    
    <path d="M5 5 L5 12 M5 5 L12 5" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08" strokeLinecap="round"/>
    <path d="M195 5 L195 12 M195 5 L188 5" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08" strokeLinecap="round"/>
    <path d="M5 145 L5 138 M5 145 L12 145" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08" strokeLinecap="round"/>
    <path d="M195 145 L195 138 M195 145 L188 145" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08" strokeLinecap="round"/>
  </svg>
);

const ShieldIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldFill" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#1565C0" stopOpacity="0.08"/>
        <stop offset="100%" stopColor="#1565C0" stopOpacity="0.02"/>
      </linearGradient>
      <linearGradient id="shieldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1565C0" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#1565C0" stopOpacity="0.2"/>
      </linearGradient>
      <filter id="shieldGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="shieldShadow" x="-20%" y="-10%" width="140%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1565C0" floodOpacity="0.15"/>
      </filter>
    </defs>
    
    <circle cx="32" cy="32" r="28" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="2 4"/>
    <circle cx="32" cy="32" r="25" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.05"/>
    
    <g filter="url(#shieldShadow)">
      <path d="M32 5L8 16V32C8 48 18 58 32 62C46 58 56 48 56 32V16L32 5Z" 
        fill="url(#shieldFill)" stroke="url(#shieldEdge)" strokeWidth="1.5"/>
      
      <path d="M32 9L12 18V32C12 46 21 54 32 58C43 54 52 46 52 32V18L32 9Z" 
        fill="none" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.25"/>
      
      <path d="M32 13L16 21V32C16 44 24 51 32 54C40 51 48 44 48 32V21L32 13Z" 
        fill="#1565C0" fillOpacity="0.03" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15"/>
    </g>
    
    <g transform="translate(32, 28)">
      <line x1="-8" y1="0" x2="8" y2="0" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.12"/>
      <line x1="0" y1="-8" x2="0" y2="8" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.12"/>
      <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
      <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.08"/>
    </g>
    
    <g filter="url(#shieldGlow)">
      <circle cx="32" cy="32" r="10" fill="white" stroke="#1565C0" strokeWidth="1.5" strokeOpacity="0.4"/>
      <circle cx="32" cy="32" r="7" fill="#1565C0" fillOpacity="0.08"/>
      
      <path d="M27 32L30 35L37 28" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
      </path>
    </g>
    
    <circle cx="32" cy="12" r="2" fill="white" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.4"/>
    <circle cx="32" cy="12" r="0.75" fill="#1565C0" fillOpacity="0.6"/>
    
    <circle cx="14" cy="24" r="1.5" fill="white" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.3"/>
    <circle cx="14" cy="24" r="0.5" fill="#1565C0" fillOpacity="0.4"/>
    
    <circle cx="50" cy="24" r="1.5" fill="white" stroke="#1565C0" strokeWidth="0.75" strokeOpacity="0.3"/>
    <circle cx="50" cy="24" r="0.5" fill="#1565C0" fillOpacity="0.4"/>
    
    <circle cx="12" cy="38" r="1.25" fill="white" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.25"/>
    <circle cx="12" cy="38" r="0.4" fill="#1565C0" fillOpacity="0.3"/>
    
    <circle cx="52" cy="38" r="1.25" fill="white" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.25"/>
    <circle cx="52" cy="38" r="0.4" fill="#1565C0" fillOpacity="0.3"/>
    
    <path d="M14 24 L22 28" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 2"/>
    <path d="M50 24 L42 28" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 2"/>
    <path d="M32 12 L32 20" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="1 2"/>
    
    <circle cx="32" cy="32" r="18" fill="none" stroke="#1565C0" strokeWidth="0.5" strokeOpacity="0.1">
      <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="stroke-opacity" values="0.1;0;0.1" dur="3s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative p-8 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-elevation-2 transition-all duration-300"
  >
    <div className="w-16 h-16 mb-6 text-primary-800">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-600 text-[15px] leading-relaxed">{description}</p>
  </motion.article>
);

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <a href={product.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-8 md:p-10 hover:border-gray-200 hover:shadow-elevation-1 transition-all duration-300">
          <div className="aspect-[4/3] mb-8 flex items-center justify-center">
            <motion.div className="w-full max-w-[240px]" animate={{ scale: isHovered ? 1.03 : 1 }} transition={{ duration: 0.3 }}>
              {product.illustration}
            </motion.div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary-700 uppercase tracking-wider">{product.category}</span>
              <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }} className="text-gray-400 group-hover:text-primary-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">{product.name}</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    illustration: PropTypes.node.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const LandingPage = () => {
  const heroRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const products = [
    {
      name: "ShadowChain",
      category: "Blockchain Infrastructure",
      description: "A privacy-first blockchain platform bridging Web2 and Web3. Create secure, private mirrors of your digital activity with true data ownership.",
      url: "https://shadowchain.locsafe.org",
      illustration: <BlockchainIllustration />,
      tags: ["Private Blockchain", "Data Sovereignty", "Web3"]
    },
    {
      name: "FixFlow",
      category: "Developer Tools",
      description: "AI-powered bug bounty automation. When CI fails, bounties are created. Fix the bug, get paid instantly in stablecoin when your PR merges.",
      url: "https://fixflow.locsafe.org",
      illustration: <CodeIllustration />,
      tags: ["AI Automation", "Instant Payments", "GitHub Integration"]
    }
  ];

  const features = [
    {
      icon: <ShieldIllustration />,
      title: "Security First",
      description: "End-to-end encryption and zero-knowledge architecture built into every product we create."
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="32" cy="32" r="22" stroke="#1565C0" strokeWidth="1.5"/>
          <circle cx="32" cy="32" r="14" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3"/>
          <path d="M32 14V32L44 40" stroke="#1565C0" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="3" fill="#1565C0"/>
        </svg>
      ),
      title: "Built for Scale",
      description: "Infrastructure designed to handle millions of transactions with sub-second response times."
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <rect x="6" y="22" width="20" height="20" rx="4" stroke="#1565C0" strokeWidth="1.5"/>
          <rect x="38" y="22" width="20" height="20" rx="4" stroke="#1565C0" strokeWidth="1.5"/>
          <rect x="22" y="6" width="20" height="20" rx="4" stroke="#1565C0" strokeWidth="1.5"/>
          <rect x="22" y="38" width="20" height="20" rx="4" stroke="#1565C0" strokeWidth="1.5"/>
          <line x1="26" y1="32" x2="38" y2="32" stroke="#1565C0" strokeWidth="1.5"/>
          <line x1="32" y1="26" x2="32" y2="38" stroke="#1565C0" strokeWidth="1.5"/>
        </svg>
      ),
      title: "Open by Design",
      description: "Comprehensive APIs and documentation. Core components are publicly auditable for transparency."
    }
  ];

  return (
    <main className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden antialiased" role="main">
      <Helmet>
        <title>Locsafe — Ideas Worth Building</title>
        <meta name="description" content="Locsafe builds AI and blockchain products that matter. Discover ShadowChain and FixFlow." />
        <meta name="keywords" content="AI products, blockchain, ShadowChain, FixFlow, Web3, developer tools, technology company" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/" />
        <meta property="og:title" content="Locsafe — Ideas Worth Building" />
        <meta property="og:description" content="Building AI and blockchain products that matter." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://locsafe.org/" />
      </Helmet>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 text-gray-900 hover:text-primary-700 transition-colors" aria-label="Locsafe home">
              <LogoMark className="w-8 h-8" />
              <span className="font-semibold text-lg tracking-tight">Locsafe</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Products</a>
              <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <Link to="/contact" className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">Contact</Link>
            </div>
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50" 
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-1">
                  <a 
                    href="#products" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Products
                  </a>
                  <a 
                    href="#about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    About
                  </a>
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-center bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20" aria-labelledby="hero-heading">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-sm font-medium text-primary-700 uppercase tracking-wider mb-6">
                AI & Blockchain Products
              </motion.p>
              <motion.h1 id="hero-heading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                Ideas<br /><span className="text-primary-700">worth</span><br />building
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-gray-600 leading-relaxed max-w-lg mb-10">
                We build products at the intersection of artificial intelligence and blockchain. Each product is crafted to solve real problems and create lasting value.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-4">
                <a href="#products" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                  Our Products
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
                <a href="#about" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors">Learn More</a>
              </motion.div>
            </div>
            <motion.div className="order-1 lg:order-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="aspect-square max-w-md mx-auto"><NetworkIllustration /></div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 md:py-32 bg-white" aria-labelledby="products-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mb-16">
            <h2 id="products-heading" className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">Our Products</h2>
            <p className="text-lg text-gray-600 leading-relaxed">Each product is built to solve real problems with focused execution and lasting impact.</p>
          </motion.header>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (<ProductCard key={product.name} product={product} index={index} />))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-gray-100" /></div>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-white" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">Built on principles</h2>
            <p className="text-lg text-gray-600 leading-relaxed">Every product we create follows the same foundational principles that guide our approach to technology.</p>
          </motion.header>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (<FeatureCard key={feature.title} {...feature} index={index} />))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-gray-50" aria-labelledby="about-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">We build what matters</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Locsafe identifies opportunities and builds products at the intersection of artificial intelligence and blockchain. We&apos;re builders, focused on creating technology that makes a real difference.</p>
                <p>Our approach is simple: find real problems, build focused solutions, and execute with conviction. No hype, no shortcuts—just products that matter.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary-600" />
                  <span className="text-sm text-gray-700">AI & Blockchain</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary-600" />
                  <span className="text-sm text-gray-700">Long-term Vision</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary-600" />
                  <span className="text-sm text-gray-700">Builder Mindset</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="aspect-square bg-white rounded-3xl border border-gray-200 p-8 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.1"/>
                    <circle cx="100" cy="100" r="60" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.15"/>
                    <circle cx="100" cy="100" r="40" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.2"/>
                    <circle cx="100" cy="100" r="20" stroke="#1565C0" strokeWidth="1.5" strokeOpacity="0.3"/>
                    <rect x="85" y="85" width="30" height="30" rx="6" fill="#1565C0" fillOpacity="0.1" stroke="#1565C0" strokeWidth="1.5"/>
                    <path d="M92 100h16M100 92v16" stroke="#1565C0" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="60" cy="60" r="4" fill="#1565C0" fillOpacity="0.5"/>
                    <circle cx="140" cy="60" r="4" fill="#1565C0" fillOpacity="0.5"/>
                    <circle cx="60" cy="140" r="4" fill="#1565C0" fillOpacity="0.5"/>
                    <circle cx="140" cy="140" r="4" fill="#1565C0" fillOpacity="0.5"/>
                    <line x1="75" y1="75" x2="85" y2="85" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3"/>
                    <line x1="125" y1="75" x2="115" y2="85" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3"/>
                    <line x1="75" y1="125" x2="85" y2="115" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3"/>
                    <line x1="125" y1="125" x2="115" y2="115" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.3"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-white" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">Let&apos;s build something great</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">Whether you&apos;re a developer interested in our products or a potential partner, we&apos;d love to hear from you.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                Get in Touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="mailto:hello@locsafe.org" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@locsafe.org
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-100 bg-gray-50" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 text-gray-900 mb-6" aria-label="Locsafe home">
                <LogoMark className="w-8 h-8" />
                <span className="font-semibold text-lg tracking-tight">Locsafe</span>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">Building AI and blockchain products that matter. Ideas worth building.</p>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com/locsafe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors" aria-label="Follow us on Twitter">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com/company/locsafe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors" aria-label="Follow us on LinkedIn">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/locsafe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors" aria-label="Follow us on GitHub">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm">Products</h4>
              <ul className="space-y-3">
                <li><a href="https://shadowchain.locsafe.org" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1.5">ShadowChain<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></li>
                <li><a href="https://fixflow.locsafe.org" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1.5">FixFlow<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm">Company</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</a></li>
                <li><a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Products</a></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Locsafe. All rights reserved.</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
