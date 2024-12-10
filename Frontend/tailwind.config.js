/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-homepage',
    'bg-welcomepage'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage': "url('./src/assets/Beige and Red Minimalist Thank You for Support Merry Christmas Instagram Post (3) 1.png')",
        'welcomepage': "url('./src/assets/mobile welcome bg.png')"
      },
      colors: {
        'red': '#BE1522',
        'green': '#31571B'
      },
      fontFamily: {
        'coming-soon': [" Coming Soon "],
      }
    },
  },
  plugins: [],
}
