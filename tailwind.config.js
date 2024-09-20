/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        cusLogin: "#d9d9d9"
      },
      colors: {
        cusLogin: "#333",
        orange: "#ff8831",
        red: "#ec0015",
        blue: "#0ebdea",
        blueHover: "#1290b0",
        itemsMenu: "#5d596c",
        btnHover: "##ff742f",
        colorBorder: "#0ec6ec",
        bgNote: "#e5fbfd",
        titleTabs: "#677788",
        colorVCB: "#007345",
        success: "#1adf31",
        error: "#f70707",
        warning: "#d4e20d",
      },

      maxWidth: {
        1600: "max-width:1660px",
      }
    },
  },
  plugins: [],
})