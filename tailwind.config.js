/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        accent: "#FF6B35",
        dark: "#121212",
        light: "#E8E9EC",
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia'],
        heading: ['Unbounded', 'ui-sans-serif', 'system-ui'],
        body: ['Outfit', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'dark-gradient': '#121212',
      },
      textColor: {
        'pastel': {
          'light': '#E8E9EC',
          'medium': '#D1D2D6',
          'dark': '#ABACB3',
        }
      }
    },
  },
  plugins: [],
} 