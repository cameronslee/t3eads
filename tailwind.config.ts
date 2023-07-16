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
      'threads-primary': {
        default: 'rgb(5, 10, 230)',
      },
      'threads-secondary': {
        default: 'rgb(255, 48, 108)',
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
