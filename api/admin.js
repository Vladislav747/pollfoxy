//Объект роутинга
const express = require('express');
const app = express();
const router = express.Router();

//Template operating
//handlebars
// set up handlebars view engine
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

//Если запрос уходит методом GET
app.get('/', (req, res) => {
  console.log("Get запрос index");
  res.render('home');
});

module.exports = app;

