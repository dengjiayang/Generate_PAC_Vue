import path from 'path'
import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),

    }),
    
  ],
  server: {
    host:'0.0.0.0',
    proxy:{
      '/api': {
        target: 'http://10.80.50.124:7001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
  
})
