//Объект роутинга
const express = require('express');
const app = express();
const router = express.Router();

<<<<<<< HEAD
//Настриаваем Шаблон handlebars
=======
//Контроллер
var PollController = require('../controllers/pollController');
var pollController = new PollController();

//Настраиваем Шаблон handlebars
>>>>>>> development
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
  res.render('admin');
});

//Вывести все голоса
app.get('/list', (req, res) => {
  res = pollController.list(res);
  return res;
});

module.exports = app;

