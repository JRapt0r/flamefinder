module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        brand: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      colors: {
        // UIC colors
        // https://marketing.uic.edu/marketing-toolbox/university-style-guide/visual-elements
        'cerulean': '#00B5E2',
        'sapphire': '#001E62',
        'crimson': '#D50032',
      },
      minHeight: {
        'body': "calc(100vh - 72px)"
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  variants: {
    extend: {
      translate: ['group-hover'],
    },
  },
  plugins: [],
}
