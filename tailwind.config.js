/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'bg-pinkish' : '#CC8B86',
      'brown' : '#7D4F50',
      'darkbrown' : '#573737',
      'lightpink' : '#F9EAE1',
      'lightgrey' : '#F4F4F4',
      'mediumgrey' : '#E8E8E8',
      'darkgrey' : '#373737',
      'white' : '#FFF',
      'redAlert' : '#a50000'

    },
    fontFamily : {
      display: ['Irish Grover', 'cursive'] 
    },
    extend: {},
  },
  plugins: []
  
}
