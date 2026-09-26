/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Clean Emerald
          neon: '#10b981',
          light: '#34d399',
          dark: '#064e3b',
          subtle: 'rgba(16, 185, 129, 0.1)',
        },
        secondary: {
          DEFAULT: '#f59e0b', // Clean Amber
          neon: '#f59e0b',
          light: '#fbbf24',
          dark: '#78350f',
          subtle: 'rgba(245, 158, 11, 0.1)',
        },
        tertiary: {
          DEFAULT: '#3b82f6', // Clean Blue
          neon: '#3b82f6',
          light: '#60a5fa',
          dark: '#1e3a8a',
          subtle: 'rgba(59, 130, 246, 0.1)',
        },
        surface: {
          bg: '#0f172a',      // Clean Slate 900
          card: '#1e293b',    // Clean Slate 800
          cardHover: '#253349',
          border: '#334155',  // Clean Slate 700
          borderLight: '#475569',
        },
        tactical: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#1e293b',
          border: '#334155',
          'border-active': '#10b981',
          'border-alert': '#f59e0b',
          text: '#f8fafc',
          muted: '#94a3b8',
          dim: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        headline: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['Arial', 'Helvetica', 'sans-serif'], // All fonts unified to clean Arial
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
