import { resolve } from 'path'
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {

    return {
        build: {
            lib: {
                entry: resolve(__dirname, './index.js'),
                name: 'imagemapper',
                fileName: (format) => mode === "development" ? 'imagemapper.js' : `imagemapper.${format}.js`
            },
            sourcemap: true,
            rollupOptions: {
                output: {
                    exports: "named"
                }
            }
        }
    }
});