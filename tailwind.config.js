/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002147', // Deep Trust Blue
        secondary: '#f39c12', // Growth Gold/Yellow
        accent: '#22c55e', // Profit Green
        surface: '#001a36', // Card/Table background for dark mode matching primary
      }
    },
  },
  plugins: [],
}
