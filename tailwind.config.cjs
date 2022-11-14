/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./src/*.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animation-delay")],
}
