/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F7F4EC',
          200: '#EFECE3',
          300: '#E2DDD2',
          400: '#CEC6B6',
          900: '#23201B',
        },
        obsidian: {
          950: '#0A0A0B',
          900: '#0F0F10',
          850: '#151517',
          800: '#1C1B1E',
          700: '#262529',
          600: '#3A383F',
        },
        gold: {
          100: '#F8F3E6',
          200: '#EDE0C4',
          300: '#DFCA99',
          400: '#D4AF37',
          500: '#C5A028',
          600: '#A98319',
          700: '#846411',
        },
        bronze: {
          400: '#B89065',
          500: '#9C7449',
          600: '#7E5B35',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"DM Serif Display"', '"Playfair Display"', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'mega-wide': '0.4em',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      borderWidth: {
        'hairline': '0.5px',
      },
    },
  },
  plugins: [],
}
