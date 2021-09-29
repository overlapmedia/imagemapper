import wpmerge from 'webpack-merge';
const { merge } = wpmerge;
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
});
