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
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.4rem",
        sm: "0.6rem",
        base: "0.8rem",
        xl: "1.10rem",
        "2xl": "1.25rem",
        "3xl": "1.50rem",
        "4xl": "2rem",
        "5xl": "3rem",
      },
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
        "surface-0": "var(--surface-0)",
        "surface-50": "var(--surface-50)",
        "surface-100": "var(--surface-100)",
        "surface-200": "var(--surface-200)",
        "surface-300": "var(--surface-300)",
        "surface-400": "var(--surface-400)",
        "surface-500": "var(--surface-500)",
        "surface-600": "var(--surface-600)",
        "surface-700": "var(--surface-700)",
        "surface-800": "var(--surface-800)",
        "surface-900": "var(--surface-900)",
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
      gridTemplateColumns: {
        navbar: "250px 1fr",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
