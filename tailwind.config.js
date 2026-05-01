import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#B8860B",
        "gold-light": "#FFD700",
        dark: "#0D0D1A",
        "dark-secondary": "#1A1A2E",
        charcoal: "#2D2D44",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".gold-gradient": {
          backgroundImage:
            "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)",
        },
        ".glass": {
          backgroundColor: "rgba(26, 26, 46, 0.55)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 18px 45px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        },
        ".glow": {
          filter: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.45)) drop-shadow(0 0 28px rgba(184, 134, 11, 0.35))",
        },
      });
    }),
  ],
};
