import path, { dirname } from 'path';
import { fileURLToPath, URL } from 'url';

// Windows
const __dirname = dirname(fileURLToPath(import.meta.url));

// Linux
//const __dirname = new URL('.', import.meta.url).pathname;

export default {
  entry: './index.js',
  output: {
    filename: 'imagemapper.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'imagemapper',
      type: 'umd',
    },
  },
};
