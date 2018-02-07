var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'dist');

var config = {
    entry: {
        app: APP_DIR + '/main.js'
    },

    output: {
        path: BUILD_DIR,
        filename: 'app.bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [{
            test: /\.js?/,
            include: APP_DIR,
            loaders: ['babel-loader']
        }]
    },

    devtool: 'source-map',

    devServer: {
        contentBase: APP_DIR,
        port: 8088,
        historyApiFallback: {
            index: '/'
        }
    }
};

module.exports = config;