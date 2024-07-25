/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        headtext: 'var(--head-text)',
      }
    },
  },
  plugins: [],
}

