/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#0A192f",
        "secondary":"#F97316",
        "tertiary":"#54D6BB",
        "forever":"#2dd4bf"
      }
    },
    screens:{
      lg:{max:"2 023px"},
      sm:{max:"639px"}
    }
  },
  plugins: [],
}