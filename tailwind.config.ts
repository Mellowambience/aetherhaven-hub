import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05020d",
        "cold-blue": "#B8C8FF",
        violet: "#7C6AF7",
        "plasma-orange": "#F2A65A",
        "rose-gold": "#C9956A",
        "deep-void": "#0a0514",
        "sigil-white": "#E8E0FF",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        display: ["Cinzel Decorative", "serif"],
      },
      animation: {
        "drift-slow": "drift 20s ease-in-out infinite",
        "pulse-sigil": "pulseSigil 3s ease-in-out infinite",
        "fade-in": "fadeIn 1.5s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-20px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-15px)" },
        },
        pulseSigil: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "void-gradient": "radial-gradient(ellipse at center, #0a0514 0%, #05020d 70%)",
        "sigil-glow": "radial-gradient(circle, rgba(124,106,247,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;