/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {

      colors: {
        lightBg: '#f8fafc',   // Light background
        darkBg: '#1a202c',    // Dark background
        lightText: '#2d3748', // Light text
        darkText: '#e2e8f0',  // Dark text
        accent: '#38b2ac',    // Accent color (teal)
        teal: {
          glow: '#38b2ac', // Teal color
        },
      },
      transitionDuration: {
        '100': '100ms',  
      },
    },
  },
  plugins: [],
}

