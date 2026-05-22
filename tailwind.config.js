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
        midnight: '#F7F2EA',
        ink: '#FFF9F0',
        cyan: '#9A651E',
        electric: '#315B8A'
      },
      boxShadow: {
        glow: '0 12px 28px rgba(154, 101, 30, 0.16)',
        card: '0 18px 48px rgba(65, 48, 28, 0.12)'
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(38,31,22,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(38,31,22,0.055) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
