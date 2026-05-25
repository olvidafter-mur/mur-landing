/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#161622",
        surface: "#1E1E2D",
        "surface-strong": "#232533",
        "text-main": "#FFFFFF",
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
