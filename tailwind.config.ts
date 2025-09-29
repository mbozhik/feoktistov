import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    screens: {
      xl: {max: '1780px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      sans: ['var(--font-tilda)', ...defaultTheme.fontFamily.sans],
    },
    colors: ({colors}) => ({
      background: {
        DEFAULT: '#FAFAFA',
        gray: '#E6E6E6',
      },

      blue: {
        light: '#57668A',
        medium: '#354469',
        dark: '#1C253B',
      },
      gray: '#D4D4D4',
      destructive: '#FF5757',

      black: colors.black,
      transparent: colors.transparent,
    }),
    extend: {},
  },
  plugins: [],
} satisfies Config
