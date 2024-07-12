import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat-400": "montserrat-400",
        "montserrat-500": "montserrat-500",
        "montserrat-600": "montserrat-600",
        "montserrat-700": "montserrat-700",
      },
      colors: {
        main: "#F9F9F9",
        main_text: "#26333D",
        main_blue: "#156CBD",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
};
export default config;
