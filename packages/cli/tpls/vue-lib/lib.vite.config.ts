import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, './package.json'), 'utf-8')
)

export default defineConfig({
  plugins: [
    peerDepsExternal(),
    cssInjectedByJsPlugin(),
    vue(),
    vueJsx(),
    dts({
      entryRoot: './src',
      outDir: './dist/es'
      // rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      [pkg.name]: resolve(__dirname, './src/index.ts')
    }
  },
  build: {
    target: 'modules',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src'
        },
        {
          format: 'commonjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      entry: 'src/index.ts'
    }
  },
  optimizeDeps: {
    include: [pkg.name]
  }
})
