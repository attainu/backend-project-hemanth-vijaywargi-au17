module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage:(theme)=>({
        'back':"url('Components/forms/images/body-bg.jpg')",
        'front':"url('Components/forms/images/container-bg.png')",
      }),
      colors: {
        hover:"rgba(255,255,225,0.1)",
        textcolor:"rgba( 3,233,244)",
        backgroundColor:"rgba(0, 0, 0, 0.4)",
      }, 
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
