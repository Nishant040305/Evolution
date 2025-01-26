/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'github-0': '#161B22',
        'github-1': '#0E4429',
        'github-2': '#006D32',
        'github-3': '#26A641',
        'github-4': '#39D353',
      }
    }
  },
  plugins: [],
};
