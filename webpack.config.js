const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        app: './src/scripts/app.js',
        about: './src/scripts/pages/about.js',
        works: './src/scripts/pages/works.js',
        blog: './src/scripts/pages/blog.js',
        index: './src/scripts/pages/welcome.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                "presets": [
                    "env"
                ]
            }
          }
        ]
    },
    optimization: {
        minimize: false,
        runtimeChunk: {
            name: 'common'
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /(node_modules|jquery)/,
                    name: "common",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    },
    mode: 'development'
};

module.exports = config;