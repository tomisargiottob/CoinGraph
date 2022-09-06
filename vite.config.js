import { defineConfig } from 'vite';
import { resolve, dirname } from "node:path";
import { fileURLToPath, URL } from "node:url";
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/localization/lang/**'),
    })
  ],
  server: {
    port: 8080
  },
  define: {
    'process.env': {}
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'icons': resolve(dirname(fileURLToPath(import.meta.url)), "node_modules/vue-material-design-icons")
    },
  }
})
