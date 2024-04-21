const path = require('path');

module.exports = {
  entry: require.resolve('./src/threesixty.js'),
  context: __dirname,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'threesixty.js',
    library: {
      type: 'umd',
      name: 'ThreeSixty',
      export: 'default',
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }],
  },
  devServer: {
    static: path.resolve(__dirname, './demo'),
    compress: true
  }
};
