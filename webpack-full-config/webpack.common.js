module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },

    module: {
        rules: [{
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // failOnWarning: false,
                    // failOnError: true,
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            },
        ]
    }
};