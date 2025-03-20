/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'khan-blue': '#1865f2',
        'khan-purple': '#7854f7',
        'khan-green': '#1aab9b',
        'khan-background': '#f0f4fa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        dash: {
          '0%': { strokeDashoffset: '157' },
          '100%': { strokeDashoffset: '0' }
        }
      },
      animation: {
        'dash': 'dash 1.5s ease-in-out forwards'
      }
    },
  },
  plugins: [],
} 