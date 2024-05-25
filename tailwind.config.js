/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Helvetica: "Helvetica",
      Roboto: "Roboto",
    },
    extend: {
      fontSize: {
        largest: "5rem",
        larger: "24px",
      },

      maxWidth: {
        _800px: "800px",
      },
      maxHeight: {
        _500px: "500px",
      },
    },
  },
  plugins: [],
};
