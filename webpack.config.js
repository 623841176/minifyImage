var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./index.js",//入口文件
    output: {//打包输出的文件
        path: __dirname,
        filename: "bundle.js"
    },
    devServer: {
        inline: true,
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {      // 属性 跟 query 一样，可以传递到 loader 中，代表 loader 的选项
                            presets: ['es2015']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
  
    resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['.js', '.json', '.coffee']
    }
}