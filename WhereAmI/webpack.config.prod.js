const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
      entry: './src/index.js',
      mode: 'production',
      output: {
            filename: '[contenthash].js',
            path: path.resolve(__dirname, 'dist', 'scripts'),
            publicPath: path.resolve(__dirname, 'dist', 'scripts'),
      },
      devtool: 'cheap-source-map',
      plugins: [new CleanPlugin.CleanWebpackPlugin()],
      module: {
            rules: [
                  {
                        test: /\.(?:js|mjs|cjs)$/,
                        exclude: /node_modules/,
                        use: {
                              loader: 'babel-loader',
                              options: {
                                    presets: [['@babel/preset-env', { targets: 'defaults' }]],
                              },
                        },
                  },
            ],
      },
};