const webpack = require('webpack');

const config = {
    entry: {
        about: './src/scripts/pages/about.js',
        works: './src/scripts/pages/works.js',
        blog: './src/scripts/pages/blog.js',
        index: './src/scripts/pages/welcome.js'
    },
    output: {
        filename: '[name].js'
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
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            query: {
                "presets": [
                    "env"
                ]
            }
          },
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
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
                    test: /(node_modules|bower_components)/,
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