/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
     'stone': {
        '50': '#fafaf9',
        '100': '#f5f5f4',
        '200': '#e7e5e4',
        '300': '#d6d3d1',
        '400': '#a8a29e',
        '500': '#78716c',
        '600': '#57534e',
        '700': '#44403c',
        '800': '#292524',
        '900': '#1c1917',
        '950': '#0c0a09',
    },
    
    'white' : "#FFFFFF",
    'red' : "#FF0000",
   },
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

