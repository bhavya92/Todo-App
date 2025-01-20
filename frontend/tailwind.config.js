/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      screens: {
        'ms':'320px',
        // => @media (min-width: 320x) { ... }

        'mm':'375px',
        // => @media (min-width: 375x) { ... }

        'lm': '425px',
        // => @media (min-width: 425x) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    
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
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        bungee:['Bungee Shade','sans-serif'],
        neue:['Comic Neue','sans-serif'],
        rampart:['Rampart One','sans-serif'],
      },
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
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

