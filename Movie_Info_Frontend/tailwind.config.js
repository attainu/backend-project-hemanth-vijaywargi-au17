module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        hover:"rgba(255,255,225,0.1)",
        backgroundColor:"rgba(0, 0, 0, 0.4)",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
