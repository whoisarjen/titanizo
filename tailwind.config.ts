import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{js,vue,ts}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#404040',
            a: {
              color: '#171717',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: '#d4d4d4',
              '&:hover': {
                textDecorationColor: '#171717',
              },
            },
            h2: {
              color: '#171717',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h3: {
              color: '#171717',
              fontWeight: '600',
            },
            strong: {
              color: '#171717',
            },
            code: {
              color: '#171717',
              backgroundColor: '#f5f5f5',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#171717',
              color: '#fafafa',
              borderRadius: '0',
            },
            blockquote: {
              borderLeftColor: '#d4d4d4',
              color: '#525252',
              fontStyle: 'normal',
            },
          },
        },
        invert: {
          css: {
            color: '#d4d4d4',
            a: {
              color: '#fafafa',
              textDecorationColor: '#525252',
              '&:hover': {
                textDecorationColor: '#fafafa',
              },
            },
            h2: { color: '#fafafa' },
            h3: { color: '#fafafa' },
            strong: { color: '#fafafa' },
            code: {
              color: '#fafafa',
              backgroundColor: '#262626',
            },
            pre: { backgroundColor: '#0a0a0a' },
            blockquote: {
              borderLeftColor: '#404040',
              color: '#a3a3a3',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
