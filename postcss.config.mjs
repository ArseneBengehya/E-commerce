/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Garde la configuration par défaut de Next.js
    'postcss-preset-mantine': {}, // Ajoute le support de Mantine
    'postcss-simple-vars': { // Nécessaire pour les breakpoints de Mantine
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};

export default config;