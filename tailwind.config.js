/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#FAF8F6',
          surface: '#FDF2F7',
          surfaceAlt: '#F9E6F0',
          accent: '#D81B60',
          accentHover: '#B8144F',
          charcoal: '#1D1D1F',
          muted: '#515154',
          border: '#EFE4EA',
        },
      },
    },
  },
  plugins: [],
};
