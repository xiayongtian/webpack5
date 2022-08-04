const path = require('path');  //node的核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');  //eslint配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css成单独文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const getStyleLoader = (pre) => {
    // 执行顺序，从右到左（从下到上）
    return [
        MiniCssExtractPlugin.loader,  //提取css成单独文件
        'css-loader',   //将css资源编译成commonjs的模块到js中，处理过后是一个数组
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    // 入口
    entry: "./src/main.js", //相对路径
    // 输出
    output: {
        //文件的输出路径
        // __dirname:nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),  //绝对路径
        filename: "static/js/main.js",
        clean: true  //打包前自动清空path整个目录

    },
    // 加载器
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,  //只检测.css文件
                use: getStyleLoader()
            },
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoader("stylus-loader")

            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        //小于300kb，转换成base64
                        maxSize: 300 * 1024 // 300kb
                    }
                },
                generator: {
                    //输出图片名称
                    //[hash:10]hash值取10位
                    filename: 'static/images/[hash:10][ext][query]'  //hash/扩展名/查询参数？
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    //输出名称
                    //[hash:10]hash值取10位
                    filename: 'static/media/[hash:10][ext][query]'  //hash/扩展名/查询参数？
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env']  // 智能预设，将es6语法降级，兼容，可以将此配置放到外面，方便修改
                //     }
                // }
            }
        ]
    },
    // 插件
    plugins: [
        //plugins的配置
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: path.resolve(__dirname, '../src/media'),  //指定需要排除的文件及目录
        }),
        // 以 index.html 为模板创建文件
        // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        }),
        // css压缩
        new CssMinimizerPlugin(),
    ],
    // 模式
    mode: 'production'
}