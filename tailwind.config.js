/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/img/background.svg')",
      },
      fontFamily: {
        'mediametrie': ['Mediametrie', 'sans-serif'],
      },
      screens: {
        'xl': '1400px',
      }
    },
  },
  plugins: [],
}

