const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode:'development',
    // entry: {
    //         app: './src/app.js',
    //         adminApp: './src/adminApp.js'
    //       },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: path.join("scripts", "[name].[hash:6].js"),
        chunkFilename: path.join("scripts", "common.[chunkhash:6].js"),
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader",
                        options:{minimize:true}
                    }
                ]
            },{
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },{
                test:/\.(png|jpg|gif|svg)$/,
                use:[
                    'file-loader'
                ]

            },{
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]

            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:"./src/html/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].css",
            chunkFilename:"[id].css"
        })
    ]

}