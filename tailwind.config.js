module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        '1': '1 1 150px'
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
