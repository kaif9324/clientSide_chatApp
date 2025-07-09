export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 this line is super important!
  ],
  theme: {
    extend: {
      keyframes:{
        scrollRight:{
          "0%":{transform:"translateX(0%)"},
          "100%":{transform:"translateX(100%)"}
        }
      },
      animation:{
        'scroll-right':'scrollRight 10s linear infinite'
      }
    },
  },
  plugins: [],
}
