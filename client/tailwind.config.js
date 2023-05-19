module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,html}",
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
