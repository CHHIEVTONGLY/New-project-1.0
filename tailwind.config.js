/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Helvetica: "Helvetica",
      Roboto: "Roboto",
      KhmerTitle : "Kantumruy Pro ",
      KhmerParagraph : "Kantumruy Pro"
    },
    extend: {
      fontSize: {
        largest: "5rem",
        larger: "24px",
        larger_1: "36px",
        smallest : "12px"
      },

      maxWidth: {
        _800px: "800px",
      },
      maxHeight: {
        _500px: "500px",
      },
      borderWidth: {
        _1: "1.5px",
      },
      borderRadius: {
        _2lg: "20px",
        _5lg:"45px"
      },
    },
  },
  plugins: [],
};
