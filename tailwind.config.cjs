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
      }
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
}
