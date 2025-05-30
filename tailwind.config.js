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
        "caribbean-current": "#004858",
        magnolia: "#f8f1ff",
        thistle: "#decdf5",
        onyx: "#3e3e3e",
        "light-pink": "#ffdee9",
      },
      fontFamily: {
        sans: ['Renade', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia'],
        heading: ['Renade', 'ui-sans-serif', 'system-ui'],
        body: ['Renade', 'ui-sans-serif', 'system-ui'],
        mono: ['Press Start 2P', 'ui-monospace', 'SFMono-Regular'],
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
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
} 