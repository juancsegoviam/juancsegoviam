const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './frontend/public/app.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'frontend/public'),
    filename: 'bundle.js'
  },

  
  module : {
    rules: [
      {
        test: /\.css/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
  
};
