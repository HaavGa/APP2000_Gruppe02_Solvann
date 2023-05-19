module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,html}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('./src/images/waves.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
