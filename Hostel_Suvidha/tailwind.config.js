module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        bounceLoader: {
          '0%': { boxShadow: '20px 0 #fff, -20px 0 rgba(255, 255, 255, 0.1)', background: '#fff' },
          '33%': { boxShadow: '20px 0 #fff, -20px 0 rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.1)' },
          '66%': { boxShadow: '20px 0 rgba(255, 255, 255, 0.1), -20px 0 #fff', background: 'rgba(255, 255, 255, 0.1)' },
          '100%': { boxShadow: '20px 0 rgba(255, 255, 255, 0.1), -20px 0 #fff', background: '#fff' },
        },
      },
      animation: {
        bounceLoader: 'bounceLoader 1s infinite linear alternate',
      },
  },
},
  plugins: [],
}
