const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const entryPoint = ['admin', 'backoffice'];
// const _ = require('lodash');

// const entrySrc = _.forEach(entryPoint, f => './src/Modules/' + f + '/js/index.js');
// const templates = _.forEach(entryPoint, f => './src/Modules/' + f + '/html/index.html');
// const pathOutput = _.forEach(entryPoint, f => path.resolve(__dirname, './dist/' + f))

module.exports = {
    mode: 'production',
    entry: {
        admin: './src/Modules/admin/js/index.js',
        backoffice: './src/Modules/backoffice/js/index.js'
    },
    output: {
        filename: '[name].[contentHash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/Modules/admin/html/index.ejs',
            filename: './admin.html',
            chunks: ['admin']
        }),
        new HtmlWebPackPlugin({
            template: './src/Modules/admin/html/index.ejs',
            filename: './backoffice.html',
            chunks: ['backoffice']
        }),
        // new HtmlWebPackPlugin({
        //     template: './src/Modules/backoffice/html/index.html',
        //     filename: './index.html'
        // }),
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            removeComments: false,
                            collapseWhitespace: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[contentHash].[ext]",
                        outputPath: 'images'
                    }

                }
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        minified: true,

                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                exclude: /(node_modules|bower_components)/,
            })
        ],
        splitChunks: {
            chunks: "all"
        }
    },

}
