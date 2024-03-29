import path from 'path';
import webpack from 'webpack';

export default {
  target: 'node',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './js/helpers.js')
  ],
  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'js'),
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.js']
  },
}