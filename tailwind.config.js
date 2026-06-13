/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: "#FF9C01",
          "amber-deep": "#FF9C01",
          blue: "#161622",
          "blue-deep": "#161622",
          "blue-panel": "#161622",
          "blue-soft": "#161622",
          charcoal: "#161622",
          cream: "#F3E8D7",
          "cream-light": "#F3E8D7",
          green: "#161622",
          ink: "#161622",
          leaf: "#F3E8D7",
          night: "#161622",
          paper: "#F3E8D7",
          "paper-soft": "#F3E8D7",
          river: "#F3E8D7",
          sun: "#F3E8D7",
          teal: "#161622",
        },
        "bg-primary": "#F3E8D7",
        surface: "#FFFFFF",
        "surface-strong": "#F3E8D7",
        "text-main": "#161622",
        "text-muted": "#161622",
        accent: "#FF9C01",
        "accent-hover": "#FF9C01",
        destructive: "#FF9C01",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(22, 22, 34, 0.12)",
        "soft-dark": "0 24px 70px rgba(0, 0, 0, 0.34)",
        phone: "0 30px 90px rgba(22, 22, 34, 0.18)",
        accent: "0 14px 28px rgba(255, 156, 1, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
