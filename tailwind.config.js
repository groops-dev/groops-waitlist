/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#f0f9f9',
          100: '#e1f4f4',
          200: '#c3e9e9',
          300: '#a5dede',
          400: '#87d3d3',
          500: '#69c8c8',
          600: '#54a0a0',
          700: '#3f7878',
          800: '#2a5050',
          900: '#152828',
        },
        rose: {
          50: '#fff1f5',
          100: '#ffe4eb',
          200: '#ffc9d7',
          300: '#ff9eb7',
          400: '#ff6690',
          500: '#ff2d6a',
          600: '#ed1458',
          700: '#c70d47',
          800: '#a30c3c',
          900: '#850b31',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },
    },
  },
  plugins: [],
};