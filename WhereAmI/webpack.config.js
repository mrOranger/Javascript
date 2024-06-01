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
      devtool: 'cheap-module-eval-source-map',
      plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
