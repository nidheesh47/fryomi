// tailwind.config.js
import daisyui from 'daisyui';
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        
        background: "#f5f5f5", 
        text:"#000000",         
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
    ],
  },
}
