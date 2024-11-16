/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#00B4E5',
          orange: '#FF5722',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};