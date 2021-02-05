const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },

      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
      colors: {
        tan: "rgb(243, 240, 231)",
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
      borderWidth: {
        3: "3px",
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
