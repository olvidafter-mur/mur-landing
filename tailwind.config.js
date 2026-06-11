/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: "#E88C22",
          "amber-deep": "#A85713",
          charcoal: "#383229",
          green: "#5F7F45",
          ink: "#25211B",
          leaf: "#E8F0DA",
          night: "#171611",
          paper: "#FBF6EC",
          "paper-soft": "#F1E4CF",
          river: "#DDEDEA",
          sun: "#F8E5C8",
          teal: "#247C78",
        },
        "bg-primary": "#FBF6EC",
        surface: "#FFFFFF",
        "surface-strong": "#F1E4CF",
        "text-main": "#25211B",
        "text-muted": "#625A4F",
        accent: "#E88C22",
        "accent-hover": "#A85713",
        destructive: "#F87171",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(37, 33, 27, 0.12)",
        "soft-dark": "0 24px 70px rgba(0, 0, 0, 0.34)",
        phone: "0 30px 90px rgba(37, 33, 27, 0.18)",
        accent: "0 14px 28px rgba(232, 140, 34, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
