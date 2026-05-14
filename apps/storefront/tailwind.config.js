/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './pages/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'mist-purple': {
          50: '#fbf7ff',
          100: '#f2e9ff',
          200: '#e7d6ff',
          300: '#d6b7ff',
          400: '#bc8cff',
          500: '#9f63f1',
          600: '#8443d2',
          700: '#6b34ad',
          800: '#5b318e',
          900: '#4c2b73',
          950: '#2f174a',
        },
        'petal-pink': {
          50: '#fff7fa',
          100: '#ffeef4',
          200: '#ffdbe8',
          300: '#ffc0d4',
          400: '#ff94b8',
          500: '#f7679a',
          600: '#df427a',
          700: '#bd2d62',
          800: '#9d2954',
          900: '#84274a',
        },
        'moonlight-blue': {
          50: '#f7fbff',
          100: '#ecf6ff',
          200: '#d7ecff',
          300: '#bedcff',
          400: '#8fc3ff',
          500: '#62a5fb',
          600: '#3f84ef',
          700: '#2e69dc',
          800: '#2a56b2',
          900: '#284b8c',
        },
        'champagne-gold': {
          50: '#fffaf1',
          100: '#fff0d6',
          200: '#f8dca4',
          300: '#efc472',
          400: '#e7ad4c',
          500: '#d89127',
          600: '#bd721c',
          700: '#9c541b',
          800: '#7f421f',
          900: '#6a371d',
        },
        'crystal-purple': '#D6B7FF',
        'crystal-pink': '#FFC0D4',
        'crystal-blue': '#BEDCFF',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.52', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
