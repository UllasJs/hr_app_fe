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
        secondary: 'var(--secondary)',
        headtext: 'var(--head-text)',
        'text-light': 'var(--text-light)',
        'text-dark': 'var(--text-dark)',
        'text-gray': 'var(--text-gray)',
        'primaryText' :'var(--text-primary)',
        'TextHover' :'var(--text-hover)',
        body: 'var(--body)',
        'body-dark': 'var(--box-body-dark)',
        'content': 'var(--box-body)',
        'content-dark': 'var(--body-dark)'
      }
    },
  },
  plugins: [],
}

