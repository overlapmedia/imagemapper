// Script 'npm run demo' uses this config. Output file demo.js is then loaded by /public/index.html in the Webpack devserver.
import webpack from 'webpack';

export default {
  mode: 'none',
  entry: './examples/node/index.js',
  output: {
    filename: './demo.js',
  },

  devServer: {
    port: 9000,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    /*
    // npm install process
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    */
  ],
};
