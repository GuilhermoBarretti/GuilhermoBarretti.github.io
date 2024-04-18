const theme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  content: [
    "content/**/*.md",
    "layouts/**/*.html",
    "static/**/*.html",
    "./themes/**/layouts/**/*.html",
    "./content/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.html",
    './static/**/*.html'
  ],
  darkMode: "class", // 'media' or 'class'
  theme: {
	  extend: {
		'nm-bg': '#5b4b87',
		'nm-dark': '#4d4073',
		'nm-light': '#645395',
      backgroundColor: (theme) => ({
        darkest: '#081720',
        darker: '#0f2c3d',
        dark: '#123549',
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": false,
            "code::after": false,
            a: {
              color: theme(`colors.blue.600`),
              textDecoration: "none",
              "&:hover": {
                color: theme(`colors.blue.800`),
                textDecoration: "underline",
              },
            },
            pre: {
              backgroundColor: theme(`colors.stone.200`),
              color: theme(`colors.gray.700`),
            },
            code: { color: theme(`colors.gray.700`) },
          },
        },
        invert: {
          css: {
            color: theme(`colors.gray.200`),
            a: {
              color: theme(`colors.yellow.300`),
              "&:hover": { color: theme(`colors.yellow.500`) },
            },
            h1: { color: theme(`colors.gray.200`) },
            h2: { color: theme(`colors.gray.200`) },
            h3: { color: theme(`colors.gray.200`) },
            h4: { color: theme(`colors.gray.200`) },
            h5: { color: theme(`colors.gray.200`) },
            h6: { color: theme(`colors.gray.200`) },
            strong: { color: theme(`colors.gray.200`) },
            td: { color: theme(`colors.gray.200`) },
            blockquote: { color: theme(`colors.gray.200`) },
            pre: {
              backgroundColor: theme(`colors.stone.700`),
            },
            code: { color: theme(`colors.gray.200`) },
          },
        },
      }),
    },
  },
  variants: { typography: ["invert"], extend: {} },
  plugins: [require("@tailwindcss/typography")],
};
