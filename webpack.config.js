//!DOESN` WORK 
const path = require('path');

module.exports = {
  devtool: 'source-map',
  //Начальный файл
  entry:'./app.js',
  //Куда положим файл
  output:{
    //path.join - второй аргумент как будет называться папка
    path: path.join(__dirname, 'build'),
    filename: 'style.css',
    //Куда пойдут статические файлы
    publicPath: '/build/' 
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }]
  }
};