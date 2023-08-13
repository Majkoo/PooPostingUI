/** @type {import('tailwindcss').Config} */

theme = {
  'surface': '#FFF4EA',
  'prime': '#7D4E24',
  'prime-blend': '#C99D77',
  'accent': '#77BBC9',

  'danger': {
    '50': '#fffaf5',
    '100': '#fff4eb',
    '200': '#ffe1cf',
    '300': '#ffc8b0',
    '400': '#ff8873',
    '500': '#ff3838',
    '600': '#e62e2e',
    '700': '#bf1f1f',
    '800': '#991414',
    '900': '#730b0b',
    '950': '#4a0404'
  },
  'warn': {
    '50': '#fffff5',
    '100': '#ffffeb',
    '200': '#feffcf',
    '300': '#fbfcb1',
    '400': '#fafc77',
    '500': '#f8fb3c',
    '600': '#d5e031',
    '700': '#a6ba22',
    '800': '#7a9615',
    '900': '#54700c',
    '950': '#2f4705'
  },
}

module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {
      backgroundColor: theme,
      shadowColor: theme,
      borderColor: theme,
      borderWidth: {
        "1": "1px"
      },
    }
  },
  plugins: [],
}
