/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./src/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Sono, sans-serif',
      },
      animation: {
        'spin': 'spin 8s linear infinite'
      }
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
}
