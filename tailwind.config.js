/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      colors: {
        // Material Design Primary Colors
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        // Material Design Secondary Colors (Teal)
        secondary: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#009688',
          600: '#00897B',
          700: '#00796B',
          800: '#00695C',
          900: '#004D40',
        },
        // Material Design Surface Colors
        surface: {
          light: '#FFFFFF',
          dark: '#121212',
          elevated: {
            light: '#FFFFFF',
            dark: '#1E1E1E',
          }
        },
        // Material Design Background Colors
        background: {
          light: '#FAFAFA',
          dark: '#121212',
        },
        // Material Design Error Colors
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
        // Material Design Success Colors
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        // Material Design Warning Colors
        warning: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        // Material Design Info Colors
        info: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        // Text Colors with Material Design Opacity
        'on-surface': {
          light: 'rgba(0, 0, 0, 0.87)',
          'light-medium': 'rgba(0, 0, 0, 0.6)',
          'light-disabled': 'rgba(0, 0, 0, 0.38)',
          dark: 'rgba(255, 255, 255, 0.87)',
          'dark-medium': 'rgba(255, 255, 255, 0.6)',
          'dark-disabled': 'rgba(255, 255, 255, 0.38)',
        },
        // Legacy colors for backward compatibility
        lightBg: '#FAFAFA',
        darkBg: '#121212',
        lightText: 'rgba(0, 0, 0, 0.87)',
        darkText: 'rgba(255, 255, 255, 0.87)',
        accent: '#009688',
        teal: {
          glow: '#009688',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        'elevation-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        'elevation-5': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        // Dark mode shadows
        'elevation-dark-1': '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3)',
        'elevation-dark-2': '0 3px 6px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.4)',
        'elevation-dark-3': '0 10px 20px rgba(0,0,0,0.4), 0 6px 6px rgba(0,0,0,0.5)',
        'elevation-dark-4': '0 14px 28px rgba(0,0,0,0.5), 0 10px 10px rgba(0,0,0,0.6)',
        'elevation-dark-5': '0 19px 38px rgba(0,0,0,0.6), 0 15px 12px rgba(0,0,0,0.7)',
      },
      transitionDuration: {
        '100': '100ms',
        '150': '150ms',
        '300': '300ms',
        '375': '375ms',
      },
      transitionTimingFunction: {
        'material-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'material-decelerated': 'cubic-bezier(0, 0, 0.2, 1)',
        'material-accelerated': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      animation: {
        'ripple': 'ripple 600ms linear',
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-up': 'scaleUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
