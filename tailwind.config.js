/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#273be2",
        secondary: "#939fff",
        accent: "#F59E0B",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero.jpg')",
        "footer-texture": "url('/images/footer-texture.png')",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"], // default font
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: ["clamp(40px, 5vw, 70px)", { lineHeight: "1.1" }],
        h2: ["clamp(24px, 5vw, 60px)", { lineHeight: "1.1" }],
        h3: ["clamp(16px, 5vw, 40px)", { lineHeight: "1.1" }],
        p: ["clamp(14px, 5vw, 24px)", { lineHeight: "1.1" }],
      },
    },
  },
  plugins: [],
};
