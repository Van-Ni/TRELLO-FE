import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// #Trello3 
// https://vitejs.dev/config/
//https://stackoverflow.com/questions/68241263/absolute-path-not-working-in-vite-project-react-ts
//https://dev.to/willochs316/how-to-fix-absolute-path-not-working-in-vite-project-react-ts-3aj9
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@utils', replacement: '/src/utils' },
    ],
   },
})
