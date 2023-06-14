/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tera: {
          500: "#156064",
        },
      },
      screens: {
        xs: "360px",
      },
      dropShadow: {
        teralight: "0 0 1em rgb(45,212,191)",
      },
    },
  },
  plugins: [],
};
