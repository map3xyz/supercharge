/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,tsx}',
    'node_modules/@map3xyz/components/dist/esm/components/**/*.{html,js}',
  ],
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      fontSize: {
        xxs: '.625rem',
      },
    },
  },
};
