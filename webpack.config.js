
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'index.html',
    }),
  ],
  devServer: {
    static: './build',
    open: true,
    compress: true,
    port: 4000,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'build.js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'webfonts',
            publicPath: '../webfonts',
          },
        }
      }
    ],
  },
};




























// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//     mode: 'development',
//     entry: './index.js',
//     output: {
//         filename: 'build.js',
//         path: path.resolve(__dirname, 'build'),
//     },
//     plugins: [
//         new HtmlWebpackPlugin({template: 'index.html'})
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/i,
//                 use: ["style-loader", "css-loader"],
//             },
//             {
//                 test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
//                 type: 'asset/resource',
//             },
//             {
//                 test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
//                 type: 'asset/inline',
//             },
//             {
//                 test: /\.m?js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: [
//                             ['@babel/preset-env', { targets: "defaults" }]
//                         ]
//                     }
//                 }
//             }
//         ],
//     },
// };