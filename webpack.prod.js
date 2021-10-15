import wpmerge from 'webpack-merge';
const { merge } = wpmerge;
import common from './webpack.common.js';

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'imagemapper.min.js',
  },
});
