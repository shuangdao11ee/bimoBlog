const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MyPlugin = require('./plugin/myPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV !== 'production';

var config = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/router.tsx'],
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 下面这个是必须要加的
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [
          {
            loader: path.resolve('./loader/loader.js')
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        // 匹配js/jsx
        test: /\.tsx?$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: {
          // 确定使用的loader
          loader: 'babel-loader',
          // 参数配置
          options: {
            presets: [
              [
                // 预设polyfill
                '@babel/preset-env',
                {
                  // polyfill 只加载使用的部分
                  useBuiltIns: 'usage',
                  // 使用corejs解析，模块化
                  corejs: '3'
                }
              ],
              // 解析react
              '@babel/preset-react'
            ],
            // 使用transform-runtime，避免全局污染，注入helper
            plugins: [
              '@babel/plugin-transform-runtime',
              isDevelopment && require('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.module\.(css|less)$/,
        use: [
          // 开发模式使用style-loader主要是为了hmr
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: false
            }
          },
          'postcss-loader',
          path.resolve('./loader/less-loader.js')
          // 'less-loader'
        ]
      },
      {
        // AI 写的正则匹配, 咋也不知道对不对
        test: /^(?!.*module\.less$).*\.(less|css)$/,
        use: [
          // 开发模式使用style-loader主要是为了hmr
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              esModule: false
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  // resolveLoader: {
  //   modules: [path.resolve(__dirname, 'loader')]
  // },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less', '.txt']
  },
  plugins: [
    !isDevelopment &&
      new MiniCssExtractPlugin({
        attributes: {
          id: 'target',
          'data-target': 'example'
        }
      }),
    new MyPlugin({ options: true }),
    isDevelopment &&
      new webpack.BannerPlugin({
        banner: (yourVariable) => {
          return `yourVariable: ${yourVariable}`;
        }
      }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      titel: 'react app',
      filename: 'index.html',
      template: './html/index.html'
    }),
    // react HMR 插件
    isDevelopment &&
      new ReactRefreshWebpackPlugin({
        overlay: false
      }),
    !isDevelopment && new webpack.ProgressPlugin()
    // new BundleAnalyzerPlugin()
  ].filter(Boolean),
  devServer: {
    host: '0.0.0.0',
    port: 8090,
    static: './dist',
    historyApiFallback: true,
    hot: true, // HMR
    liveReload: false
  },
  // 这一行是干什么的?
  devtool: 'hidden-source-map',
  performance: {
    // 暂时隐藏提示, 后面还要split chunk
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'], // 通过...访问默认值 默认值中带有压缩和混淆的插件
    // usedExports: true, // 标记未使用的导出内容,
    innerGraph: true // 排除带有PURE注释的函数调用
  }
};

module.exports = config;
