import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface-ground)",
        "surface-section": "var(--surface-section)",
        "surface-card": "var(--surface-card)",
        overlay: "var(--surface-overlay)",
        border: "var(--surface-border)",
        hover: "var(--surface-hover)",
        text: "var(--text-color)",
        "text-secondary": "var(--text-color-secondary)",
        primary: "var(--primary-color)",
        "primary-text": "var(--primary-color-text)",
      },
      fontFamily: {
        sans: "var(--font-family)",
      },
      spacing: {
        inline: "var(--inline-spacing)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
      boxShadow: {
        focus: "var(--focus-ring)",
      },
      backgroundColor: {
        mask: "var(--mask-bg)",
        highlight: "var(--highlight-bg)",
      },
      textColor: {
        highlight: "var(--highlight-text-color)",
      },
    },
  },
  plugins: [],
};
export default config;
