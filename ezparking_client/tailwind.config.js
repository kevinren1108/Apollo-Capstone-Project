/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      height: {
        'fullToolBar': 'calc(100vh - 60px)',
      },
      blur: {
        xxs: '1px',
      }
    }
  },
  plugins: []
}