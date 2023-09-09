/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['lemonade'],
  },
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  }
};
