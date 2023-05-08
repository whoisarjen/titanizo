/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
    container:{
      screens: {
        'sm': '100%',
        'md': '100%',
        'lg': '100%',
        'xl': '1312px',
        '2xl': '1312px',
      },
    },
  },
  plugins: [],
}
