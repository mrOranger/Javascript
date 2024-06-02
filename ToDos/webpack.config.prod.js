const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
      mode: 'production',
      devtool: 'source-map',
      devServer: {
            static: {
                  directory: path.resolve(__dirname, 'dist'),
            },
            open: true,
            compress: true,
            historyApiFallback: true,
      },
      entry: {
            index: path.resolve(__dirname, 'src/index.js'),
      },
      output: {
            filename: '[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            assetModuleFilename: '[name][ext]',
      },
      module: {
            rules: [
                  {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                  },
                  {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                              loader: 'babel-loader',
                              options: {
                                    presets: ['@babel/preset-env'],
                              },
                        },
                  },
                  {
                        test: /\.(png|svg|jpeg|jpg|gif|ico|json)$/i,
                        type: 'asset/resource',
                  },
            ],
      },
      plugins: [
            new CleanPlugin.CleanWebpackPlugin(),
            new HtmlWebpackPlugin({ title: 'WhereAmI', filename: 'index.html', template: './src/index.html' }),
      ],
};
