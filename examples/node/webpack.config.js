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
