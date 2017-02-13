var webpack = require('webpack');

//Loaders & Webpack config
module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './app/app.js']
  },

  output: {
    path: './app/dist',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist/'
  },

  devServer: {
    contentBase: './app',
    publicPath: 'http://localhost:8080/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },
      { 
        test: /\.png$/, 
        loader: "file-loader" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ]
}
