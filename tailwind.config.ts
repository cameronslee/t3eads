import { type Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'threads-bg': {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(16,16,16)',
      },
      'threads-text': {
        light: 'rgb(255,255,255)',
        dark: 'rgb(16, 16, 16)',
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
