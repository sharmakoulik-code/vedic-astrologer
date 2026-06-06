/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        mystic: {
          50: '#f6f7fb',
          100: '#ebf0f7',
          200: '#d3def0',
          300: '#b0c3e4',
          400: '#87a2d4',
          500: '#6781c4',
          600: '#5165b1',
          700: '#435191',
          800: '#3a4578',
          900: '#333b64',
          950: '#1b203a',
        },
        gold: {
          300: '#fcd34d',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        rose: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(234, 179, 8, 0.2)',
        'glow-lg': '0 0 40px rgba(234, 179, 8, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 8px 64px 0 rgba(31, 38, 135, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(234, 179, 8, 0.4)' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [],
}