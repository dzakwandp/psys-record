/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui:{
    themes:[
      'light'
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
