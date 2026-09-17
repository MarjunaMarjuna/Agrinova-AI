/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          deep: '#1B4332',
          forest: '#2D6A4F',
          dark: '#081C15',
          sprout: '#52B788',
          light: '#74C69D',
          pale: '#D8F3DC',
          cream: '#FBFBF7',
          sand: '#F4F1EA',
          earth: '#BC6C25',
          gold: '#E9C46A',
          clay: '#DDA15E',
          danger: '#E76F51',
          charcoal: '#1F2421',
          muted: '#5C6B61'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 50, 0.08)',
        'elevated': '0 10px 30px -4px rgba(27, 67, 50, 0.12)',
        'glow': '0 0 25px rgba(82, 183, 136, 0.35)',
      }
    },
  },
  plugins: [],
}
