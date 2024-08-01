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
        'text-light': 'VAR(--text-light)',
        'primaryText' :'var(--text-primary)',
        'TextHover' :'var(--text-hover)',
        body: 'var(--body)',
        'box-body': 'var(--box-body)'
      }
    },
  },
  plugins: [],
}

