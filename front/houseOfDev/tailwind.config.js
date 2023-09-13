/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      width: {
        128: "38rem",
        102: "34rem",
      },
      padding: {
        100: "28rem",
      },
      screens: {
        "3xl": "1690px",
      },
    },
  },
  plugins: [],
};
