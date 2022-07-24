module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xsm': {'max': '450px'},
      'xxsm': {'max': '350px'}
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
