/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Public Sans", "system-ui", "sans-serif"],
      },
      // Optional: for exact hero button gradients
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["carexyz"],        // Only use our custom theme
    logs: false,
  },
};