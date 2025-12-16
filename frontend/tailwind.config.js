/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cream: {
          50: '#FFFEF9',
          100: '#FFF9E6',
          200: '#FFF3CC',
          300: '#FFEDB3',
          400: '#FFE799',
          500: '#FFE180',
        },
      },
    },
  },
  plugins: [],
}

