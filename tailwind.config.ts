import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      golden: '#d0af51',
      carmin: '#ba0f30',
      lightgray: '#a4a2a2',
      darkgray: '#505050',
      white: '#ffffff'
    }
  },
  plugins: [],
}
export default config
