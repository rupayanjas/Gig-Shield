/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F8F7F4', // cream background
          100: '#F2ECE4',
          200: '#E6D3C3',
          300: '#D5B4A0',
          400: '#C1937A',
          500: '#AA8066', // core orange/brown
          600: '#8A5A44',
          700: '#69412F',
          800: '#4A3B32', // dark brown text
          900: '#3D312A',
        },
        accent: {
          light: '#FCE7DF', // peach backgrounds
          DEFAULT: '#E6A889',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(74, 59, 50, 0.1)',
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 0 3px rgba(0,0,0,0.02)',
      }
    },
  },
  plugins: [],
}
