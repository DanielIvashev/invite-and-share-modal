import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { babel } from '@rollup/plugin-babel';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import eslint from '@rollup/plugin-eslint';

const path = require('path');

export default defineConfig({
    server: {
        port: 3000,
        watch: {
            usePolling: true
        }
    },
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),
        babel({
            babelHelpers: 'bundled'
        }),
        quasar({
            sassVariables: '@/styles/_quasar-variables.scss'
        }),
        {
            ...eslint({ include: 'src/**/*.+(js|vue)' }),
            enforce: 'pre',
            apply: 'lint'
        },
        splitVendorChunkPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~': path.resolve(__dirname, './src/components'),
            'vue': 'vue/dist/vue.esm-bundler.js'
        },
        extensions: ['.mjs', '.js', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    quasar: ['quasar']
                }
            }
        }
    }
});
