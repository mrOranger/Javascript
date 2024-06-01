const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
      entry: './src/index.js',
      mode: 'development',
      output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist', 'scripts'),
            publicPath: path.resolve(__dirname, 'dist', 'scripts'),
      },
      devtool: 'eval-cheap-module-source-map',
      devServer: {
            static: path.resolve(__dirname),
      },
      plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
