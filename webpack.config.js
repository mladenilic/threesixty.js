const path = require('path');

module.exports = {
    mode: 'production',
    entry: require.resolve('./src/threesixty.js'),
    context: __dirname,
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'dist/threesixty.js',
        libraryExport: 'default',
        library: 'ThreeSixty',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }],
    },
};
