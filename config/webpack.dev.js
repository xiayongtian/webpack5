const path = require('path');  //node的核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: "./src/main.js", //相对路径
    // 输出
    output: {
        //文件的输出路径
        // __dirname:nodejs的变量，代表当前文件的文件夹目录
        path: undefined,
        filename: "static/js/main.js",
    },
    // 加载器
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,  //只检测.css文件
                // 执行顺序，从右到左（从下到上）
                use: [
                    'style-loader',  //将js中css通过创建style标签添加到html文件中生效
                    'css-loader'   //将css资源编译成commonjs的模块到js中，处理过后是一个数组
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",//将js中css通过创建style标签添加到html文件中生效
                    "css-loader", //将css资源编译成commonjs的模块到js中，处理过后是一个数组
                    "less-loader" //编译Less到CSS
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    "sass-loader" // 将 Sass 编译成 CSS,只需要下载
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    "stylus-loader", // 将 Stylus 文件编译为 CSS
                ]
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
        })
    ],
    // 开发服务器:相当于webapck的热更新了，并且当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。
    // 开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道。
    // 如果webpack.config.js在外面配置，运行命令：npx webpack serve ,如果在config文件夹下面，运行命令：npx webpack serve --config ./config/webpack.dev.js

    // devServer: {
    //     host: "localhost", // 启动服务器域名
    //     port: "9003", // 启动服务器端口号
    //     open: true, // 是否自动打开浏览器
    // },
    // 模式
    mode: 'development'
}