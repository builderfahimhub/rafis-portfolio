import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#0a0a0a",
          2: "#111111",
          3: "#1a1a1a",
          4: "#222222",
        },
        accent: {
          DEFAULT: "#e8d5b0",
          2: "#c4a882",
        },
      },
    },
  },
  plugins: [],
};

export default config;
