const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        purple:
          '0 6px 12px -1px rgba(147,51,234, 0.5), 0 4px 8px -1px rgba(147,51,234, 0.4)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['focus'],
    },
  },
  plugins: [],
}