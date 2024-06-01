const path = require('path');

module.exports = {
      entry: './src/index.js',
      mode: 'production',
      output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist', 'scripts'),
            publicPath: path.resolve(__dirname, 'dist', 'scripts'),
      },
      devtool: 'cheap-source-map',
};
