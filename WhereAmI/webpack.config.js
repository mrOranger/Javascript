const path = require('path');

module.exports = {
      entry: './src/index.js',
      mode: 'development',
      output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist', 'scripts'),
            publicPath: path.resolve(__dirname, 'dist', 'scripts'),
      },
      devtool: 'cheap-module-eval-source-map',
};
