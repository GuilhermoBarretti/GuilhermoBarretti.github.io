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
            // "code::before": false,
            // "code::after": false,
            // a: {
            //   color: theme(`colors.blue.600`),
            //   textDecoration: "none",
            //   "&:hover": {
            //     color: theme(`colors.blue.800`),
            //     textDecoration: "underline",
            //   },
            // },
            pre: {
              backgroundColor: '#000000',
            //   color: '#ff0000',
            },
			blockquote: {
				fontSize: '19px',
			},
            code: { color: theme(`colors.gray.700`) },
            '--tw-prose-captions': '#b8b8b8',
            '--tw-prose-quotes': '#9ad1f3',
            '--tw-prose-links': '#37b2ff',
            '--tw-prose-headings': '#9ad1f3',
            // '--tw-prose-body': theme('colors.pink[800]'),
            // '--tw-prose-headings': theme('colors.pink[900]'),
            // '--tw-prose-lead': theme('colors.pink[700]'),
            // '--tw-prose-links': theme('colors.pink[900]'),
            // '--tw-prose-bold': theme('colors.pink[900]'),
            // '--tw-prose-counters': theme('colors.pink[600]'),
            // '--tw-prose-bullets': theme('colors.pink[400]'),
            // '--tw-prose-hr': theme('colors.pink[300]'),
            // '--tw-prose-quotes': theme('colors.pink[900]'),
            // '--tw-prose-quote-borders': theme('colors.pink[300]'),
            '--tw-prose-code': '#00ffff',
            // '--tw-prose-pre-code': theme('colors.pink[100]'),
            // '--tw-prose-pre-bg': theme('colors.pink[900]'),
            // '--tw-prose-th-borders': theme('colors.pink[300]'),
            // '--tw-prose-td-borders': theme('colors.pink[200]'),
            // '--tw-prose-invert-body': theme('colors.pink[200]'),
            // '--tw-prose-invert-headings': theme('colors.white'),
            // '--tw-prose-invert-lead': theme('colors.pink[300]'),
            // '--tw-prose-invert-links': theme('colors.white'),
            // '--tw-prose-invert-bold': theme('colors.white'),
            // '--tw-prose-invert-counters': theme('colors.pink[400]'),
            // '--tw-prose-invert-bullets': theme('colors.pink[600]'),
            // '--tw-prose-invert-hr': theme('colors.pink[700]'),
            // '--tw-prose-invert-quotes': theme('colors.pink[100]'),
            // '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            // '--tw-prose-invert-captions': theme('colors.pink[400]'),
            // '--tw-prose-invert-code': theme('colors.white'),
            // '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            // '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            // '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            // '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
          },
        },
        invert: {
          css: {
        //     color: theme(`colors.gray.200`),
        //     a: {
        //       color: theme(`colors.yellow.300`),
        //       "&:hover": { color: theme(`colors.yellow.500`) },
        //     },
        //     h1: { color: theme(`colors.gray.200`) },
        //     h2: { color: theme(`colors.gray.200`) },
        //     h3: { color: theme(`colors.gray.200`) },
        //     h4: { color: theme(`colors.gray.200`) },
        //     h5: { color: theme(`colors.gray.200`) },
        //     h6: { color: theme(`colors.gray.200`) },
        //     strong: { color: theme(`colors.gray.200`) },
        //     td: { color: theme(`colors.gray.200`) },
        //     blockquote: { color: theme(`colors.gray.200`) },
            pre: {
              backgroundColor: '#000000',
            },
            code: { color: '#ffffff'
			},
          },
        },
      }),
    },
  },
  variants: { typography: ["invert"], extend: {} },
  plugins: [require("@tailwindcss/typography")],
};
