/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // 🔷 PRIMARY (Indigo - Professional Dashboard Look)
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },

        // 🟢 SECONDARY (Emerald - Finance Positive Color)
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },

        // 🔴 OPTIONAL (For expenses / negative)
        danger: {
          100: '#fee2e2',
          300: '#fca5a5',
          500: '#ef4444',
          700: '#b91c1c',
        },

        // 🟡 OPTIONAL (Warning / alerts)
        warning: {
          100: '#fef3c7',
          300: '#fcd34d',
          500: '#f59e0b',
          700: '#b45309',
        },

      },
    },
  },
  plugins: [],
};