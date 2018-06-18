const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: { main: './frontend/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    resolve: {
        modules: [path.resolve(__dirname, 'frontend'), 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },

    devtool: process.env.NODE_ENV === 'production' ? 'sourceMap' : 'cheap-eval-source-map',

    module :{
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    'options': {
                        'plugins': ['lodash']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './frontend/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new LodashModuleReplacementPlugin({
            'collections': true,
            'paths': true
        }),
        new WebpackMd5Hash(),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
        })
    ]
};