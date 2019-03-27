//Объект роутинга
const express = require('express');
const app = express();

//Настраиваем Шаблон handlebars
var handlebars = require('express3-handlebars').create({
  defaultLayout: 'admin',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Сначала проходим через заполнение логина и пароля
app.get('/', (req, res) => {
  console.log("Get запрос index");
  res.render('enter_admin', {
  body: "title123"});
});

module.exports = app;