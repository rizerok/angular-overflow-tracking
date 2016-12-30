'use strict';
var webpack                         = require('webpack'),
    ExtractTextPlugin               = require('extract-text-webpack-plugin'),
    //======================NPM=============================
    path                            = require('path'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
    entry:{
        'js/overflow-tracking':'./module/module.js',
        'css/style.bundle':'./demo/style.styl',
        'css/demo3':'./demo/demo3.styl',
        'css/demo4':'./demo/demo4.styl'
    },
    output:{//куда выводит
        path:'./bundle/',
        filename:'[name].js',
        publicPath: '/bundle/'
        //library:'app'//задает глобальную переменную
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include:[
                    path.join(__dirname, 'module'),
                    path.join(__dirname, 'index.js')
                ],
                loader:'ng-annotate'
            },
            {
                test: /\.js$/,
                include:[
                    path.join(__dirname, 'module'),
                    path.join(__dirname, 'index.js')
                ],
                //loaders: ['ng-annotate','babel?presets=es2015&cacheDirectory=true'],
                loader:'babel',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            },
            {
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 10 version!stylus-loader'),
                test: /\.styl$/,
                include:[
                    path.join(__dirname, 'demo'),
                    path.join(__dirname, 'module')
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {//сжимает файлы в base64 и пихает строкой, при достижении лимита перетаскивает файлы в bundle
                test   : /\.(ttf|eot|svg|woff|otf|png|jpg|gif)(\?[a-z0-9]+)?$/,
                loader : 'url-loader?limit=2000&name=style/assets/[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false
        }),
        new ExtractTextPlugin('[name].css'),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3002,
            server: { baseDir: [__dirname] }
        }),
    ]
};