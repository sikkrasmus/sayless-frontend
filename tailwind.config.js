/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A1D1F', // Dark maroon from the design
          light: '#6A2D2F',
          dark: '#3A1516',
        },
        secondary: {
          DEFAULT: '#F5F5F5', // Light gray from the design
          dark: '#E0E0E0',
        },
        accent: {
          DEFAULT: '#E74C3C', // Red accent color
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} 