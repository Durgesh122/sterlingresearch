/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a', // Dark blue (Professional/Finance)
        secondary: '#0ea5e9', // Sky blue (Highlight)
        accent: '#22c55e', // Profit Green
        surface: '#1e293b', // Card/Table background
      }
    },
  },
  plugins: [],
}
