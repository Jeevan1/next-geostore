import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      colors: {
        primary: "#1a202c", // Dark mode primary color
        secondary: "#2d3748", // Dark mode secondary color
        accent: "#4a5568", // Dark mode accent color
        background: "#f7fafc", // Light mode background color
        foreground: "#ffffff", // Light mode foreground color
        grey: "#b3b4b4",
        dark: "#626161",
        light: "#e2e8f0",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      borderColor: {
        primary: "#1a202c", // Dark mode border color
        secondary: "#2d3748", // Dark mode border color
        accent: "#4a5568", // Dark mode border color
        grey: "#b3b4b4",
        light: "#e2e8f0",
      },
      spacing: {
        "10": "2.5rem", // Custom spacing
        "12": "3rem", // Custom spacing
        "16": "4rem", // Custom spacing
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
        "72": "18rem", // Custom spacing
        "84": "21rem",
        "96": "24rem",
      },
      borderRadius: {
        xl: "1.25rem", // Custom border radius
      },
      fontSize: {
        xs: "0.75rem", // Custom font sizes
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      height: {
        "10": "2.5rem", // Custom heights
        "12": "3rem", // Custom heights
        "16": "4rem", // Custom heights
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "72": "18rem", // Custom heights
        "128": "32rem", // Custom heights
        "144": "36rem",
        "160": "40rem",
        "400": "400px",
        "half-screen": "50vh", // Half screen height
        "screen-75": "75vh", // 75% of the screen height
      },
      width: {
        "10": "2.5rem", // Custom widths
        "12": "3rem", // Custom widths
        "16": "4rem", // Custom widths
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "40": "10rem",
        "72": "18rem", // Custom widths
        "80": "80%",
        "90": "90%",
        "100": "100%",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};
export default config;
