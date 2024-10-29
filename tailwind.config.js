const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "grad-1": "var(--color-grad-1)",
        "grad-2": "var(--color-grad-2)",
        "grey-light-1": "var(--color-grey-light-1)",
        "grey-light-2": "var(--color-grey-light-2)",
        "grey-light-3": "var(--color-grey-light-3)",
        "grey-dark-1": "var(--color-grey-dark-1)",
        "grey-dark-2": "var(--color-grey-dark-2)",
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(to right bottom, var(--color-grad-1), var(--color-grad-2))",
      },
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
