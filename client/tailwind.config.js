module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/src/images/waves.jpg')",
      },
      colors: {
        "bg-nav": "hsl(var(--color-bg-nav))",
        "bg-main": "hsl(var(--color-bg-main))",
        "login-text": "hsl(var(--color-login-text))",
        logo: "hsl(var(--color-logo))",
        "login-input": "hsl(var(--color-login-input))",
        "login-input-light": "hsl(var(--color-login-input-light))",
        "pump-out": "hsl(var(--color-pump-out))",
        "let-in": "hsl(var(--color-let-in))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
