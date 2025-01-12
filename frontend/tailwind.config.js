/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'fuzzy-wuzzy-brown': {
        '50': '#fcf5f4',
        '100': '#f9e8e7',
        '200': '#f5d5d3',
        '300': '#edb8b4',
        '400': '#e08e89',
        '500': '#d16962',
        '600': '#bf564f',
        '700': '#9d3e38',
        '800': '#833631',
        '900': '#6e322e',
        '950': '#3b1614',
    },
    'white' : "#FFFFFF"
    ,
    'mercury': {
      '50': '#f7f7f7',
      '100': '#e6e6e6',
      '200': '#dfdfdf',
      '300': '#c8c8c8',
      '400': '#adadad',
      '500': '#999999',
      '600': '#888888',
      '700': '#7b7b7b',
      '800': '#676767',
      '900': '#545454',
      '950': '#363636',
    }},
    extend: {
     
    //    keyframes: {
    //     typing: {
    //       "%0": {
    //         width: "0%",
    //         visibility: "hidden"
    //       },
    //       "100%": {
    //         width: "100%"
    //       }  
    //     },
    //     blink: {
    //       "50%": {
    //         borderColor: "transparent"
    //       },
    //       "100%": {
    //         borderColor: "white"
    //       }  
    //     },},
    //     animation: {
    //       typing: "typing 3s steps(40), blink .75s infinite"
    //     }
      
     
     },
  },
  plugins: [],
}

