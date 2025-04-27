/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005f6a",
        secondary: "#decdf5",
        accent: "#d4af37",
        dark: "#3e3e3e",
        light: "#f8f1ff",
        "dim-gray": "#656176",
        gold: "#d4af37",
        "caribbean-current": "#005f6a",
        magnolia: "#f8f1ff",
        thistle: "#decdf5",
        onyx: "#3e3e3e",
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
        'dark-gradient': '#3e3e3e',
      },
      textColor: {
        'pastel': {
          'light': '#f8f1ff',
          'medium': '#decdf5',
          'dark': '#656176',
        }
      }
    },
  },
  plugins: [],
} 