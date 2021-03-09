const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/UI/Web/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist/webapp',
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        "test": /\.css$/,
        "use": [
            "style-loader",
            "css-loader"
        ]
      },
      {
          "test": /\.html$/,
          "use": [
              {
                  "loader": "html-loader"
              }
          ]
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  "plugins": [
    new HtmlWebPackPlugin({
        template: "./src/UI/Web/index.html",
        filename: "./index.html"
    })
],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist', 'webapp'),
  },
};