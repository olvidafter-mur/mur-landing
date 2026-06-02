/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#161622",
          "blue-deep": "#111827",
          orange: "#FF9C01",
          "orange-deep": "#FF8E01",
          cream: "#E6D2B5",
          "cream-light": "#F3E8D7",
        },
        "bg-primary": "#161622",
        surface: "#1E1E2D",
        "surface-strong": "#232533",
        "text-main": "#F3E8D7",
        "text-muted": "#CDCDE0",
        accent: "#FF9C01",
        "accent-hover": "#FF8E01",
        destructive: "#F87171",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.32)",
        accent: "0 14px 28px rgba(255, 156, 1, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
