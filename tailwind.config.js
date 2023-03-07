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
      colors: {
        accent: 'var(--accent-color)',
        'accent-light': 'var(--accent-color-light)',
        primary: {
          100: 'var(--primary-color-100)',
          200: 'var(--primary-color-200)',
          400: 'var(--primary-color-400)',
          500: 'var(--primary-color-500)',
          700: 'var(--primary-color-700)',
          800: 'var(--primary-color-800)',
          900: 'var(--primary-color-900)',
        },
      },
      fontSize: {
        xxs: '.625rem',
      },
    },
  },
};
