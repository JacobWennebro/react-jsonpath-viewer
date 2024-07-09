import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    copyPublicDir: false,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'react',
          reactDom: 'react-dom'
        },
      },
    },
  },
})