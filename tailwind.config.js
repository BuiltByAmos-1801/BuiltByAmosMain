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
        midnight: '#030712',
        ink: '#07111f',
        cyan: '#00FFFF',
        electric: '#3B82F6'
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 255, 255, 0.18)',
        card: '0 24px 80px rgba(0, 0, 0, 0.35)'
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
