import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09001A",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#0D0025",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#A855F7",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1A0A2E",
          foreground: "#A78BFA",
        },
        border: "#2D1B4E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "serif"],
        character: ["var(--font-character)", "var(--font-cinzel)", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.2)",
        "glow-lg": "0 0 40px rgba(124, 58, 237, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
