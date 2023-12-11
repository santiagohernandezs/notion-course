/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        black: {
          default: "#000000",
          text: "#121212",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      content: {
        link: 'url("/public/link.svg")',
      },
    },
  },
  plugins: [],
};
