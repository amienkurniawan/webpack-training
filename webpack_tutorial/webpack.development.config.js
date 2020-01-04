const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('MiniCssExtractPlugin');
// const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        admin: './src/Modules/admin/js/index.js',
        backoffice: './src/Modules/backoffice/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 8080,
        // hot: true,
        // inline: true,
        // progress: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/Component/index.ejs',
            filename: './index.html',
            chunk: ['admin']
        }),
        new HtmlWebPackPlugin({
            template: './src/Component/index.ejs',
            filename: './index.html',
            chunk: ['backoffice']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // new HtmlWebPackPlugin({
        //     template: './src/Modules/backoffice/html/index.html',
        //     filename: './index.html'
        // }),
        // new TerserPlugin(),

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
                test: /\.(svg|png|jpe?g|gif)$/,
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
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
    },

}
