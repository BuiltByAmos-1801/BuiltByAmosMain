/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        midnight: '#101217',
        ink: '#171B22',
        cyan: '#D8A84E',
        electric: '#6F8FBF'
      },
      boxShadow: {
        glow: '0 14px 34px rgba(216, 168, 78, 0.16)',
        card: '0 18px 54px rgba(0, 0, 0, 0.28)'
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
