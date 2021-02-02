const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "light-blue": colors.lightBlue,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        orange: colors.orange,
      },
      zIndex: {
        overlay: 3001,
        force: 4000,
      },
    },
  },
  variants: {
    extend: {
      ringOpacity: ["hover", "active"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
