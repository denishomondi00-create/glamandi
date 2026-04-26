import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glamandi: {
          cyan: "#17DEFE",
          sky: "#3AC4FA",
          aqua: "#32D2F7",
          ice: "#C5F0F8",
          teal: "#145F6B",
          ink: "#181918",
          mist: "#F0FBFF"
        }
      },
      boxShadow: {
        glamandi: "0 24px 60px rgba(20, 95, 107, 0.10)"
      },
      borderRadius: {
        glamandi: "1.4rem"
      }
    }
  },
  plugins: []
};

export default config;
