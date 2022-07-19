const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const __src = path.resolve(__dirname, './src')
const __public = path.resolve(__dirname, './public')

module.exports = {
  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/public'),
   filename: 'index.bundle.js'
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   historyApiFallback: true,
   port: 3001,
   static: true
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        { loader: 'css-loader', options: { sourceMap: true } },
        // Compiles Sass to CSS
        "sass-loader",
      ],
     },
     {
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      exclude: /node_modules/,
      use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
     }
   ]
 },
  resolve: {
    extensions: ['*', '.js'] // extensions: ['*', '.js']
  },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}