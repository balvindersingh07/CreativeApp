/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { terracotta: "#D4745E" },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
    },
  },
  plugins: [],
};



