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
      textshadow: {
        glow: '0 0 8px rgba(255, 255, 255, 0.5)'
      },
      backgroundImage: {
        'homepage': "url('/assets/Beige and Red Minimalist Thank You for Support Merry Christmas Instagram Post (3) 1.png')",
        'welcomepage': "url('/assets/mobile welcome bg.png')",
        'desktop': "url('/assets/desktop-bg.png')"
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
  plugins: ['tailwindcss-textshadow'],
}
