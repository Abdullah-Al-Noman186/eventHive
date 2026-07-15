import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        accent: "#FF6584",
        dark: "#1A1A2E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
export default config;