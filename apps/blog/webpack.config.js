const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/router.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 下面这个是必须要加的
    publicPath: '/'
  },
  module: {
    rules: [
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
            plugins: ['@babel/plugin-transform-runtime']
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: false
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        // AI 写的正则匹配, 咋也不知道对不对
        test: /^(?!.*module\.less$).*\.(less|css)$/,
        use: [
          'style-loader',
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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less']
  },
  plugins: [
    new HtmlWebPackPlugin({
      titel: 'react app',
      filename: 'index.html',
      template: './html/index.html'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    static: './dist',
    historyApiFallback: true
  }
};
