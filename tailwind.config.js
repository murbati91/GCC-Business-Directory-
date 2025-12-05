/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'icon-orange': '#f57c00',
        'icon-green': '#4caf50',
        'icon-brown': '#795548',
        'icon-gray-green': '#607d8b',
        'icon-gray': '#9e9e9e',
        'btn-zoom': '#e57373',
        'btn-ai': '#8b5cf6',
        'bg-map': '#e3f2fd',
      },
    },
  },
  plugins: [],
}
