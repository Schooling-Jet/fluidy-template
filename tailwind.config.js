/** @type {import('tailwindcss').Config} */

const themeColors = [
  'black',
  'black-thick',
  'primary-light',
  'primary',
  'primary-thick',
  'secondary-light',
  'secondary',
  'secondary-thick',
  'muted-light',
  'muted-vlight',
  'muted',
  'muted-thick',
  'success',
  'danger',
  'danger-thick',
  'orange',
]

// transforms color objects to rgba formats in order for color transparencies to work
const colors = {};
for (const color of themeColors) {
  colors[color] = `color-mix(in srgb, var(--color-${color}) calc(100% * <alpha-value>), transparent)`;
}

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors,
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        'sans': ['Open Sans'],
      },
      boxShadow: {
        custom: '0px 9.52px 57.15px 0px #E2ECF980',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
}
