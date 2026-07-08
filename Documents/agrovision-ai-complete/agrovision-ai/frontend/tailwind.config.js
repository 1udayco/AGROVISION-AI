/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        dark: {
          900: '#020c07',
          800: '#040f0a',
          700: '#071510',
          600: '#0b2018',
          500: '#0f2d22',
        },
        glass: 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'scan-line': 'scanLine 3s linear infinite',
        'radar-spin': 'radarSpin 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34,197,94,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(34,197,94,0.8)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '20%': { transform: 'translate(3%,2%)' },
          '30%': { transform: 'translate(-1%,4%)' },
          '40%': { transform: 'translate(2%,-1%)' },
          '50%': { transform: 'translate(-3%,1%)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scanLine: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
        radarSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(130,60%,15%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(150,50%,10%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(120,70%,8%,1) 0px, transparent 50%)',
        'hero-pattern': "url('/images/hero-bg.svg')",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
